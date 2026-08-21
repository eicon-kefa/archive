/**
 * 히어로 섹션 목업 카드용 미니 앱 UI SVG 일러스트
 * 텍스트 없는 추상 도형으로만 구성
 */

/* ── 1. 질병 예방 — 지도 + 의료 핀 ────────────────────────────────────── */
export function SVGDiseasePreventionMap({ color = '#10b981' }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* 배경 */}
      <rect width="120" height="90" fill={`${color}0d`} />
      {/* 지도 격자 */}
      {[18,36,54,72].map(y => <line key={`h${y}`} x1="0" y1={y} x2="120" y2={y} stroke={color} strokeWidth="0.5" opacity="0.15" />)}
      {[24,48,72,96].map(x => <line key={`v${x}`} x1={x} y1="0" x2={x} y2="90" stroke={color} strokeWidth="0.5" opacity="0.15" />)}
      {/* 도로 */}
      <path d="M0 42 Q28 36 58 43 Q88 50 120 40" stroke={color} strokeWidth="3" opacity="0.2" fill="none" strokeLinecap="round" />
      <path d="M0 60 Q35 56 75 60 Q100 63 120 58" stroke={color} strokeWidth="2" opacity="0.12" fill="none" strokeLinecap="round" />
      <path d="M46 0 Q48 28 45 90" stroke={color} strokeWidth="2.5" opacity="0.18" fill="none" strokeLinecap="round" />
      <path d="M82 0 Q85 38 81 90" stroke={color} strokeWidth="2" opacity="0.12" fill="none" strokeLinecap="round" />
      {/* 블록 */}
      <rect x="5" y="16" width="20" height="14" rx="2" fill={color} opacity="0.1" />
      <rect x="58" y="47" width="16" height="10" rx="2" fill={color} opacity="0.1" />
      <rect x="88" y="18" width="24" height="16" rx="2" fill={color} opacity="0.1" />
      <rect x="5" y="64" width="14" height="10" rx="2" fill={color} opacity="0.07" />
      {/* 핀 1 (주요) — 십자 도형 */}
      <circle cx="50" cy="28" r="9" fill={color} />
      <circle cx="50" cy="28" r="9" fill="white" opacity="0.15" />
      <rect x="46.5" y="26.5" width="7" height="2.5" rx="1.2" fill="white" />
      <rect x="48.75" y="24.5" width="2.5" height="7" rx="1.2" fill="white" />
      <path d="M50 37 L50 47" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="50" cy="49" r="2" fill={color} opacity="0.35" />
      {/* 핀 2 */}
      <circle cx="87" cy="40" r="6.5" fill={color} opacity="0.75" />
      <rect x="84.25" y="38.75" width="5.5" height="2" rx="1" fill="white" />
      <rect x="86" y="37" width="2" height="5.5" rx="1" fill="white" />
      <path d="M87 47 L87 54" stroke={color} strokeWidth="1.8" strokeLinecap="round" opacity="0.7" />
      <circle cx="87" cy="55.5" r="1.5" fill={color} opacity="0.3" />
      {/* 핀 3 */}
      <circle cx="20" cy="53" r="5" fill={color} opacity="0.5" />
      <rect x="17.5" y="52" width="5" height="2" rx="1" fill="white" />
      <rect x="19" y="50.5" width="2" height="5" rx="1" fill="white" />
      {/* 하단 카드 */}
      <rect x="6" y="67" width="108" height="19" rx="4" fill="white" opacity="0.92" />
      <circle cx="18" cy="76.5" r="5.5" fill={color} opacity="0.15" />
      <circle cx="18" cy="76.5" r="3" fill={color} opacity="0.4" />
      <rect x="29" y="73" width="38" height="3.5" rx="1.75" fill={color} opacity="0.6" />
      <rect x="29" y="79" width="52" height="2.5" rx="1.25" fill={color} opacity="0.12" />
      <rect x="93" y="72" width="16" height="9" rx="2.5" fill={color} />
      <rect x="96" y="75.5" width="10" height="2" rx="1" fill="white" />
    </svg>
  )
}

