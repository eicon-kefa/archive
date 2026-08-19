/**
 * UI 번역 텍스트 — 한국어(ko) / 영어(en)
 * 프로젝트 콘텐츠(팀명 등)는 각 프로젝트 객체의 Ko 필드에서 관리합니다.
 */

// ─── 국가명 한국어 매핑 ───────────────────────────────────────────────────────
export const COUNTRY_KO = {
  'South Korea':    '대한민국',
  'North Korea':    '북한',
  'Japan':          '일본',
  'China':          '중국',
  'Taiwan':         '대만',
  'Hong Kong':      '홍콩',
  'Mongolia':       '몽골',
  'Indonesia':      '인도네시아',
  'Philippines':    '필리핀',
  'Vietnam':        '베트남',
  'Thailand':       '태국',
  'Malaysia':       '말레이시아',
  'Singapore':      '싱가포르',
  'Myanmar':        '미얀마',
  'Cambodia':       '캄보디아',
  'Laos':           '라오스',
  'India':          '인도',
  'Pakistan':       '파키스탄',
  'Bangladesh':     '방글라데시',
  'Sri Lanka':      '스리랑카',
  'Nepal':          '네팔',
  'Kazakhstan':     '카자흐스탄',
  'Uzbekistan':     '우즈베키스탄',
  'Moldova':        '몰도바',
  'Russia':         '러시아',
  'USA':            '미국',
  'United States':  '미국',
  'Canada':         '캐나다',
  'Mexico':         '멕시코',
  'Brazil':         '브라질',
  'Argentina':      '아르헨티나',
  'Colombia':       '콜롬비아',
  'United Kingdom': '영국',
  'Germany':        '독일',
  'France':         '프랑스',
  'Spain':          '스페인',
  'Italy':          '이탈리아',
  'Netherlands':    '네덜란드',
  'Sweden':         '스웨덴',
  'Norway':         '노르웨이',
  'Finland':        '핀란드',
  'Denmark':        '덴마크',
  'Poland':         '폴란드',
  'Turkey':         '튀르키예',
  'Egypt':          '이집트',
  'Nigeria':        '나이지리아',
  'Kenya':          '케냐',
  'Rwanda':         '르완다',
  'South Africa':   '남아프리카공화국',
  'Ghana':          '가나',
  'Ethiopia':       '에티오피아',
  'Australia':      '호주',
  'New Zealand':    '뉴질랜드',
  'Saudi Arabia':   '사우디아라비아',
  'UAE':            '아랍에미리트',
  'Israel':         '이스라엘',
  'Jordan':         '요르단',
}

// ─── 테마명 한국어 매핑 ───────────────────────────────────────────────────────
export const THEME_KO = {
  'Mental Health':      '정신 건강',
  'Fitness':            '체력/운동',
  'Nutrition':          '영양',
  'Elderly Care':       '노인 돌봄',
  'Disability':         '장애',
  'Maternal Health':    '모성 건강',
  'Disease Prevention': '질병 예방',
  'Other':              '기타',
}

/** 국가명을 현재 언어로 반환. 매핑이 없으면 원문 반환. */
export function getCountryName(country, lang) {
  if (lang === 'ko') return COUNTRY_KO[country] || country
  return country
}

/** 테마명을 현재 언어로 반환. 매핑이 없으면 원문 반환. */
export function getThemeName(theme, lang) {
  if (lang === 'ko') return THEME_KO[theme] || theme
  return theme
}

