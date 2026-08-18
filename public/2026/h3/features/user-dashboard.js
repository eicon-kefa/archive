// Daily Cog feature: user-dashboard
function dashboardDomainForGame(gameId) {
  return COGNITIVE_DOMAINS.find(domain=>(COGNITIVE_DOMAIN_GAMES[domain.id]||[]).includes(gameId))||null;
}

function dashboardSessionAccuracy(session) {
  const hasStoredAccuracy=session&&session.accuracy!==null&&session.accuracy!==undefined&&session.accuracy!=='';
  if(!hasStoredAccuracy&&session&&session.gameId==='board')return null;
  const value=hasStoredAccuracy?Number(session.accuracy):Number(session&&session.score);
  return Number.isFinite(value)?Math.max(0,Math.min(100,value)):null;
}

function dashboardAccuracyIsEstimated(session) {
  return Boolean(session&&session.gameId==='board'&&(session.accuracy===null||session.accuracy===undefined||session.accuracy===''));
}

function dashboardGrowthOptions(mode,sessions) {
  const counts=new Map();
  sessions.forEach(session=>{
    const key=mode==='domain'&&(dashboardDomainForGame(session.gameId)||{}).id||session.gameId;
    if(key)counts.set(key,(counts.get(key)||0)+1);
  });
  if(mode==='domain'){
    return COGNITIVE_DOMAINS.map(domain=>({
      id:domain.id,label:domain.label,icon:'⬡',count:counts.get(domain.id)||0
    }));
  }
  return ALL_GAMES.map(game=>({
    id:game.id,label:game.title,icon:game.icon,count:counts.get(game.id)||0
  }));
}

function dashboardGrowthData(sessions,uiOverride=null) {
  const ui=uiOverride||(state.userDashboardUi||(state.userDashboardUi={growthMode:'game',growthKey:null,growthPeriod:'week'}));
  const mode=ui.growthMode==='domain'?'domain':'game';
  const period=['week','month','year'].includes(ui.growthPeriod)?ui.growthPeriod:'week';
  ui.growthPeriod=period;
  const options=dashboardGrowthOptions(mode,sessions);
  if(!options.some(option=>option.id===ui.growthKey))ui.growthKey=options[0]&&options[0].id||null;
  const selected=options.find(option=>option.id===ui.growthKey)||null;
  const relevant=selected?sessions.filter(session=>{
    if(mode==='game')return session.gameId===selected.id;
    const domain=dashboardDomainForGame(session.gameId);
    return domain&&domain.id===selected.id;
  }):[];
  const today=new Date();today.setHours(0,0,0,0);
  const points=[];
  const pointCount=period==='week'?7:period==='month'?4:12;
  for(let offset=0;offset<pointCount;offset++){
    let start,end,label,rangeLabel;
    if(period==='year'){
      start=new Date(today.getFullYear(),today.getMonth()-(pointCount-1-offset),1);
      end=new Date(start.getFullYear(),start.getMonth()+1,1);
      label=`${start.getFullYear()}.${start.getMonth()+1}`;
    }else if(period==='month'){
      end=new Date(today);end.setDate(end.getDate()+1-(pointCount-1-offset)*7);
      start=new Date(end);start.setDate(start.getDate()-7);
      const lastDay=new Date(end);lastDay.setDate(lastDay.getDate()-1);
      label=`${lastDay.getMonth()+1}/${lastDay.getDate()}`;
      rangeLabel=`${start.getMonth()+1}/${start.getDate()}–${label}`;
    }else{
      start=new Date(today);start.setDate(start.getDate()-(pointCount-1-offset));
      end=new Date(start);end.setDate(end.getDate()+1);
      label=`${start.getMonth()+1}/${start.getDate()}`;
    }
    const played=relevant.filter(item=>{
      const time=new Date(item.completedAt).getTime();
      return time>=start.getTime()&&time<end.getTime();
    });
    const accuracyValues=played.map(dashboardSessionAccuracy).filter(Number.isFinite);
    points.push({
      label,
      rangeLabel:rangeLabel||label,
      average:accuracyValues.length?Math.round(accuracyValues.reduce((sum,value)=>sum+value,0)/accuracyValues.length):null,
      count:played.length
    });
  }
  const recorded=points.filter(point=>point.average!==null);
  const first=recorded[0]||null,last=recorded[recorded.length-1]||null;
  const allAccuracyValues=relevant.map(dashboardSessionAccuracy).filter(Number.isFinite);
  return {
    mode,period,options,selected,points,days:points,weeks:points,
    plays:relevant.length,
    allTimeAverage:allAccuracyValues.length?Math.round(allAccuracyValues.reduce((sum,value)=>sum+value,0)/allAccuracyValues.length):null,
    latestAverage:last&&last.average,
    improvement:first&&last?last.average-first.average:null,
    estimatedCount:relevant.filter(dashboardAccuracyIsEstimated).length
  };
}

