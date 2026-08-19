import { useState, useMemo } from 'react'
import { projects, countries, themes } from './data/projects'
import { LangProvider } from './context/LangContext'
import Header from './components/Header'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import ProjectGallery from './components/ProjectGallery'
import ProjectModal from './components/ProjectModal'
import Footer from './components/Footer'
import styles from './App.module.css'

function AppInner() {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [selectedTheme, setSelectedTheme] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    return projects.filter((p) => {
      if (selectedCountry && p.country !== selectedCountry) return false
      if (selectedTheme && p.theme !== selectedTheme) return false
      if (q) {
        const haystack = [p.teamName, p.projectTitle, p.school, p.country, p.theme]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(q)) return false
      }
      return true
    })
  }, [selectedCountry, selectedTheme, searchQuery])

  return (
    <>
      <Header />

      <main>
        <Hero totalProjects={projects.length} />

        <section id="projects" className={styles.gallerySection}>
          <FilterBar
            countries={countries}
            themes={themes}
            selectedCountry={selectedCountry}
            selectedTheme={selectedTheme}
            searchQuery={searchQuery}
            onCountryChange={setSelectedCountry}
            onThemeChange={setSelectedTheme}
            onSearchChange={setSearchQuery}
            resultCount={filtered.length}
          />
          <div className={`container ${styles.gallery}`}>
            <ProjectGallery projects={filtered} onSelect={setSelectedProject} />
          </div>
        </section>

        {/* CTA band */}
        <CtaBand />
      </main>

      <Footer />

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}

import { useLang } from './context/LangContext'
import { translations } from './i18n/translations'

function CtaBand() {
  const { lang } = useLang()
  const tx = translations[lang].cta

  return (
    <section className={styles.ctaBand}>
      <div className={`container ${styles.ctaInner}`}>
        <h2 className="display-sm">{tx.title}</h2>
        <p className={styles.ctaBody}>{tx.body}</p>
        <a href="#projects" className="btn-primary">{tx.btn}</a>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <LangProvider>
      <AppInner />
    </LangProvider>
  )
}
