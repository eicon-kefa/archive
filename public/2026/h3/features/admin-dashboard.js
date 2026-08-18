// Daily Cog feature: admin-dashboard
const ADMIN_AGE_LABELS = {
  child:'유아',
  teen:'청소년',
  adult:'성인',
  senior:'노인',
  unset:'미설정'
};

function formatAdminDate(value, withTime=false) {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat(state.settings.language === 'ko' ? 'ko-KR' : state.settings.language === 'zh' ? 'zh-CN' : 'en-US', {
    month:'short',
    day:'numeric',
    ...(withTime ? {hour:'2-digit', minute:'2-digit'} : {})
  }).format(date);
}

function isRecentlyOnline(value) {
  return value && Date.now() - new Date(value).getTime() <= 120000;
}

async function openAdminDashboard() {
  if (!state.isAdmin) {
    toast('관리자 권한이 필요합니다.');
    return;
  }
  clearSessionTimers();
  state.screen='adminDashboard';
  state.adminData=null;
  state.adminError=null;
  render();
  await sendPresenceHeartbeat();
  const result=await db.rpc('admin_dashboard');
  if(result.error){
    console.error(result.error);
    state.adminError='관리자 통계를 불러오지 못했습니다.';
  }else{
    const adminData=result.data||{};
    const users=Array.isArray(adminData.users)?adminData.users:[];
    state.adminData={
      ...adminData,
      activeUsers:users.length
        ? users.filter(user=>isRecentlyOnline(user.last_seen_at)).length
        : Number(adminData.activeUsers)||0
    };
  }
  render();
}

async function loadAdminUserDetail(userId) {
  if (!state.isAdmin) return;
  toast('사용자 기록을 불러오는 중입니다.');
  const result=await db.rpc('admin_user_detail',{target_user_id:userId});
  if(result.error){
    console.error(result.error);
    toast('사용자 기록을 불러오지 못했습니다.');
    return;
  }
  state.adminUserDetail=result.data;
  renderAdminUserModal();
}

function renderAdminUserModal() {
  const detail=state.adminUserDetail;
  if(!detail) return;
  $('#adminUserModal')?.remove();
  const sessions=(detail.sessions||[]).slice().reverse().slice(-14);
  const maxScore=Math.max(1,...sessions.map(item=>Number(item.score)||0));
  const overlay=document.createElement('div');
  overlay.id='adminUserModal';
  overlay.className='settings-overlay';
  overlay.innerHTML=`<section class="settings-modal admin-user-modal" role="dialog" aria-modal="true" aria-labelledby="adminUserTitle">
    <div class="settings-head">
      <div><span class="step-label">USER DETAIL</span><h2 id="adminUserTitle">${escapeHtml(detail.name||'사용자')}</h2><p>${escapeHtml(detail.email||'')}</p></div>
      <button class="icon-btn" type="button" data-close-admin-user aria-label="닫기">×</button>
    </div>
    <div class="admin-detail-meta">
      <div><span>연령대</span><strong>${ADMIN_AGE_LABELS[detail.ageGroup]||'미설정'}</strong></div>
      <div><span>나라</span><strong>${detail.countryCode?escapeHtml(countryDisplayName(detail.countryCode)):'미설정'}</strong></div>
      <div><span>가입일</span><strong>${formatAdminDate(detail.createdAt)}</strong></div>
      <div><span>최근 로그인</span><strong>${formatAdminDate(detail.lastSignInAt,true)}</strong></div>
      <div><span>접속 상태</span><strong class="${isRecentlyOnline(detail.lastSeenAt)?'online-text':''}">${isRecentlyOnline(detail.lastSeenAt)?'현재 접속 중':'오프라인'}</strong></div>
    </div>
    <div class="admin-detail-chart">
      <div class="panel-heading"><div><span class="step-label">PERFORMANCE</span><h2>최근 게임 점수</h2></div></div>
      ${sessions.length?`<div class="admin-score-chart">${sessions.map(item=>`<div><span>${Number(item.score)||0}</span><i style="height:${Math.max(7,(Number(item.score)||0)/maxScore*100)}%"></i><small>${formatAdminDate(item.completed_at)}</small></div>`).join('')}</div>`:'<div class="empty-history">아직 완료한 게임이 없습니다.</div>'}
    </div>
  </section>`;
  document.body.appendChild(overlay);
  const close=()=>{overlay.remove();state.adminUserDetail=null;};
  $('[data-close-admin-user]',overlay).onclick=close;
  overlay.onclick=e=>{if(e.target===overlay)close();};
  applyDisplaySettings();
}

