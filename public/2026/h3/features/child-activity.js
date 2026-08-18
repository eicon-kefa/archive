// Daily Cog feature: child-activity
function assessmentScoresFromRows(rows) {
  const assessmentRows=(rows||[]).filter(row=>String(row.game_id).startsWith('assessment:'));
  const meta=assessmentRows.find(row=>row.game_id==='assessment:meta');
  const attemptId=Math.max(0,Number(meta&&meta.play_count)||0);
  const scores={};
  assessmentRows.forEach(row=>{
    const gameId=String(row.game_id).slice('assessment:'.length);
    if(gameId!=='meta'&&ASSESSMENT_GAME_IDS.includes(gameId)&&(!attemptId||Number(row.play_count)===attemptId)){
      scores[gameId]=Math.max(0,Math.min(100,Math.round(Number(row.best_score)||0)));
    }
  });
  return scores;
}

async function loadChildActivity(child) {
  if(!child)throw new Error('자녀 계정을 선택해 주세요.');
  if(!SUPABASE_ENABLED){
    const account=readLocalAccountData(child.id,false);
    return {
      child:{...child,ageGroup:ageGroupFromBirthDate(account.birthDate)||account.age||child.ageGroup},
      assessmentScores:normalizeAssessment(account.assessment).scores,
      scores:account.scores||{},
      sessions:(account.gameSessions||[]).slice(),
      accessLogs:[],
      accessLogsAvailable:false
    };
  }
  const results=await Promise.all([
    db.from('game_scores').select('game_id, best_score, play_count, last_played').eq('user_id',child.id),
    db.from('game_sessions').select('game_id, difficulty, score, accuracy, stars, duration_seconds, completed_at').eq('user_id',child.id).order('completed_at',{ascending:false}).limit(1000),
    db.from('user_access_logs').select('session_id, signed_in_at, last_seen_at, signed_out_at, current_screen').eq('user_id',child.id).order('signed_in_at',{ascending:false}).limit(30)
  ]);
  if(results[0].error)throw results[0].error;
  if(results[1].error)throw results[1].error;
  const accessLogsAvailable=!results[2].error;
  if(results[2].error)console.warn('Child access logs are unavailable until the latest Supabase schema is applied.',results[2].error);
  const scores={};
  (results[0].data||[]).forEach(row=>{
    if(String(row.game_id).startsWith('assessment:'))return;
    scores[row.game_id]={best:row.best_score,plays:row.play_count,last:row.last_played};
  });
  return {
    child,
    assessmentScores:assessmentScoresFromRows(results[0].data||[]),
    scores,
    sessions:(results[1].data||[]).map(row=>({
      gameId:row.game_id,
      difficulty:row.difficulty,
      score:row.score,
      accuracy:row.accuracy,
      stars:row.stars,
      durationSeconds:row.duration_seconds,
      completedAt:row.completed_at
    })),
    accessLogs:accessLogsAvailable?(results[2].data||[]).map(row=>({
      sessionId:row.session_id,
      signedInAt:row.signed_in_at,
      lastSeenAt:row.last_seen_at,
      signedOutAt:row.signed_out_at,
      currentScreen:row.current_screen
    })):[],
    accessLogsAvailable
  };
}

function childAccessLogCopy() {
  const copies={
    ko:{title:'접속 기록',description:'최근 30회의 로그인과 이용 시간을 확인합니다.',start:'접속 시작',end:'접속 종료',last:'마지막 활동',duration:'이용 시간',online:'접속 중',ended:'종료',empty:'아직 저장된 접속 기록이 없습니다.',setup:'접속 기록을 표시하려면 최신 Supabase 스키마를 적용해 주세요.',minute:'분',hour:'시간',lessMinute:'1분 미만'},
    en:{title:'Access history',description:'Review the latest 30 sign-ins and time spent.',start:'Signed in',end:'Signed out',last:'Last activity',duration:'Time spent',online:'Online',ended:'Ended',empty:'No access history has been saved yet.',setup:'Apply the latest Supabase schema to display access history.',minute:'min',hour:'hr',lessMinute:'Under 1 min'},
    zh:{title:'访问记录',description:'查看最近30次登录和使用时长。',start:'登录时间',end:'退出时间',last:'最后活动',duration:'使用时长',online:'在线',ended:'已结束',empty:'尚无已保存的访问记录。',setup:'请应用最新的 Supabase 架构以显示访问记录。',minute:'分钟',hour:'小时',lessMinute:'少于1分钟'}
  };
  return copies[state.settings.language]||copies.en;
}

