/**
 * e-ICON World Contest — Project Data
 *
 * HOW TO ADD A NEW TEAM:
 * 1. Copy one of the existing objects below (from { to the closing },)
 * 2. Paste it at the end of the array (before the closing ])
 * 3. Fill in all fields — use "" for anything not yet available
 * 4. Increment the `id` by 1 from the last entry
 * 5. Save the file — the site rebuilds automatically (or redeploy to Vercel)
 *
 * FIELD GUIDE (영문 필드 + 한국어 필드 쌍으로 구성):
 *   id              — 고유 번호, 마지막 항목보다 1 증가
 *   teamName        — 팀 코드 (예: "M1", "H6")
 *   country         — 국가명 영문 (필터에 사용됨, 반드시 영문으로)
 *   school          — 국내 학교/기관명 (한국어)
 *   schoolEn        — 국내 학교/기관명 (영문) — 영문 홈페이지에서 사용
 *   schoolOverseas  — 해외 파트너 학교/기관명 (없으면 "")
 *   projectTitle    — 프로젝트/웹앱 제목 (한국어)
 *   projectTitleEn  — 프로젝트/웹앱 제목 (영문) — 영문 홈페이지에서 사용
 *   theme           — 아래 테마 값 중 하나 선택
 *                     "Mental Health" | "Fitness" | "Nutrition" | "Elderly Care" |
 *                     "Disability" | "Maternal Health" | "Disease Prevention" | "Other"
 *   problem         — SDG 3 관련 문제 설명 (영문, 1–2문장)
 *   problemKo       — SDG 3 관련 문제 설명 (한국어, 1–2문장)
 *   solution        — 해결 방법 설명 (영문, 1–2문장)
 *   solutionKo      — 해결 방법 설명 (한국어, 1–2문장)
 *   description     — 카드에 표시될 짧은 설명 (영문, ≤ 120자)
 *   descriptionKo   — 카드에 표시될 짧은 설명 (한국어, ≤ 60자)
 *   keyFeatures     — 주요 기능 목록 (영문 배열, 3–5개)
 *   keyFeaturesKo   — 주요 기능 목록 (한국어 배열, 3–5개)
 *   techStack       — 사용 기술 목록 (배열)
 *   members         — 팀원 이름 목록 (영문 배열)
 *   membersKo       — 팀원 이름 목록 (국문/영문 혼용 배열 — 한국 팀원은 국문, 해외 팀원은 영문)
 *   teacher         — 지도교사 이름 "국내 · 해외" 형식 (영문)
 *   teacherKo       — 지도교사 이름 "국내 · 해외" 형식 (국내는 국문, 해외는 영문)
 *   deployUrl       — 배포된 웹앱 URL (없으면 "")
 *   githubUrl       — GitHub 저장소 URL (없으면 "")
 *   thumbnail       — 썸네일 이미지 경로 (없으면 "")
 *                     예: "/images/m1-gloship.png"
 *                     이미지 파일은 public/images/ 폴더에 넣어야 합니다.
 *   htmlPath        — 팀 앱 HTML 경로 (없으면 "")
 *                     예: "/2026/m1/index.html"
 *                     팀 파일은 public/2026/m1/ 폴더에 통째로 넣어야 합니다.
 *                     (기술담당 멘토들이 정적 변환 후 이 경로에 맞춰 PR 제출)
 *
 * ─── 제16회 e-ICON 세계대회 — 글로벌팀 본선 데이터 (260806 최종) ───────────
 */

