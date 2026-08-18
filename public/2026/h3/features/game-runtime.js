// Daily Cog feature: game-runtime
function renderGame() {
  const g=state.currentGame;
  if(!g){
    state.screen='dashboard';
    render();
    return;
  }
  const requestedAssessmentMode=Boolean(state.assessment.active&&ASSESSMENT_GAME_IDS.includes(g.id));
  const assessmentAccess=assessmentAccessState();
  if(requestedAssessmentMode&&!assessmentAccess.canStart){
    clearSessionTimers();
    state.assessment.active=false;
    state.currentGame=null;
    state.session=null;
    state.screen='dashboard';
    render();
    toast(`다음 기초 평가는 ${assessmentDateLabel(assessmentAccess.dueAt)}부터 진행할 수 있습니다.`);
    return;
  }
  const assessmentMode=requestedAssessmentMode&&assessmentAccess.canStart;
  if(!assessmentMode&&assessmentIsDue()){
    clearSessionTimers();
    state.currentGame=null;
    state.session=null;
    state.screen='assessment';
    render();
    toast('기초 평가를 완료해야 일반 게임을 시작할 수 있습니다.');
    return;
  }
  const ageGroup=currentUserAgeGroup();
  if(!assessmentMode&&(!ageGroup||(g.age!==ageGroup&&!isCurrentHomeRecommendation(g.id)))){
    clearSessionTimers();
    state.currentGame=null;
    state.session=null;
    state.screen='dashboard';
    render();
    toast('현재 나이에 맞는 게임으로 변경했습니다.');
    return;
  }
  const difficulty = assessmentMode ? 'easy' : (DIFFICULTIES[state.difficulties[g.id]] ? state.difficulties[g.id] : 'medium');
  const config = DIFFICULTIES[difficulty];
  state.session = { round:0, total:config.rounds, correct:0, started:false, locked:false, finished:false, difficulty, limit:config.seconds, data:{}, queuedTimers:[], assessmentMode };
  const assessmentIndex=ASSESSMENT_GAMES.findIndex(game=>game.id===g.id);
  app.innerHTML = `<div class="shell">${header()}<section class="game-shell">
    <button class="back-btn" id="backDash">← ${assessmentMode?'기초 평가 목록으로':'오늘의 루틴으로'}</button>
    <div class="game-layout"><article class="play-panel">
      <div class="game-top"><div><span class="step-label">${assessmentMode?`기초 평가 ${assessmentIndex+1} / ${ASSESSMENT_GAMES.length}`:`${AGE_GROUPS[ageGroup].label} · ${g.target}`}</span><h1>${g.title}</h1></div><div class="game-status"><div class="status-pill"><span>라운드</span><b id="roundLabel">준비</b></div><div class="status-pill time-indicator"><span>남은 시간</span><b id="timeLeft">${formatTime(config.seconds)}</b></div></div></div>
      <div class="progress"><span id="progressBar"></span></div><div class="game-stage" id="stage"></div>
    </article><aside class="info-panel">
      <h3>이 활동은요</h3><p class="game-description">${g.desc}</p>
      <div class="info-block"><strong>${assessmentMode?'기초 평가 기록':'현재 기록'}</strong><div class="score-row"><div class="score-box"><span>점수</span><b id="liveScore">0</b></div><div class="score-box"><span>${assessmentMode?'진행':'최고'}</span><b>${assessmentMode?`${assessmentIndex+1}/${ASSESSMENT_GAMES.length}`:(state.scores[g.id] && state.scores[g.id].best)||0}</b></div></div></div>
      <div class="info-block"><strong>${assessmentMode?'평가 방식':'별점 계산'}</strong><p>${assessmentMode?(g.id==='board'?'기억 짝 맞추기는 모든 짝을 찾았을 때 남은 시간이 50% 이상이면 100점이며, 그보다 적으면 남은 시간에 비례해 점수가 계산됩니다.':'모든 평가는 같은 쉬움 난이도로 진행되며, 정확도를 0~100점으로 환산합니다.'):g.id==='board'?'모든 짝을 찾았을 때 남은 시간이 50% 이상이면 100점과 별 3개를 얻어요. 25% 이상이면 별 2개, 그보다 적으면 별 1개이며 점수는 남은 시간에 비례해 계산됩니다.':'정확도 80%와 남은 시간 20%를 함께 반영해요.'}</p></div>
      <div class="info-block"><strong>연구 배경</strong>${researchBackgroundHtml(g)}</div>
      <div class="info-block"><p>정확한 의학적 검사 대신, 즐겁고 짧은 인지 자극을 위한 활동입니다.</p></div>
    </aside></div>
  </section></div>`;
  $('#backDash').onclick=()=>{
    clearSessionTimers();
    if(assessmentMode)state.assessment.active=false;
    state.screen=assessmentMode?'assessment':'dashboard';
    render();
  };
  if(assessmentMode)showAssessmentInstructions();
  else showInstructions();
}

