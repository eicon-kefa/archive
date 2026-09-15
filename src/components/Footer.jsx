import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'
import styles from './Footer.module.css'

export default function Footer() {
  const { lang } = useLang()
  const tx = translations[lang].footer
  const year = new Date().getFullYear()

  const eiconUrl = lang === 'ko' ? 'https://e-icon.or.kr/ko/' : 'https://e-icon.or.kr/en/'

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.top}>

          {/* 브랜드 로고 */}
          <div className={styles.brand}>
            <img src="/eicon-logo-white.png" alt="e-ICON World Contest" className={styles.brandLogo} />
            <div className={styles.brandSub}>{tx.edition}</div>
          </div>

          <div className={styles.links}>
            <div className={styles.linkCol}>
              <span className={styles.colTitle}>{tx.colContest}</span>
              <a href={eiconUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                {tx.aboutEicon} ↗
              </a>
              <a href="#projects" className={styles.link}>{tx.gallery}</a>
            </div>

            <div className={styles.linkCol}>
              <span className={styles.colTitle}>{tx.colHost}</span>
              <div className={styles.hostRow}>
                <span className={styles.roleTag}>{tx.hostLabel}</span>
                <a href={tx.hostUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {tx.hostName} ↗
                </a>
              </div>
              <div className={styles.hostRow}>
                <span className={styles.roleTag}>{tx.organLabel}</span>
                <a href={tx.organUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
                  {tx.organName} ↗
                </a>
              </div>
            </div>

            <div className={styles.linkCol}>
              <span className={styles.colTitle}>{tx.colFocus}</span>
              <a href="https://sdgs.un.org/goals/goal3" target="_blank" rel="noopener noreferrer" className={styles.link}>
                SDG 3 ↗
              </a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>{tx.copy1(year)}</p>
          <p className={styles.copy}>{tx.copy2}</p>
        </div>
      </div>
    </footer>
  )
}
