import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'

export default function Header() {
  const { settings } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  const visibleMenu = settings.menu.filter(item => item.visible)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      const sections = document.querySelectorAll('section[id]')
      const scrollPos = window.scrollY + 100
      sections.forEach(section => {
        const top = section.offsetTop
        const height = section.offsetHeight
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection(section.id)
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [menuOpen])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (!el) return
    const header = document.getElementById('header')
    const offset = header?.offsetHeight ?? 72
    const top = el.getBoundingClientRect().top + window.scrollY - offset - 16
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}`} id="header">
      <nav className="nav container">
        <a href="#" className="nav__logo" onClick={e => { e.preventDefault(); scrollTo('home') }}>
          {settings.general.logoUrl ? (
            <img src={settings.general.logoUrl} alt="Logo" style={{ height: 42, borderRadius: 12, objectFit: 'contain' }} />
          ) : (
            <div className="logo-icon"><i className="fas fa-heart" /></div>
          )}
          <div className="logo-text">
            <span className="logo-main">{settings.general.siteName}</span>
            <span className="logo-sub">{settings.general.siteSubtitle}</span>
          </div>
        </a>

        <ul className={`nav__list${menuOpen ? ' open' : ''}`}>
          {visibleMenu.map(item => (
            <li key={item.id}>
              <button
                className={`nav__link${activeSection === item.href ? ' active' : ''}`}
                onClick={() => scrollTo(item.href)}
              >
                {item.label}
              </button>
            </li>
          ))}
          <li className="nav__item-cta">
            <button
              type="button"
              className="btn btn--primary btn--full nav__cta-mobile"
              onClick={() => scrollTo('dang-ky-tu-van')}
            >
              Đăng Ký Tư Vấn
            </button>
          </li>
        </ul>

        <button className="btn btn--primary nav__cta" onClick={() => scrollTo('dang-ky-tu-van')}>
          Đăng Ký Tư Vấn
        </button>

        <button
          className={`nav__toggle${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Menu"
        >
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`} />
        </button>
      </nav>
    </header>
  )
}