function showAssessmentInstructions() {
  const g=state.currentGame,s=state.session,config=DIFFICULTIES.easy;
  const tip=typeof g.instruction==='function'?g.instruction({difficulty:'easy',config}):'집중해서 문제를 해결해 보세요.';
  const goal=g.type==='memory'?`${config.memoryPairs}개의 짝`:`${config.rounds}라운드`;
  $('#stage').innerHTML=`<div class="stage-inner"><div class="stimulus difficulty-icon">${g.icon}</div><span class="assessment-mode-badge">쉬움 · 기초 평가</span><h2>평가를 시작할까요?</h2><p class="game-start-description">${tip}</p><div class="limit-summary"><span>⏱ 제한시간 ${formatTime(config.seconds)}</span><span>◎ 목표 ${goal}</span></div><button class="primary-btn" id="startGame" style="max-width:260px">이 평가 시작하기 →</button></div>`;
  $('#startGame').onclick=beginTimedGame;
}

function showInstructions() {
  const g=state.currentGame;
  const s=state.session, config=DIFFICULTIES[s.difficulty];
  const tip=typeof g.instruction==='function'?g.instruction({difficulty:s.difficulty,config}):'집중해서 문제를 해결해 보세요.';
  const goal = g.type==='memory' ? `${config.memoryPairs}개의 짝` : `${config.rounds}라운드`;
  $('#stage').innerHTML=`<div class="stage-inner"><div class="stimulus difficulty-icon">${g.icon}</div><h2 class="game-difficulty-title">난이도를 선택하세요</h2><p class="game-start-description">${tip}</p><div class="difficulty-options">${Object.entries(DIFFICULTIES).map(([key,item])=>`<button class="difficulty-btn ${s.difficulty===key?'active':''}" data-difficulty="${key}"><span>${item.label}</span><small>${formatTime(item.seconds)} · ${g.type==='memory'?item.memoryPairs+'개의 짝':item.rounds+'라운드'}</small></button>`).join('')}</div><div class="limit-summary"><span>⏱ 제한시간 ${formatTime(config.seconds)}</span><span>◎ 목표 ${goal}</span></div><button class="primary-btn" id="startGame" style="max-width:260px">게임 시작하기 →</button></div>`;
  $$('[data-difficulty]', $('#stage')).forEach(button=>button.onclick=()=>{
    s.difficulty=button.dataset.difficulty; const next=DIFFICULTIES[s.difficulty];s.total=next.rounds;s.limit=next.seconds;
    state.difficulties[g.id]=s.difficulty;
    if(SUPABASE_ENABLED) localStorage.setItem('dcDifficulties',JSON.stringify(state.difficulties));
    else persistCurrentLocalAccount();
    $('#timeLeft').textContent=formatTime(next.seconds);showInstructions();
  });
  $('#startGame').onclick=beginTimedGame;
}