/* ── 2. 정신 건강 — 감정 링 + 꺾은선 차트 ──────────────────────────────── */
export function SVGMentalHealthTracker({ color = '#8b5cf6' }) {
  const pts = [{x:14,y:76},{x:26,y:70},{x:38,y:73},{x:50,y:64},{x:62,y:67},{x:74,y:60},{x:86,y:57},{x:98,y:59},{x:110,y:55}]
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="90" fill={`${color}0d`} />
      {/* 헤더 바 */}
      <rect width="120" height="20" fill={color} />
      <circle cx="14" cy="10" r="5" fill="white" opacity="0.2" />
      <rect x="24" y="7.5" width="42" height="3.5" rx="1.75" fill="white" opacity="0.5" />
      <rect x="24" y="13.5" width="26" height="2.5" rx="1.25" fill="white" opacity="0.25" />
      <circle cx="106" cy="10" r="5" fill="white" opacity="0.15" />
      <rect x="93" y="8" width="10" height="4" rx="2" fill="white" opacity="0.2" />
      {/* 섹션 라벨 바 */}
      <rect x="8" y="25" width="44" height="3" rx="1.5" fill={color} opacity="0.35" />
      {/* 감정 링 5개 — 빈 원→채워진 원 스케일로 기분 표현 */}
      {[
        { x: 14, fill: 0.12 },
        { x: 34, fill: 0.28 },
        { x: 54, fill: 1,    selected: true },
        { x: 74, fill: 0.45 },
        { x: 94, fill: 0.2  },
      ].map(({ x, fill, selected }) => (
        <g key={x}>
          {selected && <circle cx={x + 6} cy="42" r="10" fill={color} opacity="0.12" stroke={color} strokeWidth="1.2" />}
          <circle cx={x + 6} cy="42" r="6" fill={color} opacity={fill} />
          <circle cx={x + 6} cy="42" r="6" stroke={color} strokeWidth="1" opacity="0.3" fill="none" />
          {selected && <circle cx={x + 6} cy="42" r="2.5" fill="white" opacity="0.8" />}
        </g>
      ))}
      {/* 차트 카드 */}
      <rect x="8" y="53" width="104" height="32" rx="4" fill="white" opacity="0.88" />
      <rect x="13" y="58" width="30" height="3" rx="1.5" fill={color} opacity="0.4" />
      <rect x="13" y="63" width="18" height="2" rx="1" fill={color} opacity="0.18" />
      {/* 영역 채우기 */}
      <path
        d={`M${pts[0].x} 82 ${pts.map(p=>`L${p.x} ${p.y}`).join(' ')} L${pts[pts.length-1].x} 82 Z`}
        fill={color} opacity="0.07"
      />
      {/* 꺾은선 */}
      <polyline
        points={pts.map(p=>`${p.x},${p.y}`).join(' ')}
        stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"
      />
      {/* 점 */}
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={i === 6 ? 3 : 1.5}
          fill={color} opacity={i === 6 ? 1 : 0.4} />
      ))}
    </svg>
  )
}

