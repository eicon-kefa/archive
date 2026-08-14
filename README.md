# 제16회 e-ICON 세계대회 — 참가작 포트폴리오 사이트

**운영 주소:** https://archive.e-icon.or.kr  
**GitHub:** https://github.com/eicon-kefa/archive  
**주최:** 교육부 | **주관:** 한국디지털교육협회(KEFA)

---

## 목차

1. [운영진 필독 — 데이터 관리 원칙](#1-운영진-필독--데이터-관리-원칙)
2. [프로젝트(팀) 추가하기](#2-프로젝트팀-추가하기)
3. [이미지 추가하기](#3-이미지-추가하기)
4. [팀 앱 미리보기(HTML) 추가하기](#4-팀-앱-미리보기html-추가하기)
5. [전체 필드 레퍼런스](#5-전체-필드-레퍼런스)
6. [사이트 배포하기](#6-사이트-배포하기)
7. [로컬 개발 환경 실행](#7-로컬-개발-환경-실행)
8. [프로젝트 폴더 구조](#8-프로젝트-폴더-구조)

---

## 1. 운영진 필독 — 데이터 관리 원칙

> **모든 팀 정보는 `src/data/projects.js` 파일 하나에서만 수정합니다.**  
> 이 파일 외의 다른 소스코드는 건드릴 필요가 없습니다.

| 할 일 | 파일 |
|--------|------|
| 팀 추가 / 수정 / 삭제 | `src/data/projects.js` |
| 썸네일 이미지 추가 | `public/images/` 폴더 |
| 팀 앱 미리보기(HTML) 추가 | `public/2026/{팀코드}/` 폴더 (예: `m1`, `h6`) |
| 사이트 배포 | 터미널에서 명령어 1줄 |

---

## 2. 프로젝트(팀) 추가하기

### Step 1 — `src/data/projects.js` 파일 열기

VS Code, 메모장 등 텍스트 편집기로 파일을 엽니다.

### Step 2 — 마지막 팀 항목 복사

파일 안에서 아래와 같이 `{` 로 시작하고 `},` 로 끝나는 블록 하나를 찾아 **전체 복사**합니다.

```js
  {
    id: 10,
    teamName: "H6",
    country: "Indonesia",
    ...
    thumbnail: "",
    htmlPath: "",
  },
```

### Step 3 — 배열 맨 끝에 붙여넣기

`]` 바로 앞에 붙여넣은 뒤, 각 필드 값을 실제 팀 정보로 채웁니다.

```js
  // ─── 팀 11 ────────────────────────────────────────────────────────────────
  {
    id: 11,                         // ← 이전 팀보다 1 증가
    teamName: "H7",                 // ← 대회 팀 코드 (예: M5, H7)
    country: "South Korea",         // ← 반드시 영문 국가명
    school: "학교명",
    projectTitle: "앱이름 — 앱 제목 요약",
    theme: "Mental Health",         // ← 아래 유효값 목록 참고
    problem: "영문 문제 설명",
    problemKo: "한국어 문제 설명",
    solution: "영문 해결책 설명",
    solutionKo: "한국어 해결책 설명",
    description: "영문 카드 설명 (120자 이내)",
    descriptionKo: "한국어 카드 설명 (60자 이내)",
    keyFeatures: ["기능1 (영문)", "기능2", "기능3"],
    keyFeaturesKo: ["기능1 (한국어)", "기능2", "기능3"],
    techStack: ["React", "Node.js"],
    members: ["홍길동", "김철수"],
    teacher: "박지도",
    deployUrl: "https://팀앱주소.vercel.app",  // 없으면 ""
    githubUrl: "https://github.com/...",        // 없으면 ""
    thumbnail: "/images/h7-앱이름.png",          // 없으면 ""
    htmlPath: "/2026/h7/index.html",            // 없으면 "" — 팀 앱 HTML 미리보기용
  },
```

### Step 4 — 파일 저장 후 배포

파일을 저장하고 [6. 사이트 배포하기](#6-사이트-배포하기) 를 따릅니다.

---

### ⚠️ 주의사항

- `id` 값은 **절대 중복되면 안 됩니다.** 항상 마지막 번호 + 1로 입력하세요.
- `country` 필드는 **반드시 영문**으로 입력해야 국가 필터가 작동합니다.  
  예: `"South Korea"` ✅ &nbsp;`"한국"` ❌
- `theme` 필드는 아래 8개 값 중 **정확히 하나**를 입력하세요 (대소문자 구분).

```
"Mental Health"      정신 건강
"Fitness"            체력/운동
"Nutrition"          영양
"Elderly Care"       노인 돌봄
"Disability"         장애
"Maternal Health"    모성 건강
"Disease Prevention" 질병 예방
"Other"              기타
```

---

## 3. 이미지 추가하기

### Step 1 — 이미지 파일 준비

| 항목 | 권장 사양 |
|------|---------|
| 파일 형식 | `.png` 또는 `.jpg` |
| 크기 | 가로 800px 이상 (4:3 비율 권장) |
| 파일 크기 | 500KB 이하 (용량이 크면 로딩이 느려집니다) |
| 파일명 | 영문·숫자·하이픈만 사용 (한글·공백 ❌) |

**파일명 예시:** `m1-gloship.png`, `h6-hugrow.jpg` (팀코드-앱이름 형식)

### Step 2 — 파일을 `public/images/` 폴더에 넣기

```
project/
└── public/
    └── images/
        ├── m1-gloship.png   ← 여기에 넣기
        ├── h6-hugrow.png
        └── ...
```

### Step 3 — `projects.js`에서 경로 연결

해당 팀의 `thumbnail` 필드를 아래 형식으로 입력합니다.

```js
thumbnail: "/images/m1-gloship.png",
```

> **경로 규칙:** 반드시 `/images/` 로 시작하고, `public/` 은 쓰지 않습니다.

### 이미지가 없는 경우

이미지가 아직 없는 팀은 `thumbnail: ""` 로 두면, 테마 색상 기반의 추상 UI 일러스트가 자동으로 표시됩니다.

---

## 4. 팀 앱 미리보기(HTML) 추가하기

팀이 제출한 웹앱을 사이트 안에서 바로 실행해볼 수 있도록, 팀의 HTML/CSS/JS 파일을 통째로 사이트에 넣어 iframe으로 띄우는 기능입니다. (카드 상세 모달의 "앱 미리보기" 버튼 → 새 창 오버레이로 열림, [`AppPreview.jsx`](src/components/AppPreview.jsx))

### Step 1 — 팀 폴더 만들기

`public/2026/{팀코드}/` 폴더를 만들고, 팀이 제출한 웹앱 파일 전체(HTML, CSS, JS, 이미지 등)를 그대로 복사해 넣습니다. 진입점 파일 이름은 `index.html` 로 통일합니다. 팀코드는 대회 팀 번호를 소문자로 사용합니다 (예: `m1`, `h6`).

```
project/
└── public/
    └── 2026/
        ├── m1/
        │   └── index.html   ← 팀이 제출한 앱 전체를 여기에
        ├── h6/
        │   └── index.html
        └── ...
```

> 이 폴더는 기술담당 멘토들이 동적 웹앱을 정적 웹앱으로 변환한 뒤 PR로 제출하는 경로이기도 합니다. 배포 시 `archive.e-icon.or.kr/2026/{팀코드}` 로 그대로 접속됩니다.

### Step 2 — `projects.js`에서 경로 연결

해당 팀의 `htmlPath` 필드를 아래 형식으로 입력합니다.

```js
htmlPath: "/2026/h6/index.html",
```

> **경로 규칙:** 반드시 `/2026/` 로 시작하고, `public/` 은 쓰지 않습니다.

### 미리보기가 없는 경우

아직 HTML 제출물이 없는 팀은 `htmlPath: ""` 로 두면, 카드 상세 모달에 "앱 미리보기" 버튼이 표시되지 않습니다. (대신 `deployUrl` / `githubUrl` 이 있으면 해당 링크 버튼이 표시됩니다.)

---

## 5. 전체 필드 레퍼런스

| 필드 | 타입 | 설명 | 없을 때 |
|------|------|------|---------|
| `id` | number | 고유 번호. 마지막 항목 + 1 | 필수 |
| `teamName` | string | 대회 팀 코드 (예: `M1`, `H6`) | 필수 |
| `country` | string | **영문** 국가명. 필터에 사용됨 | 필수 |
| `school` | string | 학교/기관명 | 필수 |
| `projectTitle` | string | 프로젝트(웹앱) 제목 | 필수 |
| `theme` | string | 위 8개 테마 중 하나 | 필수 |
| `problem` | string | SDG 3 관련 문제 설명 — 영문 1~2문장 | `""` |
| `problemKo` | string | SDG 3 관련 문제 설명 — 한국어 | `""` |
| `solution` | string | 해결 방법 설명 — 영문 1~2문장 | `""` |
| `solutionKo` | string | 해결 방법 설명 — 한국어 | `""` |
| `description` | string | 카드 표시용 짧은 설명 — 영문 120자 이내 | `""` |
| `descriptionKo` | string | 카드 표시용 짧은 설명 — 한국어 60자 이내 | `""` |
| `keyFeatures` | string[] | 주요 기능 목록 — 영문 배열 3~5개 | `[]` |
| `keyFeaturesKo` | string[] | 주요 기능 목록 — 한국어 배열 3~5개 | `[]` |
| `techStack` | string[] | 사용 기술 배열 | `[]` |
| `members` | string[] | 팀원 이름 배열 | `[]` |
| `teacher` | string | 지도교사 이름 | `""` |
| `deployUrl` | string | 배포된 웹앱 URL | `""` |
| `githubUrl` | string | GitHub 저장소 URL | `""` |
| `thumbnail` | string | `/images/파일명.png` 형식 경로 | `""` |
| `htmlPath` | string | `/2026/{팀코드}/index.html` 형식 경로 — 앱 미리보기용 | `""` |

---

## 6. 사이트 배포하기

> 팀 정보를 추가/수정한 후 아래 명령어를 실행하면 https://archive.e-icon.or.kr 에 즉시 반영됩니다.

터미널(명령 프롬프트)을 열고 프로젝트 폴더로 이동한 뒤 실행:

```bash
npx vercel --prod
```

### GitHub에도 기록 남기기 (권장)

```bash
git add src/data/projects.js public/images/ public/2026/
git commit -m "팀 추가: 팀명"
git push
```

---

## 7. 로컬 개발 환경 실행

수정 결과를 배포 전에 미리 확인하고 싶을 때 사용합니다.

**사전 준비:** [Node.js](https://nodejs.org/) v18 이상 설치

```bash
npm install      # 최초 1회만 실행
npm run dev      # 개발 서버 시작 → http://localhost:5173
```

```bash
npm run build    # 배포용 파일 생성
npm run preview  # 빌드 결과 미리보기
```

---

## 8. 프로젝트 폴더 구조

```
project/
├── public/
│   ├── favicon.svg
│   ├── images/              ← 팀 썸네일 이미지를 여기에 넣으세요
│   │   ├── m1-gloship.png
│   │   └── ...
│   └── 2026/                 ← 팀 앱 HTML 제출물을 여기에 통째로 넣으세요 (멘토 PR 대상)
│       ├── m1/
│       │   └── index.html
│       ├── h6/
│       │   └── index.html
│       └── ...
├── src/
│   ├── components/
│   │   ├── Header.jsx / .module.css
│   │   ├── Hero.jsx / .module.css
│   │   ├── HeroMockupSVGs.jsx   ← 히어로 섹션 일러스트 (수정 불필요)
│   │   ├── FilterBar.jsx / .module.css
│   │   ├── ProjectGallery.jsx / .module.css
│   │   ├── ProjectCard.jsx / .module.css
│   │   ├── ProjectModal.jsx / .module.css
│   │   ├── AppPreview.jsx / .module.css   ← 팀 앱 HTML iframe 미리보기 (수정 불필요)
│   │   └── Footer.jsx / .module.css
│   ├── context/
│   │   └── LangContext.jsx      ← 한/영 언어 전환 (수정 불필요)
│   ├── i18n/
│   │   └── translations.js      ← UI 텍스트 번역본 (수정 불필요)
│   ├── data/
│   │   └── projects.js          ← ✅ 운영진이 수정하는 유일한 파일
│   ├── App.jsx
│   ├── App.module.css
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── vite.config.js
└── README.md                    ← 이 파일
```

---

## 디자인 시스템 참고

이 사이트는 **Cal.com** 디자인 언어를 따릅니다.

| 토큰 | 값 |
|------|----|
| 배경 | `#ffffff` |
| 주요 CTA | `#111111` |
| 카드 배경 | `#f5f5f5` |
| 푸터 배경 | `#101010` |
| 폰트 | Inter |
| 카드 모서리 | 12px |
| 버튼 모서리 | 8px |
| 섹션 여백 | 96px |
| 최대 너비 | 1200px |
