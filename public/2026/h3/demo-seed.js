// 심사·데모용 로컬 계정 시드 (정적 배포 전용).
// Supabase 없이 동작하는 로컬 모드 저장 형식(dcCredentials / dcAccount:*)에
// 데모 계정 2개(보호자 + 자녀)와 활동 기록을 미리 채워 넣는다.
// 데모 계정: demo@dailycog.kr / demo1234 · 자녀: demo-child@dailycog.kr / demo1234
(function () {
  const VERSION_KEY = 'dcDemoSeedVersion';
  const VERSION = '1';
  const PARENT_EMAIL = 'demo@dailycog.kr';
  const CHILD_EMAIL = 'demo-child@dailycog.kr';
  try {
    if (localStorage.getItem(VERSION_KEY) === VERSION) return;

    // SHA-256(`${salt}:demo1234`) 사전 계산값 — app.js verifyLocalCredential 형식과 동일.
    const PARENT_CREDENTIAL = {
      email: PARENT_EMAIL, name: 'Demo',
      salt: '5f3a9c1e7b2d4680a1c3e5f709b8d246',
      hash: '52624ae6d861564e95ec41a3add06023ffa808fb25740848837a798be0469300',
      createdAt: new Date(Date.now() - 22 * 864e5).toISOString()
    };
    const CHILD_CREDENTIAL = {
      email: CHILD_EMAIL, name: 'Dami',
      salt: '9d2b6e4a8c0f1357b9d1f3a5c7e90284',
      hash: 'ee3482348e3ae69752d92adb629c319ef53fced9795f3de39eda78701fc330e9',
      createdAt: new Date(Date.now() - 15 * 864e5).toISOString()
    };

    let prngState = 20260820;
    const random = () => {
      prngState |= 0; prngState = (prngState + 0x6D2B79F5) | 0;
      let t = Math.imul(prngState ^ (prngState >>> 15), 1 | prngState);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const pick = list => list[Math.floor(random() * list.length)];
    const between = (min, max) => Math.round(min + random() * (max - min));
    const starsFor = score => score >= 85 ? 3 : score >= 62 ? 2 : score >= 38 ? 1 : 0;

    // record: {gameId, difficulty, score, accuracy, stars, durationSeconds, completedAt}
    function makeSessions(days, perDayMin, perDayMax, games, scoreMin, scoreMax) {
      const sessions = [];
      for (let dayOffset = days - 1; dayOffset >= 0; dayOffset--) {
        const count = between(perDayMin, perDayMax);
        for (let index = 0; index < count; index++) {
          const score = between(scoreMin, scoreMax);
          const playedAt = new Date(Date.now() - dayOffset * 864e5);
          playedAt.setHours(between(9, 20), between(0, 59), between(0, 59), 0);
          if (playedAt.getTime() > Date.now()) playedAt.setTime(Date.now() - between(60e3, 36e5));
          sessions.push({
            gameId: pick(games),
            difficulty: pick(['easy', 'easy', 'medium']),
            score,
            accuracy: Math.min(100, score + between(0, 12)),
            stars: starsFor(score),
            durationSeconds: between(45, 90),
            completedAt: playedAt.toISOString()
          });
        }
      }
      sessions.sort((a, b) => a.completedAt < b.completedAt ? -1 : 1);
      return sessions;
    }

    function aggregateScores(sessions) {
      const scores = {};
      sessions.forEach(session => {
        const entry = scores[session.gameId] || { best: 0, plays: 0, last: session.completedAt };
        entry.best = Math.max(entry.best, session.score);
        entry.plays += 1;
        if (session.completedAt > entry.last) entry.last = session.completedAt;
        scores[session.gameId] = entry;
      });
      return scores;
    }

    const assessmentAt = offsetDays => {
      const startedAt = new Date(Date.now() - offsetDays * 864e5);
      startedAt.setHours(10, 12, 0, 0);
      return { startedAt: startedAt.toISOString(), completedAt: new Date(startedAt.getTime() + 42 * 60e3).toISOString() };
    };

    // ── 보호자(성인) 계정 ────────────────────────────────────────────────
    const parentGames = ['dccs', 'gonogo', 'flanker', 'board', 'audio', 'ufovadult', 'multiteen', 'pictureword'];
    const parentSessions = makeSessions(21, 2, 4, parentGames, 42, 96);
    const parentSpent = 100 + 3 + 5 + 4; // 성견 성장 100 + 라벤더 캡 3 + 선글라스 5 + 라벤더 목도리 4
    while (parentSessions.reduce((sum, session) => sum + session.stars, 0) < parentSpent + 6) {
      const boostAt = new Date(Date.now() - between(1, 20) * 864e5);
      boostAt.setHours(between(9, 20), between(0, 59), 0, 0);
      parentSessions.push({ gameId: pick(parentGames), difficulty: 'medium', score: between(86, 97), accuracy: between(90, 100), stars: 3, durationSeconds: between(50, 80), completedAt: boostAt.toISOString() });
    }
    const parentAssessment = assessmentAt(21);
    const parentAccount = {
      age: 'adult', birthDate: '1978-03-15', country: 'KR',
      scores: aggregateScores(parentSessions),
      gameSessions: parentSessions,
      difficulties: { dccs: 'medium', gonogo: 'medium' },
      settings: null, avatarUrl: null,
      shop: {
        owned: ['lavender_cap', 'sunglasses', 'lavender_scarf'],
        treats: { biscuit: 2, chicken: 1, cake: 0 },
        fedUntil: 0, lastTreat: 'biscuit', growthStage: 'adult',
        equipped: { hat: 'lavender_cap', scarf: 'lavender_scarf' },
        spent: parentSpent
      },
      smartNote: { content: '데모 메모: 매일 아침 10분 루틴 → 이번 주 목표는 별 9개!\nDemo note: 10-minute routine every morning — this week\'s goal is 9 stars!', pinned: false, collapsed: false },
      assessment: {
        scores: { dccs: 82, htks: 76, dualteen: 68, multiteen: 64, gonogo: 71, ufovadult: 58, ufovsenior: 62, flanker: 74, audio: 66, board: 79, pictureword: 88, soundletter: 84 },
        attemptId: 1, startedAt: parentAssessment.startedAt, completedAt: parentAssessment.completedAt, active: false
      },
      flashcards: [
        { id: 'demo-card-1', front: '해마 (Hippocampus)', back: '기억을 만드는 뇌 부위 / The brain region that forms new memories', category: '두뇌 상식', createdAt: new Date(Date.now() - 12 * 864e5).toISOString() },
        { id: 'demo-card-2', front: '작업기억 (Working memory)', back: '정보를 잠시 붙잡아 두고 조작하는 능력 / Holding and using information for a short time', category: '두뇌 상식', createdAt: new Date(Date.now() - 11 * 864e5).toISOString() },
        { id: 'demo-card-3', front: '오늘의 루틴', back: '게임 3개 × 10분, 별 9개 모으기 / Three games in 10 minutes, collect 9 stars', category: '일반', createdAt: new Date(Date.now() - 6 * 864e5).toISOString() },
        { id: 'demo-card-4', front: '인지 예비능 (Cognitive reserve)', back: '뇌가 손상에 버티는 여유 능력 / The brain\'s resilience built through lifelong activity', category: '두뇌 상식', createdAt: new Date(Date.now() - 3 * 864e5).toISOString() }
      ],
      guardianLinks: [CHILD_EMAIL]
    };

    // ── 자녀(유아) 계정 ─────────────────────────────────────────────────
    const childGames = ['dccs', 'htks', 'gonogo', 'board', 'pictureword', 'soundletter', 'audio'];
    const childSessions = makeSessions(14, 1, 3, childGames, 35, 90);
    const todayPlay = new Date(); todayPlay.setHours(Math.min(new Date().getHours(), 16), 5, 0, 0);
    if (todayPlay.getTime() > Date.now()) todayPlay.setTime(Date.now() - 5 * 60e3);
    childSessions.push({ gameId: 'board', difficulty: 'easy', score: 72, accuracy: 80, stars: 2, durationSeconds: 66, completedAt: todayPlay.toISOString() });
    const childAssessment = assessmentAt(14);
    const childAccount = {
      age: 'child', birthDate: '2017-06-20', country: 'KR',
      scores: aggregateScores(childSessions),
      gameSessions: childSessions,
      difficulties: {}, settings: null, avatarUrl: null,
      shop: { owned: [], treats: { biscuit: 1, chicken: 0, cake: 0 }, fedUntil: 0, lastTreat: null, growthStage: 'baby', equipped: {}, spent: 0 },
      smartNote: { content: '', pinned: false, collapsed: false },
      assessment: {
        scores: { dccs: 66, htks: 71, dualteen: 55, multiteen: 52, gonogo: 68, ufovadult: 49, ufovsenior: 57, flanker: 63, audio: 60, board: 74, pictureword: 78, soundletter: 69 },
        attemptId: 1, startedAt: childAssessment.startedAt, completedAt: childAssessment.completedAt, active: false
      },
      flashcards: [], guardianLinks: []
    };

    // 기존 사용자 계정은 건드리지 않고 데모 항목만 추가/갱신한다.
    let credentials = {};
    try { credentials = JSON.parse(localStorage.getItem('dcCredentials') || '{}') || {}; } catch (error) { credentials = {}; }
    credentials[PARENT_EMAIL] = PARENT_CREDENTIAL;
    credentials[CHILD_EMAIL] = CHILD_CREDENTIAL;
    localStorage.setItem('dcCredentials', JSON.stringify(credentials));
    localStorage.setItem('dcAccount:' + encodeURIComponent(PARENT_EMAIL), JSON.stringify(parentAccount));
    localStorage.setItem('dcAccount:' + encodeURIComponent(CHILD_EMAIL), JSON.stringify(childAccount));
    localStorage.setItem(VERSION_KEY, VERSION);
  } catch (error) {
    console.warn('Demo seed skipped:', error);
  }
})();