/* ── 3. 영양 — 도넛 차트 + 바 차트 ─────────────────────────────────────── */
export function SVGNutritionTracker({ color = '#fb923c' }) {
  const bars = [
    { pct: 72, c: color },
    { pct: 55, c: '#34d399' },
    { pct: 38, c: '#8b5cf6' },
  ]
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="90" fill={`${color}0d`} />
      {/* 헤더 */}
      <rect width="120" height="18" fill={color} />
      <rect x="8" y="6.5" width="32" height="5" rx="2.5" fill="white" opacity="0.5" />
      <rect x="44" y="6.5" width="18" height="5" rx="2.5" fill="white" opacity="0.2" />
      <rect x="88" y="6" width="24" height="7" rx="2" fill="white" opacity="0.18" />
      <rect x="92" y="9" width="16" height="2.5" rx="1.25" fill="white" opacity="0.5" />
      {/* 도넛 차트 — 배경 */}
      <circle cx="38" cy="52" r="24" fill="white" stroke={`${color}22`} strokeWidth="1" />
      <circle cx="38" cy="52" r="17" fill="none" stroke="#f0f0f0" strokeWidth="13" />
      {/* 세그먼트 3개 */}
      <circle cx="38" cy="52" r="17" fill="none" stroke={color} strokeWidth="13"
        strokeDasharray="38 69" strokeDashoffset="27" strokeLinecap="butt" />
      <circle cx="38" cy="52" r="17" fill="none" stroke="#34d399" strokeWidth="13"
        strokeDasharray="30 77" strokeDashoffset="-11" strokeLinecap="butt" />
      <circle cx="38" cy="52" r="17" fill="none" stroke="#8b5cf6" strokeWidth="13"
        strokeDasharray="24 83" strokeDashoffset="-41" strokeLinecap="butt" />
      {/* 도넛 중앙 */}
      <circle cx="38" cy="52" r="10" fill="white" />
      {/* 중앙 진행률 표시 — 작은 호 */}
      <circle cx="38" cy="52" r="6" fill="none" stroke={color} strokeWidth="3"
        strokeDasharray="27 10" strokeDashoffset="7" strokeLinecap="round" opacity="0.7" />
      {/* 오른쪽 바 차트 3개 */}
      {bars.map(({ pct, c }, i) => {
        const y = 24 + i * 14
        return (
          <g key={i}>
            <rect x="72" y={y} width="5" height="5" rx="1.5" fill={c} opacity="0.85" />
            <rect x="82" y={y + 1} width="32" height="3" rx="1.5" fill={c} opacity="0.12" />
            <rect x="82" y={y + 1} width={32 * pct / 100} height="3" rx="1.5" fill={c} opacity="0.75" />
          </g>
        )
      })}
      {/* 범례 점 */}
      <circle cx="75" cy="71" r="3" fill={color} opacity="0.7" />
      <circle cx="84" cy="71" r="3" fill="#34d399" opacity="0.7" />
      <circle cx="93" cy="71" r="3" fill="#8b5cf6" opacity="0.7" />
      {/* 하단 카드 */}
      <rect x="6" y="78" width="108" height="9" rx="3" fill="white" opacity="0.85" />
      <rect x="12" y="81" width="52" height="2.5" rx="1.25" fill={color} opacity="0.3" />
      <circle cx="103" cy="82.5" r="3.5" fill={color} opacity="0.7" />
      <rect x="101.2" y="81.7" width="3.5" height="1.5" rx="0.75" fill="white" />
      <rect x="102.2" y="80.7" width="1.5" height="3.5" rx="0.75" fill="white" opacity="0" />
      {/* 체크 */}
      <path d="M101.5 82.5 L103 84 L105.5 81" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── 4. 노인 돌봄 — 헬스 대시보드 ──────────────────────────────────────── */
export function SVGElderCare({ color = '#3b82f6' }) {
  const ecg = [6,6,6,6,3,8,1,11,6,6,6,6]
  const ecgPts = ecg.map((v, i) => `${10 + i * 3.5},${48 - v}`)
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="90" fill={`${color}0d`} />
      {/* 헤더 */}
      <rect width="120" height="18" fill={color} />
      <circle cx="12" cy="9" r="4.5" fill="white" opacity="0.2" />
      <rect x="22" y="6.5" width="46" height="5" rx="2.5" fill="white" opacity="0.5" />
      <rect x="22" y="13" width="28" height="2.5" rx="1.25" fill="white" opacity="0.22" />
      {/* 알림 점 */}
      <circle cx="106" cy="9" r="5" fill="white" opacity="0.15" />
      <circle cx="106" cy="9" r="2.5" fill="white" opacity="0.5" />
      <circle cx="109" cy="6" r="2" fill="#f87171" />
      {/* 심박수 카드 */}
      <rect x="6" y="22" width="52" height="28" rx="4" fill="white" opacity="0.92" />
      {/* 심박 아이콘 — 하트 */}
      <path d="M16 30 C16 27.5 18.5 26 20.5 28 C22.5 26 25 27.5 25 30 C25 34 20.5 37 20.5 37 C20.5 37 16 34 16 30Z"
        fill={color} opacity="0.85" />
      <rect x="12" y="39" width="22" height="3" rx="1.5" fill={color} opacity="0.25" />
      {/* 숫자 대신 큰 바 */}
      <rect x="32" y="28" width="20" height="6" rx="2" fill={color} opacity="0.7" />
      <rect x="32" y="36" width="12" height="3" rx="1.5" fill={color} opacity="0.25" />
      {/* ECG 라인 */}
      <polyline points={ecgPts.join(' ')}
        stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* 걸음수 카드 */}
      <rect x="62" y="22" width="52" height="28" rx="4" fill="white" opacity="0.92" />
      {/* 발자국 아이콘 대체 — 두 타원 */}
      <ellipse cx="72" cy="29" rx="4" ry="5.5" fill="#10b981" opacity="0.7" transform="rotate(-10 72 29)" />
      <ellipse cx="79" cy="32" rx="4" ry="5.5" fill="#10b981" opacity="0.4" transform="rotate(10 79 32)" />
      {/* 걸음 수 바 */}
      <rect x="68" y="39" width="40" height="4" rx="2" fill="#10b981" opacity="0.12" />
      <rect x="68" y="39" width="28" height="4" rx="2" fill="#10b981" opacity="0.6" />
      <rect x="68" y="44.5" width="22" height="2.5" rx="1.25" fill="#10b981" opacity="0.2" />
      {/* 알림 카드 */}
      <rect x="6" y="54" width="108" height="14" rx="4" fill="#fef9c3" />
      {/* 경고 삼각형 */}
      <path d="M14 63 L18 56 L22 63 Z" fill="#f59e0b" opacity="0.8" />
      <rect x="17.5" y="58.5" width="1" height="3" rx="0.5" fill="white" />
      <circle cx="18" cy="62.5" r="0.6" fill="white" />
      <rect x="26" y="59" width="60" height="2.5" rx="1.25" fill="#92400e" opacity="0.3" />
      <rect x="26" y="63.5" width="42" height="2" rx="1" fill="#92400e" opacity="0.18" />
      {/* 복약 카드 */}
      <rect x="6" y="72" width="108" height="15" rx="4" fill="white" opacity="0.9" />
      {/* 알약 아이콘 */}
      <ellipse cx="15" cy="79.5" rx="6" ry="3.5" fill={color} opacity="0.7" />
      <rect x="9" y="78" width="6" height="3" rx="0" fill="white" opacity="0.5" />
      <rect x="24" y="76.5" width="48" height="3" rx="1.5" fill={color} opacity="0.25" />
      <rect x="24" y="81.5" width="30" height="2.5" rx="1.25" fill={color} opacity="0.15" />
      <rect x="96" y="75" width="14" height="9" rx="2.5" fill={color} />
      <rect x="99" y="78.5" width="8" height="2" rx="1" fill="white" />
    </svg>
  )
}