function formatTime(seconds){ const value=Math.max(0,Math.ceil(seconds));return `${String(Math.floor(value/60)).padStart(2,'0')}:${String(value%60).padStart(2,'0')}`; }
function clearRoundTimers(){ clearTimeout(state.session && state.session.timer); clearTimeout(state.session && state.session.auto); }
function clearSessionTimers(){
  clearRoundTimers();
  if(!state.session)return;
  clearInterval(state.session.countdown);
  (state.session.queuedTimers||[]).forEach(clearTimeout);
  state.session.queuedTimers=[];
}
function beginTimedGame(){
  const s=state.session;s.started=true;s.deadline=Date.now()+s.limit*1000;
  tickTimer();s.countdown=setInterval(tickTimer,250);nextRound();
}
function tickTimer(){
  const s=state.session;if(!s||s.finished)return;
  const remaining=Math.max(0,(s.deadline-Date.now())/1000);const display=$('#timeLeft');
  if(display)display.textContent=formatTime(remaining);
  const indicator=$('.time-indicator');if(indicator)indicator.classList.toggle('urgent',remaining<=10);
  if(remaining<=0)finishGame(true);
}
function updateHUD(){
  $('#roundLabel').textContent=`${Math.min(state.session.round,state.session.total)} / ${state.session.total}`;
  $('#progressBar').style.width=`${Math.min(100,state.session.round/state.session.total*100)}%`;
  $('#liveScore').textContent=calculateScore();
}
function calculateScore(){
  const s=state.session,g=state.currentGame,config=DIFFICULTIES[s.difficulty];
  if(g.id==='board'){
    const completed=Array.isArray(s.data.deck)
      &&Array.isArray(s.data.matched)
      &&s.data.deck.length>0
      &&s.data.matched.length===s.data.deck.length;
    const remaining=s.deadline?Math.max(0,(s.deadline-Date.now())/1000):0;
    return calculateMemoryMatchScore(remaining,s.limit,completed);
  }
  const denom=g.type==='memory' ? config.memoryPairs*2 : Math.max(1,s.total-(g.type==='nback'?config.nBack:0));
  return Math.min(100,Math.round(s.correct/denom*100));
}
function calculateAccuracy(){
  const s=state.session,g=state.currentGame;
  if(g.id==='board'){
    const attempts=Math.max(0,Number(s.data.pairAttempts)||0);
    const matches=Math.max(0,Number(s.data.pairMatches)||0);
    return attempts?Math.min(100,Math.round(matches/attempts*100)):0;
  }
  return calculateScore();
}
function nextRound(){
  clearRoundTimers(); const s=state.session;if(s.finished)return;s.locked=false;
  if(s.round>=s.total){finishGame();return;} s.round++; updateHUD();
  const game=window.DailyCogGames.get(state.currentGame.id);
  if(!game){console.error('게임 모듈을 찾을 수 없습니다.',state.currentGame.id);finishGame();return;}
  game.round(gameRuntime());
}
function answer(ok, message){
  const s=state.session;if(s.locked||s.finished)return;s.locked=true;if(ok)s.correct++;
  $('#liveScore').textContent=calculateScore();
  const fb=$('.feedback');if(fb){fb.textContent=ok?'좋아요! 정확해요 ✓':(message||'조금 아쉬워요. 다음 문제!');fb.className=`feedback ${ok?'good':'bad'}`;}
  $$('button', $('#stage')).forEach(b=>b.disabled=true);s.timer=setTimeout(nextRound,Math.max(380,650*DIFFICULTIES[s.difficulty].pace));
}
function shuffled(items){
  const result=[...items];
  for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];}
  return result;
}
function gameRuntime(){
  return {
    state,
    difficulties:DIFFICULTIES,
    $,
    $$,
    choiceStage,
    answer,
    nextRound,
    finishGame,
    calculateScore,
    calculateAccuracy,
    shuffled,
    toast,
    applyDisplaySettings
  };
}
function choiceStage(prompt,stimulus,choices,correct){
  const responseMs=DIFFICULTIES[state.session.difficulty].responseMs;
  const correctChoice=choices.find(choice=>String(choice.value)===String(correct));
  const seenValues=new Set(),seenLabels=new Set();
  const uniqueChoices=choices.filter(choice=>{
    const value=String(choice.value),label=String(choice.label).trim();
    if(seenValues.has(value)||seenLabels.has(label))return false;
    seenValues.add(value);seenLabels.add(label);return true;
  });
  if(!uniqueChoices.some(choice=>String(choice.value)===String(correct))){
    const recovered=correctChoice||{value:String(correct),label:String(correct)};
    const conflictIndex=uniqueChoices.findIndex(choice=>String(choice.label).trim()===String(recovered.label).trim());
    if(conflictIndex>=0)uniqueChoices.splice(conflictIndex,1,recovered);
    else uniqueChoices.splice(Math.floor(Math.random()*(uniqueChoices.length+1)),0,recovered);
    if(!correctChoice)console.error('정답에 해당하는 선택지가 없어 복구했습니다.',{prompt,correct,choices});
  }
  $('#stage').innerHTML=`<div class="stage-inner"><div class="round-deadline" style="--round-time:${responseMs}ms"><span></span></div><h2>${prompt}</h2><div class="stimulus">${stimulus}</div><div class="choice-grid ${uniqueChoices.length>4?'dense-choices':''}">${uniqueChoices.map(c=>`<button class="choice-btn" data-value="${c.value}">${c.label}</button>`).join('')}</div><div class="feedback"></div></div>`;
  $$('[data-value]', $('#stage')).forEach(b=>b.onclick=()=>answer(b.dataset.value===String(correct)));
  state.session.auto=setTimeout(()=>answer(false,'응답 시간이 지났어요!'),responseMs);
  applyDisplaySettings();
}
async function persistScore(gameId, record) {
  if (!SUPABASE_ENABLED) {
    persistCurrentLocalAccount();
    return;
  }
  const result = await db.from('game_scores').upsert({
    user_id: state.user.id,
    game_id: gameId,
    best_score: record.best,
    play_count: record.plays,
    last_played: record.last
  }, { onConflict: 'user_id,game_id' });
  if (result.error) { console.error(result.error); toast('점수 저장에 실패했습니다. 연결을 확인해 주세요.'); }
}
function calculateStars(score, timeRatio){
  const rating=(score/100)*.8+Math.max(0,Math.min(1,timeRatio))*.2;
  if(score===0)return 0;
  if(rating>=.85)return 3;
  if(rating>=.65)return 2;
  if(rating>=.4)return 1;
  return 0;
}
function calculateMemoryMatchStars(remainingSeconds,limitSeconds,completed){
  if(!completed)return 0;
  const timeRatio=Math.max(0,Math.min(1,Number(remainingSeconds)/Math.max(1,Number(limitSeconds))));
  if(timeRatio>=.5)return 3;
  if(timeRatio>=.25)return 2;
  return 1;
}
function calculateMemoryMatchScore(remainingSeconds,limitSeconds,completed){
  if(!completed)return 0;
  const timeRatio=Math.max(0,Math.min(1,Number(remainingSeconds)/Math.max(1,Number(limitSeconds))));
  return Math.min(100,Math.round(timeRatio*200));
}
function starRatingHtml(stars){
  return `<div class="result-stars" role="img" aria-label="별 3개 중 ${stars}개"><div class="star-row">${[0,1,2].map(i=>`<span class="${i<stars?'filled star-emoji':'empty'}">${i<stars?'⭐':'☆'}</span>`).join('')}</div><b>${stars}개의 별을 얻었어요</b></div>`;
}
async function persistGameSession(record){
  state.gameSessions.push(record);
  if(!SUPABASE_ENABLED){
    state.gameSessions=state.gameSessions.slice(-500);
    persistCurrentLocalAccount();
    return;
  }
  const payload={
    user_id:state.user.id,game_id:record.gameId,difficulty:record.difficulty,
    score:record.score,accuracy:record.accuracy,stars:record.stars,duration_seconds:record.durationSeconds,
    completed_at:record.completedAt
  };
  let result=await db.from('game_sessions').insert(payload);
  const missingAccuracyColumn=result.error&&/accuracy/i.test(String(result.error.message||result.error.details||''));
  if(missingAccuracyColumn){
    const legacyPayload={...payload};
    delete legacyPayload.accuracy;
    result=await db.from('game_sessions').insert(legacyPayload);
  }
  if(result.error){console.error(result.error);toast('별점 기록을 저장하지 못했습니다.');}
}
function finishGame(timedOut){
  const g=state.currentGame,s=state.session;if(s.finished)return;s.finished=true;
  const remaining=timedOut?0:Math.max(0,(s.deadline-Date.now())/1000);
  const durationSeconds=Math.round(Math.max(0,s.limit-remaining));
  const score=calculateScore();
  const accuracy=calculateAccuracy();
  clearSessionTimers();
  if(s.assessmentMode){
    finishAssessmentGame(score,timedOut);
    return;
  }
  const memoryCompleted=g.id==='board'
    &&Array.isArray(s.data.deck)
    &&Array.isArray(s.data.matched)
    &&s.data.matched.length===s.data.deck.length;
  const stars=g.id==='board'
    ?calculateMemoryMatchStars(remaining,s.limit,memoryCompleted&&!timedOut)
    :calculateStars(score,remaining/s.limit);
  const old=state.scores[g.id]||{best:0,plays:0};state.scores[g.id]={best:Math.max(old.best,score),plays:old.plays+1,last:new Date().toISOString()};persistScore(g.id,state.scores[g.id]);
  persistGameSession({gameId:g.id,difficulty:s.difficulty,score,accuracy,stars,durationSeconds,completedAt:new Date().toISOString()});
  $('#roundLabel').textContent='완료';if(timedOut)$('#timeLeft').textContent='00:00';$('#progressBar').style.width='100%';$('#liveScore').textContent=score;
  $('#stage').innerHTML=`<div class="stage-inner"><span class="step-label">${DIFFICULTIES[s.difficulty].label} · 세션 완료</span><h2>${timedOut?'시간이 종료되었어요!':'오늘의 두뇌 루틴 완료!'}</h2>${starRatingHtml(stars)}<div class="result-ring compact-ring" style="--score:${score}%"><strong>${score}</strong></div><p>${timedOut?'제한시간까지 집중한 결과예요. 다시 도전하면 더 좋아질 수 있어요.':score>=80?'집중력이 빛났어요. 이 리듬을 이어가세요!':score>=50?'좋은 시작이에요. 반복할수록 더 익숙해져요.':'괜찮아요. 천천히 규칙에 익숙해지는 중이에요.'}</p><div class="result-actions"><button class="secondary-btn" id="retry">다시 하기</button><button class="primary-btn" id="done">루틴으로</button></div></div>`;
  $('#retry').onclick=()=>renderGame();$('#done').onclick=()=>{state.screen='dashboard';render();};
}

