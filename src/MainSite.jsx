import { useEffect } from 'react'
import { useApp } from './context/AppContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Process from './components/Process'
import Team from './components/Team'
import ActivityGallery from './components/ActivityGallery'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollTop from './components/ScrollTop'

export default function MainSite() {
  const { settings } = useApp()

  // Update document title & meta from admin settings
  useEffect(() => {
    document.title = settings.seo.metaTitle || settings.general.siteName
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) metaDesc.setAttribute('content', settings.seo.metaDesc)
    let metaKw = document.querySelector('meta[name="keywords"]')
    if (!metaKw) {
      metaKw = document.createElement('meta')
      metaKw.setAttribute('name', 'keywords')
      document.head.appendChild(metaKw)
    }
    metaKw.setAttribute('content', settings.seo.keywords || '')
  }, [settings.seo, settings.general.siteName])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Process />
        <Team />
        <ActivityGallery />
        <Contact />
      </main>
      <Footer />
      <ScrollTop />
    </>
  )
}
