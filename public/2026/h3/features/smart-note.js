// Daily Cog feature: smart-note
function smartNotePayload() {
  return {
    content:state.smartNote.content,
    pinned:state.smartNote.pinned,
    collapsed:state.smartNote.collapsed
  };
}

function setSmartNoteStatus(text) {
  const status=$('[data-note-status]');
  if(status) status.textContent=text;
}

function scheduleSmartNoteSave() {
  clearTimeout(smartNoteSaveTimer);
  setSmartNoteStatus('저장 중…');
  smartNoteSaveTimer=setTimeout(saveSmartNote,350);
}

async function saveSmartNote() {
  if(!state.user)return;
  const payload=smartNotePayload();
  localStorage.setItem(smartNoteKey(state.user),JSON.stringify(payload));
  if(!SUPABASE_ENABLED){
    persistCurrentLocalAccount();
    setSmartNoteStatus('자동 저장됨');
    return;
  }
  const result=await db.from('profiles').update({smart_note:payload,updated_at:new Date().toISOString()}).eq('id',state.user.id);
  if(result.error){
    console.error(result.error);
    setSmartNoteStatus('이 기기에 저장됨');
    return;
  }
  setSmartNoteStatus('자동 저장됨');
}

function openSmartNote() {
  state.smartNote.open=true;
  state.smartNote.view=state.screen;
  state.smartNote.collapsed=false;
  syncSmartNote();
  requestAnimationFrame(()=>{
    const textarea=$('[data-note-input]');
    if(textarea) textarea.focus();
  });
}

function syncSmartNote() {
  const old=$('#smartNoteFloating');
  const visible=state.user&&(state.smartNote.open||state.smartNote.pinned);
  if(!visible){
    if(old)old.remove();
    return;
  }
  const html=`<aside class="smart-note-floating ${state.smartNote.collapsed?'collapsed':''}" id="smartNoteFloating" aria-label="스마트 노트">
    <div class="smart-note-head">
      <div><span class="note-dot" aria-hidden="true"></span><strong>스마트 노트</strong><small data-note-status>자동 저장됨</small></div>
      <div class="smart-note-actions">
        <button data-note-pin class="${state.smartNote.pinned?'active':''}" aria-pressed="${state.smartNote.pinned}" title="${state.smartNote.pinned?'고정 해제':'화면에 고정'}">⌖</button>
        <button data-note-collapse title="${state.smartNote.collapsed?'펼치기':'접기'}">${state.smartNote.collapsed?'□':'—'}</button>
        <button data-note-close title="노트 닫기">×</button>
      </div>
    </div>
    <div class="smart-note-body">
      <textarea data-note-input maxlength="10000" placeholder="기억할 일, 학습 아이디어, 오늘의 목표를 적어보세요.">${escapeHtml(state.smartNote.content)}</textarea>
      <div class="smart-note-foot"><span>${state.smartNote.pinned?'화면에 고정됨':'⌖ 버튼을 누르면 다른 화면에서도 볼 수 있어요.'}</span><small data-note-count>${state.smartNote.content.length.toLocaleString()} / 10,000</small></div>
    </div>
  </aside>`;
  if(old)old.outerHTML=html;
  else document.body.insertAdjacentHTML('beforeend',html);
  const note=$('#smartNoteFloating');
  const input=$('[data-note-input]',note);
  input.oninput=()=>{
    state.smartNote.content=input.value;
    const count=$('[data-note-count]',note);
    if(count)count.textContent=`${input.value.length.toLocaleString()} / 10,000`;
    scheduleSmartNoteSave();
  };
  $('[data-note-pin]',note).onclick=()=>{
    state.smartNote.pinned=!state.smartNote.pinned;
    state.smartNote.open=true;
    saveSmartNote();
    syncSmartNote();
  };
  $('[data-note-collapse]',note).onclick=()=>{
    state.smartNote.collapsed=!state.smartNote.collapsed;
    saveSmartNote();
    syncSmartNote();
  };
  $('[data-note-close]',note).onclick=()=>{
    state.smartNote.open=false;
    state.smartNote.pinned=false;
    saveSmartNote();
    syncSmartNote();
  };
  applyDisplaySettings();
}
