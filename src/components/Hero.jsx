import { Fragment, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'

function animateCounter(el, target, suffix) {
  let current = 0
  const increment = Math.max(target / 60, 0.1)
  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    el.textContent = Math.floor(current) + suffix
  }, 20)
}

export default function Hero() {
  const { settings } = useApp()
  const { hero } = settings
  const statsRef = useRef(null)
  const animated = useRef(false)

  useEffect(() => {
    animated.current = false
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          const nums = entry.target.querySelectorAll('.stat__num')
          hero.stats.forEach((s, i) => {
            const el = nums[i]
            if (!el) return
            const target = parseInt(String(s.num).replace(/\D/g, ''), 10) || 0
            animateCounter(el, target, s.suffix || '')
          })
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )
    if (statsRef.current) observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [hero.stats])

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    const header = document.getElementById('header')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight ?? 72) - 16
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  return (
    <section className="hero" id="home">
      <div className="hero__bg">
        <div className="hero__circle hero__circle--1" />
        <div className="hero__circle hero__circle--2" />
        <div className="hero__circle hero__circle--3" />
      </div>

      <div className="container hero__content">
        <div className="hero__text">
          <div className="hero__badge">
            <i className="fas fa-star" />
            <span>{hero.badge}</span>
          </div>

          <h1 className="hero__title">
            {hero.title} <br />
            <span className="text-gradient">{hero.titleHighlight}</span>
          </h1>

          <p className="hero__desc" dangerouslySetInnerHTML={{ __html: hero.description }} />

          <div className="hero__actions">
            <button className="btn btn--primary btn--lg" onClick={() => scrollTo('dang-ky-tu-van')}>
              <i className="fas fa-phone" /> {hero.ctaPrimary}
            </button>
            <button className="btn btn--outline btn--lg" onClick={() => scrollTo('about')}>
              {hero.ctaSecondary} <i className="fas fa-arrow-right" />
            </button>
          </div>

          <div className="hero__stats" ref={statsRef}>
            {hero.stats.map((s, i) => (
              <Fragment key={s.id}>
                {i > 0 && <div className="stat__divider" />}
                <div className="stat">
                  <span className="stat__num">0{s.suffix}</span>
                  <span className="stat__label">{s.label}</span>
                </div>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__card--main">
            <div className={`hero__img-placeholder${hero.imageUrl ? ' hero__img-placeholder--photo' : ''}`}>
              {hero.imageUrl ? (
                <img src={hero.imageUrl} alt="" className="hero__photo" />
              ) : (
                <i className="fas fa-child" />
              )}
            </div>
            <div className="floating-badge floating-badge--1">
              <i className="fas fa-check-circle" />
              <span>Chuyên gia tận tâm</span>
            </div>
            <div className="floating-badge floating-badge--2">
              <i className="fas fa-heart" />
              <span>Can thiệp cá nhân hóa</span>
            </div>
          </div>
        </div>
      </div>

      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  )
}
