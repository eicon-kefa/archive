import { useLang } from '../context/LangContext'
import { translations } from '../i18n/translations'
import styles from './Header.module.css'

export default function Header() {
  const { lang, setLang } = useLang()
  const tx = translations[lang].nav

  const kefaUrl = lang === 'ko'
    ? 'https://kefa.or.kr/'
    : 'https://kefa.or.kr/e_main.php'

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>

        <a href="/" className={styles.brand}>
          <img src="/eicon-logo.png" alt="e-ICON World Contest" className={styles.brandLogo} />
        </a>

        <nav className={styles.nav}>
          <a href="#projects" className={styles.navLink}>{tx.projects}</a>
          <a href="#about"    className={styles.navLink}>{tx.about}</a>

          <a
            href={kefaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            style={{ height: 36, fontSize: 13 }}
          >
            {tx.kefa}
          </a>

          <div className={styles.langToggle}>
            <button
              className={`${styles.langBtn} ${lang === 'ko' ? styles.langActive : ''}`}
              onClick={() => setLang('ko')}
            >
              KO
            </button>
            <button
              className={`${styles.langBtn} ${lang === 'en' ? styles.langActive : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