function dashboardGrowthChartHtml(growth) {
  const points=growth.points||growth.days||growth.weeks||[];
  const recorded=points.map((point,index)=>point.average===null?null:{...point,index}).filter(Boolean);
  const emptyText=growth.period==='year'?'선택한 항목의 최근 12개월 기록이 없습니다.':growth.period==='month'?'선택한 항목의 최근 4주 기록이 없습니다.':'선택한 항목의 최근 7일 기록이 없습니다.';
  if(!growth.selected||!recorded.length)return `<div class="growth-empty">${emptyText}</div>`;
  const width=growth.period==='year'?1000:820;
  const height=280,left=48,right=24,top=24,bottom=44;
  const chartWidth=width-left-right,chartHeight=height-top-bottom;
  const x=index=>left+(points.length===1?chartWidth/2:index/(points.length-1)*chartWidth);
  const y=value=>top+(100-value)/100*chartHeight;
  const linePaths=[];
  let lineSegment=[];
  points.forEach((point,index)=>{
    if(point.average===null){
      if(lineSegment.length>1)linePaths.push(lineSegment);
      lineSegment=[];
      return;
    }
    lineSegment.push({...point,index});
  });
  if(lineSegment.length>1)linePaths.push(lineSegment);
  const showValueLabels=recorded.length<=12;
  const chartTitle=growth.period==='year'?'최근 12개월 월별 평균 정확도 꺾은선 그래프':growth.period==='month'?'최근 4주 주간 평균 정확도 꺾은선 그래프':'최근 7일 평균 정확도 꺾은선 그래프';
  const tickEvery=1;
  return `<div class="growth-chart-wrap period-${growth.period}"><svg class="growth-chart" viewBox="0 0 ${width} ${height}" role="img" aria-label="${chartTitle}">
    <title>${chartTitle}</title>
    ${[0,25,50,75,100].map(value=>`<g class="growth-gridline"><line x1="${left}" y1="${y(value)}" x2="${width-right}" y2="${y(value)}"></line><text x="${left-9}" y="${y(value)+4}" text-anchor="end">${value}</text></g>`).join('')}
    ${linePaths.map(segment=>`<path class="growth-line" d="${segment.map((point,index)=>`${index?'L':'M'} ${x(point.index)} ${y(point.average)}`).join(' ')}"></path>`).join('')}
    ${recorded.map(point=>`<g class="growth-point"><title>${point.rangeLabel||point.label} · ${point.average}%</title><circle cx="${x(point.index)}" cy="${y(point.average)}" r="5"></circle>${showValueLabels?`<text x="${x(point.index)}" y="${y(point.average)-11}" text-anchor="middle">${point.average}</text>`:''}</g>`).join('')}
    ${points.map((point,index)=>(index%tickEvery===0||index===points.length-1)?`<text class="growth-week-label" x="${x(index)}" y="${height-13}" text-anchor="middle">${point.label}</text>`:'').join('')}
  </svg></div>`;
}

function benchmarkNumber(value) {
  if(value===null||value===undefined||value==='')return null;
  return Number.isFinite(Number(value))?Math.max(0,Math.min(100,Math.round(Number(value)))):null;
}

function benchmarkMetricCard(label,value,suffix,detail,className='') {
  const number=benchmarkNumber(value);
  return `<div class="benchmark-metric ${className}"><span>${label}</span><strong>${number===null?'—':number}<small>${number===null?'':suffix}</small></strong>${detail||''}</div>`;
}

function benchmarkRankDetail(percentile,sampleSize) {
  if(percentile===null)return '';
  if((Number(sampleSize)||0)<2)return '<small><span>비교 표본 부족</span></small>';
  return `<small><span>상위</span> ${Math.max(0,100-percentile)}%</small>`;
}

