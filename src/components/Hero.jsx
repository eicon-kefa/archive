import { useLang } from '../context/LangContext'
import { translations, getThemeName } from '../i18n/translations'
import { projects } from '../data/projects'
import styles from './Hero.module.css'
import { THEME_SVG_MAP, THEME_COLORS, SVGDefault } from './HeroMockupSVGs'

export default function Hero({ totalProjects }) {
  const { lang } = useLang()
  const tx = translations[lang].hero

  const eiconUrl = lang === 'ko'
    ? 'https://e-icon.or.kr/ko/'
    : 'https://e-icon.or.kr/en/'

  // 목업 카드에 표시할 프로젝트 (최대 6개)
  const mockupProjects = projects.slice(0, 6)

  return (
    <section className={styles.hero} id="about">
      <div className={`container ${styles.inner}`}>
        <div className={styles.content}>
          <div className={styles.badge}>
            <span className={styles.badgeDot} />
            {tx.badge}
          </div>

          <h1 className={`display-xl ${styles.headline}`}>
            {tx.headline}
          </h1>
          <p className={`display-lg ${styles.sub}`}>
            {tx.sub}
          </p>

          <p className={styles.body}>
            {tx.body(totalProjects)}
          </p>

          <div className={styles.actions}>
            <a href="#projects" className="btn-primary">
              {tx.exploreBtn}
            </a>
            <a
              href={eiconUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              {tx.learnBtn}
            </a>
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statValue}>{totalProjects}</span>
              <span className={styles.statLabel}>{tx.stats.projects}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>SDG 3</span>
              <span className={styles.statLabel}>{tx.stats.focus}</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statValue}>Global</span>
              <span className={styles.statLabel}>{tx.stats.participants}</span>
            </div>
          </div>
        </div>

        {/* 목업 카드 */}
        <div className={styles.mockup}>
          <div className={styles.mockupCard}>
            <div className={styles.mockupHeader}>
              <div className={styles.mockupDots}>
                <span /><span /><span />
              </div>
              <div className={styles.mockupUrl}>archive.e-icon.or.kr</div>
            </div>
            <div className={styles.mockupBody}>
              <div className={styles.mockupTag}>SDG 3</div>
              <div className={styles.mockupTitle}>{tx.mockupTitle}</div>
              <div className={styles.mockupGrid}>
                {mockupProjects.map((p) => {
                  const color = THEME_COLORS[p.theme] || THEME_COLORS['Other']
                  const SvgComponent = THEME_SVG_MAP[p.theme] || SVGDefault
                  return (
                    <div key={p.id} className={styles.mockupItem}>
                      {/* 썸네일 영역 — 테마별 SVG 일러스트 */}
                      <div
                        className={styles.mockupThumb}
                        style={{ borderBottom: `2px solid ${color}55` }}
                      >
                        <SvgComponent color={color} />
                      </div>
                      <div className={styles.mockupLine} />
                      <div className={styles.mockupLineShort} />
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
