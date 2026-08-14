import { useEffect } from 'react'
import { useLang } from '../context/LangContext'
import { translations, getCountryName, getThemeName } from '../i18n/translations'
import styles from './ProjectModal.module.css'

const THEME_COLORS = {
  'Mental Health': '#8b5cf6',
  'Fitness': '#34d399',
  'Nutrition': '#fb923c',
  'Elderly Care': '#3b82f6',
  'Disability': '#ec4899',
  'Maternal Health': '#f59e0b',
  'Disease Prevention': '#10b981',
  'Other': '#6b7280',
}

export default function ProjectModal({ project, onClose, onPreview }) {
  const { lang } = useLang()
  const tx = translations[lang].modal

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  const themeColor = THEME_COLORS[project.theme] || THEME_COLORS['Other']
  const countryDisplay = getCountryName(project.country, lang)
  const themeDisplay   = getThemeName(project.theme, lang)

  // 언어별 콘텐츠 필드 선택
  const problem      = lang === 'ko' && project.problemKo      ? project.problemKo      : project.problem
  const solution     = lang === 'ko' && project.solutionKo     ? project.solutionKo     : project.solution
  const keyFeatures  = lang === 'ko' && project.keyFeaturesKo  ? project.keyFeaturesKo  : project.keyFeatures

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Modal header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className={styles.theme} style={{ color: themeColor }}>
              {themeDisplay}
            </span>
            <span className={styles.country}>{countryDisplay}</span>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label={tx.close}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Thumbnail */}
        <div className={styles.thumb}>
          {project.thumbnail ? (
            <img src={project.thumbnail} alt={project.projectTitle} />
          ) : (
            <div className={styles.thumbPlaceholder}>
              <span className={styles.placeholderLabel}>{tx.placeholder}</span>
              <span className={styles.placeholderTitle}>{project.projectTitle}</span>
            </div>
          )}
        </div>

        {/* Scrollable content */}
        <div className={styles.content}>
          <h2 className={styles.title}>{project.projectTitle}</h2>
          <p className={styles.teamLine}>
            <strong>{project.teamName}</strong> · {project.school}
            {project.schoolOverseas && ` · ${project.schoolOverseas}`}
          </p>

          {/* CTA buttons */}
          <div className={styles.ctas}>
            {project.htmlPath && (
              <button
                className="btn-primary"
                onClick={() => { onClose(); onPreview(project) }}
              >
                {lang === 'ko' ? '앱 미리보기' : 'Preview App'}
              </button>
            )}
            {project.deployUrl && (
              <a href={project.deployUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {tx.viewApp}
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                {tx.github}
              </a>
            )}
          </div>

          <div className={styles.divider} />

          {/* Problem & Solution */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{tx.problem}</h3>
            <p className={styles.sectionBody}>{problem}</p>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>{tx.solution}</h3>
            <p className={styles.sectionBody}>{solution}</p>
          </div>

          {/* Key Features */}
          {keyFeatures?.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{tx.keyFeatures}</h3>
              <ul className={styles.featureList}>
                {keyFeatures.map((f, i) => (
                  <li key={i} className={styles.featureItem}>
                    <span className={styles.featureDot} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          {project.techStack?.length > 0 && (
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>{tx.techStack}</h3>
              <div className={styles.tags}>
                {project.techStack.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
            </div>
          )}

          <div className={styles.divider} />

          {/* Team */}
          <div className={styles.twoCol}>
            {project.members?.length > 0 && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{tx.members}</h3>
                <ul className={styles.memberList}>
                  {project.members.map((m) => (
                    <li key={m} className={styles.member}>
                      <span className={styles.avatar}>{m[0]}</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {project.teacher && (
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>{tx.teacher}</h3>
                <div className={styles.member}>
                  <span className={styles.avatar}>{project.teacher[0]}</span>
                  {project.teacher}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
