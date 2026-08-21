import { useLang } from '../context/LangContext'
import { translations, getCountryName, getThemeName } from '../i18n/translations'
import styles from './FilterBar.module.css'

export default function FilterBar({
  countries,
  themes,
  selectedCountry,
  selectedTheme,
  searchQuery,
  onCountryChange,
  onThemeChange,
  onSearchChange,
  resultCount,
}) {
  const { lang } = useLang()
  const tx = translations[lang].filter

  // 국가/테마 목록은 projects.js에서 영문 원본 값 기준으로 정렬되어 들어오므로,
  // 화면에 표시되는 현재 언어 라벨 기준으로 다시 정렬합니다.
  const sortedCountries = [...countries].sort((a, b) =>
    getCountryName(a, lang).localeCompare(getCountryName(b, lang), lang)
  )
  const sortedThemes = [...themes].sort((a, b) =>
    getThemeName(a, lang).localeCompare(getThemeName(b, lang), lang)
  )

  return (
    <div className={styles.wrapper}>
      <div className="container">

        {/* 검색창 */}
        <div className={styles.searchRow}>
          <div className={styles.searchInputWrap}>
            <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="m11 11 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder={tx.placeholder}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                className={styles.clearBtn}
                onClick={() => onSearchChange('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <span className={styles.resultCount}>{tx.results(resultCount)}</span>
        </div>

        {/* 국가 필터 */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>{tx.countryLabel}</span>
          <div className={styles.pillGroup}>
            <button
              className={`${styles.pill} ${selectedCountry === '' ? styles.pillActive : ''}`}
              onClick={() => onCountryChange('')}
            >
              {tx.all}
            </button>
            {sortedCountries.map((c) => (
              <button
                key={c}
                className={`${styles.pill} ${selectedCountry === c ? styles.pillActive : ''}`}
                onClick={() => onCountryChange(c)}
              >
                {getCountryName(c, lang)}
              </button>
            ))}
          </div>
        </div>

        {/* 테마 필터 */}
        <div className={styles.filterGroup}>
          <span className={styles.filterLabel}>{tx.themeLabel}</span>
          <div className={styles.pillGroup}>
            <button
              className={`${styles.pill} ${selectedTheme === '' ? styles.pillActive : ''}`}
              onClick={() => onThemeChange('')}
            >
              {tx.all}
            </button>
            {sortedThemes.map((t) => (
              <button
                key={t}
                className={`${styles.pill} ${selectedTheme === t ? styles.pillActive : ''}`}
                onClick={() => onThemeChange(t)}
              >
                {getThemeName(t, lang)}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