function childAccessDate(value) {
  if(!value)return '—';
  const date=new Date(value);
  if(Number.isNaN(date.getTime()))return '—';
  const locale={ko:'ko-KR',en:'en-US',zh:'zh-CN'}[state.settings.language]||'en-US';
  return new Intl.DateTimeFormat(locale,{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit'}).format(date);
}

function childAccessDuration(log,copy) {
  const start=new Date(log.signedInAt).getTime();
  const finish=new Date(log.signedOutAt||log.lastSeenAt).getTime();
  if(!Number.isFinite(start)||!Number.isFinite(finish)||finish<=start)return copy.lessMinute;
  const minutes=Math.max(1,Math.round((finish-start)/60000));
  if(minutes<60)return `${minutes}${state.settings.language==='en'?' ':''}${copy.minute}`;
  const hours=Math.floor(minutes/60);
  const remainder=minutes%60;
  return `${hours}${state.settings.language==='en'?' ':''}${copy.hour}${remainder?` ${remainder}${state.settings.language==='en'?' ':''}${copy.minute}`:''}`;
}

function childAccessLogsHtml(activity) {
  const copy=childAccessLogCopy();
  if(!activity.accessLogsAvailable)return `<article class="analytics-panel child-access-panel">
    <div class="panel-heading"><div><span class="step-label">ACCESS HISTORY</span><h2>${copy.title}</h2><p>${copy.description}</p></div></div>
    <div class="guardian-setup-error"><strong>${copy.setup}</strong><span><code>supabase/migrations/dashboard-upgrade.sql</code></span></div>
  </article>`;
  const logs=activity.accessLogs||[];
  return `<article class="analytics-panel child-access-panel">
    <div class="panel-heading"><div><span class="step-label">ACCESS HISTORY</span><h2>${copy.title}</h2><p>${copy.description}</p></div></div>
    ${logs.length?`<div class="child-access-list">${logs.map(log=>{
      const active=!log.signedOutAt&&Date.now()-new Date(log.lastSeenAt).getTime()<120000;
      const endValue=active?copy.online:childAccessDate(log.signedOutAt||log.lastSeenAt);
      return `<div class="child-access-row">
        <span class="child-access-status ${active?'is-online':''}"><i aria-hidden="true"></i>${active?copy.online:copy.ended}</span>
        <div><small>${copy.start}</small><strong>${childAccessDate(log.signedInAt)}</strong></div>
        <div><small>${active?copy.last:copy.end}</small><strong>${endValue}</strong></div>
        <div><small>${copy.duration}</small><strong>${childAccessDuration(log,copy)}</strong></div>
      </div>`;
    }).join('')}</div>`:`<div class="empty-history">${copy.empty}</div>`}
  </article>`;
}

function childActivityAnalytics(activity) {
  const allGames=ALL_GAMES;
  const sessions=(activity.sessions||[]).filter(item=>!Number.isNaN(new Date(item.completedAt).getTime()))
    .slice().sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt));
  const sessionAccuracy=item=>item.accuracy!==null&&item.accuracy!==undefined&&item.accuracy!==''&&Number.isFinite(Number(item.accuracy))
    ?Number(item.accuracy)
    :(Number(item.score)||0);
  const totalGames=sessions.length;
  const averageAccuracy=totalGames?Math.round(sessions.reduce((sum,item)=>sum+sessionAccuracy(item),0)/totalGames):0;
  const totalStars=sessions.reduce((sum,item)=>sum+(Number(item.stars)||0),0);
  const dayKey=date=>`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
  const activityDays=new Set(sessions.map(item=>dayKey(new Date(item.completedAt))));
  const cursor=new Date();cursor.setHours(0,0,0,0);
  if(!activityDays.has(dayKey(cursor)))cursor.setDate(cursor.getDate()-1);
  let streak=0;
  while(activityDays.has(dayKey(cursor))){streak++;cursor.setDate(cursor.getDate()-1);}
  const recentDays=[];
  const today=new Date();today.setHours(0,0,0,0);
  for(let offset=6;offset>=0;offset--){
    const date=new Date(today);date.setDate(date.getDate()-offset);
    const key=dayKey(date);
    recentDays.push({
      label:`${date.getMonth()+1}/${date.getDate()}`,
      count:sessions.filter(item=>dayKey(new Date(item.completedAt))===key).length
    });
  }
  const maxDaily=Math.max(1,...recentDays.map(item=>item.count));
  const currentPeriodStart=new Date(today);currentPeriodStart.setDate(currentPeriodStart.getDate()-6);
  const previousPeriodStart=new Date(today);previousPeriodStart.setDate(previousPeriodStart.getDate()-13);
  const currentPeriodSessions=sessions.filter(item=>new Date(item.completedAt)>=currentPeriodStart);
  const previousPeriodSessions=sessions.filter(item=>{
    const date=new Date(item.completedAt);
    return date>=previousPeriodStart&&date<currentPeriodStart;
  });
  const periodAverage=items=>items.length?Math.round(items.reduce((sum,item)=>sum+sessionAccuracy(item),0)/items.length):null;
  const periodComparison={
    currentSessions:currentPeriodSessions.length,
    currentAverageAccuracy:periodAverage(currentPeriodSessions),
    previousSessions:previousPeriodSessions.length,
    previousAverageAccuracy:periodAverage(previousPeriodSessions)
  };
  const ageGames=GAMES[activity.child.ageGroup]||[];
  const gamePerformance=ageGames.map(game=>{
    const played=sessions.filter(item=>item.gameId===game.id);
    const scoreState=activity.scores[game.id]||{};
    return {
      game,
      plays:Number(scoreState.plays)||played.length,
      average:played.length?Math.round(played.reduce((sum,item)=>sum+sessionAccuracy(item),0)/played.length):0,
      best:Number(scoreState.best)||0
    };
  });
  const recent=sessions.slice(0,8).map(item=>({
    ...item,
    game:allGames.find(game=>game.id===item.gameId),
    date:new Date(item.completedAt)
  }));
  const cognitive=calculateCognitiveDomains(activity.assessmentScores);
  const assessmentCount=ASSESSMENT_GAME_IDS.filter(id=>Number.isFinite(Number(activity.assessmentScores[id]))).length;
  return {totalGames,averageAccuracy,totalStars,streak,recentDays,maxDaily,gamePerformance,recent,cognitive,assessmentCount,periodComparison};
}

function childBenchmarkScore(value) {
  const number=benchmarkNumber(value);
  return number===null?'—':`${number}%`;
}

function childBenchmarkPanelHtml(child) {
  if(!SUPABASE_ENABLED)return `<article class="analytics-panel benchmark-panel"><div class="panel-heading"><div><span class="step-label">ANONYMOUS BENCHMARK</span><h2>자녀 정확도 백분위 비교</h2></div></div><div class="benchmark-message">연령대 및 전체 비교는 Supabase에 연결된 계정에서 제공됩니다.</div></article>`;
  if(state.childBenchmarksChildId!==child.id||state.childBenchmarksLoading)return `<article class="analytics-panel benchmark-panel"><div class="panel-heading"><div><span class="step-label">ANONYMOUS BENCHMARK</span><h2>자녀 정확도 백분위 비교</h2></div></div><div class="benchmark-message loading">자녀의 익명 비교 통계를 불러오는 중입니다.</div></article>`;
  if(state.childBenchmarksError)return `<article class="analytics-panel benchmark-panel"><div class="panel-heading"><div><span class="step-label">ANONYMOUS BENCHMARK</span><h2>자녀 정확도 백분위 비교</h2></div><button class="small-action" id="retryChildBenchmarks">다시 시도</button></div><div class="benchmark-message error">자녀 비교 통계를 표시하려면 최신 Supabase 스키마를 적용해 주세요. <code>supabase/migrations/user-benchmarks.sql</code></div></article>`;
  const data=state.childBenchmarks;
  if(!data||!data.overall)return `<article class="analytics-panel benchmark-panel"><div class="panel-heading"><div><span class="step-label">ANONYMOUS BENCHMARK</span><h2>자녀 정확도 백분위 비교</h2></div></div><div class="benchmark-message">자녀의 게임 기록이 쌓이면 같은 연령대와 전체 참여자 중 위치를 확인할 수 있습니다.</div></article>`;
  const overall=data.overall;
  const agePercentile=benchmarkNumber(overall.agePercentile),allPercentile=benchmarkNumber(overall.allPercentile);
  const gameRows=(Array.isArray(data.games)?data.games:[]).map(row=>{
    const game=ALL_GAMES.find(item=>item.id===row.gameId);
    const ageRank=benchmarkNumber(row.agePercentile),allRank=benchmarkNumber(row.allPercentile);
    return `<div class="benchmark-row">
      <div class="benchmark-game"><span>${game?game.icon:'◎'}</span><strong>${escapeHtml(game?game.title:row.gameId)}</strong></div>
      <span><small>자녀 평균</small><b>${childBenchmarkScore(row.userAverage)}</b></span>
      <span><small>연령대 평균</small><b>${childBenchmarkScore(row.ageAverage)}</b></span>
      <span><small>전체 평균</small><b>${childBenchmarkScore(row.allAverage)}</b></span>
      <span><small>연령대 백분위</small><b>${ageRank===null?'—':ageRank}</b></span>
      <span><small>전체 백분위</small><b>${allRank===null?'—':allRank}</b></span>
    </div>`;
  }).join('');
  return `<article class="analytics-panel benchmark-panel">
    <div class="panel-heading"><div><span class="step-label">ANONYMOUS BENCHMARK</span><h2>자녀 정확도 백분위 비교</h2><p>선택한 자녀의 게임별 평균 정확도를 같은 연령대와 전체 참여자의 익명 기록과 비교합니다. 백분위가 높을수록 상대적으로 높은 성과입니다.</p></div><div class="benchmark-sample"><span>같은 연령 참여자</span><b>${Number(overall.ageSampleSize)||0}</b><small>명</small><i>·</i><span>전체 참여자</span><b>${Number(overall.allSampleSize)||0}</b><small>명</small></div></div>
    <div class="benchmark-summary">
      ${benchmarkMetricCard('자녀 평균',overall.userAverage,'%','')}
      ${benchmarkMetricCard('연령대 평균',overall.ageAverage,'%','')}
      ${benchmarkMetricCard('전체 평균',overall.allAverage,'%','')}
      ${benchmarkMetricCard('연령대 백분위',agePercentile,'',benchmarkRankDetail(agePercentile,overall.ageSampleSize),'rank')}
      ${benchmarkMetricCard('전체 백분위',allPercentile,'',benchmarkRankDetail(allPercentile,overall.allSampleSize),'rank')}
    </div>
    ${gameRows?`<div class="benchmark-table"><div class="benchmark-row benchmark-head"><strong>게임</strong><span>자녀 평균</span><span>연령대 평균</span><span>전체 평균</span><span>연령대 백분위</span><span>전체 백분위</span></div>${gameRows}</div>`:'<div class="benchmark-message">게임별 비교를 위한 자녀 기록이 아직 없습니다.</div>'}
    <p class="benchmark-note">비교 결과는 참여자의 Daily Cog 기록만 사용하며 의학적 평가나 진단을 의미하지 않습니다.${data.hasExcludedLegacyAccuracy?' 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.':''}</p>
  </article>`;
}

async function loadChildPerformanceBenchmarks(childId,requestId=state.childActivityRequestId,force=false) {
  if(!SUPABASE_ENABLED||!state.user||!childId)return;
  if(state.childBenchmarksLoading&&state.childBenchmarksChildId===childId)return;
  if(!force&&state.childBenchmarksChildId===childId&&(state.childBenchmarks||state.childBenchmarksError))return;
  state.childBenchmarksChildId=childId;
  state.childBenchmarksLoading=true;
  state.childBenchmarksError=null;
  try{
    const result=await db.rpc('guardian_child_performance_benchmarks',{target_child_id:childId});
    if(result.error)throw result.error;
    if(requestId!==state.childActivityRequestId||state.selectedChildId!==childId)return;
    state.childBenchmarks=result.data||{overall:null,games:[]};
  }catch(error){
    if(requestId!==state.childActivityRequestId||state.selectedChildId!==childId)return;
    console.error('Child performance benchmarks:',error);
    state.childBenchmarksError=error&&error.message||'CHILD_BENCHMARK_UNAVAILABLE';
  }finally{
    if(requestId===state.childActivityRequestId&&state.selectedChildId===childId){
      state.childBenchmarksLoading=false;
      if(state.screen==='childActivity')renderPreservingScroll();
    }
  }
}

function childReportCopy(language=state.settings.language) {
  const copies={
    ko:{
      aiBadge:'AI 생성 보고서',basicBadge:'기본 분석 보고서',readyTitle:'활동 기록을 한눈에 정리해 드려요',
      readyBody:'6가지 인지영역, 게임 정확도, 최근 활동과 스트릭을 바탕으로 보호자가 이해하기 쉬운 요약을 만듭니다.',
      privacy:'자녀의 이메일, 생년월일과 계정정보는 AI로 전송하지 않지만 자녀의 데이터의 일부가 노출될 가능성이 있습니다.',create:'AI 보고서 생성하기',again:'보고서 다시 생성',
      loading:'자녀의 활동 흐름을 분석하고 있어요…',overview:'전체 요약',strengths:'관찰된 강점',growth:'함께 살펴볼 영역',
      recommendations:'일상 활동 제안',tip:'보호자에게',generated:'생성 시각',fallback:'AI 연결이 없어 기기에서 기본 분석 보고서를 만들었습니다.',
      aiError:'AI 보고서를 불러오지 못해 기본 분석으로 전환했습니다.',billingError:'OpenAI API 사용 한도 또는 결제 설정을 확인해 주세요.',
      keyError:'OpenAI API 키가 유효하지 않습니다. 새 키를 확인해 주세요.',modelError:'현재 계정에서 AI 보고서 모델을 사용할 수 없습니다.',
      rateError:'AI 요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.',requestError:'AI 요청 설정을 확인할 수 없어 기본 분석으로 전환했습니다.',languageError:'AI 응답 언어가 설정과 달라 한국어 기본 분석으로 전환했습니다.',authError:'로그인 세션이 만료되었습니다. 다시 로그인한 뒤 보고서를 생성해 주세요.',serviceError:'로컬 AI 서버는 실행 중이지만 OpenAI API에 연결하지 못했습니다.',reportError:'AI 응답을 처리하지 못해 한국어 기본 분석으로 전환했습니다.'
    },
    en:{
      aiBadge:'AI-generated report',basicBadge:'Basic analysis report',readyTitle:'See the activity record at a glance',
      readyBody:'Creates a guardian-friendly summary from six cognitive areas, game accuracy, recent activity, and the learning streak.',
      privacy:'Your child’s email, birth date, and account details are not sent to AI, but some of your child’s data may be exposed.',create:'Generate AI report',again:'Generate again',
      loading:'Analyzing the learning pattern…',overview:'Overview',strengths:'Observed strengths',growth:'Areas to support',
      recommendations:'Everyday suggestions',tip:'Message for the caregiver',generated:'Generated',fallback:'AI is not connected, so a basic on-device analysis is shown.',
      aiError:'The AI report was unavailable, so Daily Cog switched to a basic analysis.',billingError:'Check your OpenAI API usage limit or billing settings.',
      keyError:'The OpenAI API key is invalid. Check a newly created key.',modelError:'The AI report model is unavailable for this account.',
      rateError:'There are too many AI requests. Try again shortly.',requestError:'The AI request configuration could not be accepted, so a basic analysis is shown.',languageError:'The AI response language did not match your setting, so a basic English analysis is shown.',authError:'Your sign-in session has expired. Sign in again before generating the report.',serviceError:'The local AI server is running, but it could not connect to the OpenAI API.',reportError:'The AI response could not be processed, so a basic English analysis is shown.'
    },
    zh:{
      aiBadge:'AI生成报告',basicBadge:'基础分析报告',readyTitle:'一目了然地查看活动记录',
      readyBody:'根据六项认知领域、游戏正确率、近期活动和连续学习天数，生成便于监护人理解的摘要。',
      privacy:'孩子的邮箱、出生日期和账户信息不会发送给 AI，但孩子的部分数据可能会被披露。',create:'生成AI报告',again:'重新生成报告',
      loading:'正在分析孩子的学习情况…',overview:'总体摘要',strengths:'观察到的优势',growth:'需要支持的领域',
      recommendations:'日常活动建议',tip:'给照护者的话',generated:'生成时间',fallback:'AI尚未连接，当前显示设备生成的基础分析。',
      aiError:'AI报告暂时不可用，已切换为基础分析。',billingError:'请检查OpenAI API使用额度或付款设置。',
      keyError:'OpenAI API密钥无效，请检查新创建的密钥。',modelError:'当前账户无法使用AI报告模型。',
      rateError:'AI请求过多，请稍后重试。',requestError:'AI请求设置未被接受，已切换为基础分析。',languageError:'AI回复语言与设置不一致，已切换为中文基础分析。',authError:'登录会话已过期，请重新登录后生成报告。',serviceError:'本地AI服务器正在运行，但无法连接OpenAI API。',reportError:'无法处理AI回复，已切换为中文基础分析。'
    }
  };
  return copies[language]||copies.en;
}

function localizedChildReportLabel(value,language=state.settings.language) {
  return window.DailyCogI18n?window.DailyCogI18n.translate(value,language):value;
}

function createBasicChildReport(analytics,language=state.settings.language) {
  const domainRows=COGNITIVE_DOMAINS.map(domain=>({
    id:domain.id,
    label:localizedChildReportLabel(domain.label,language),
    score:Math.max(0,Math.min(100,Number(analytics.cognitive[domain.id])||0))
  })).sort((a,b)=>b.score-a.score);
  const strongest=domainRows[0];
  const growth=domainRows[domainRows.length-1];
  const weeklySessions=analytics.recentDays.reduce((sum,day)=>sum+day.count,0);
  const playedGames=analytics.gamePerformance.filter(item=>item.plays>0).sort((a,b)=>b.average-a.average);
  const strongestGame=playedGames[0];
  const disclaimer={
    ko:'이 보고서는 Daily Cog 활동 기록을 요약한 웰니스 정보이며 의학적 진단이나 치료 조언이 아닙니다. 인지 변화가 걱정되면 의료·교육 전문가와 상담해 주세요.',
    en:'This report summarizes Daily Cog wellness activity. It is not a medical diagnosis or treatment advice. Consult a healthcare or education professional if you have concerns.',
    zh:'本报告仅汇总Daily Cog健康活动，不属于医学诊断或治疗建议。如对认知变化有疑虑，请咨询医疗或教育专业人士。'
  }[language]||'';
  const everydayByLanguage={
    ko:{
      executive:'5~10분 동안 간단한 할 일 하나를 함께 고르고, 시작하기 전에 두세 단계의 순서를 직접 정해 보세요.',
      attention:'방해 요소를 줄이고 5~10분 동안 한 가지 활동만 함께한 뒤, 결과를 평가하지 않고 잠깐 쉬어 보세요.',
      episodicMemory:'5~10분 동안 오늘 있었던 일을 처음·다음·마지막 순서로 번갈아 이야기해 보세요.',
      workingMemory:'한두 가지 짧은 지시를 들려주고 자신의 말로 다시 말한 뒤, 함께 하나씩 확인해 보세요.',
      processingSpeed:'익숙한 활동을 충분한 시간 동안 정확하게 해 보고, 편안할 때만 속도를 조금씩 높여 보세요.',
      language:'새로운 단어 하나를 골라 5~10분 동안 자신의 말로 설명하고 함께 문장을 만들어 보세요.'
    },
    zh:{
      executive:'用5到10分钟一起选择一项简单任务，并在开始前让学习者自己安排两到三个步骤。',
      attention:'减少干扰，用5到10分钟一次只进行一项活动，之后一起短暂休息，不评价结果。',
      episodicMemory:'用5到10分钟轮流按照“先、然后、最后”的顺序讲述当天发生的事情。',
      workingMemory:'给出一到两条简短指令，请学习者用自己的话复述，再一起逐项确认。',
      processingSpeed:'选择熟悉的活动，给予充足时间准确完成，只有在感到轻松时再慢慢加快速度。',
      language:'选择一个新词，用5到10分钟以自己的话解释，并一起用这个词造句。'
    }
  };
  if(language==='ko')return {
    source:'basic',generatedAt:new Date().toISOString(),
    overview:analytics.totalGames
      ? `지금까지 ${analytics.totalGames}회 활동했고 평균 정확도는 ${analytics.averageAccuracy}%입니다. 최근 7일에는 ${weeklySessions}회 학습했으며 현재 스트릭은 ${analytics.streak}일입니다.`
      : '아직 완료한 게임이 없어 활동 경향을 판단하기 어렵습니다. 첫 게임을 마치면 정확도와 학습 리듬을 함께 확인할 수 있습니다.',
    strengths:analytics.assessmentCount?[`${strongest.label} 점수가 ${strongest.score}점으로 현재 6개 영역 중 가장 높게 관찰되었습니다.`,strongestGame?`${localizedChildReportLabel(strongestGame.game.title,language)}에서 평균 ${strongestGame.average}%의 정확도를 보였습니다.`:'게임을 더 진행하면 영역별 강점을 더 구체적으로 확인할 수 있습니다.']:['기초평가가 완료되면 현재 강점 영역을 확인할 수 있습니다.'],
    growthAreas:analytics.assessmentCount?[`${growth.label}은 ${growth.score}점으로 다음 학습에서 천천히 보완해 볼 수 있는 영역입니다.`]:['기초평가를 완료해야 6가지 인지영역을 비교할 수 있습니다.'],
    recommendations:analytics.assessmentCount?[everydayByLanguage.ko[growth.id],'활동은 짧게 유지하고 피곤하거나 답답해 보이면 함께 쉬어 주세요.']:['5~10분 동안 차분한 활동 하나를 함께하고 활동 순서를 직접 고르게 해 주세요.','하루 중 한 가지 일을 번갈아 이야기하되, 답을 고치거나 점수로 평가하지 마세요.'],
    guardianTip:'점수보다 참여와 노력, 반복해서 시도한 과정을 격려해 주세요. 다른 사람과 비교하거나 압박하지 말고, 피곤하거나 좌절하는 모습이 보이면 쉬도록 안내해 주세요.',disclaimer
  };
  if(language==='zh')return {
    source:'basic',generatedAt:new Date().toISOString(),
    overview:analytics.totalGames?`目前共完成${analytics.totalGames}次活动，平均正确率为${analytics.averageAccuracy}%。最近7天学习${weeklySessions}次，当前连续学习${analytics.streak}天。`:'目前还没有已完成的游戏，暂时无法判断活动趋势。完成第一个游戏后即可查看正确率和学习节奏。',
    strengths:analytics.assessmentCount?[`${strongest.label}得分为${strongest.score}分，是当前六项领域中最高的一项。`,strongestGame?`${localizedChildReportLabel(strongestGame.game.title,language)}的平均正确率为${strongestGame.average}%。`:'完成更多游戏后，可以更具体地了解优势领域。']:['完成基础评估后即可查看当前优势领域。'],
    growthAreas:analytics.assessmentCount?[`${growth.label}得分为${growth.score}分，可在接下来的学习中循序渐进地加强。`]:['需要先完成基础评估，才能比较六项认知领域。'],
    recommendations:analytics.assessmentCount?[everydayByLanguage.zh[growth.id],'活动时间保持简短；如果学习者显得疲倦或沮丧，请一起休息。']:['一起进行5到10分钟的安静活动，并让学习者自己选择步骤顺序。','轮流讲述当天的一件事，不纠正答案，也不给表现打分。'],
    guardianTip:'请关注参与、努力和反复尝试的过程，而不只看分数。不要比较或施压；如果学习者显得疲倦或沮丧，请让其休息。',disclaimer
  };
  const everydaySuggestions={
    executive:'For 5–10 minutes, choose one simple task together and let the learner arrange its two or three steps before starting.',
    attention:'Create 5–10 quiet minutes for one activity at a time, then take a short break together without evaluating the result.',
    episodicMemory:'Spend 5–10 minutes taking turns describing the day in order: what happened first, next, and last.',
    workingMemory:'Give one or two short instructions, invite the learner to repeat them in their own words, and check them off together.',
    processingSpeed:'Choose a familiar activity, allow plenty of time for accuracy, and increase the pace only if it continues to feel comfortable.',
    language:'Choose one new word and spend 5–10 minutes explaining it in your own words and using it in a sentence together.'
  };
  const suggestions=analytics.assessmentCount
    ?[everydaySuggestions[growth.id],'Keep the activity brief and pause together if the learner appears tired or frustrated.']
    :['Spend 5–10 minutes on one calm shared activity and let the learner choose the order of the steps.','Take turns describing one event from the day, without correcting or scoring the response.'];
  return {
    source:'basic',generatedAt:new Date().toISOString(),
    overview:analytics.totalGames?`${analytics.totalGames} activities have been completed with ${analytics.averageAccuracy}% average accuracy. There were ${weeklySessions} sessions in the last seven days, and the current streak is ${analytics.streak} days.`:'There are no completed games yet, so an activity pattern cannot be estimated. Accuracy and learning rhythm will appear after the first game.',
    strengths:analytics.assessmentCount?[`${strongest.label} is currently the highest of the six areas at ${strongest.score} points.`,strongestGame?`${localizedChildReportLabel(strongestGame.game.title,language)} has an average accuracy of ${strongestGame.average}%.`:'More completed games will make the strengths more specific.']:['Complete the baseline assessment to identify the current areas of strength.'],
    growthAreas:analytics.assessmentCount?[`${growth.label} is currently ${growth.score} points and can be supported gradually in the next learning sessions.`]:['Complete the baseline assessment before comparing the six cognitive areas.'],
    recommendations:suggestions,
    guardianTip:'Focus on participation, effort, and repeated attempts rather than the score. Avoid comparison or pressure, and offer a break whenever the learner appears tired or frustrated.',disclaimer
  };
}

function normalizeChildAiReport(value) {
  if(!value||typeof value!=='object'||typeof value.overview!=='string')return null;
  const cleanText=text=>String(text||'').trim().slice(0,1200);
  const cleanList=(list,limit)=>(Array.isArray(list)?list:[]).map(cleanText).filter(Boolean).slice(0,limit);
  const report={
    source:'ai',generatedAt:new Date().toISOString(),overview:cleanText(value.overview),
    strengths:cleanList(value.strengths,2),growthAreas:cleanList(value.growthAreas,2),
    recommendations:cleanList(value.recommendations,3),guardianTip:cleanText(value.guardianTip),
    disclaimer:cleanText(value.disclaimer)
  };
  return report.overview&&report.recommendations.length&&report.disclaimer?report:null;
}

function childAiFallbackMessage(reason,copy=childReportCopy()) {
  const messages={
    OPENAI_QUOTA_EXCEEDED:copy.billingError,
    OPENAI_KEY_INVALID:copy.keyError,
    OPENAI_MODEL_UNAVAILABLE:copy.modelError,
    OPENAI_RATE_LIMIT:copy.rateError,
    REPORT_RATE_LIMIT:copy.rateError,
    OPENAI_REQUEST_INVALID:copy.requestError,
    AI_REPORT_LANGUAGE_MISMATCH:copy.languageError,
    AUTH_REQUIRED:copy.authError,
    AI_SERVICE_UNAVAILABLE:copy.serviceError,
    AUTH_SERVICE_UNAVAILABLE:copy.serviceError,
    AI_SERVER_UNAVAILABLE:copy.serviceError,
    AI_REPORT_FAILED:copy.reportError,
    AI_REPORT_INVALID:copy.reportError,
    INVALID_AI_REPORT:copy.reportError,
    AI_NOT_CONFIGURED:copy.fallback
  };
  return messages[reason]||copy.fallback;
}

function shouldShowChildAiFallbackNotice(reason) {
  return Boolean(reason&&!['OPENAI_RATE_LIMIT','REPORT_RATE_LIMIT'].includes(reason));
}

function childReportRequestPayload(activity,analytics) {
  const ageGroups={child:'Children (ages 4–12)',teen:'Youth (ages 13–29)',adult:'Adults (ages 30–64)',senior:'Seniors (ages 65+)'};
  const weeklySessions=analytics.recentDays.reduce((sum,day)=>sum+day.count,0);
  const participationDays=analytics.recentDays.filter(day=>day.count>0).length;
  const comparison=analytics.periodComparison;
  const previousPeriodComparison=comparison.previousSessions
    ?`Current 7 days: ${comparison.currentSessions} sessions, ${comparison.currentAverageAccuracy===null?'no accuracy data':`${comparison.currentAverageAccuracy}% average accuracy`}. Previous 7 days: ${comparison.previousSessions} sessions, ${comparison.previousAverageAccuracy===null?'no accuracy data':`${comparison.previousAverageAccuracy}% average accuracy`}.`
    :'No sessions were recorded in the previous 7-day period, so a reliable period-to-period comparison is not available.';
  return {
    language:'en',
    userInfo:{
      ageGroup:ageGroups[activity.child.ageGroup]||'Age group not available',
      reportPeriod:'All available Daily Cog activity records, with recent participation summarized for the last 7 calendar days',
      recipientType:'Guardian or trusted supporter'
    },
    summary:{
      completedActivities:analytics.totalGames,averageAccuracy:analytics.averageAccuracy,
      sessionsLast7Days:weeklySessions,recentParticipationDays:participationDays,
      currentStreakDays:analytics.streak,assessmentGamesCompleted:analytics.assessmentCount,
      recentSevenDays:analytics.recentDays.map(day=>({day:day.label,activities:day.count}))
    },
    cognitiveDomains:Object.fromEntries(COGNITIVE_DOMAINS.map(domain=>{
      const hasData=(COGNITIVE_DOMAIN_GAMES[domain.id]||[]).some(id=>Number.isFinite(Number(activity.assessmentScores[id])));
      return [domain.id,hasData?Number(analytics.cognitive[domain.id])||0:null];
    })),
    gamePerformance:analytics.gamePerformance.filter(item=>item.plays>0).slice(0,12).map(item=>({
      gameId:item.game.id,title:localizedChildReportLabel(item.game.title,'en'),plays:item.plays,
      averageAccuracy:item.average,bestScore:item.best
    })),
    previousPeriodComparison,
    optionalContext:`Baseline assessment data is available for ${analytics.assessmentCount} of ${ASSESSMENT_GAMES.length} activities. Scores without supporting assessment records are marked as unavailable.`
  };
}

async function generateChildAiReport(activity,analytics) {
  const childId=activity.child.id;
  const language=state.settings.language;
  const requestingUserId=state.user&&state.user.id;
  const existing=state.childAiReports[childId];
  if(existing&&existing.status==='loading')return;
  const previousAiReport=existing&&existing.status==='ready'&&existing.report&&existing.report.source==='ai'?existing:null;
  state.childAiReports[childId]={status:'loading',language};
  renderPreservingScroll();
  let report=null;
  let fallbackReason='';
  try{
    if(!SUPABASE_ENABLED)throw new Error('AI_SERVER_UNAVAILABLE');
    const sessionResult=await db.auth.getSession();
    const accessToken=sessionResult.data&&sessionResult.data.session&&sessionResult.data.session.access_token;
    if(!accessToken)throw new Error('AUTH_REQUIRED');
    const controller=new AbortController();
    const timeoutId=setTimeout(()=>controller.abort(),30000);
    let response;
    try{
      response=await fetch('/.netlify/functions/child-activity-report',{
        method:'POST',signal:controller.signal,
        headers:{'Content-Type':'application/json','Authorization':`Bearer ${accessToken}`},
        body:JSON.stringify(childReportRequestPayload(activity,analytics))
      });
    }finally{clearTimeout(timeoutId);}
    if(!response.ok){
      const errorBody=await response.json().catch(()=>({}));
      throw new Error(errorBody.error||`REPORT_${response.status}`);
    }
    const result=await response.json();
    report=normalizeChildAiReport(result.report);
    if(!report)throw new Error('INVALID_AI_REPORT');
  }catch(error){
    console.warn('Child AI report fallback:',error);
    fallbackReason=error&&error.message||'AI_UNAVAILABLE';
    if(['OPENAI_RATE_LIMIT','REPORT_RATE_LIMIT'].includes(fallbackReason)&&previousAiReport){
      if(!state.user||(state.user.id!==requestingUserId))return;
      state.childAiReports[childId]={...previousAiReport,language,fallbackReason:''};
      if(state.screen==='childActivity'&&state.selectedChildId===childId)renderPreservingScroll();
      return;
    }
    report=createBasicChildReport(analytics,'en');
  }
  if(!state.user||(state.user.id!==requestingUserId))return;
  state.childAiReports[childId]={status:'ready',language,report,fallbackReason};
  if(state.screen==='childActivity'&&state.selectedChildId===childId){
    renderPreservingScroll();
    if(shouldShowChildAiFallbackNotice(fallbackReason))toast(childAiFallbackMessage(fallbackReason,childReportCopy(language)));
  }
}

function childAiReportHtml(activity,analytics) {
  const copy=childReportCopy();
  const entry=state.childAiReports[activity.child.id];
  const current=entry&&entry.language===state.settings.language?entry:null;
  if(current&&current.status==='loading')return `<section class="child-ai-report is-loading" aria-live="polite">
    <div class="child-ai-report-loading"><span class="loading-orbit"></span><strong>${copy.loading}</strong></div>
  </section>`;
  if(!current||!current.report)return `<section class="child-ai-report" aria-labelledby="childAiReportTitle">
    <div class="child-ai-report-intro"><span class="ai-report-icon" aria-hidden="true">✦</span><div><span class="step-label">AI ACTIVITY REPORT</span><h2 id="childAiReportTitle">자녀 활동 AI 보고서</h2><strong>${copy.readyTitle}</strong><p>${copy.readyBody}</p><small>🔒 ${copy.privacy}</small></div></div>
    <button type="button" class="primary-btn child-ai-report-button" id="generateChildAiReport">${copy.create} →</button>
  </section>`;
  const report=current.report;
  const locale=state.settings.language==='ko'?'ko-KR':state.settings.language==='zh'?'zh-CN':'en-US';
  const generated=new Intl.DateTimeFormat(locale,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}).format(new Date(report.generatedAt));
  const list=(items,className)=>`<ul class="${className}">${items.map(item=>`<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  return `<section class="child-ai-report has-report" aria-labelledby="childAiReportTitle" aria-live="polite">
    <div class="child-ai-report-heading"><div><span class="step-label">AI ACTIVITY REPORT</span><h2 id="childAiReportTitle">자녀 활동 AI 보고서</h2></div><div class="ai-report-actions"><span class="ai-source-badge ${report.source==='ai'?'is-ai':'is-basic'}">✦ ${report.source==='ai'?copy.aiBadge:copy.basicBadge}</span><button type="button" class="secondary-btn" id="generateChildAiReport">${copy.again}</button></div></div>
    ${report.source!=='ai'&&shouldShowChildAiFallbackNotice(current.fallbackReason)?`<p class="ai-fallback-note">ⓘ ${escapeHtml(childAiFallbackMessage(current.fallbackReason,copy))}</p>`:''}
    <div class="ai-report-overview"><span>${copy.overview}</span><p>${escapeHtml(report.overview)}</p></div>
    <div class="ai-report-columns">
      <article><span class="ai-report-section-icon strength">↑</span><h3>${copy.strengths}</h3>${list(report.strengths,'ai-report-list')}</article>
      <article><span class="ai-report-section-icon growth">◎</span><h3>${copy.growth}</h3>${list(report.growthAreas,'ai-report-list')}</article>
      <article><span class="ai-report-section-icon action">✓</span><h3>${copy.recommendations}</h3>${list(report.recommendations,'ai-report-list')}</article>
    </div>
    <div class="ai-guardian-tip"><strong>💡 ${copy.tip}</strong><p>${escapeHtml(report.guardianTip)}</p></div>
    <footer><small>${copy.generated}: ${escapeHtml(generated)}</small><p>${escapeHtml(report.disclaimer)}</p></footer>
  </section>`;
}

async function openChildActivity(childId=null) {
  clearSessionTimers();
  state.screen='childActivity';
  state.careOverviewLoading=true;
  render();
  if(SUPABASE_ENABLED&&state.user){
    await Promise.all([refreshGuardianChildren(),loadCareOverview()]);
  }else{
    state.guardianChildren=resolveLocalGuardianChildren(state.guardianLinks);
    state.careOverview={incoming:[],outgoing:[],connections:[]};
    state.careOverviewError='공유돌봄 연결 요청은 Supabase에 연결된 사이트에서 사용할 수 있습니다.';
    state.careOverviewLoading=false;
  }
  if(!state.guardianChildren.length){
    state.selectedChildId=null;
    state.childActivity=null;
    state.childActivityError=null;
    render();
    return;
  }
  const selected=state.guardianChildren.find(child=>child.id===(childId||state.selectedChildId))||state.guardianChildren[0];
  state.selectedChildId=selected.id;
  state.childActivity=null;
  state.childActivityError=null;
  state.childBenchmarks=null;
  state.childBenchmarksLoading=false;
  state.childBenchmarksError=null;
  state.childBenchmarksChildId=selected.id;
  const requestId=++state.childActivityRequestId;
  render();
  loadChildPerformanceBenchmarks(selected.id,requestId);
  try{
    const activity=await loadChildActivity(selected);
    if(requestId!==state.childActivityRequestId||state.selectedChildId!==selected.id)return;
    state.childActivity=activity;
  }catch(error){
    if(requestId!==state.childActivityRequestId||state.selectedChildId!==selected.id)return;
    console.error(error);
    state.childActivityError=error.message||'자녀 활동 기록을 불러오지 못했습니다.';
  }
  if(requestId===state.childActivityRequestId&&state.screen==='childActivity')render();
}

function emptyCareOverview() {
  return {incoming:[],outgoing:[],connections:[]};
}

function normalizeCareOverview(value) {
  const source=value&&typeof value==='object'?value:{};
  return {
    incoming:Array.isArray(source.incoming)?source.incoming:[],
    outgoing:Array.isArray(source.outgoing)?source.outgoing:[],
    connections:Array.isArray(source.connections)?source.connections:[]
  };
}

function careRequestError(error) {
  const message=String(error&&error.message||error||'');
  const lowered=message.toLowerCase();
  if(lowered.includes('could not find the function')||lowered.includes('schema cache')||lowered.includes('care_link_')){
    return '공유돌봄 요청 기능을 사용하려면 최신 Supabase 스키마를 적용해 주세요.';
  }
  if(lowered.includes('account not found'))return '일치하는 계정을 찾지 못했습니다.';
  if(lowered.includes('own account'))return '본인 계정에는 연결 요청을 보낼 수 없습니다.';
  if(lowered.includes('already connected'))return '이미 연결된 계정입니다.';
  if(lowered.includes('pending request'))return '두 계정 사이에 이미 대기 중인 요청이 있습니다.';
  return message||'공유돌봄 요청을 처리하지 못했습니다.';
}

async function loadCareOverview() {
  if(!SUPABASE_ENABLED||!state.user){
    state.careOverview=emptyCareOverview();
    state.careOverviewLoading=false;
    return false;
  }
  state.careOverviewLoading=true;
  state.careOverviewError=null;
  const result=await db.rpc('care_link_overview');
  if(result.error){
    console.warn('Share care overview is unavailable until the latest Supabase schema is applied.',result.error);
    state.careOverview=emptyCareOverview();
    state.careOverviewError=careRequestError(result.error);
    state.careOverviewLoading=false;
    return false;
  }
  state.careOverview=normalizeCareOverview(result.data);
  state.careOverviewLoading=false;
  return true;
}

function careRoleLabel(role) {
  return role==='guardian'?'보호자':'자녀';
}

function carePersonCard(item,actions='') {
  const date=item&&item.createdAt?new Date(item.createdAt):null;
  const dateLabel=date&&!Number.isNaN(date.getTime())?date.toLocaleDateString():'';
  return `<article class="care-person-card">
    <span class="care-person-avatar">${escapeHtml((item.name||'사용자')[0])}</span>
    <div><strong>${escapeHtml(item.name||'사용자')}</strong><small>${escapeHtml(item.email||'')}</small><em>${careRoleLabel(item.role)}${dateLabel?` · ${escapeHtml(dateLabel)}`:''}</em></div>
    ${actions}
  </article>`;
}

function shareCareHubHtml() {
  const search=state.careSearch||{email:'',targetRole:'child',loading:false,result:null,error:null};
  const overview=state.careOverview||emptyCareOverview();
  const result=search.result;
  return `<section class="share-care-hub" aria-labelledby="shareCareTitle">
    <div class="share-care-heading">
      <div><span class="step-label">SHARE CARE</span><h1 id="shareCareTitle">공유돌봄 연결</h1><p>연동할 보호자 또는 자녀의 정확한 이메일 아이디를 검색해 요청을 보내세요.</p></div>
      ${overview.incoming.length?`<span class="care-incoming-count">${overview.incoming.length}개의 새 요청</span>`:''}
    </div>
    <form class="care-search-form" id="careSearchForm">
      <label><span>사용자 이메일 아이디</span><input type="email" id="careSearchEmail" required autocomplete="off" placeholder="example@email.com" value="${escapeHtml(search.email||'')}"></label>
      <label><span>연결 관계</span><select id="careTargetRole"><option value="child" ${search.targetRole==='child'?'selected':''}>이 사용자를 자녀로 연결</option><option value="guardian" ${search.targetRole==='guardian'?'selected':''}>이 사용자를 보호자로 연결</option></select></label>
      <button type="submit" class="primary-btn" ${search.loading?'disabled':''}>${search.loading?'검색 중…':'아이디 검색'}</button>
    </form>
    <p class="care-search-help">개인정보 보호를 위해 정확히 일치하는 이메일 아이디만 검색됩니다.</p>
    ${search.error?`<div class="care-inline-message error">${escapeHtml(search.error)}</div>`:''}
    ${result?`<div class="care-search-result"><div><span class="care-person-avatar">${escapeHtml((result.name||'사용자')[0])}</span><span><strong>${escapeHtml(result.name||'사용자')}</strong><small>${escapeHtml(result.email||'')}</small></span></div><button type="button" class="primary-btn" id="sendCareRequest">연결 요청 보내기</button></div>`:''}
    ${state.careOverviewError?`<div class="care-inline-message error">${escapeHtml(state.careOverviewError)}</div>`:''}
    <div class="care-overview-grid">
      <section><div class="care-list-heading"><h2>받은 요청</h2><span>${overview.incoming.length}</span></div><div class="care-person-list">${overview.incoming.length?overview.incoming.map(item=>carePersonCard(item,`<div class="care-card-actions"><button type="button" class="care-accept" data-care-accept="${escapeHtml(item.id)}">수락</button><button type="button" class="care-decline" data-care-decline="${escapeHtml(item.id)}">거절</button></div>`)).join(''):'<p class="care-empty">받은 요청이 없습니다.</p>'}</div></section>
      <section><div class="care-list-heading"><h2>보낸 요청</h2><span>${overview.outgoing.length}</span></div><div class="care-person-list">${overview.outgoing.length?overview.outgoing.map(item=>carePersonCard(item,`<button type="button" class="care-cancel" data-care-cancel="${escapeHtml(item.id)}">요청 취소</button>`)).join(''):'<p class="care-empty">대기 중인 요청이 없습니다.</p>'}</div></section>
    </div>
    <section class="care-connections"><div class="care-list-heading"><h2>연결된 공유돌봄</h2><span>${overview.connections.length}</span></div><div class="care-person-list">${overview.connections.length?overview.connections.map(item=>carePersonCard(item)).join(''):'<p class="care-empty">아직 연결된 공유돌봄 관계가 없습니다.</p>'}</div></section>
    ${state.careOverviewLoading?'<div class="care-inline-message">공유돌봄 요청을 불러오는 중입니다…</div>':''}
  </section>`;
}

async function searchCareAccount() {
  const email=$('#careSearchEmail')?.value.trim()||'';
  const targetRole=$('#careTargetRole')?.value||'child';
  state.careSearch={email,targetRole,loading:true,result:null,error:null};
  renderPreservingScroll();
  if(!SUPABASE_ENABLED){
    state.careSearch.loading=false;
    state.careSearch.error='공유돌봄 연결 요청은 Supabase에 연결된 사이트에서 사용할 수 있습니다.';
    renderPreservingScroll();
    return;
  }
  const result=await db.rpc('search_care_account',{input_email:email});
  state.careSearch.loading=false;
  if(result.error){
    state.careSearch.error=careRequestError(result.error);
  }else if(!result.data){
    state.careSearch.error='일치하는 계정을 찾지 못했습니다.';
  }else{
    state.careSearch.result=result.data;
  }
  renderPreservingScroll();
}

async function sendCareRequest() {
  const search=state.careSearch;
  if(!SUPABASE_ENABLED||!search.result)return;
  state.careSearch.loading=true;
  renderPreservingScroll();
  const result=await db.rpc('send_care_link_request',{input_target_email:search.result.email,input_target_role:search.targetRole});
  state.careSearch.loading=false;
  if(result.error){
    state.careSearch.error=careRequestError(result.error);
  }else{
    state.careSearch={email:'',targetRole:'child',loading:false,result:null,error:null};
    toast('공유돌봄 연결 요청을 보냈습니다.');
    await loadCareOverview();
  }
  renderPreservingScroll();
}

async function respondCareRequest(requestId,accept) {
  if(!SUPABASE_ENABLED||!requestId)return;
  const result=await db.rpc('respond_care_link_request',{input_request_id:requestId,input_accept:Boolean(accept)});
  if(result.error){toast(careRequestError(result.error));return;}
  toast(accept?'공유돌봄 연결 요청을 수락했습니다.':'공유돌봄 연결 요청을 거절했습니다.');
  await Promise.all([loadCareOverview(),refreshGuardianChildren()]);
  if(!state.selectedChildId&&state.guardianChildren.length)state.selectedChildId=state.guardianChildren[0].id;
  renderPreservingScroll();
}

async function cancelCareRequest(requestId) {
  if(!SUPABASE_ENABLED||!requestId)return;
  const result=await db.rpc('cancel_care_link_request',{input_request_id:requestId});
  if(result.error){toast(careRequestError(result.error));return;}
  toast('보낸 요청을 취소했습니다.');
  await loadCareOverview();
  renderPreservingScroll();
}

function bindShareCareHub() {
  const form=$('#careSearchForm');
  if(form)form.onsubmit=event=>{event.preventDefault();searchCareAccount();};
  const send=$('#sendCareRequest');
  if(send)send.onclick=sendCareRequest;
  $$('[data-care-accept]').forEach(button=>button.onclick=()=>respondCareRequest(button.dataset.careAccept,true));
  $$('[data-care-decline]').forEach(button=>button.onclick=()=>respondCareRequest(button.dataset.careDecline,false));
  $$('[data-care-cancel]').forEach(button=>button.onclick=()=>cancelCareRequest(button.dataset.careCancel));
}

function childActivityTabsHtml(selectedId) {
  return `<nav class="child-account-tabs" aria-label="자녀 선택">
    <div class="child-account-tabs-copy"><span class="step-label">REGISTERED CHILDREN</span><strong>등록한 자녀</strong><small>확인할 자녀를 선택하세요.</small></div>
    <div class="child-account-tab-list">${state.guardianChildren.map(child=>{
      const active=child.id===selectedId;
      const ageLabel=(AGE_GROUPS[child.ageGroup]&&AGE_GROUPS[child.ageGroup].label)||'연령 미설정';
      return `<button type="button" class="child-account-tab ${active?'active':''}" data-child-select="${escapeHtml(child.id)}" aria-pressed="${active}" ${active?'aria-current="page"':''}>
        <span class="child-account-tab-avatar">${escapeHtml((child.name||'자녀')[0])}</span>
        <span><strong>${escapeHtml(child.name||'자녀')}</strong><small>${escapeHtml(ageLabel)}</small>${child.learnedToday?'<em class="child-learned-today" data-i18n-key="오늘 학습 완료">오늘 학습 완료</em>':''}</span>
        <i aria-hidden="true">✓</i>
      </button>`;
    }).join('')}</div>
  </nav>`;
}

function bindChildActivityTabs() {
  $$('[data-child-select]').forEach(button=>{
    button.onclick=()=>{
      const childId=button.dataset.childSelect;
      if(!childId||childId===state.selectedChildId)return;
      openChildActivity(childId);
    };
  });
}

function childGrowthUi(childId) {
  if(!state.childGrowthUiByChild)state.childGrowthUiByChild={};
  if(!state.childGrowthUiByChild[childId]){
    state.childGrowthUiByChild[childId]={growthMode:'game',growthKey:null,growthPeriod:'week'};
  }
  return state.childGrowthUiByChild[childId];
}

function childGrowthJournalHtml(activity) {
  const child=activity.child;
  const sessions=(activity.sessions||[])
    .filter(item=>!Number.isNaN(new Date(item.completedAt).getTime()))
    .slice().sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt));
  const growth=dashboardGrowthData(sessions,childGrowthUi(child.id));
  return `<article class="analytics-panel growth-panel child-growth-panel">
    <div class="panel-heading growth-heading"><div><span class="step-label">GROWTH JOURNAL</span><h2>자녀 성장 일지</h2><p>자녀의 게임 종류 또는 인지능력별 평균 정확도 변화를 확인합니다.</p></div><div class="growth-controls"><div class="growth-mode-tabs" role="group" aria-label="자녀 성장 일지 분류"><button class="${growth.mode==='game'?'active':''}" data-child-growth-mode="game">게임별</button><button class="${growth.mode==='domain'?'active':''}" data-child-growth-mode="domain">인지능력별</button></div><div class="growth-period-tabs" role="group" aria-label="자녀 성장 그래프 기간"><button class="${growth.period==='week'?'active':''}" data-child-growth-period="week">주간</button><button class="${growth.period==='month'?'active':''}" data-child-growth-period="month">월간</button><button class="${growth.period==='year'?'active':''}" data-child-growth-period="year">연간</button></div></div></div>
    ${growth.options.length?`<div class="growth-toolbar"><label><span data-i18n-key="확인할 항목">확인할 항목</span><select id="childGrowthMetricSelect">${growth.options.map(option=>`<option value="${escapeHtml(option.id)}" data-i18n-key="${escapeHtml(option.label)}" ${growth.selected&&option.id===growth.selected.id?'selected':''}>${escapeHtml(option.label)}</option>`).join('')}</select></label><div class="growth-stats"><div><span>전체 기록</span><strong>${growth.plays}<small>회</small></strong></div><div><span>전체 평균</span><strong>${growth.allTimeAverage??'—'}<small>${growth.allTimeAverage===null?'':'%'}</small></strong></div><div><span>${growth.period==='year'?'최근 학습월 평균':growth.period==='month'?'최근 주간 평균':'최근 학습일 평균'}</span><strong>${growth.latestAverage??'—'}<small>${growth.latestAverage===null?'':'%'}</small></strong></div><div class="${growth.improvement>0?'positive':growth.improvement<0?'negative':''}"><span>${growth.period==='year'?'첫 기록월 대비':growth.period==='month'?'첫 주 대비':'첫 기록일 대비'}</span><strong>${growth.improvement===null?'—':`${growth.improvement>0?'+':''}${growth.improvement}`}<small>${growth.improvement===null?'':'점'}</small></strong></div></div></div>`:''}
    ${dashboardGrowthChartHtml(growth)}
    <p class="growth-note">주간 그래프는 날짜별 평균을, 월간 그래프는 7일간 평균을, 연간 그래프는 월별 평균을 표시합니다. 각 점은 집계 기간의 마지막 날짜 위에 표시되며 기록이 한 시점뿐이면 점으로만 나타납니다.${growth.estimatedCount?' 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.':''}</p>
  </article>`;
}

function bindChildGrowthJournal(childId) {
  const ui=childGrowthUi(childId);
  $$('[data-child-growth-mode]').forEach(button=>button.onclick=()=>{
    ui.growthMode=button.dataset.childGrowthMode;
    ui.growthKey=null;
    renderPreservingScroll();
  });
  $$('[data-child-growth-period]').forEach(button=>button.onclick=()=>{
    ui.growthPeriod=button.dataset.childGrowthPeriod;
    renderPreservingScroll();
  });
  const select=$('#childGrowthMetricSelect');
  if(select)select.onchange=()=>{ui.growthKey=select.value;renderPreservingScroll();};
}

function renderChildActivity() {
  const selected=state.guardianChildren.find(child=>child.id===state.selectedChildId)||state.guardianChildren[0];
  if(!selected){
    app.innerHTML=`<div class="shell">${header()}<section class="dashboard analytics-page child-activity-page">
      ${shareCareHubHtml()}
      <section class="share-care-empty-activity"><span aria-hidden="true">◎</span><h2>연결된 자녀 활동이 없습니다.</h2><p>위에서 자녀의 이메일 아이디를 검색해 요청을 보내거나, 받은 보호자 연결 요청을 확인하세요.</p></section>
    </section></div>`;
    bindShareCareHub();
    return;
  }
  if(!state.childActivity||state.childActivity.child.id!==selected.id){
    app.innerHTML=`<div class="shell">${header()}<section class="dashboard analytics-page child-activity-page">
      ${shareCareHubHtml()}
      ${childActivityTabsHtml(selected.id)}
      <div class="loading-screen child-activity-loading"><span class="loading-orbit"></span><strong>${state.childActivityError?'자녀 활동을 불러오지 못했습니다.':'자녀 활동을 준비하고 있어요'}</strong><p>${state.childActivityError||'인지 역량과 게임 기록을 안전하게 불러오는 중입니다.'}</p>${state.childActivityError?'<button class="secondary-btn" id="retryChildActivity">다시 시도</button>':''}</div>
    </section></div>`;
    bindShareCareHub();
    bindChildActivityTabs();
    if(state.childActivityError)$('#retryChildActivity').onclick=()=>openChildActivity(selected.id);
    return;
  }
  const activity=state.childActivity;
  const analytics=childActivityAnalytics(activity);
  const child=activity.child;
  const ageLabel=(AGE_GROUPS[child.ageGroup]&&AGE_GROUPS[child.ageGroup].label)||'연령 미설정';
  app.innerHTML=`<div class="shell">${header()}<section class="dashboard analytics-page child-activity-page">
    ${shareCareHubHtml()}
    ${childActivityTabsHtml(child.id)}
    <div class="analytics-head child-activity-head">
      <div><span class="step-label">GUARDIAN VIEW · ${escapeHtml(ageLabel)}</span><h1>${escapeHtml(child.name)}님의 활동</h1><p>연결된 자녀 계정의 인지 기초선과 학습 활동을 읽기 전용으로 확인합니다.</p></div>
    </div>
    <div class="metric-grid">
      <article class="metric-card"><span>완료한 활동</span><strong>${analytics.totalGames}<small>회</small></strong><p>지금까지 완료한 게임</p></article>
      <article class="metric-card accuracy-card"><span>평균 정확도</span><strong>${analytics.averageAccuracy}<small>%</small></strong><div class="metric-progress"><i style="width:${analytics.averageAccuracy}%"></i></div></article>
      <article class="metric-card goal-card"><span>현재 스트릭</span><strong>🔥 ${analytics.streak}<small>일</small></strong><p>연속 학습 일수</p></article>
      <article class="metric-card stars-card"><span>누적 별점</span><strong><span class="star-emoji" aria-hidden="true">⭐</span> ${analytics.totalStars}</strong><p>완료한 게임에서 얻은 별</p></article>
    </div>
    ${childAiReportHtml(activity,analytics)}
    <section class="cognitive-profile child-cognitive-profile">
      <div class="cognitive-intro"><span class="step-label">6가지 인지능력</span><h2>${escapeHtml(child.name)}님의 인지 육각형</h2><p>자녀 계정에서 완료한 기초평가 결과입니다.</p><div class="cognitive-total"><strong>${analytics.assessmentCount}</strong><span><b>완료한 기초 평가</b><small>${analytics.assessmentCount} / ${ASSESSMENT_GAMES.length}개 평가 완료</small></span></div></div>
      <div class="cognitive-chart">${cognitiveRadarSvg(analytics.cognitive)}</div>
      <div class="cognitive-bars">${COGNITIVE_DOMAINS.map(domain=>`<div class="cognitive-bar"><div><strong>${domain.label}</strong><span>${analytics.cognitive[domain.id]}<small>점</small></span></div><i style="--domain-color:${domain.color}"><b style="width:${analytics.cognitive[domain.id]}%"></b></i></div>`).join('')}</div>
      <p class="cognitive-note">이 결과는 게임 수행의 기초선이며 의학적 진단이나 일반 인지능력 검사를 대신하지 않습니다.</p>
    </section>
    ${childGrowthJournalHtml(activity)}
    ${childBenchmarkPanelHtml(child)}
    <div class="analytics-grid">
      <article class="analytics-panel activity-panel">
        <div class="panel-heading"><div><span class="step-label">WEEKLY ACTIVITY</span><h2>최근 7일 활동</h2></div></div>
        <div class="activity-chart">${analytics.recentDays.map(day=>`<div class="activity-day"><span>${day.count}</span><div><i style="height:${day.count?Math.max(12,day.count/analytics.maxDaily*100):4}%"></i></div><small>${day.label}</small></div>`).join('')}</div>
      </article>
      <article class="analytics-panel performance-panel">
        <div class="panel-heading"><div><span class="step-label">${escapeHtml(ageLabel)}</span><h2>게임별 정확도</h2></div></div>
        <div class="performance-list">${analytics.gamePerformance.length?analytics.gamePerformance.map(item=>`<div class="performance-item"><div class="performance-title"><span>${item.game.icon}</span><div><strong>${item.game.title}</strong><small>${item.plays}회 플레이 · 최고 ${item.best}</small></div><b>${item.average}%</b></div><div class="performance-track"><i style="width:${item.average}%"></i></div></div>`).join(''):'<div class="empty-history">아직 완료한 게임이 없습니다.</div>'}</div>
      </article>
    </div>
    <article class="analytics-panel recent-panel">
      <div class="panel-heading"><div><span class="step-label">ACTIVITY HISTORY</span><h2>최근 활동 내역</h2></div></div>
      ${analytics.recent.length?`<div class="history-list">${analytics.recent.map(item=>`<div class="history-row"><div class="history-game"><span>${item.game?item.game.icon:'◎'}</span><div><strong>${item.game?item.game.title:item.gameId}</strong><small>${item.date.getFullYear()}.${String(item.date.getMonth()+1).padStart(2,'0')}.${String(item.date.getDate()).padStart(2,'0')}</small></div></div><span class="difficulty-tag">${DIFFICULTIES[item.difficulty]?DIFFICULTIES[item.difficulty].label:item.difficulty}</span><strong>${Number(item.score)||0}%</strong><span class="history-stars">${'⭐'.repeat(Number(item.stars)||0)}${'☆'.repeat(Math.max(0,3-(Number(item.stars)||0)))}</span></div>`).join('')}</div>`:'<div class="empty-history">아직 완료한 게임이 없습니다.</div>'}
    </article>
    ${childAccessLogsHtml(activity)}
  </section></div>`;
  bindShareCareHub();
  bindChildActivityTabs();
  bindChildGrowthJournal(child.id);
  const reportButton=$('#generateChildAiReport');
  if(reportButton)reportButton.onclick=()=>generateChildAiReport(activity,analytics);
  const retryBenchmarks=$('#retryChildBenchmarks');
  if(retryBenchmarks)retryBenchmarks.onclick=()=>{
    state.childBenchmarks=null;
    state.childBenchmarksError=null;
    loadChildPerformanceBenchmarks(child.id,state.childActivityRequestId,true);
    renderPreservingScroll();
  };
}