function renderAdminDashboard() {
  if(!state.isAdmin){
    state.screen=state.birthDate&&currentUserAgeGroup()?'dashboard':'birthdate';
    render();
    return;
  }
  if(!state.adminData){
    app.innerHTML=`<div class="shell">${header()}<div class="loading-screen"><span class="loading-orbit"></span><strong>관리자 대시보드를 준비하고 있어요</strong><p>${state.adminError||'접속 현황과 학습 기록을 안전하게 집계하는 중입니다.'}</p>${state.adminError?'<button class="secondary-btn" data-admin-dashboard>다시 시도</button>':''}</div></div>`;
    return;
  }
  const data=state.adminData;
  const users=Array.isArray(data.users)?data.users:[];
  const hasGameAverages=Array.isArray(data.gameAverages);
  const gameAverageMap=new Map((hasGameAverages?data.gameAverages:[]).map(item=>[item.gameId,item]));
  const ageGroups=data.ageGroups||{};
  const maxAge=Math.max(1,...Object.values(ageGroups).map(Number));
  app.innerHTML=`<div class="shell">${header()}<section class="dashboard analytics-page admin-page">
    <div class="analytics-head">
      <div><span class="step-label">DAILY COG · ADMIN MODE</span><h1>관리자 대시보드</h1><p>사용자 접속과 학습 활동을 한눈에 확인합니다.</p></div>
      <button class="secondary-btn" data-admin-dashboard>새로고침</button>
    </div>
    <div class="metric-grid">
      <article class="metric-card"><span>전체 사용자</span><strong>${Number(data.totalUsers)||0}<small>명</small></strong><p>현재 등록된 계정</p></article>
      <article class="metric-card accuracy-card"><span>현재 접속</span><strong><b class="online-dot"></b>${Number(data.activeUsers)||0}<small>명</small></strong><p>최근 2분 이내 활동</p></article>
      <article class="metric-card goal-card"><span>오늘 가입자</span><strong>${Number(data.todaySignups)||0}<small>명</small></strong><p>오늘 날짜 기준</p></article>
      <article class="metric-card stars-card"><span>오늘 게임 완료</span><strong>${Number(data.todaySessions)||0}<small>회</small></strong><p>오늘 생성된 학습 기록</p></article>
    </div>
    <div class="analytics-grid">
      <article class="analytics-panel">
        <div class="panel-heading"><div><span class="step-label">AGE GROUPS</span><h2>연령대별 이용 현황</h2></div></div>
        <div class="admin-age-list">${['child','teen','adult','senior','unset'].map(key=>`<div class="admin-age-row"><span>${ADMIN_AGE_LABELS[key]}</span><div><i style="width:${(Number(ageGroups[key])||0)/maxAge*100}%"></i></div><strong>${Number(ageGroups[key])||0}명</strong></div>`).join('')}</div>
      </article>
      <article class="analytics-panel">
        <div class="panel-heading"><div><span class="step-label">OVERALL GAME AVERAGES</span><h2>게임별 전체 평균 점수</h2><p>모든 사용자의 완료 기록 기준</p></div></div>
        ${hasGameAverages?`<div class="admin-game-average-list">${ALL_GAMES.map(game=>{
          const stats=gameAverageMap.get(game.id);
          const average=stats?Math.max(0,Math.min(100,Math.round(Number(stats.averageScore)||0))):0;
          const plays=stats?Math.max(0,Number(stats.playCount)||0):0;
          return `<div class="admin-game-average-row">
            <span class="admin-game-average-icon" aria-hidden="true">${game.icon}</span>
            <div class="admin-game-average-name"><strong>${game.title}</strong><small>${plays}회</small></div>
            <div class="admin-game-average-track"><i style="width:${average}%"></i></div>
            <strong class="admin-game-average-score">${plays?`${average}%`:'—'}</strong>
          </div>`;
        }).join('')}</div>`:'<div class="guardian-setup-error"><strong>게임별 평균 데이터를 불러오려면 최신 Supabase 스키마를 적용해 주세요.</strong><span><code>supabase/migrations/dashboard-upgrade.sql</code></span></div>'}
      </article>
    </div>
    <article class="analytics-panel admin-users-panel">
      <div class="admin-users-head"><div><span class="step-label">USERS</span><h2>사용자 목록</h2></div><input id="adminUserSearch" type="search" placeholder="이름 또는 이메일 검색" autocomplete="off"></div>
      <div class="admin-user-table">
        <div class="admin-user-row admin-user-header"><span>사용자</span><span>연령대</span><span>게임</span><span>평균</span><span>별</span><span>스트릭</span><span>상태</span></div>
        ${users.map(user=>`<button class="admin-user-row" type="button" data-admin-user="${escapeHtml(user.id)}" data-admin-search="${escapeHtml(`${user.name||''} ${user.email||''}`.toLowerCase())}">
          <span class="admin-user-identity"><b>${escapeHtml((user.name||'사용자').slice(0,1))}</b><i><strong>${escapeHtml(user.name||'사용자')}</strong><small>${escapeHtml(user.email||'')}</small></i></span>
          <span>${ADMIN_AGE_LABELS[user.age_group]||'미설정'}</span>
          <span>${Number(user.session_count)||0}회</span>
          <span>${Number(user.average_score)||0}%</span>
          <span><span class="star-emoji compact" aria-hidden="true">⭐</span> ${Number(user.total_stars)||0}</span>
          <span>🔥 ${Number(user.current_streak)||0}일</span>
          <span class="${isRecentlyOnline(user.last_seen_at)?'online-text':''}">${isRecentlyOnline(user.last_seen_at)?'접속 중':formatAdminDate(user.last_seen_at,true)}</span>
        </button>`).join('')}
      </div>
      <div class="empty-history admin-search-empty" id="adminSearchEmpty" hidden>검색 결과가 없습니다.</div>
      ${users.length?'':'<div class="empty-history">등록된 사용자가 없습니다.</div>'}
    </article>
  </section></div>`;
  $('#adminUserSearch').oninput=e=>{
    const query=e.currentTarget.value.trim().toLowerCase();
    let visibleCount=0;
    $$('[data-admin-search]').forEach(row=>{
      const visible=!query||row.dataset.adminSearch.includes(query);
      row.hidden=!visible;
      row.style.display=visible?'':'none';
      if(visible)visibleCount+=1;
    });
    $('#adminSearchEmpty').hidden=visibleCount>0;
  };
  $$('[data-admin-user]').forEach(button=>button.onclick=()=>loadAdminUserDetail(button.dataset.adminUser));
}

let smartNoteSaveTimer=null;
