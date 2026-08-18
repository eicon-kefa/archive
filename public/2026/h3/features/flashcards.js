// Daily Cog feature: flashcards
async function saveFlashcards() {
  state.flashcards=normalizeFlashcards(state.flashcards);
  localStorage.setItem(flashcardKey(state.user),JSON.stringify(state.flashcards));
  if(!SUPABASE_ENABLED){
    persistCurrentLocalAccount();
    return true;
  }
  const result=await db.from('profiles').update({
    flashcards:state.flashcards,
    updated_at:new Date().toISOString()
  }).eq('id',state.user.id);
  if(result.error){
    console.warn('Flashcards are saved locally because the Supabase flashcards column is unavailable.',result.error);
    return false;
  }
  return true;
}

function visibleFlashcards() {
  const ui=state.flashcardUi;
  const query=ui.search.trim().toLocaleLowerCase();
  const cards=state.flashcards.filter(card=>{
    const matchesCategory=ui.category==='all'||card.category===ui.category;
    const haystack=`${card.front} ${card.back} ${card.category}`.toLocaleLowerCase();
    return matchesCategory&&(!query||haystack.includes(query));
  });
  cards.sort((a,b)=>{
    if(ui.sort==='oldest')return new Date(a.createdAt)-new Date(b.createdAt);
    if(ui.sort==='az')return a.front.localeCompare(b.front,state.settings.language);
    return new Date(b.createdAt)-new Date(a.createdAt);
  });
  return cards;
}

function flashcardCollectionHtml(cards) {
  if(!cards.length){
    const hasCards=state.flashcards.length>0;
    return `<div class="flashcard-empty">
      <strong>${hasCards?'검색 결과가 없습니다.':'아직 플래시카드가 없어요'}</strong>
      <p>${hasCards?'검색어나 필터를 바꿔보세요.':'+ 버튼을 눌러 첫 카드를 만들어보세요.'}</p>
    </div>`;
  }
  return `<div class="flashcard-grid">${cards.map(card=>{
    const flipped=state.flashcardUi.flippedId===card.id;
    return `<article class="flashcard-item ${flipped?'flipped':''}">
      <button class="flashcard-flip" data-flip-card="${card.id}" aria-label="${flipped?'카드 앞면 보기':'카드 뒷면 보기'}">
        <span class="flashcard-category">${escapeHtml(card.category)}</span>
        <span class="flashcard-face flashcard-front"><small>FRONT</small><strong>${escapeHtml(card.front)}</strong><i>카드를 눌러 뒤집기</i></span>
        <span class="flashcard-face flashcard-back"><small>BACK</small><strong>${escapeHtml(card.back)}</strong><i>카드를 눌러 앞면 보기</i></span>
      </button>
      <div class="flashcard-actions"><button data-edit-card="${card.id}">수정</button><button data-delete-card="${card.id}">삭제</button></div>
    </article>`;
  }).join('')}</div>`;
}

function bindFlashcardCollection() {
  $$('[data-flip-card]').forEach(button=>button.onclick=()=>{
    state.flashcardUi.flippedId=state.flashcardUi.flippedId===button.dataset.flipCard?null:button.dataset.flipCard;
    refreshFlashcardCollection();
  });
  $$('[data-edit-card]').forEach(button=>button.onclick=()=>openFlashcardEditor(button.dataset.editCard));
  $$('[data-delete-card]').forEach(button=>button.onclick=async()=>{
    const card=state.flashcards.find(item=>item.id===button.dataset.deleteCard);
    const question=`“${card&&card.front}” 카드를 삭제할까요?`;
    const localized=window.DailyCogI18n?window.DailyCogI18n.translate(question,state.settings.language):question;
    if(!card||!confirm(localized))return;
    state.flashcards=state.flashcards.filter(item=>item.id!==card.id);
    if(state.flashcardUi.flippedId===card.id)state.flashcardUi.flippedId=null;
    await saveFlashcards();
    renderPreservingScroll();
    toast('플래시카드를 삭제했습니다.');
  });
}

function refreshFlashcardCollection() {
  const cards=visibleFlashcards();
  const collection=$('#flashcardCollection');
  const count=$('#flashcardCount');
  if(collection)collection.innerHTML=flashcardCollectionHtml(cards);
  if(count)count.textContent=`${state.flashcards.length}개 카드 · 카드를 누르면 뒤집혀요`;
  bindFlashcardCollection();
  applyDisplaySettings();
}