function getUserAnalytics() {
  const sessions=state.gameSessions.filter(item=>!Number.isNaN(new Date(item.completedAt).getTime()))
    .slice().sort((a,b)=>new Date(b.completedAt)-new Date(a.completedAt));
  const recordedPlays=Object.values(state.scores).reduce((sum,item)=>sum+(Number(item.plays)||0),0);
  const totalGames=Math.max(recordedPlays,sessions.length);
  const accuracyValues=sessions.map(dashboardSessionAccuracy).filter(Number.isFinite);
  const averageAccuracy=accuracyValues.length
    ? Math.round(accuracyValues.reduce((sum,value)=>sum+value,0)/accuracyValues.length)
    : (sessions.length?null:0);
  const totalStars=sessions.reduce((sum,item)=>sum+(Number(item.stars)||0),0);
  const todayStats=getStats();
  const goalRate=Math.min(100,Math.round(todayStats.todayStars/DAILY_STAR_GOAL*100));
  const dayKey=date=>`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
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
  const providedRecommendations=homeGameRecommendations();
  const gamePerformance=providedRecommendations.map(recommendation=>{
    const game=recommendation.game;
    const played=sessions.filter(item=>item.gameId===game.id);
    const playedAccuracy=played.map(dashboardSessionAccuracy).filter(Number.isFinite);
    const scoreState=state.scores[game.id]||{};
    return {
      game,
      recommendation,
      plays:Number(scoreState.plays)||played.length,
      average:playedAccuracy.length?Math.round(playedAccuracy.reduce((sum,value)=>sum+value,0)/playedAccuracy.length):null,
      best:Number(scoreState.best)||0
    };
  });
  const recent=sessions.slice(0,6).map(item=>({
    ...item,
    game:ALL_GAMES.find(game=>game.id===item.gameId),
    date:new Date(item.completedAt)
  }));
  return {totalGames,averageAccuracy,totalStars,goalRate,todayStats,recentDays,maxDaily,gamePerformance,recent,growth:dashboardGrowthData(sessions),estimatedAccuracyCount:sessions.filter(dashboardAccuracyIsEstimated).length};
}

function renderUserDashboard() {
  const analytics=getUserAnalytics(),growth=analytics.growth;
  app.innerHTML=`<div class="shell">${header()}<section class="dashboard analytics-page">
    <div class="analytics-head">
      <div><span class="step-label">${escapeHtml(state.user.name)} · MY DAILY COG</span><h1>사용자 대시보드</h1><p>게임 기록을 바탕으로 정확도와 꾸준한 활동을 확인해요.</p></div>
      <button class="secondary-btn" data-go="dashboard">오늘의 루틴 보기</button>
    </div>
    <div class="metric-grid">
      <article class="metric-card"><span>전체 게임</span><strong>${analytics.totalGames}<small>회</small></strong><p>지금까지 완료한 활동</p></article>
      <article class="metric-card accuracy-card"><span>평균 정확도</span><strong>${analytics.averageAccuracy??'—'}<small>${analytics.averageAccuracy===null?'':'%'}</small></strong><div class="metric-progress"><i style="width:${analytics.averageAccuracy||0}%"></i></div></article>
      <article class="metric-card goal-card"><span>일일 목표 달성률</span><strong>${analytics.goalRate}<small>%</small></strong><p>오늘 별 ${analytics.todayStats.todayStars} / ${DAILY_STAR_GOAL}</p></article>
      <article class="metric-card stars-card"><span>누적 별점</span><strong><span class="star-emoji" aria-hidden="true">⭐</span> ${analytics.totalStars}</strong><p>완료한 게임에서 모은 별</p></article>
    </div>
    <div class="analytics-grid">
      <article class="analytics-panel activity-panel">
        <div class="panel-heading"><div><span class="step-label">WEEKLY ACTIVITY</span><h2>최근 7일 활동</h2></div><strong>🔥 ${analytics.todayStats.streak}<small>일째</small></strong></div>
        <div class="activity-chart">${analytics.recentDays.map(day=>`<div class="activity-day"><span>${day.count}</span><div><i style="height:${day.count?Math.max(12,day.count/analytics.maxDaily*100):4}%"></i></div><small>${day.label}</small></div>`).join('')}</div>
      </article>
      <article class="analytics-panel performance-panel">
        <div class="panel-heading"><div><span class="step-label">현재 제공된 게임</span><h2>맞춤 게임별 성과</h2></div></div>
        <div class="performance-list">${analytics.gamePerformance.map(item=>`<div class="performance-item"><div class="performance-title"><span>${item.game.icon}</span><div><strong>${item.game.title}</strong><small>${item.plays}회 플레이 · 최고 ${item.best}</small></div><b>${item.average===null?'—':`${item.average}%`}</b></div><div class="performance-track"><i style="width:${item.average||0}%"></i></div></div>`).join('')}</div>
      </article>
    </div>
    <article class="analytics-panel growth-panel">
      <div class="panel-heading growth-heading"><div><span class="step-label">GROWTH JOURNAL</span><h2>나의 성장 일지</h2><p>게임 종류 또는 인지능력별 평균 정확도의 변화를 확인해요.</p></div><div class="growth-controls"><div class="growth-mode-tabs" role="group" aria-label="성장 일지 분류"><button class="${growth.mode==='game'?'active':''}" data-growth-mode="game">게임별</button><button class="${growth.mode==='domain'?'active':''}" data-growth-mode="domain">인지능력별</button></div><div class="growth-period-tabs" role="group" aria-label="그래프 기간"><button class="${growth.period==='week'?'active':''}" data-growth-period="week">주간</button><button class="${growth.period==='month'?'active':''}" data-growth-period="month">월간</button><button class="${growth.period==='year'?'active':''}" data-growth-period="year">연간</button></div></div></div>
      ${growth.options.length?`<div class="growth-toolbar"><label><span data-i18n-key="확인할 항목">확인할 항목</span><select id="growthMetricSelect">${growth.options.map(option=>`<option value="${escapeHtml(option.id)}" data-i18n-key="${escapeHtml(option.label)}" ${growth.selected&&option.id===growth.selected.id?'selected':''}>${escapeHtml(option.label)}</option>`).join('')}</select></label><div class="growth-stats"><div><span>전체 기록</span><strong>${growth.plays}<small>회</small></strong></div><div><span>전체 평균</span><strong>${growth.allTimeAverage??'—'}<small>${growth.allTimeAverage===null?'':'%'}</small></strong></div><div><span>${growth.period==='year'?'최근 학습월 평균':growth.period==='month'?'최근 주간 평균':'최근 학습일 평균'}</span><strong>${growth.latestAverage??'—'}<small>${growth.latestAverage===null?'':'%'}</small></strong></div><div class="${growth.improvement>0?'positive':growth.improvement<0?'negative':''}"><span>${growth.period==='year'?'첫 기록월 대비':growth.period==='month'?'첫 주 대비':'첫 기록일 대비'}</span><strong>${growth.improvement===null?'—':`${growth.improvement>0?'+':''}${growth.improvement}`}<small>${growth.improvement===null?'':'점'}</small></strong></div></div></div>`:''}
      ${dashboardGrowthChartHtml(growth)}
      <p class="growth-note">주간 그래프는 날짜별 평균을, 월간 그래프는 7일간 평균을, 연간 그래프는 월별 평균을 표시합니다. 각 점은 집계 기간의 마지막 날짜 위에 표시되며 기록이 한 시점뿐이면 점으로만 나타납니다.${growth.estimatedCount?' 실제 정확도가 없는 이전 기억 짝 맞추기 기록은 정확도 평균에서 제외됩니다.':''}</p>
    </article>
    <article class="analytics-panel recent-panel">
      <div class="panel-heading"><div><span class="step-label">HISTORY</span><h2>최근 게임 기록</h2></div></div>
      ${analytics.recent.length?`<div class="history-list">${analytics.recent.map(item=>{const accuracy=dashboardSessionAccuracy(item);return `<div class="history-row"><div class="history-game"><span>${item.game?item.game.icon:'◎'}</span><div><strong>${item.game?item.game.title:item.gameId}</strong><small>${item.date.getFullYear()}.${String(item.date.getMonth()+1).padStart(2,'0')}.${String(item.date.getDate()).padStart(2,'0')}</small></div></div><span class="difficulty-tag">${DIFFICULTIES[item.difficulty]?DIFFICULTIES[item.difficulty].label:item.difficulty}</span><strong>${Number.isFinite(accuracy)?`${Math.round(accuracy)}%`:'—'}</strong><span class="history-stars">${'⭐'.repeat(Number(item.stars)||0)}${'☆'.repeat(Math.max(0,3-(Number(item.stars)||0)))}</span></div>`;}).join('')}</div>`:'<div class="empty-history">아직 완료한 게임이 없습니다.</div>'}
    </article>
  </section></div>`;
  $$('[data-growth-mode]').forEach(button=>button.onclick=()=>{
    state.userDashboardUi.growthMode=button.dataset.growthMode;
    state.userDashboardUi.growthKey=null;
    renderPreservingScroll();
  });
  $$('[data-growth-period]').forEach(button=>button.onclick=()=>{
    state.userDashboardUi.growthPeriod=button.dataset.growthPeriod;
    renderPreservingScroll();
  });
  const select=$('#growthMetricSelect');
  if(select)select.onchange=()=>{state.userDashboardUi.growthKey=select.value;renderPreservingScroll();};
}
