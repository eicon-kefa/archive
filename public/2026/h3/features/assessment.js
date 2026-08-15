// Daily Cog feature: assessment
function getStats() {
  const relevant = Object.values(state.scores).filter(Boolean);
  const sessions = relevant.reduce((n,s)=>n+s.plays,0);
  const avg = relevant.length ? Math.round(relevant.reduce((n,s)=>n+s.best,0)/relevant.length) : 0;
  const now=new Date();
  const todaySessions=state.gameSessions.filter(item=>{
    const date=new Date(item.completedAt);
    return date.getFullYear()===now.getFullYear()&&date.getMonth()===now.getMonth()&&date.getDate()===now.getDate();
  });
  const todayStars=todaySessions.reduce((sum,item)=>sum+(Number(item.stars)||0),0);
  const attendanceDays=new Set(state.gameSessions.map(item=>{
    const date=new Date(item.completedAt);
    if(Number.isNaN(date.getTime()))return null;
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  }).filter(Boolean));
  const cursor=new Date();cursor.setHours(0,0,0,0);
  const dayKey=date=>`${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  if(!attendanceDays.has(dayKey(cursor)))cursor.setDate(cursor.getDate()-1);
  let streak=0;
  while(attendanceDays.has(dayKey(cursor))){streak++;cursor.setDate(cursor.getDate()-1);}
  return {sessions, avg, todayStars, todayCount:todaySessions.length, streak};
}

function assessmentCompletedCount() {
  return ASSESSMENT_GAMES.filter(game=>Number.isFinite(Number(state.assessment.scores[game.id]))).length;
}

function assessmentIsComplete() {
  return assessmentCompletedCount()===ASSESSMENT_GAMES.length
    && Boolean(state.assessment.completedAt)
    && !Number.isNaN(new Date(state.assessment.completedAt).getTime());
}

function dateAfterAssessmentInterval(value) {
  const source=value instanceof Date?new Date(value.getTime()):new Date(value);
  if(Number.isNaN(source.getTime()))return null;
  const result=new Date(source.getTime());
  result.setDate(result.getDate()+ASSESSMENT_INTERVAL_WEEKS*7);
  return result;
}

function assessmentNextDueAt() {
  return assessmentIsComplete()?dateAfterAssessmentInterval(state.assessment.completedAt):null;
}

function assessmentAccessState(reference=new Date()) {
  const complete=assessmentIsComplete();
  const dueAt=complete?assessmentNextDueAt():null;
  const now=reference instanceof Date?reference:new Date(reference);
  const dueByTime=complete&&(
    !dueAt
    ||Number.isNaN(now.getTime())
    ||now.getTime()>=dueAt.getTime()
  );
  const required=Boolean(state.user)&&!state.isAdmin&&(!complete||dueByTime);
  return {
    complete,
    dueAt,
    dueByTime,
    required,
    canStart:Boolean(state.user)&&(state.isAdmin||!complete||dueByTime)
  };
}

function assessmentIsDue(reference=new Date()) {
  return assessmentAccessState(reference).required;
}

function assessmentDateLabel(date) {
  if(!date)return '';
  const locale=state.settings.language==='ko'?'ko-KR':state.settings.language==='zh'?'zh-CN':'en-US';
  return new Intl.DateTimeFormat(locale,{year:'numeric',month:'long',day:'numeric'}).format(date);
}

function assessmentGameIsOpen() {
  return state.screen==='game'
    && Boolean(state.assessment.active)
    && Boolean(state.currentGame)
    && ASSESSMENT_GAME_IDS.includes(state.currentGame.id);
}

function enforceAssessmentGate() {
  if(!assessmentIsDue())return false;
  if(['loading','auth','birthdate','assessment','childActivity'].includes(state.screen)||assessmentGameIsOpen())return false;
  clearSessionTimers();
  state.currentGame=null;
  state.session=null;
  state.screen='assessment';
  return true;
}

function scheduleAssessmentDueRefresh() {
  clearTimeout(assessmentDueTimer);
  assessmentDueTimer=null;
  if(!state.user||state.isAdmin)return;
  const dueAt=assessmentNextDueAt();
  if(!dueAt||assessmentIsDue())return;
  const delay=dueAt.getTime()-Date.now();
  assessmentDueTimer=setTimeout(()=>{
    if(assessmentIsDue()){
      if(state.screen==='childActivity'){
        state.assessment.active=false;
        toast('새로운 8주 기초 평가가 열렸습니다. 공유돌봄은 계속 이용할 수 있으며 게임은 평가 완료 후 시작할 수 있습니다.');
        return;
      }
      clearSessionTimers();
      state.currentGame=null;
      state.session=null;
      state.assessment.active=false;
      state.screen='assessment';
      render();
      toast('새로운 8주 기초 평가가 열렸습니다. 평가를 완료해야 게임을 시작할 수 있습니다.');
    }else{
      scheduleAssessmentDueRefresh();
    }
  },Math.max(1000,Math.min(delay,2147483000)));
}

function calculateCognitiveDomains(scores=state.assessment.scores) {
  const totals=Object.fromEntries(COGNITIVE_DOMAINS.map(domain=>[domain.id,{value:0,weight:0}]));
  ASSESSMENT_GAMES.forEach(game=>{
    const score=Number(scores[game.id]);
    if(!Number.isFinite(score))return;
    Object.entries(ASSESSMENT_WEIGHTS[game.id]||{}).forEach(([domain,weight])=>{
      totals[domain].value+=score*weight;
      totals[domain].weight+=weight;
    });
  });
  return Object.fromEntries(COGNITIVE_DOMAINS.map(domain=>{
    const item=totals[domain.id];
    return [domain.id,item.weight?Math.round(item.value/item.weight):0];
  }));
}

function cognitiveRadarSvg(scores) {
  const cx=180,cy=145,radius=94;
  const point=(index,ratio=1)=>{
    const angle=-Math.PI/2+index*Math.PI/3;
    return [cx+Math.cos(angle)*radius*ratio,cy+Math.sin(angle)*radius*ratio];
  };
  const polygon=ratio=>COGNITIVE_DOMAINS.map((_,index)=>point(index,ratio).map(value=>value.toFixed(1)).join(',')).join(' ');
  const dataPoints=COGNITIVE_DOMAINS.map((domain,index)=>point(index,(scores[domain.id]||0)/100).map(value=>value.toFixed(1)).join(',')).join(' ');
  const labelPositions=[
    [180,24,'middle'],[300,88,'start'],[300,211,'start'],
    [180,278,'middle'],[60,211,'end'],[60,88,'end']
  ];
  return `<svg class="cognitive-radar" viewBox="0 0 360 290" role="img" aria-label="여섯 가지 인지능력 육각형 차트">
    ${[.2,.4,.6,.8,1].map(ratio=>`<polygon class="radar-grid" points="${polygon(ratio)}"></polygon>`).join('')}
    ${COGNITIVE_DOMAINS.map((_,index)=>{const [x,y]=point(index);return `<line class="radar-axis" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}"></line>`;}).join('')}
    <polygon class="radar-score" points="${dataPoints}"></polygon>
    ${COGNITIVE_DOMAINS.map((domain,index)=>{const [x,y,anchor]=labelPositions[index];return `<text x="${x}" y="${y}" text-anchor="${anchor}">${domain.label}</text>`;}).join('')}
  </svg>`;
}

async function persistAssessmentProgress(gameId=null) {
  if(!SUPABASE_ENABLED){
    persistCurrentLocalAccount();
    return;
  }
  const now=new Date().toISOString();
  const rows=[{
    user_id:state.user.id,
    game_id:'assessment:meta',
    best_score:assessmentCompletedCount(),
    play_count:state.assessment.attemptId,
    last_played:now
  }];
  if(gameId){
    rows.push({
      user_id:state.user.id,
      game_id:`assessment:${gameId}`,
      best_score:state.assessment.scores[gameId],
      play_count:state.assessment.attemptId,
      last_played:now
    });
  }
  const result=await db.from('game_scores').upsert(rows,{onConflict:'user_id,game_id'});
  if(result.error){
    console.error(result.error);
    toast('기초 평가 결과를 저장하지 못했습니다.');
  }
}

function beginAssessmentFlow(forceNew=false,preferredGameId=null) {
  const completed=assessmentCompletedCount();
  const access=assessmentAccessState();
  if(!access.canStart){
    toast(`다음 기초 평가는 ${assessmentDateLabel(access.dueAt)}부터 진행할 수 있습니다.`);
    return;
  }
  if(forceNew||completed===ASSESSMENT_GAMES.length||!state.assessment.attemptId){
    state.assessment={
      scores:{},
      attemptId:Math.max(0,state.assessment.attemptId)+1,
      startedAt:new Date().toISOString(),
      completedAt:null,
      active:true
    };
    persistAssessmentProgress();
  }else{
    state.assessment.active=true;
  }
  const preferred=ASSESSMENT_GAMES.find(game=>game.id===preferredGameId);
  const next=(preferred&&!Number.isFinite(Number(state.assessment.scores[preferred.id]))?preferred:null)
    ||ASSESSMENT_GAMES.find(game=>!Number.isFinite(Number(state.assessment.scores[game.id])))
    ||ASSESSMENT_GAMES[0];
  state.currentGame=next;
  state.screen='game';
  if(!SUPABASE_ENABLED)persistCurrentLocalAccount();
  render();
}

function renderAssessment() {
  const completed=assessmentCompletedCount();
  const isComplete=completed===ASSESSMENT_GAMES.length;
  const access=assessmentAccessState();
  const required=access.required;
  const recurringRenewal=access.dueByTime&&isComplete&&Boolean(state.assessment.completedAt);
  const recurringCycle=recurringRenewal||state.assessment.attemptId>1;
  const displayedCompleted=recurringRenewal?0:completed;
  const nextDue=access.dueAt;
  const canStart=access.canStart;
  const stepLabel=recurringCycle?'STEP 02 · 8주 기초 평가':'STEP 02 · 최초 기초 평가';
  const startLabel=recurringRenewal
    ? '8주 기초 평가 시작하기'
    : isComplete
      ? (state.isAdmin?'다시 평가하기':`다음 평가 ${assessmentDateLabel(nextDue)}`)
      : completed?'기초 평가 이어하기':'기초 평가 시작하기';
  app.innerHTML=`<div class="shell">${header()}<section class="assessment-page">
    ${required&&!state.isAdmin
      ? '<div class="assessment-lock-notice"><strong>🔒 기초 평가를 먼저 완료해 주세요.</strong><span>평가를 마치기 전에는 일반 게임을 이용할 수 없으며 이 화면으로 돌아옵니다.</span></div>'
      : '<button class="back-btn" data-go="dashboard">← 홈으로 돌아가기</button>'}
    <div class="assessment-hero">
      <span class="step-label">${stepLabel}</span>
      <h1>12개 게임으로<br>나의 인지 프로필을 만들어요.</h1>
      <p>${recurringCycle
        ? (recurringRenewal
          ? '마지막 평가 후 8주가 지났습니다. 새 평가를 완료하면 일반 게임이 다시 열리고 인지 육각형도 최신 결과로 갱신됩니다.'
          : '이번 8주 평가를 이어서 완료해 주세요. 모든 평가를 마치면 일반 게임이 다시 열리고 인지 육각형도 최신 결과로 갱신됩니다.')
        : '모든 게임은 쉬움 난이도로 진행됩니다. 원하는 평가 게임부터 자유롭게 선택할 수 있으며, 결과는 여섯 가지 인지능력의 육각형 대시보드로 정리됩니다.'}</p>
      <div class="assessment-progress-copy"><strong>${displayedCompleted}</strong><span>/ ${ASSESSMENT_GAMES.length}</span><b>완료한 기초 평가</b></div>
    </div>
    <div class="assessment-grid">${ASSESSMENT_GAMES.map((game,index)=>{
      const score=recurringRenewal?undefined:state.assessment.scores[game.id];
      const done=Number.isFinite(Number(score));
      const startsNewCycle=recurringRenewal||(isComplete&&canStart);
      const selectable=canStart&&(!done||startsNewCycle);
      return `<button type="button" class="assessment-card ${done?'complete':''} ${selectable?'available':''}" data-assessment-game="${game.id}" ${selectable?'':'disabled'} aria-label="${game.title} ${done?'완료':'선택'}">
        <span class="assessment-number">${String(index+1).padStart(2,'0')}</span>
        <span class="assessment-icon">${game.icon}</span>
        <span class="assessment-card-copy"><strong>${game.title}</strong><small>쉬움 · ${done?`완료 · ${score}점`:'선택 가능'}</small></span>
        ${done?'<span class="assessment-check">✓</span>':''}
      </button>`;
    }).join('')}</div>
    <div class="assessment-footer">
      <p>평가 결과는 의학적 진단이 아니라 현재 게임 수행의 기초선입니다.</p>
      <button class="primary-btn" id="startAssessment" ${canStart?'':'disabled'}>${startLabel}${canStart?' →':''}</button>
    </div>
  </section></div>`;
  if(canStart)$('#startAssessment').onclick=()=>beginAssessmentFlow(isComplete);
  $$('[data-assessment-game]',app).forEach(card=>card.onclick=()=>{
    const startsNewCycle=recurringRenewal||(isComplete&&canStart);
    beginAssessmentFlow(startsNewCycle,card.dataset.assessmentGame);
  });
}

function renderDashboard() {
  const ageGroup=currentUserAgeGroup();
  if(!ageGroup||!AGE_GROUPS[ageGroup]){
    state.screen='birthdate';
    render();
    return;
  }
  state.age=ageGroup;
  state.selectedAge=ageGroup;
  const age = AGE_GROUPS[ageGroup], recommendations=homeGameRecommendations(), games=recommendations.map(item=>item.game), stats=getStats();
  const today = new Intl.DateTimeFormat('ko-KR',{month:'long',day:'numeric',weekday:'long'}).format(new Date());
  const fed=isDogFed();
  const hungry=isDogHungry();
  const dogMood = fed
    ? {key:'celebrate', image:'assets/dog/daily-cog-dog-celebrate.png', message:'간식을 먹고 배부르고 정말 행복해요!'}
    : hungry
    ? {key:'hungry', image:'assets/dog/daily-cog-dog-hungry.png', message:'배가 고파요. 간식을 기다리고 있어요!'}
    : stats.todayCount===0
    ? {key:'calm', image:'assets/dog/daily-cog-dog-calm.png', message:'첫 학습을 기다리고 있어요!'}
    : stats.todayCount===1
      ? {key:'happy', image:'assets/dog/daily-cog-dog-happy.png', message:'한 번 학습해서 기분이 좋아졌어요!'}
      : {key:'celebrate', image:'assets/dog/daily-cog-dog-celebrate.png', message:'함께 학습해서 정말 행복해요!'};
  app.innerHTML = `<div class="shell">${header()}<section class="dashboard">
    <div class="dash-head">
      <div class="dash-intro"><span class="step-label">${age.label} 맞춤 루틴</span><h1>${escapeHtml(state.user.name)}님의 오늘,<br>가볍게 깨워볼까요?</h1>
        <button class="smart-note-launch" data-open-smart-note>
          <span class="smart-note-launch-icon" aria-hidden="true">✎</span>
          <span><strong>스마트 노트</strong><small>생각과 할 일을 적고 어디서든 확인하세요.</small></span>
          <b>${state.smartNote.content?'작성한 노트 열기':'노트 작성하기'} →</b>
        </button>
      </div>
      <div class="home-companion mood-${dogMood.key}">
        <span class="date-pill">${today}</span>
        <div class="companion-card" aria-live="polite">
          <div class="companion-copy"><span class="step-label">오늘의 학습 친구</span><strong>${dogMood.message}</strong><small>오늘 완료한 학습 ${stats.todayCount}회</small></div>
          ${dogCharacterHtml(dogMood.image,'home-dog')}
        </div>
        ${dogGrowthHtml(true)}
      </div>
    </div>
    <div class="summary-grid">
      <div class="summary-card feature"><span class="summary-label">오늘의 루틴</span><strong>하루 10분</strong><p>세 게임 중 하나를 골라 부담 없이 시작하세요.</p></div>
      <div class="summary-card star-summary"><span class="summary-label">오늘의 별점</span><div class="daily-star-score"><strong><span class="summary-star star-emoji" aria-hidden="true">⭐</span> ${stats.todayStars}<small>/ ${DAILY_STAR_GOAL}</small></strong>${stats.todayStars>=DAILY_STAR_GOAL?'<span class="goal-achieved">✓ 목표 달성!</span>':''}</div><p>오늘 완료한 게임 ${stats.todayCount}개</p></div>
      <div class="summary-card streak-summary"><span class="summary-label">연속 출석</span><strong><span class="streak-fire" aria-hidden="true">🔥</span> ${stats.streak}<small>일째</small></strong><p>하루 세 게임으로 이어가요</p></div>
      <div class="summary-card"><span class="summary-label">완료한 세션</span><strong>${stats.sessions}</strong><p>${SUPABASE_ENABLED ? '내 계정에 저장된 기록' : '이 브라우저에 저장된 기록'}</p></div>
      <div class="summary-card"><span class="summary-label">평균 최고점수</span><strong>${stats.avg}<small>점</small></strong><p>꾸준함이 가장 중요해요</p></div>
    </div>
    ${cognitiveProfileHtml()}
    <div class="section-title"><h2>오늘의 맞춤 추천 게임</h2><span class="lead">낮은 인지영역 2개 · 연령 맞춤 1개</span></div>
    <div class="game-grid">${recommendations.map((recommendation,i)=>{
      const g=recommendation.game;
      const best=(state.scores[g.id] && state.scores[g.id].best)||0;
      const reason=recommendation.kind==='weak'?`${recommendation.domain.label} 보완 추천`:`${age.label} 연령 맞춤`;
      return `<button class="game-card" data-game="${g.id}"><div class="game-visual"><span class="game-no">활동 0${i+1}</span>${best?`<span class="best-badge">최고 ${best}</span>`:''}<span class="visual-glyph">${g.icon}</span></div><div class="game-body"><span class="recommendation-reason">${reason}</span><span class="game-meta">${g.original}</span><h3>${g.title}</h3><p>${g.desc}</p><div class="card-foot"><span>${g.target}</span><span class="play-arrow">→</span></div></div></button>`;
    }).join('')}</div>
    <div class="disclaimer">Daily Cog는 일상적인 인지 활동을 돕는 웰니스 도구이며 의료기기나 진단·치료 서비스가 아닙니다. 인지 변화가 걱정되면 의료 전문가와 상담해 주세요. 소개된 연구 결과가 이 간이 게임의 동일한 효과를 보장하지는 않습니다.</div>
  </section></div>`;
  $$('[data-game]').forEach(b => b.onclick = () => { state.currentGame=games.find(g=>g.id===b.dataset.game); state.screen='game'; render(); });
  $('[data-open-smart-note]').onclick=()=>openSmartNote();
  $('[data-assessment]').onclick=()=>{state.screen='assessment';render();};
}

function cognitiveProfileHtml() {
  const completed=assessmentCompletedCount();
  const scores=calculateCognitiveDomains();
  const overall=Math.round(COGNITIVE_DOMAINS.reduce((sum,domain)=>sum+scores[domain.id],0)/COGNITIVE_DOMAINS.length);
  const access=assessmentAccessState();
  const buttonLabel=completed===ASSESSMENT_GAMES.length
    ? (access.canStart?'8주 기초 평가 시작하기':`다음 평가 ${assessmentDateLabel(access.dueAt)}`)
    : completed?'기초 평가 이어하기':'기초 평가 시작하기';
  return `<section class="cognitive-profile">
    <div class="cognitive-intro">
      <span class="step-label">6가지 인지능력 기초선</span>
      <h2>나의 인지 육각형</h2>
      <p>12개 기초 평가를 완료하면 여섯 영역의 기준선을 확인할 수 있습니다.</p>
      <div class="cognitive-total"><strong>${overall}</strong><span><b>현재 종합 수행점수</b><small>${completed} / ${ASSESSMENT_GAMES.length}개 평가 완료</small></span></div>
      <button class="primary-btn" data-assessment ${access.canStart?'':'disabled'}>${buttonLabel}${access.canStart?' →':''}</button>
      ${access.complete&&!access.canStart?`<small class="assessment-next-note">다음 기초 평가는 ${assessmentDateLabel(access.dueAt)}부터 진행할 수 있습니다.</small>`:''}
    </div>
    <div class="cognitive-chart">${cognitiveRadarSvg(scores)}</div>
    <div class="cognitive-bars">${COGNITIVE_DOMAINS.map(domain=>`<div class="cognitive-bar">
      <div><strong>${domain.label}</strong><span>${scores[domain.id]}<small>점</small></span></div>
      <i style="--domain-color:${domain.color}"><b style="width:${scores[domain.id]}%"></b></i>
    </div>`).join('')}</div>
    <p class="cognitive-note">이 결과는 게임 수행의 기초선이며 의학적 진단이나 일반 인지능력 검사를 대신하지 않습니다.</p>
  </section>`;
}