function openFlashcardEditor(cardId=null) {
  const current=state.flashcards.find(card=>card.id===cardId);
  $('#flashcardModal')?.remove();
  document.body.insertAdjacentHTML('beforeend',`<div class="settings-overlay" id="flashcardModal">
    <section class="settings-modal flashcard-modal" role="dialog" aria-modal="true" aria-labelledby="flashcardModalTitle">
      <div class="settings-head"><div><span class="step-label">FLASH CARD</span><h2 id="flashcardModalTitle">${current?'플래시카드 수정':'새 플래시카드'}</h2><p>앞면에는 질문이나 단어를, 뒷면에는 정답이나 설명을 적어주세요.</p></div><button class="icon-btn" data-close-flashcard aria-label="닫기">×</button></div>
      <form id="flashcardForm" class="flashcard-form">
        <label><span>앞면</span><textarea name="front" maxlength="500" required placeholder="질문 또는 학습할 단어">${current?escapeHtml(current.front):''}</textarea></label>
        <label><span>뒷면</span><textarea name="back" maxlength="1000" required placeholder="정답 또는 설명">${current?escapeHtml(current.back):''}</textarea></label>
        <label><span>분류</span><input name="category" maxlength="40" value="${current?escapeHtml(current.category):'일반'}" placeholder="예: 단어, 인지게임, 약속"></label>
        <button class="primary-btn" type="submit">${current?'변경사항 저장':'카드 만들기'} →</button>
      </form>
    </section>
  </div>`);
  const modal=$('#flashcardModal');
  const close=()=>modal.remove();
  $('[data-close-flashcard]',modal).onclick=close;
  modal.onclick=event=>{if(event.target===modal)close();};
  $('#flashcardForm',modal).onsubmit=async event=>{
    event.preventDefault();
    const data=new FormData(event.currentTarget);
    const front=String(data.get('front')||'').trim();
    const back=String(data.get('back')||'').trim();
    const category=String(data.get('category')||'일반').trim()||'일반';
    if(!front||!back){toast('앞면과 뒷면을 모두 입력해 주세요.');return;}
    const now=new Date().toISOString();
    if(current){
      Object.assign(current,{front,back,category,updatedAt:now});
    }else{
      state.flashcards.push({id:`card-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,front,back,category,createdAt:now,updatedAt:now});
    }
    await saveFlashcards();
    close();
    renderPreservingScroll();
    toast(current?'플래시카드를 수정했습니다.':'새 플래시카드를 만들었습니다.');
  };
  applyDisplaySettings();
  setTimeout(()=>$('#flashcardForm textarea',modal)?.focus(),0);
}

function flashcardPlaySource() {
  const visible=visibleFlashcards();
  return (visible.length?visible:state.flashcards).slice();
}

function startFlashcardStudy() {
  const source=flashcardPlaySource();
  if(!source.length){toast('먼저 플래시카드를 만들어 주세요.');openFlashcardEditor();return;}
  state.flashcardUi.play={mode:'menu'};
  render();
}

function closeFlashcardPlay() {
  state.flashcardUi.play=null;
  render();
}

function openFlashcardModeMenu() {
  state.flashcardUi.play={mode:'menu'};
  render();
}

function flashcardModeResult(sourceMode,title,score,detail) {
  state.flashcardUi.play={mode:'result',sourceMode,title,score,detail};
  render();
}

function startFlashcardMode(mode) {
  const source=flashcardPlaySource();
  if(!source.length){toast('먼저 플래시카드를 만들어 주세요.');return;}
  if(mode==='memory'){
    state.flashcardUi.play={mode,ids:shuffled(source.map(card=>card.id)).slice(0,20),index:0,revealed:false,remembered:0,reviewed:0};
  }else if(mode==='match'){
    if(source.length<2){toast('짝 맞추기에는 플래시카드가 2개 이상 필요합니다.');return;}
    const cards=shuffled(source).slice(0,6);
    const tiles=shuffled(cards.flatMap(card=>[
      {key:`${card.id}:front`,cardId:card.id,side:'front',text:card.front},
      {key:`${card.id}:back`,cardId:card.id,side:'back',text:card.back}
    ]));
    state.flashcardUi.play={mode,ids:cards.map(card=>card.id),tiles,selected:[],matched:[],moves:0,locked:false};
  }else if(mode==='quiz'){
    const distinctAnswers=[...new Set(source.map(card=>card.back))];
    if(distinctAnswers.length<2){toast('퀴즈에는 서로 다른 정답을 가진 카드가 2개 이상 필요합니다.');return;}
    const cards=shuffled(source).slice(0,12);
    const questions=cards.map(card=>{
      const wrong=shuffled(distinctAnswers.filter(answer=>answer!==card.back)).slice(0,3);
      return {cardId:card.id,front:card.front,answer:card.back,choices:shuffled([card.back,...wrong])};
    });
    state.flashcardUi.play={mode,questions,index:0,correct:0,selected:null};
  }else if(mode==='spaced'){
    const now=Date.now();
    const ordered=source.slice().sort((a,b)=>{
      const aDue=a.review&&a.review.dueAt?new Date(a.review.dueAt).getTime():0;
      const bDue=b.review&&b.review.dueAt?new Date(b.review.dueAt).getTime():0;
      const aReady=!aDue||aDue<=now,bReady=!bDue||bDue<=now;
      if(aReady!==bReady)return aReady?-1:1;
      return aDue-bDue;
    });
    const due=ordered.filter(card=>!card.review.dueAt||new Date(card.review.dueAt).getTime()<=now);
    const cards=(due.length?due:ordered).slice(0,20);
    state.flashcardUi.play={mode,ids:cards.map(card=>card.id),index:0,revealed:false,reviewed:0};
  }
  render();
}

function flashcardPlayShell(content,backToMenu=true) {
  return `<div class="shell">${header()}<section class="flashcards-page flashcard-study-page">
    <button class="back-btn" id="closeFlashcardPlay">← ${backToMenu?'게임 선택으로':'플래시카드 목록으로'}</button>
    ${content}
  </section></div>`;
}

function bindFlashcardPlayBack(backToMenu=true) {
  $('#closeFlashcardPlay').onclick=backToMenu?openFlashcardModeMenu:closeFlashcardPlay;
}

function renderFlashcardModeMenu() {
  const source=flashcardPlaySource();
  const dueCount=source.filter(card=>!card.review.dueAt||new Date(card.review.dueAt).getTime()<=Date.now()).length;
  const quizReady=new Set(source.map(card=>card.back)).size>=2;
  const modes=[
    {id:'memory',icon:'↻',title:'기억력 훈련',desc:'질문을 보고 답을 떠올린 뒤 스스로 기억 여부를 확인해요.',meta:`${source.length}개 카드`,disabled:false},
    {id:'match',icon:'🧩',title:'짝 맞추기 연습',desc:'섞여 있는 앞면과 뒷면을 찾아 올바른 짝으로 연결해요.',meta:'최대 6쌍',disabled:source.length<2},
    {id:'quiz',icon:'❓',title:'퀴즈',desc:'질문에 맞는 정답을 여러 선택지 중에서 골라요.',meta:'최대 12문제',disabled:!quizReady},
    {id:'spaced',icon:'⏳',title:'간격 반복',desc:'기억 정도에 따라 다음 복습 시점을 자동으로 조절해요.',meta:dueCount?`오늘 복습 ${dueCount}개`:'자유 복습',disabled:false}
  ];
  app.innerHTML=flashcardPlayShell(`<div class="flashcard-mode-heading">
      <span class="step-label">FLASH CARD GAMES</span>
      <h1>어떤 방식으로<br>학습할까요?</h1>
      <p>현재 검색과 분류에 포함된 플래시카드로 게임을 시작합니다.</p>
    </div>
    <div class="flashcard-mode-grid">${modes.map(mode=>`<button class="flashcard-mode-card" data-flashcard-mode="${mode.id}" ${mode.disabled?'disabled':''}>
      <span class="flashcard-mode-icon" aria-hidden="true">${mode.icon}</span>
      <span class="flashcard-mode-copy"><small>${mode.meta}</small><strong>${mode.title}</strong><p>${mode.desc}</p></span>
      <b>${mode.disabled?'카드가 더 필요해요':'시작하기 →'}</b>
    </button>`).join('')}</div>`,false);
  bindFlashcardPlayBack(false);
  $$('[data-flashcard-mode]').forEach(button=>button.onclick=()=>startFlashcardMode(button.dataset.flashcardMode));
}

function renderFlashcardMemory() {
  const play=state.flashcardUi.play;
  const cards=play.ids.map(id=>state.flashcards.find(card=>card.id===id)).filter(Boolean);
  if(!cards.length){openFlashcardModeMenu();return;}
  play.index=Math.max(0,Math.min(play.index,cards.length-1));
  const card=cards[play.index];
  app.innerHTML=flashcardPlayShell(`<div class="study-heading"><span class="step-label">MEMORY TRAINING</span><h1>기억력 훈련</h1><p>${play.index+1} / ${cards.length} 카드</p></div>
    <button class="study-card ${play.revealed?'revealed':''}" id="studyCard">
      <span>${play.revealed?'정답':'질문'}</span>
      <strong>${escapeHtml(play.revealed?card.back:card.front)}</strong>
      <small>${play.revealed?'내가 떠올린 답과 비교해 보세요.':'답을 떠올린 다음 카드를 눌러주세요.'}</small>
    </button>
    ${play.revealed?`<div class="memory-grade-controls"><button class="secondary-btn" data-memory-grade="again">다시 볼래요</button><button class="primary-btn" data-memory-grade="remembered">기억했어요 ✓</button></div>`:'<button class="primary-btn study-reveal-btn" id="revealMemoryCard">정답 확인하기</button>'}`);
  bindFlashcardPlayBack();
  $('#studyCard').onclick=()=>{play.revealed=!play.revealed;render();};
  if($('#revealMemoryCard'))$('#revealMemoryCard').onclick=()=>{play.revealed=true;render();};
  $$('[data-memory-grade]').forEach(button=>button.onclick=()=>{
    const remembered=button.dataset.memoryGrade==='remembered';
    play.reviewed+=1;
    if(remembered)play.remembered+=1;
    if(play.index>=cards.length-1){
      flashcardModeResult('memory','기억력 훈련 완료',Math.round(play.remembered/play.reviewed*100),`${play.reviewed}개 중 ${play.remembered}개를 기억했어요.`);
    }else{
      play.index+=1;
      play.revealed=false;
      render();
    }
  });
}

function renderFlashcardMatch() {
  const play=state.flashcardUi.play;
  if(play.matched.length===play.ids.length){
    const efficiency=Math.max(0,Math.round(play.ids.length/Math.max(play.moves,1)*100));
    flashcardModeResult('match','짝 맞추기 완료',efficiency,`${play.moves}번 만에 ${play.ids.length}쌍을 모두 찾았어요.`);
    return;
  }
  app.innerHTML=flashcardPlayShell(`<div class="study-heading"><span class="step-label">MATCHING PRACTICE</span><h1>짝 맞추기 연습</h1><p>찾은 짝 ${play.matched.length} / ${play.ids.length} · 시도 ${play.moves}회</p></div>
    <div class="flashcard-match-grid">${play.tiles.map(tile=>{
      const selected=play.selected.includes(tile.key),matched=play.matched.includes(tile.cardId);
      return `<button class="flashcard-match-tile ${selected?'selected':''} ${matched?'matched':''}" data-match-tile="${tile.key}" ${matched||play.locked?'disabled':''}>
        <small>${tile.side==='front'?'질문':'정답'}</small><strong>${escapeHtml(tile.text)}</strong>
      </button>`;
    }).join('')}</div>`);
  bindFlashcardPlayBack();
  $$('[data-match-tile]').forEach(button=>button.onclick=()=>{
    if(play.locked||play.selected.includes(button.dataset.matchTile))return;
    play.selected.push(button.dataset.matchTile);
    if(play.selected.length<2){render();return;}
    play.moves+=1;
    play.locked=true;
    render();
    setTimeout(()=>{
      const selectedTiles=play.selected.map(key=>play.tiles.find(tile=>tile.key===key)).filter(Boolean);
      if(selectedTiles.length===2&&selectedTiles[0].cardId===selectedTiles[1].cardId&&!play.matched.includes(selectedTiles[0].cardId)){
        play.matched.push(selectedTiles[0].cardId);
      }
      play.selected=[];
      play.locked=false;
      render();
    },520);
  });
}

function renderFlashcardQuiz() {
  const play=state.flashcardUi.play;
  const question=play.questions[play.index];
  if(!question){openFlashcardModeMenu();return;}
  const answered=play.selected!==null;
  app.innerHTML=flashcardPlayShell(`<div class="study-heading"><span class="step-label">FLASH CARD QUIZ</span><h1>퀴즈</h1><p>${play.index+1} / ${play.questions.length} 문제 · 정답 ${play.correct}개</p></div>
    <article class="flashcard-quiz-question"><small>QUESTION</small><strong>${escapeHtml(question.front)}</strong></article>
    <div class="flashcard-quiz-choices">${question.choices.map((choice,index)=>{
      const isSelected=play.selected===choice,isCorrect=answered&&choice===question.answer;
      return `<button class="${isSelected?'selected':''} ${isCorrect?'correct':''} ${answered&&isSelected&&!isCorrect?'wrong':''}" data-quiz-choice="${index}" ${answered?'disabled':''}><span>${String.fromCharCode(65+index)}</span><strong>${escapeHtml(choice)}</strong></button>`;
    }).join('')}</div>
    ${answered?`<div class="quiz-feedback ${play.selected===question.answer?'correct':'wrong'}"><strong>${play.selected===question.answer?'정답이에요! ✓':'아쉬워요. 정답을 확인해 보세요.'}</strong><button class="primary-btn" id="nextQuizQuestion">${play.index===play.questions.length-1?'결과 보기':'다음 문제 →'}</button></div>`:''}`);
  bindFlashcardPlayBack();
  $$('[data-quiz-choice]').forEach(button=>button.onclick=()=>{
    const choice=question.choices[Number(button.dataset.quizChoice)];
    play.selected=choice;
    if(choice===question.answer)play.correct+=1;
    render();
  });
  if($('#nextQuizQuestion'))$('#nextQuizQuestion').onclick=()=>{
    if(play.index>=play.questions.length-1){
      flashcardModeResult('quiz','퀴즈 완료',Math.round(play.correct/play.questions.length*100),`${play.questions.length}문제 중 ${play.correct}문제를 맞혔어요.`);
    }else{
      play.index+=1;
      play.selected=null;
      render();
    }
  };
}

function reviewSpacedFlashcard(rating) {
  const play=state.flashcardUi.play;
  const card=state.flashcards.find(item=>item.id===play.ids[play.index]);
  if(!card)return;
  const now=new Date();
  const previous=Math.max(0,Number(card.review.intervalDays)||0);
  let intervalDays=0,dueAt;
  if(rating==='again'){
    dueAt=new Date(now.getTime()+10*60*1000);
  }else{
    intervalDays=rating==='hard'?Math.max(1,Math.round(previous*1.2)):rating==='good'?Math.max(1,Math.round(previous*2)||1):Math.max(3,Math.round(previous*3)||3);
    dueAt=new Date(now.getTime()+intervalDays*86400000);
  }
  card.review={
    intervalDays,
    repetitions:rating==='again'?0:(Number(card.review.repetitions)||0)+1,
    dueAt:dueAt.toISOString(),
    lastReviewedAt:now.toISOString()
  };
  card.updatedAt=now.toISOString();
  play.reviewed+=1;
  saveFlashcards();
  if(play.index>=play.ids.length-1){
    flashcardModeResult('spaced','간격 반복 완료',100,`${play.reviewed}개의 다음 복습 일정을 저장했어요.`);
  }else{
    play.index+=1;
    play.revealed=false;
    render();
  }
}

function renderFlashcardSpaced() {
  const play=state.flashcardUi.play;
  const cards=play.ids.map(id=>state.flashcards.find(card=>card.id===id)).filter(Boolean);
  const card=cards[play.index];
  if(!card){openFlashcardModeMenu();return;}
  app.innerHTML=flashcardPlayShell(`<div class="study-heading"><span class="step-label">SPACED REPETITION</span><h1>간격 반복</h1><p>${play.index+1} / ${cards.length} 카드</p></div>
    <button class="study-card ${play.revealed?'revealed':''}" id="studyCard">
      <span>${play.revealed?'정답':'질문'}</span>
      <strong>${escapeHtml(play.revealed?card.back:card.front)}</strong>
      <small>${play.revealed?'기억하기 얼마나 어려웠는지 선택해 주세요.':'답을 떠올린 다음 카드를 눌러주세요.'}</small>
    </button>
    ${play.revealed?`<div class="spaced-grade-controls">
      <button data-spaced-grade="again"><strong>다시</strong><small>10분 후</small></button>
      <button data-spaced-grade="hard"><strong>어려움</strong><small>1일 후</small></button>
      <button data-spaced-grade="good"><strong>보통</strong><small>기억 간격 늘리기</small></button>
      <button data-spaced-grade="easy"><strong>쉬움</strong><small>긴 간격으로</small></button>
    </div>`:'<button class="primary-btn study-reveal-btn" id="revealSpacedCard">정답 확인하기</button>'}`);
  bindFlashcardPlayBack();
  $('#studyCard').onclick=()=>{play.revealed=!play.revealed;render();};
  if($('#revealSpacedCard'))$('#revealSpacedCard').onclick=()=>{play.revealed=true;render();};
  $$('[data-spaced-grade]').forEach(button=>button.onclick=()=>reviewSpacedFlashcard(button.dataset.spacedGrade));
}

function renderFlashcardResult() {
  const play=state.flashcardUi.play;
  app.innerHTML=flashcardPlayShell(`<div class="flashcard-result">
      <span class="flashcard-result-icon" aria-hidden="true">✨</span>
      <span class="step-label">SESSION COMPLETE</span>
      <h1>${escapeHtml(play.title)}</h1>
      <div class="flashcard-result-score"><strong>${play.score}</strong><small>점</small></div>
      <p>${escapeHtml(play.detail)}</p>
      <div class="flashcard-result-actions"><button class="secondary-btn" id="chooseAnotherMode">다른 게임 선택</button><button class="primary-btn" id="retryFlashcardMode">한 번 더 하기 →</button></div>
    </div>`,false);
  bindFlashcardPlayBack(false);
  $('#chooseAnotherMode').onclick=openFlashcardModeMenu;
  $('#retryFlashcardMode').onclick=()=>startFlashcardMode(play.sourceMode);
}

function renderFlashcardPlay() {
  const mode=state.flashcardUi.play&&state.flashcardUi.play.mode;
  if(mode==='menu')renderFlashcardModeMenu();
  else if(mode==='memory')renderFlashcardMemory();
  else if(mode==='match')renderFlashcardMatch();
  else if(mode==='quiz')renderFlashcardQuiz();
  else if(mode==='spaced')renderFlashcardSpaced();
  else if(mode==='result')renderFlashcardResult();
  else{state.flashcardUi.play=null;renderFlashcards();}
}

function renderFlashcards() {
  if(state.flashcardUi.play){renderFlashcardPlay();return;}
  const categories=[...new Set(state.flashcards.map(card=>card.category))].sort((a,b)=>a.localeCompare(b,state.settings.language));
  const cards=visibleFlashcards();
  app.innerHTML=`<div class="shell">${header()}<section class="flashcards-page">
    <div class="flashcards-head">
      <div><span class="step-label">DAILY COG</span><h1>플래시카드</h1><p id="flashcardCount">${state.flashcards.length}개 카드 · 카드를 누르면 뒤집혀요</p></div>
      <button class="flashcard-play-btn" id="playFlashcards"><span aria-hidden="true">▷</span> 학습 게임</button>
    </div>
    <div class="flashcard-toolbar">
      <label class="flashcard-search"><span aria-hidden="true">⌕</span><input id="flashcardSearch" type="search" value="${escapeHtml(state.flashcardUi.search)}" placeholder="플래시카드 검색..."></label>
      <select id="flashcardCategory" aria-label="분류 필터"><option value="all">전체</option>${categories.map(category=>`<option value="${escapeHtml(category)}" ${state.flashcardUi.category===category?'selected':''}>${escapeHtml(category)}</option>`).join('')}</select>
      <select id="flashcardSort" aria-label="정렬"><option value="recent" ${state.flashcardUi.sort==='recent'?'selected':''}>최근 만든 순</option><option value="oldest" ${state.flashcardUi.sort==='oldest'?'selected':''}>오래된 순</option><option value="az" ${state.flashcardUi.sort==='az'?'selected':''}>가나다 순</option></select>
    </div>
    <div id="flashcardCollection" class="flashcard-collection">${flashcardCollectionHtml(cards)}</div>
    <button class="flashcard-add" id="addFlashcard" aria-label="새 플래시카드 만들기">+</button>
  </section></div>`;
  $('#flashcardSearch').oninput=event=>{state.flashcardUi.search=event.target.value;refreshFlashcardCollection();};
  $('#flashcardCategory').onchange=event=>{state.flashcardUi.category=event.target.value;refreshFlashcardCollection();};
  $('#flashcardSort').onchange=event=>{state.flashcardUi.sort=event.target.value;refreshFlashcardCollection();};
  $('#addFlashcard').onclick=()=>openFlashcardEditor();
  $('#playFlashcards').onclick=startFlashcardStudy;
  bindFlashcardCollection();
}
