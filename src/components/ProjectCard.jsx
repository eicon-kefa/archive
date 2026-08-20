import { useLang } from '../context/LangContext'
import { translations, getCountryName, getThemeName } from '../i18n/translations'
import styles from './ProjectCard.module.css'

const THEME_COLORS = {
  'Mental Health':      '#8b5cf6',
  'Fitness':            '#34d399',
  'Nutrition':          '#fb923c',
  'Elderly Care':       '#3b82f6',
  'Disability':         '#ec4899',
  'Maternal Health':    '#f59e0b',
  'Disease Prevention': '#10b981',
  'Other':              '#6b7280',
}

export default function ProjectCard({ project, onClick }) {
  const { lang } = useLang()
  const tx = translations[lang].card
  const themeColor = THEME_COLORS[project.theme] || THEME_COLORS['Other']

  const description   = lang === 'ko' && project.descriptionKo ? project.descriptionKo : project.description
  const projectTitle  = lang === 'en' && project.projectTitleEn ? project.projectTitleEn : project.projectTitle
  const school        = lang === 'en' && project.schoolEn      ? project.schoolEn        : project.school
  const countryDisplay = getCountryName(project.country, lang)
  const themeDisplay   = getThemeName(project.theme, lang)

  return (
    <article className={styles.card} onClick={() => onClick(project)}>
      {/* 썸네일 */}
      <div className={styles.thumb}>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={projectTitle} className={styles.thumbImg} />
        ) : (
          <div className={styles.thumbPlaceholder}>
            <div className={styles.placeholderInner}>
              <span className={styles.placeholderLabel}>{tx.placeholder}</span>
              <span className={styles.placeholderTitle}>{projectTitle}</span>
            </div>
          </div>
        )}
      </div>

      {/* 카드 본문 */}
      <div className={styles.body}>
        <div className={styles.meta}>
          <span className={styles.theme} style={{ color: themeColor }}>
            {themeDisplay}
          </span>
          <span className={styles.country}>{countryDisplay}</span>
        </div>

        <h3 className={styles.title}>{projectTitle}</h3>
        <p className={styles.description}>{description}</p>

        <div className={styles.info}>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>{tx.teamLabel}</span>
            <span className={styles.infoValue}>{project.teamName}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>{tx.schoolLabel}</span>
            <span className={styles.infoValue}>
              {school}
              {project.schoolOverseas && ` · ${project.schoolOverseas}`}
            </span>
          </div>
        </div>

        <div className={styles.actions} onClick={(e) => e.stopPropagation()}>
          {(project.deployUrl || project.htmlPath) && (
            <a
              href={project.deployUrl || project.htmlPath}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ fontSize: 13, height: 36, padding: '0 14px' }}
            >
              {tx.viewApp}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ fontSize: 13, height: 36, padding: '0 14px' }}
            >
              {tx.github}
            </a>
          )}
          <button className={styles.detailBtn} onClick={() => onClick(project)}>
            {tx.details}
          </button>
        </div>
      </div>
    </article>
  )
}
