import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'
import styles from './Hero.module.css'
import { SVGSdgGoals, SVGWebAppBuild } from './HeroMockupSVGs'

export default function Hero({ totalProjects }) {
  const { lang } = useLang()
  const tx = translations[lang].hero

  const eiconUrl = lang === 'ko'
    ? 'https://e-icon.or.kr/ko/'
    : 'https://e-icon.or.kr/en/'

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
              <span className={styles.statValue}>{tx.stats.participantsValue}</span>
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
              <div className={styles.mockupIllustrations}>
                <div className={styles.mockupIllustration}>
                  <SVGSdgGoals />
                </div>
                <div className={styles.mockupIllustration}>
                  <SVGWebAppBuild />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
