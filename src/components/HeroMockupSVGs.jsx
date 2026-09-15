/**
 * 히어로 섹션 목업 카드용 SVG 일러스트
 * 텍스트 없는 추상 도형으로만 구성 — SDGs(지속가능발전목표)와 웹앱 개발을 상징
 */

/* ── SDGs — 다색 목표 휠 ──────────────────────────────────────────────────── */
export function SVGSdgGoals() {
  const color = '#8b5cf6'
  return (
    <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="130" fill={`${color}0a`} />
      {/* 라벨 칩 */}
      <rect x="10" y="12" width="58" height="15" rx="7.5" fill={color} opacity="0.12" />
      <circle cx="19" cy="19.5" r="3" fill={color} />
      <rect x="26" y="17.5" width="34" height="4" rx="2" fill={color} opacity="0.6" />
      {/* 다색 목표 휠 — SDGs 상징 (8개 조각이 맞닿은 원형) */}
      <path d="M 60.99 28.01 A 38 38 0 0 1 86.16 38.44 L 71.7 53.67 A 17 17 0 0 0 60.45 49.01 Z" fill="#e5243b" opacity="0.92" />
      <path d="M 87.56 39.84 A 38 38 0 0 1 97.99 65.01 L 76.99 65.55 A 17 17 0 0 0 72.33 54.3 Z" fill="#4c9f38" opacity="0.92" />
      <path d="M 97.99 66.99 A 38 38 0 0 1 87.56 92.16 L 72.33 77.7 A 17 17 0 0 0 76.99 66.45 Z" fill="#fcc30b" opacity="0.92" />
      <path d="M 86.16 93.56 A 38 38 0 0 1 60.99 103.99 L 60.45 82.99 A 17 17 0 0 0 71.7 78.33 Z" fill="#26bde2" opacity="0.92" />
      <path d="M 59.01 103.99 A 38 38 0 0 1 33.84 93.56 L 48.3 78.33 A 17 17 0 0 0 59.55 82.99 Z" fill="#fd6925" opacity="0.92" />
      <path d="M 32.44 92.16 A 38 38 0 0 1 22.01 66.99 L 43.01 66.45 A 17 17 0 0 0 47.67 77.7 Z" fill="#0a97d9" opacity="0.92" />
      <path d="M 22.01 65.01 A 38 38 0 0 1 32.44 39.84 L 47.67 54.3 A 17 17 0 0 0 43.01 65.55 Z" fill="#dd1367" opacity="0.92" />
      <path d="M 33.84 38.44 A 38 38 0 0 1 59.01 28.01 L 59.55 49.01 A 17 17 0 0 0 48.3 53.67 Z" fill="#3f7e44" opacity="0.92" />
      {/* 하단 설명 바 */}
      <rect x="14" y="114" width="64" height="4" rx="2" fill={color} opacity="0.35" />
      <rect x="14" y="121" width="44" height="3" rx="1.5" fill={color} opacity="0.15" />
    </svg>
  )
}

/* ── 웹앱 개발 — 브라우저 창 + UI 와이어프레임 ───────────────────────────── */
export function SVGWebAppBuild() {
  const color = '#3b82f6'
  return (
    <svg viewBox="0 0 120 130" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="130" fill={`${color}0a`} />
      {/* 라벨 칩 — 코드 브래킷 */}
      <rect x="10" y="12" width="58" height="15" rx="7.5" fill={color} opacity="0.12" />
      <path d="M18 16.5 L15 19.5 L18 22.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M24 16.5 L27 19.5 L24 22.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <rect x="32" y="17.5" width="28" height="4" rx="2" fill={color} opacity="0.6" />
      {/* 브라우저 창 */}
      <rect x="10" y="34" width="100" height="70" rx="6" fill="white" opacity="0.94" />
      <rect x="10" y="34" width="100" height="14" rx="6" fill={color} opacity="0.9" />
      <rect x="10" y="41" width="100" height="7" fill={color} opacity="0.9" />
      <circle cx="18" cy="41" r="2.3" fill="white" opacity="0.6" />
      <circle cx="25" cy="41" r="2.3" fill="white" opacity="0.4" />
      <circle cx="32" cy="41" r="2.3" fill="white" opacity="0.3" />
      {/* UI 와이어프레임 블록 */}
      <rect x="18" y="54" width="30" height="20" rx="3" fill={color} opacity="0.14" />
      <rect x="52" y="54" width="50" height="8" rx="2" fill={color} opacity="0.35" />
      <rect x="52" y="65" width="38" height="6" rx="2" fill={color} opacity="0.15" />
      <rect x="18" y="80" width="27" height="16" rx="3" fill={color} opacity="0.1" />
      <rect x="49" y="80" width="27" height="16" rx="3" fill={color} opacity="0.1" />
      <rect x="80" y="80" width="22" height="16" rx="3" fill={color} opacity="0.55" />
      {/* 클릭 커서 */}
      <path d="M84 86 L84 100 L88 96 L91 103 L94 101.5 L91 94.5 L96 94Z" fill="#111111" />
      {/* 하단 설명 바 */}
      <rect x="14" y="110" width="64" height="4" rx="2" fill={color} opacity="0.35" />
      <rect x="14" y="118" width="44" height="3" rx="1.5" fill={color} opacity="0.15" />
    </svg>
  )
}