// ─── 번역 텍스트 ──────────────────────────────────────────────────────────────
export const translations = {
  ko: {
    nav: {
      projects: '프로젝트',
      about: '소개',
      kefa: 'KEFA ↗',
    },
    hero: {
      badge: '제16회 e-ICON 세계대회 · 2026',
      headline: '웹앱 포트폴리오',
      sub: 'SDG 3: 건강과 웰빙',
      body: (n) =>
        `e-ICON 세계대회는 전 세계 학생 팀들이 UN 지속가능발전목표(SDGs)와 연계된 실제 문제를 해결하는 웹 애플리케이션을 설계·개발하는 대회입니다. 이 포트폴리오는 SDG 3(건강과 웰빙)을 주제로 제출된 ${n}개의 프로젝트를 소개합니다.`,
      exploreBtn: '프로젝트 살펴보기',
      learnBtn: 'e-ICON 대회 소개 ↗',
      stats: { projects: '프로젝트', focus: '집중 목표', participants: '참가자' },
      mockupTitle: '건강과 웰빙',
    },
    filter: {
      placeholder: '팀명, 프로젝트명, 학교명으로 검색…',
      countryLabel: '국가',
      themeLabel: '테마',
      all: '전체',
      results: (n) => `${n}개 프로젝트`,
    },
    card: {
      placeholder: 'PLACEHOLDER',
      teamLabel: '팀',
      schoolLabel: '학교',
      viewApp: '앱 보기 ↗',
      github: 'GitHub',
      details: '상세보기 →',
    },
    modal: {
      placeholder: 'PLACEHOLDER',
      viewApp: '앱 보기 ↗',
      github: 'GitHub 저장소',
      problem: '문제',
      solution: '해결책',
      keyFeatures: '주요 기능',
      techStack: '기술 스택',
      members: '팀원',
      teacher: '지도교사',
      close: '닫기',
    },
    gallery: {
      emptyTitle: '프로젝트가 없습니다',
      emptyBody: '검색어 또는 필터를 조정해 보세요.',
    },
    cta: {
      title: '프로젝트를 살펴볼 준비가 됐나요?',
      body: '전 세계 학생들이 직접 개발한 웹 애플리케이션들을 통해 미래 헬스테크의 가능성을 확인해 보세요.',
      btn: '모든 프로젝트 보기',
    },
    footer: {
      edition: '제16회 · 2026',
      colContest: '대회',
      aboutEicon: 'e-ICON 소개',
      gallery: '프로젝트 갤러리',
      colHost: '주최·주관',
      hostLabel: '주최',
      hostName: '교육부',
      hostUrl: 'https://www.moe.go.kr/',
      organLabel: '주관',
      organName: '한국디지털교육협회 (KEFA)',
      organUrl: 'https://kefa.or.kr/',
      colFocus: '집중 목표',
      copy1: (y) => `© ${y} 한국디지털교육협회 (KEFA). All rights reserved.`,
      copy2: '주최: 교육부 · 주관: 한국디지털교육협회 · 제16회 e-ICON 세계대회',
    },
  },

  en: {
    nav: {
      projects: 'Projects',
      about: 'About',
      kefa: 'KEFA ↗',
    },
    hero: {
      badge: '16th e-ICON World Contest · 2026',
      headline: 'Web App Portfolio',
      sub: 'SDG 3: Health & Well-being',
      body: (n) =>
        `The e-ICON World Contest challenges student teams from across the globe to design and build web applications that address real-world problems aligned with the UN Sustainable Development Goals. This portfolio showcases the ${n} projects submitted for SDG 3 — Good Health and Well-being.`,
      exploreBtn: 'Explore Projects',
      learnBtn: 'Learn about e-ICON ↗',
      stats: { projects: 'Projects', focus: 'Focus Area', participants: 'Participants' },
      mockupTitle: 'Health & Well-being',
    },
    filter: {
      placeholder: 'Search by team, project, or school…',
      countryLabel: 'Country',
      themeLabel: 'Theme',
      all: 'All',
      results: (n) => `${n} project${n !== 1 ? 's' : ''}`,
    },
    card: {
      placeholder: 'PLACEHOLDER',
      teamLabel: 'Team',
      schoolLabel: 'School',
      viewApp: 'View App ↗',
      github: 'GitHub',
      details: 'Details →',
    },
    modal: {
      placeholder: 'PLACEHOLDER',
      viewApp: 'View App ↗',
      github: 'GitHub Repository',
      problem: 'Problem',
      solution: 'Solution',
      keyFeatures: 'Key Features',
      techStack: 'Tech Stack',
      members: 'Team Members',
      teacher: 'Supervising Teacher',
      close: 'Close',
    },
    gallery: {
      emptyTitle: 'No projects found',
      emptyBody: 'Try adjusting your search or filter.',
    },
    cta: {
      title: 'Ready to explore the projects?',
      body: 'These student-built web applications represent the future of health technology — built by the next generation of developers across the globe.',
      btn: 'Browse All Projects',
    },
    footer: {
      edition: '16th Edition · 2026',
      colContest: 'Contest',
      aboutEicon: 'About e-ICON',
      gallery: 'Project Gallery',
      colHost: 'Host & Organizer',
      hostLabel: 'Host',
      hostName: 'Ministry of Education, Korea',
      hostUrl: 'https://english.moe.go.kr/',
      organLabel: 'Organizer',
      organName: 'Korea Digital Education Frontiers Association (KEFA)',
      organUrl: 'https://kefa.or.kr/e_main.php',
      colFocus: 'Focus',
      copy1: (y) => `© ${y} Korea Digital Education Frontiers Association (KEFA). All rights reserved.`,
      copy2: 'Host: Ministry of Education · Organizer: KEFA · 16th e-ICON World Contest',
    },
  },
}