/* ── 5. 체력/운동 — 진행 링 + 추상 목록 ─────────────────────────────────── */
export function SVGFitness({ color = '#34d399' }) {
  const items = [
    { done: true,  pct: 1.0 },
    { done: true,  pct: 1.0 },
    { done: false, pct: 0.45 },
    { done: false, pct: 0.0 },
  ]
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="90" fill={`${color}0d`} />
      {/* 헤더 */}
      <rect width="120" height="18" fill={color} />
      <circle cx="12" cy="9" r="5" fill="white" opacity="0.2" />
      <rect x="22" y="6.5" width="28" height="5" rx="2.5" fill="white" opacity="0.5" />
      <rect x="22" y="13" width="18" height="2.5" rx="1.25" fill="white" opacity="0.22" />
      <rect x="86" y="6" width="28" height="7" rx="2" fill="white" opacity="0.18" />
      <rect x="89" y="9" width="22" height="2.5" rx="1.25" fill="white" opacity="0.45" />
      {/* 진행 링 */}
      <circle cx="36" cy="52" r="24" fill="white" stroke={`${color}22`} strokeWidth="1" />
      {/* 트랙 */}
      <circle cx="36" cy="52" r="17" fill="none" stroke={`${color}18`} strokeWidth="10" />
      {/* 진행 (65%) */}
      <circle cx="36" cy="52" r="17" fill="none" stroke={color} strokeWidth="10"
        strokeDasharray="69 107" strokeDashoffset="27" strokeLinecap="round" />
      {/* 안쪽 원 */}
      <circle cx="36" cy="52" r="10" fill="white" />
      {/* 중앙 작은 원 */}
      <circle cx="36" cy="52" r="4" fill={color} opacity="0.2" />
      <circle cx="36" cy="52" r="2" fill={color} opacity="0.6" />
      {/* 운동 항목 목록 — 텍스트 없이 바로 표현 */}
      {items.map(({ done, pct }, i) => {
        const y = 24 + i * 13
        return (
          <g key={i}>
            {/* 체크 원 */}
            <circle cx="70" cy={y} r="5" fill={done ? color : `${color}18`} />
            {done && (
              <path d={`M67.5 ${y} L69.5 ${y+2} L72.5 ${y-2.5}`}
                stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            )}
            {/* 라벨 바 */}
            <rect x="80" y={y - 4.5} width="34" height="4" rx="2"
              fill={done ? color : `${color}18`} opacity={done ? 0.7 : 1} />
            {/* 서브 바 */}
            {pct > 0 && (
              <rect x="80" y={y + 1} width={34 * pct} height="2.5" rx="1.25" fill={color} opacity={done ? 0.3 : 0.5} />
            )}
          </g>
        )
      })}
      {/* 하단 CTA 버튼 */}
      <rect x="6" y="74" width="108" height="13" rx="4" fill={color} />
      <rect x="30" y="78.5" width="50" height="4" rx="2" fill="white" opacity="0.4" />
      <path d="M84 81 L88 81" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M86 79 L88 81 L86 83" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/* ── 6. 모성 건강 ──────────────────────────────────────────────────────── */
export function SVGMaternalHealth({ color = '#f59e0b' }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="90" fill={`${color}0d`} />
      <rect width="120" height="18" fill={color} />
      <circle cx="12" cy="9" r="5" fill="white" opacity="0.2" />
      <rect x="22" y="6.5" width="44" height="5" rx="2.5" fill="white" opacity="0.5" />
      <rect x="22" y="13" width="26" height="2.5" rx="1.25" fill="white" opacity="0.22" />
      {/* 캘린더 카드 */}
      <rect x="6" y="22" width="68" height="40" rx="4" fill="white" opacity="0.92" />
      <rect x="6" y="22" width="68" height="10" rx="4" fill={color} opacity="0.15" />
      <rect x="12" y="25" width="20" height="3" rx="1.5" fill={color} opacity="0.5" />
      {/* 캘린더 점 그리드 */}
      {[0,1,2,3,4,5,6].map(col =>
        [0,1,2,3].map(row => {
          const cx = 14 + col * 8
          const cy = 38 + row * 6
          const filled = (col + row) % 3 === 0 || (col === 2 && row === 1) || (col === 4 && row === 2)
          return <circle key={`${col}-${row}`} cx={cx} cy={cy} r="2"
            fill={filled ? color : '#e5e7eb'} opacity={filled ? 0.8 : 1} />
        })
      )}
      {/* 오른쪽 카드들 */}
      <rect x="78" y="22" width="36" height="18" rx="4" fill="white" opacity="0.92" />
      {/* 하트 */}
      <path d="M88 33 C88 30.5 90 29 91.5 31 C93 29 95 30.5 95 33 C95 37 91.5 39 91.5 39 C91.5 39 88 37 88 33Z"
        fill={color} opacity="0.7" />
      <rect x="100" y="26" width="10" height="3" rx="1.5" fill={color} opacity="0.4" />
      <rect x="100" y="31" width="7" height="2.5" rx="1.25" fill={color} opacity="0.2" />
      <rect x="78" y="44" width="36" height="18" rx="4" fill="white" opacity="0.92" />
      {/* 원형 진행 */}
      <circle cx="91" cy="53" r="7" fill="none" stroke={`${color}22`} strokeWidth="4" />
      <circle cx="91" cy="53" r="7" fill="none" stroke={color} strokeWidth="4"
        strokeDasharray="30 14" strokeDashoffset="11" strokeLinecap="round" />
      <circle cx="91" cy="53" r="2.5" fill={color} opacity="0.4" />
      <rect x="102" y="50" width="8" height="3" rx="1.5" fill={color} opacity="0.4" />
      <rect x="102" y="55" width="6" height="2" rx="1" fill={color} opacity="0.2" />
      {/* 하단 */}
      <rect x="6" y="66" width="108" height="20" rx="4" fill="white" opacity="0.88" />
      <rect x="12" y="71" width="60" height="3.5" rx="1.75" fill={color} opacity="0.35" />
      <rect x="12" y="77" width="42" height="3" rx="1.5" fill={color} opacity="0.18" />
      <circle cx="103" cy="76" r="7" fill={color} opacity="0.12" stroke={color} strokeWidth="1" />
      <path d="M100 76 L102.5 78.5 L106 74" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/* ── 7. 장애 지원 ──────────────────────────────────────────────────────── */
export function SVGDisability({ color = '#ec4899' }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="90" fill={`${color}0d`} />
      <rect width="120" height="18" fill={color} />
      <circle cx="12" cy="9" r="5" fill="white" opacity="0.2" />
      <rect x="22" y="6.5" width="44" height="5" rx="2.5" fill="white" opacity="0.5" />
      <rect x="22" y="13" width="26" height="2.5" rx="1.25" fill="white" opacity="0.22" />
      <rect x="96" y="6" width="18" height="7" rx="2" fill="white" opacity="0.18" />
      {/* 큰 접근성 아이콘 카드 */}
      <rect x="6" y="22" width="50" height="50" rx="6" fill="white" opacity="0.9" />
      {/* 인물 — 머리 */}
      <circle cx="31" cy="33" r="7" fill={color} opacity="0.75" />
      {/* 몸통 */}
      <path d="M22 48 Q22 42 31 42 Q40 42 40 48 L38 60 L24 60 Z" fill={color} opacity="0.5" />
      {/* 휠체어 바퀴 */}
      <circle cx="31" cy="60" r="7" fill="none" stroke={color} strokeWidth="2.5" opacity="0.7" />
      <circle cx="31" cy="60" r="2" fill={color} opacity="0.5" />
      {/* 팔 */}
      <path d="M34 48 Q40 50 44 55" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.6" />
      {/* 오른쪽 카드 스택 */}
      <rect x="60" y="22" width="54" height="22" rx="4" fill="white" opacity="0.92" />
      <rect x="66" y="27" width="18" height="12" rx="3" fill={color} opacity="0.15" />
      <circle cx="75" cy="33" r="4" fill={color} opacity="0.4" />
      <rect x="90" y="29" width="18" height="3" rx="1.5" fill={color} opacity="0.4" />
      <rect x="90" y="34" width="12" height="2.5" rx="1.25" fill={color} opacity="0.18" />
      <rect x="60" y="48" width="54" height="11" rx="4" fill="white" opacity="0.92" />
      <rect x="66" y="51.5" width="42" height="4" rx="2" fill={color} opacity="0.12" />
      <rect x="66" y="51.5" width="32" height="4" rx="2" fill={color} opacity="0.55" />
      <rect x="60" y="63" width="54" height="9" rx="4" fill={color} opacity="0.85" />
      <rect x="70" y="66" width="34" height="3" rx="1.5" fill="white" opacity="0.5" />
    </svg>
  )
}

/* ── 기본 폴백 ──────────────────────────────────────────────────────────── */
export function SVGDefault({ color = '#6b7280' }) {
  return (
    <svg viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="120" height="90" fill={`${color}0d`} />
      {/* 헤더 */}
      <rect width="120" height="18" fill={color} opacity="0.7" />
      <circle cx="12" cy="9" r="4.5" fill="white" opacity="0.2" />
      <rect x="22" y="7" width="38" height="4" rx="2" fill="white" opacity="0.45" />
      <rect x="22" y="13" width="22" height="2.5" rx="1.25" fill="white" opacity="0.2" />
      <rect x="94" y="7" width="20" height="7" rx="2" fill="white" opacity="0.15" />
      {/* 메인 카드 */}
      <rect x="6" y="22" width="108" height="22" rx="4" fill="white" opacity="0.88" />
      <rect x="12" y="28" width="52" height="5" rx="2.5" fill={color} opacity="0.35" />
      <rect x="12" y="35.5" width="36" height="3" rx="1.5" fill={color} opacity="0.15" />
      {/* 두 칼럼 카드 */}
      <rect x="6" y="48" width="52" height="34" rx="4" fill="white" opacity="0.88" />
      <rect x="62" y="48" width="52" height="34" rx="4" fill="white" opacity="0.88" />
      {/* 왼쪽 카드 내용 */}
      <circle cx="22" cy="60" r="8" fill={color} opacity="0.12" />
      <circle cx="22" cy="60" r="5" fill={color} opacity="0.25" />
      <rect x="12" y="70" width="38" height="3.5" rx="1.75" fill={color} opacity="0.25" />
      <rect x="12" y="75.5" width="26" height="3" rx="1.5" fill={color} opacity="0.12" />
      {/* 오른쪽 카드 내용 */}
      <rect x="68" y="54" width="40" height="4" rx="2" fill={color} opacity="0.3" />
      <rect x="68" y="61" width="40" height="3.5" rx="1.75" fill={color} opacity="0.12" />
      <rect x="68" y="67.5" width="28" height="3" rx="1.5" fill={color} opacity="0.08" />
      <rect x="68" y="73" width="36" height="5" rx="2" fill={color} opacity="0.55" />
    </svg>
  )
}

/* ── 테마 → SVG 매핑 ────────────────────────────────────────────────────── */
export const THEME_SVG_MAP = {
  'Disease Prevention': SVGDiseasePreventionMap,
  'Mental Health':      SVGMentalHealthTracker,
  'Nutrition':          SVGNutritionTracker,
  'Elderly Care':       SVGElderCare,
  'Fitness':            SVGFitness,
  "Women's Health":     SVGMaternalHealth,
  'Disability':         SVGDisability,
}

export const THEME_COLORS = {
  'Disease Prevention': '#10b981',
  'Mental Health':      '#8b5cf6',
  'Nutrition':          '#fb923c',
  'Elderly Care':       '#3b82f6',
  'Fitness':            '#34d399',
  "Women's Health":     '#f59e0b',
  'Disability':         '#ec4899',
  'Other':              '#6b7280',
}