export const projects = [
  // ─── M1 — GloShip (하계중학교 · Indonesia) ─────────────────────────────────
  {
    id: 1,
    teamName: "M1",
    country: "Indonesia",
    school: "하계중학교",
    schoolEn: "Hagye Middle School",
    schoolOverseas: "SMK Telkom Malang",
    projectTitle: "GloShip — 청소년 정서 자가관리 AI 플랫폼",
    projectTitleEn: "GloShip — AI Platform for Teen Emotional Self-Care",
    theme: "Mental Health",
    problem:
      "Teenagers often lack tools to self-manage their emotions and catch early mental health warning signs before problems require clinical diagnosis.",
    problemKo:
      "청소년들은 정신건강 문제가 진단 단계에 이르기 전, 정서를 스스로 관리하고 조기에 위험 신호를 확인할 도구가 부족합니다.",
    solution:
      "An AI web platform combining MoodMap for emotion logging and visualization, MoveMates for AI-recommended peer activities, and BridgeCare for detecting risk signals and connecting users to professional support.",
    solutionKo:
      "감정을 기록·시각화하는 MoodMap, AI 기반 또래 활동 추천 MoveMates, 위험 신호를 감지해 전문기관과 연계하는 BridgeCare로 구성된 AI 웹 플랫폼입니다.",
    description:
      "Helping teens track emotions, get AI-matched peer support, and connect early warning signs to professional help.",
    descriptionKo:
      "감정 기록, AI 또래 매칭, 위험 신호 조기연계까지 지원하는 청소년 정서관리 플랫폼입니다.",
    keyFeatures: [
      "Daily mood tracking & pattern visualization (MoodMap)",
      "AI-matched peer activity recommendations (MoveMates)",
      "Risk signal detection & professional referral (BridgeCare)",
    ],
    keyFeaturesKo: [
      "감정 기록 및 변화 패턴 시각화 (MoodMap)",
      "AI 기반 맞춤형 또래 활동 추천 (MoveMates)",
      "위험 신호 확인 및 전문기관 연계 (BridgeCare)",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Claude Haiku 4.5 API"],
    members: ["Wonjin Choi", "Gyudo Park", "Abravia Mouzahra Ramadhani", "Shabri Sebastian Siregar"],
    membersKo: ["최원진", "박규도", "Abravia Mouzahra Ramadhani", "Shabri Sebastian Siregar"],
    teacher: "Woohong Seol · Muhamad Arifin",
    teacherKo: "설우홍 · Muhamad Arifin",
    deployUrl: "",
    githubUrl: "https://github.com/16th-eicon-contest/m1-UriKita",
    thumbnail: "/images/m1-gloship.png",
    htmlPath: "/2026/m1/index.html",
  },

  // ─── M2 — Bloom (울산학성중학교 · Malaysia) ────────────────────────────────
  {
    id: 2,
    teamName: "M2",
    country: "Malaysia",
    school: "울산학성중학교",
    schoolEn: "Ulsan Hakseong Middle School",
    schoolOverseas: "SMK Kunak",
    projectTitle: "Bloom — 청소년 금연·니코틴 관리 웹앱",
    projectTitleEn: "Bloom — Teen Smoking & Nicotine Cessation Web App",
    theme: "Disease Prevention",
    problem:
      "Teenagers struggling with smoking and nicotine dependence often lack immediate, anonymous tools to manage cravings and build cessation habits.",
    problemKo:
      "청소년들은 흡연과 니코틴 의존에서 벗어나고 싶어도 즉각적인 대응 도구나 익명으로 지원받을 방법이 없어 어려움을 겪습니다.",
    solution:
      "An anonymous web app that logs smoking habits, answers each craving with an evidence-based WHO 4D action, explains every insight with the rule behind it, and rewards progress through a digital recovery garden. It runs entirely in the browser, so nothing has to leave the teen's device.",
    solutionKo:
      "흡연 기록, 근거 기반 WHO 4D 대처 퀘스트, 판단 근거를 그대로 보여주는 투명한 분석, 디지털 회복 정원으로 금연을 돕는 익명 웹앱입니다. 전부 브라우저 안에서 동작해 데이터를 기기 밖으로 내보내지 않습니다.",
    description:
      "An anonymous app helping teens quit smoking through WHO 4D coping quests, explainable insights, and a recovery garden.",
    descriptionKo:
      "흡연 기록, WHO 4D 대처 퀘스트, 설명가능 분석으로 청소년의 금연을 돕는 익명 웹앱입니다.",
    keyFeatures: [
      "Daily check-in that logs the trigger and returns a matched coping strategy",
      "Evidence-based WHO 4D quests matched to the user's situation and urge level",
      "Explainable insights — every conclusion shows the rule that produced it",
      "Digital recovery garden with rewards",
      "Four languages (English, Korean, Chinese, Malay), running fully on-device",
    ],
    keyFeaturesKo: [
      "트리거를 기록하고 맞춤 대처법을 돌려주는 데일리 체크인",
      "상황과 충동 강도에 맞춘 근거 기반 WHO 4D 퀘스트",
      "판단 근거를 그대로 보여주는 설명가능 분석(XAI)",
      "보상형 디지털 회복 정원",
      "4개 언어 지원 · 전 기능 기기 내 동작",
    ],
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "Supabase"],
    members: ["Chanhyeok Park", "Haon Kim", "Amber Chai", "Siti Aishya"],
    membersKo: ["박찬혁", "김하온", "Amber Chai", "Siti Aishya"],
    teacher: "Jeongmi Kwon · Suhaili Sulaiman",
    teacherKo: "권정미 · Suhaili Sulaiman",
    deployUrl: "https://m2-aura.vercel.app",
    githubUrl: "https://github.com/16th-eicon-contest/m2-AURA",
    thumbnail: "/images/m2-bloom.png",
    htmlPath: "/2026/m2/index.html",
  },

  // ─── M3 — IEUM (대구공산중학교 · Philippines) ──────────────────────────────
  {
    id: 3,
    teamName: "M3",
    country: "Philippines",
    school: "대구공산중학교",
    schoolEn: "Daegu Gongsan Middle School",
    schoolOverseas: "Cavite Science Integrated School",
    projectTitle: "IEUM — 웨어러블 기반 정신건강 관리 AI 플랫폼",
    projectTitleEn: "IEUM — Wearable-Based AI Mental Health Platform",
    theme: "Mental Health",
    problem:
      "Young people often struggle to recognize their own mental health state and connect with professional support when they need it.",
    problemKo:
      "청년층은 자신의 정신건강 상태를 스스로 인식하고 필요할 때 전문 상담과 연결되는 데 어려움을 겪습니다.",
    solution:
      "An AI platform combining EUM Living Twin (a biometric-driven emotional avatar), PsychConnect (AI emotional care with instant access to professional counselors), and IEUM Bamboo Forest (an anonymous peer support community).",
    solutionKo:
      "웨어러블 생체 데이터로 감정 아바타를 생성하는 EUM Living Twin, AI 감정 케어와 전문 상담사 연결을 지원하는 PsychConnect, 익명 또래 커뮤니티 IEUM Bamboo Forest로 구성된 AI 플랫폼입니다.",
    description:
      "A wearable-driven AI platform visualizing emotions and connecting at-risk youth to counselors and peers.",
    descriptionKo:
      "웨어러블 생체 데이터 기반 감정 시각화와 전문 상담 연계를 지원하는 AI 플랫폼입니다.",
    keyFeatures: [
      "Biometric-based emotional avatar (EUM Living Twin)",
      "AI emotional care & instant counselor connection (PsychConnect)",
      "Anonymous peer support community (Bamboo Forest)",
    ],
    keyFeaturesKo: [
      "웨어러블 생체 데이터 기반 감정 아바타 (EUM Living Twin)",
      "AI 감정 케어 및 전문 상담사 즉시 연결 (PsychConnect)",
      "익명 또래 감정 공유 커뮤니티 (Bamboo Forest)",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Groq AI", "Fitbit API"],
    members: ["Jiyoon Kim", "Yunseo Choi", "Faustin Vien Hermosura", "Rosyth Anne Mendoza"],
    membersKo: ["김지윤", "최윤서", "Faustin Vien Hermosura", "Rosyth Anne Mendoza"],
    teacher: "Kwangyoon Song · John Edsel Varias",
    teacherKo: "송광윤 · John Edsel Varias",
    deployUrl: "",
    githubUrl: "https://github.com/16th-eicon-contest/m3-app",
    thumbnail: "/images/m3-ieum.png",
    htmlPath: "/2026/m3/index.html",
  },

  // ─── M4 — LightHouse (성재중학교 · Bangladesh) ─────────────────────────────
  {
    id: 4,
    teamName: "M4",
    country: "Bangladesh",
    school: "성재중학교",
    schoolEn: "Seongjae Middle School",
    schoolOverseas: "Dhaka Residential Model College",
    projectTitle: "LightHouse — 청소년 디지털·수면 습관 AI 코칭 플랫폼",
    projectTitleEn: "LightHouse — AI Coaching Platform for Teen Digital & Sleep Habits",
    theme: "Mental Health",
    problem:
      "Teenagers struggle to build healthy digital and sleep habits, and lack consistent coaching tools to sustain the change.",
    problemKo:
      "청소년들은 건강한 디지털·수면 습관을 형성하는 데 어려움을 겪지만, 이를 꾸준히 이끌어줄 코칭 도구가 부족합니다.",
    solution:
      "A global coaching platform combining a Personal Pattern Engine that visualizes weekly balance from a 30-second daily check-in, personalized real-life wellness challenges, and Lumi, a CBT/DBT-based AI companion with guardian/teacher connection.",
    solutionKo:
      "일일 체크인으로 삶의 균형을 시각화하는 Personal Pattern Engine, 맞춤형 실생활 챌린지, CBT/DBT 기반 AI 동반자 Lumi로 구성된 글로벌 협력 코칭 플랫폼입니다.",
    description:
      "An AI coaching platform tracking sleep and digital habits with global challenges and a CBT/DBT companion.",
    descriptionKo:
      "수면·디지털 습관을 추적하고 글로벌 챌린지와 AI 코칭을 제공하는 청소년 웰빙 플랫폼입니다.",
    keyFeatures: [
      "30-second daily check-in & weekly pattern visualization",
      "Personalized wellness experiments & global co-op challenges",
      "CBT/DBT-based AI companion with crisis hotline connection",
      "Consent-based guardian/teacher progress sharing",
    ],
    keyFeaturesKo: [
      "30초 일일 체크인 및 주간 패턴 시각화",
      "맞춤형 웰니스 실험 및 글로벌 협력 챌린지",
      "CBT·DBT 기반 AI 동반자 및 위기 상담 연결",
      "동의 기반 보호자·교사 성장 신호 공유",
    ],
    techStack: ["React", "Vite", "PWA", "TypeScript", "Express.js", "SQLite", "OpenAI API"],
    members: ["Junmo Kim", "Yoonkyu Lee", "Aranya Abeer Khan Prapya", "Md Shafiul Alam Siddiqee Shrestha"],
    membersKo: ["김준모", "이윤규", "Aranya Abeer Khan Prapya", "Md Shafiul Alam Siddiqee Shrestha"],
    teacher: "Sunyoung Yoon · Sayed Mahbub Hasan Amiri",
    teacherKo: "윤선영 · Sayed Mahbub Hasan Amiri",
    deployUrl: "",
    githubUrl: "https://github.com/16th-eicon-contest/m4-arupbit",
    thumbnail: "/images/m4-lighthouse.jpg",
    htmlPath: "/2026/m4/index.html",
  },

  // ─── H1 — SnapCare (충남삼성고등학교 · Moldova) ────────────────────────────
  {
    id: 5,
    teamName: "H1",
    country: "Moldova",
    school: "충남삼성고등학교",
    schoolEn: "Chungnam Samsung High School",
    schoolOverseas: "IPLT \"Gheorghe Asachi\"",
    projectTitle: "SnapCare — 이미지·음성 기반 AI 건강관리 웹앱",
    projectTitleEn: "SnapCare — Image & Voice-Based AI Health Management App",
    theme: "Nutrition",
    problem:
      "Low-literacy and medically underserved populations struggle to understand meal/nutrition information and prescriptions, and to manage medication routines.",
    problemKo:
      "저문해·의료취약계층은 식사·영양 정보나 처방전을 이해하고 복약을 관리하는 데 어려움을 겪습니다.",
    solution:
      "An AI health app that auto-detects meals, nutrition labels, or prescriptions from a single photo, tracks medication schedules with reminders, and uses a voice/emoji-based UI accessible to low-literacy users.",
    solutionKo:
      "사진 한 장으로 식사·영양성분표·처방전을 자동 판별하고, 복약 시간을 알림으로 추적하며, 음성·이모지 기반 UI로 문해력이 낮은 사용자도 쉽게 이용할 수 있는 AI 건강관리 웹앱입니다.",
    description:
      "A photo-based AI health app helping low-literacy users manage meals, nutrition, and medication easily.",
    descriptionKo:
      "사진 한 장으로 식사·영양·복약을 관리하는 저문해층 대상 AI 건강관리 앱입니다.",
    keyFeatures: [
      "Automatic photo-based meal/nutrition/prescription detection",
      "Medication tracking & reminders",
      "Voice and emoji-based low-literacy accessibility layer",
    ],
    keyFeaturesKo: [
      "사진 기반 식사·영양성분표·처방전 자동 판별",
      "복약 추적 및 알림",
      "음성·이모지 조합 저문해 접근성 레이어",
    ],
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "onnxruntime-web", "Anthropic API"],
    members: ["Dohun Kim", "Yunsu Nam", "Daniel Stanchevici", "Cristian Rudico"],
    membersKo: ["김도훈", "남윤수", "Daniel Stanchevici", "Cristian Rudico"],
    teacher: "Jeongseok Lee · Natalia Schitco",
    teacherKo: "이정석 · Natalia Schitco",
    deployUrl: "https://snapcare.fly.dev",
    githubUrl: "https://github.com/16th-eicon-contest/h1-SnapCare",
    thumbnail: "/images/h1-snapcare.png",
    htmlPath: "/2026/h1/index.html",
  },

  // ─── H2 — ReNew (대전대신고등학교 · Rwanda) ────────────────────────────────
  {
    id: 6,
    teamName: "H2",
    country: "Rwanda",
    school: "대전대신고등학교",
    schoolEn: "Daejeon Daesin High School",
    schoolOverseas: "Rwanda Coding Academy",
    projectTitle: "ReNew — 오프라인 우선 청소년 정신건강 플랫폼",
    projectTitleEn: "ReNew — Offline-First Teen Mental Health Platform",
    theme: "Mental Health",
    problem:
      "Vulnerable youth struggle to access daily recovery support connected to community health workers, and few mental health tools work reliably in low-connectivity environments.",
    problemKo:
      "취약 청소년은 마을 보건 도우미와 연계된 일상 회복 지원을 받기 어렵고, 인터넷이 불안정한 환경에서는 이용 가능한 정신건강 도구가 부족합니다.",
    solution:
      "A mental health platform where AI recommends personalized missions from check-in data, tracks mission completion via SMS/photo analysis, and keeps working offline using a browser-cached AI model that syncs once reconnected.",
    solutionKo:
      "AI가 체크인 데이터를 분석해 맞춤 미션을 추천하고, SMS·사진 기반으로 미션 수행을 자동 추적하며, 오프라인에서도 브라우저 캐싱된 AI 모델로 동작하는 정신건강 플랫폼입니다.",
    description:
      "An offline-first AI platform recommending recovery missions and tracking progress for vulnerable youth.",
    descriptionKo:
      "AI 미션 추천과 자동 추적으로 오프라인에서도 작동하는 청소년 회복 지원 플랫폼입니다.",
    keyFeatures: [
      "AI-recommended missions from check-in data",
      "Automatic mission tracking via SMS/OCR/photo analysis",
      "Offline-first operation with browser-cached AI model",
    ],
    keyFeaturesKo: [
      "체크인 데이터 기반 AI 미션 추천",
      "SMS·OCR·사진 분석 기반 자동 미션 추적",
      "오프라인 우선 동작 (브라우저 캐싱 AI 모델)",
    ],
    techStack: ["React 19", "TypeScript", "Vite", "Node.js", "Express", "Supabase", "MLC WebLLM", "Gemini API"],
    members: ["Sunmin Kim", "Ryan Ahn Song", "Bruce Nibeza Mugisha", "Chaste Ganza Muganamfura"],
    membersKo: ["김선민", "송리안", "Bruce Nibeza Mugisha", "Chaste Ganza Muganamfura"],
    teacher: "Jeongeun Park · Projecte Habyarimana",
    teacherKo: "박정은 · Projecte Habyarimana",
    deployUrl: "",
    githubUrl: "https://github.com/16th-eicon-contest/h2-ARK",
    thumbnail: "/images/h2-renew.jpg",
    htmlPath: "/2026/h2/index.html",
  },

  // ─── H3 — Daily Cog (부산기계공업고등학교 · Uzbekistan) ────────────────────
  {
    id: 7,
    teamName: "H3",
    country: "Uzbekistan",
    school: "부산기계공업고등학교",
    schoolEn: "Busan Mechanical Technical High School",
    schoolOverseas: "The State Secondary School 355 & Presidential School in Tashkent",
    projectTitle: "Daily Cog — AI 맞춤형 두뇌훈련 웹앱",
    projectTitleEn: "Daily Cog — AI-Personalized Brain Training Web App",
    theme: "Disease Prevention",
    problem:
      "Preventing dementia and maintaining cognitive health requires consistent brain training, but few tools sustain long-term engagement.",
    problemKo:
      "치매를 예방하고 인지 건강을 유지하려면 꾸준한 두뇌 훈련이 필요하지만, 지속적인 참여를 이끌어낼 도구가 부족합니다.",
    solution:
      "An AI brain-training web app combining DailyCog Play (12 cognitive games with personalized activity recommendations), Puppy Buddy (a gamified virtual pet), and ShareCare (a caregiver dashboard with engagement alerts).",
    solutionKo:
      "12개 인지 게임으로 인지 특성을 평가하고 맞춤 활동을 추천하는 DailyCog Play, 가상 반려견을 키우는 Puppy Buddy, 보호자용 대시보드 ShareCare로 구성된 AI 두뇌훈련 웹앱입니다.",
    description:
      "An AI cognitive training app using games, a virtual pet, and a caregiver dashboard to sustain engagement.",
    descriptionKo:
      "인지 게임과 가상 반려견, 보호자 대시보드로 꾸준한 두뇌훈련을 돕는 AI 앱입니다.",
    keyFeatures: [
      "12 cognitive games with personalized activity recommendations",
      "Gamified virtual pet rewards (Puppy Buddy)",
      "Caregiver dashboard with engagement alerts (ShareCare)",
    ],
    keyFeaturesKo: [
      "12개 인지 게임 기반 맞춤 활동 추천",
      "가상 반려견 게이미피케이션 (Puppy Buddy)",
      "보호자용 대시보드 및 참여 독려 알림 (ShareCare)",
    ],
    techStack: ["Vanilla JavaScript", "Node.js", "Supabase", "OpenAI API", "Google OAuth 2.0"],
    members: ["Jiho Park", "Suhyeon Wang", "Aziza Abdiganieva", "Parvina Bakhodirova"],
    membersKo: ["박지호", "왕수현", "Aziza Abdiganieva", "Parvina Bakhodirova"],
    teacher: "Hanyu Yun · Sabokhat Makhmudova",
    teacherKo: "윤한유 · Sabokhat Makhmudova",
    deployUrl: "",
    githubUrl: "https://github.com/16th-eicon-contest/h3-Scooby-Doo",
    thumbnail: "/images/h3-dailycog.png",
    htmlPath: "/2026/h3/index.html",
  },

  // ─── H4 — HERWORLD (대덕소프트웨어마이스터고등학교 · Indonesia) ────────────
  {
    id: 8,
    teamName: "H4",
    country: "Indonesia",
    school: "대덕소프트웨어마이스터고등학교",
    schoolEn: "Daeduk Software Meister High School",
    schoolOverseas: "USG Education",
    projectTitle: "HERWORLD — 갱년기 여성 건강관리 AI 웹앱",
    projectTitleEn: "HERWORLD — AI Health App for Menopause Management",
    theme: "Other",
    problem:
      "Women going through menopause often lack the information and tools needed to manage symptoms, medications, and prepare for medical visits.",
    problemKo:
      "갱년기 여성은 증상과 복약을 관리하고 진료를 준비하는 데 필요한 정보와 도구가 부족합니다.",
    solution:
      "An AI health app combining Daily Log & AI Insights for symptom tracking, Medication Safety for analyzing prescriptions and interactions, and AI Chat & Doctor Report for generating shareable consultation reports.",
    solutionKo:
      "일상 증상을 기록하고 AI 인사이트를 제공하는 Daily Log, 의약품 정보를 분석하는 Medication Safety, 의료진 상담용 보고서를 생성하는 AI Chat & Doctor Report로 구성된 AI 건강관리 웹앱입니다.",
    description:
      "An AI app helping women track menopause symptoms, manage medication safety, and prep doctor visits.",
    descriptionKo:
      "갱년기 증상 기록과 복약 안전 분석, 의료진 상담 보고서를 지원하는 AI 여성건강 앱입니다.",
    keyFeatures: [
      "Daily symptom logging with AI pattern insights",
      "Photo-based medication label analysis & safety warnings",
      "Bilingual AI chat for menopause health questions",
      "Shareable doctor consultation report (PDF/CSV)",
    ],
    keyFeaturesKo: [
      "일상 증상 기록 및 AI 인사이트 제공",
      "사진 기반 의약품 정보 추출 및 주의사항 분석",
      "한국어·영어 AI 건강 상담 챗봇",
      "의료진 상담용 보고서 생성 및 공유",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Prisma", "SQLite", "Claude API"],
    members: ["Woohyun Nam", "Yunho Jang", "Hadassah Edleina Umboh", "Winston Sugiarto"],
    membersKo: ["남우현", "장윤호", "Hadassah Edleina Umboh", "Winston Sugiarto"],
    teacher: "Donguk Lee · Marsela Nur Rita",
    teacherKo: "이동국 · Marsela Nur Rita",
    deployUrl: "",
    githubUrl: "https://github.com/16th-eicon-contest/h4-flowcare-medicine-fe",
    thumbnail: "/images/h4-herworld.jpg",
    htmlPath: "/2026/h4/index.html",
  },

  // ─── H5 — MonAndo (선린인터넷고등학교 · Bangladesh) ────────────────────────
  {
    id: 9,
    teamName: "H5",
    country: "Bangladesh",
    school: "선린인터넷고등학교",
    schoolEn: "Sunrin Internet High School",
    schoolOverseas: "Madhabdi Sati Prasanna Institution & Holy Cross College",
    projectTitle: "MonAndo — VR·AI 기반 정신건강 관리 웹앱",
    projectTitleEn: "MonAndo — VR & AI-Based Mental Health Management App",
    theme: "Mental Health",
    problem:
      "People experiencing anxiety and burnout often struggle to find affordable, consistently accessible mental health tools.",
    problemKo:
      "불안과 번아웃을 겪는 사람들은 비용 부담 없이 꾸준히 이용할 수 있는 정신건강 관리 도구를 찾기 어렵습니다.",
    solution:
      "A low-cost mental health web app combining smartphone-based VR exposure therapy with real-time AI voice guidance, AI-guided counseling conversations, and visual anxiety/emotion progress reports.",
    solutionKo:
      "스마트폰 기반 VR 노출치료와 실시간 AI 안내, 생각을 유도하는 AI 상담, 불안도와 감정을 시각화하는 리포트로 구성된 저비용 정신건강 관리 웹앱입니다.",
    description:
      "A low-cost VR exposure therapy and AI counseling app helping manage anxiety and burnout.",
    descriptionKo:
      "스마트폰 VR 노출치료와 AI 상담으로 불안·번아웃 완화를 돕는 저비용 정신건강 앱입니다.",
    keyFeatures: [
      "Smartphone VR exposure therapy with real-time AI voice guidance",
      "AI-guided counseling conversations",
      "Visual anxiety graph & emotion board reports",
    ],
    keyFeaturesKo: [
      "실시간 AI 음성 안내 기반 스마트폰 VR 노출치료",
      "AI 유도형 상담 대화",
      "불안도 그래프 및 감정 보드 시각화 리포트",
    ],
    techStack: ["React", "CSS", "Firebase", "Firestore", "Gemini API"],
    members: ["Sooah Kim", "Minjun Sim", "Musarrat Mahjabin", "Turabi Meherin Sokal"],
    membersKo: ["김수아", "심민준", "Musarrat Mahjabin", "Turabi Meherin Sokal"],
    teacher: "Heewon Shim · Maherunnesa",
    teacherKo: "심희원 · Maherunnesa",
    deployUrl: "",
    githubUrl: "https://github.com/16th-eicon-contest/h5-monando",
    thumbnail: "/images/h5-monando.png",
    htmlPath: "/2026/h5/index.html",
  },

  // ─── H6 — Hugrow (청심국제고등학교 · Indonesia) ────────────────────────────
  {
    id: 10,
    teamName: "H6",
    country: "Indonesia",
    school: "청심국제고등학교",
    schoolEn: "Chungshim International Academy",
    schoolOverseas: "Eco Socio Tech School (EST)",
    projectTitle: "Hugrow — 가족 공동 웰니스 플랫폼",
    projectTitleEn: "Hugrow — Shared Family Wellness Platform",
    theme: "Other",
    problem:
      "Families often struggle to build emotional bonds and healthy habits together, and individual wellness efforts rarely feel connected to broader social impact.",
    problemKo:
      "가족들은 정서적 유대와 건강한 생활습관을 함께 형성할 방법을 찾기 어렵고, 개인의 웰빙 노력이 사회적 의미로 이어지기도 쉽지 않습니다.",
    solution:
      "A shared wellness platform combining an Assessment that diagnoses family communication and bonding, a Challenge Center with personalized wellness challenges, and a Ripple Map visualizing regional engagement.",
    solutionKo:
      "가족 소통·유대 상태를 진단하는 Assessment, 맞춤형 챌린지를 제공하는 Challenge Center, 지역별 활동을 시각화하는 Ripple Map으로 구성된 공동 웰니스 플랫폼입니다.",
    description:
      "A family wellness platform diagnosing bonding, delivering shared challenges, and tracking social impact.",
    descriptionKo:
      "가족 유대 진단과 맞춤 챌린지로 가족 웰빙과 사회적 기여를 연결하는 플랫폼입니다.",
    keyFeatures: [
      "Family communication & bonding assessment",
      "Personalized challenges across gratitude, mindfulness, physical & nutrition",
      "Regional engagement visualization (Ripple Map)",
    ],
    keyFeaturesKo: [
      "가족 소통·유대 상태 진단",
      "감사·마음챙김·신체·영양 등 맞춤형 챌린지",
      "지역별 활동 시각화 (Ripple Map)",
    ],
    techStack: ["React", "Vite", "Tailwind CSS", "Supabase", "Claude API"],
    members: ["Mirae Kim", "Siwoo Kim", "Nicholas Emmanuel Lieputra", "Ravakatya Anadra"],
    membersKo: ["김미래", "김시우", "Nicholas Emmanuel Lieputra", "Ravakatya Anadra"],
    teacher: "Jaesung Yoon · Dermawan Intiardy",
    teacherKo: "윤재성 · Dermawan Intiardy",
    deployUrl: "",
    githubUrl: "https://github.com/16th-eicon-contest/h6-main",
    thumbnail: "/images/h6-hugrow.png",
    htmlPath: "/2026/h6/index.html",
  },
]

/** All unique countries derived from the data — used for the filter bar. */
export const countries = [...new Set(projects.map((p) => p.country))].sort()

/** All unique themes derived from the data — used for the filter bar. */
export const themes = [...new Set(projects.map((p) => p.theme))].sort()