function finishAssessmentGame(score,timedOut) {
  const g=state.currentGame;
  state.assessment.scores[g.id]=score;
  const completed=assessmentCompletedCount();
  const isComplete=completed===ASSESSMENT_GAMES.length;
  if(isComplete){
    state.assessment.completedAt=new Date().toISOString();
    state.assessment.active=false;
    scheduleAssessmentDueRefresh();
  }
  persistAssessmentProgress(g.id);
  if(!SUPABASE_ENABLED)persistCurrentLocalAccount();
  $('#roundLabel').textContent='완료';
  if(timedOut)$('#timeLeft').textContent='00:00';
  $('#progressBar').style.width='100%';
  $('#liveScore').textContent=score;
  $('#stage').innerHTML=`<div class="stage-inner">
    <span class="step-label">${isComplete?'12개 기초 평가 완료':`${completed} / ${ASSESSMENT_GAMES.length} 기초 평가 완료`}</span>
    <h2>${timedOut?'시간이 종료되었어요!':'평가를 완료했어요!'}</h2>
    <div class="result-ring compact-ring" style="--score:${score}%"><strong>${score}</strong></div>
    <p>${isComplete?'여섯 가지 인지능력 결과가 홈의 육각형에 반영되었습니다.':'이 점수가 인지 육각형의 관련 영역에 반영됩니다.'}</p>
    <div class="result-actions"><button class="primary-btn" id="assessmentNext">${isComplete?'육각형 결과 보기':'평가 목록으로'} →</button></div>
  </div>`;
  $('#assessmentNext').onclick=()=>{
    if(isComplete){
      state.screen='dashboard';
      render();
      return;
    }
    state.assessment.active=false;
    state.currentGame=null;
    state.session=null;
    state.screen='assessment';
    render();
  };
}
