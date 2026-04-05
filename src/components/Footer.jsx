import { useApp } from '../context/AppContext'

export default function Footer() {
  const { settings } = useApp()
  const { general, contact, menu, services } = settings

  const visibleMenu = menu.filter(m => m.visible)

  const scrollTo = (href) => {
    const el = document.getElementById(href)
    const header = document.getElementById('header')
    if (!el) return
    const top = el.getBoundingClientRect().top + window.scrollY - (header?.offsetHeight ?? 72) - 16
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <a href="#" className="nav__logo" onClick={e => { e.preventDefault(); scrollTo('home') }}>
              {general.logoUrl
                ? <img src={general.logoUrl} alt="Logo" style={{ height: 42, borderRadius: 12, objectFit: 'contain' }} />
                : <div className="logo-icon"><i className="fas fa-heart" /></div>
              }
              <div className="logo-text">
                <span className="logo-main">{general.siteName}</span>
                <span className="logo-sub">{general.siteSubtitle}</span>
              </div>
            </a>
            <p className="footer__brand-desc">
              Đồng hành cùng mỗi đứa trẻ trên con đường phát triển, với tất cả tình yêu thương và chuyên môn.
            </p>
          </div>

          <div className="footer__links">
            <h4>Điều Hướng</h4>
            <ul>
              {visibleMenu.map(item => (
                <li key={item.id}>
                  <a href={`#${item.href}`} onClick={e => { e.preventDefault(); scrollTo(item.href) }}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__links">
            <h4>Dịch Vụ</h4>
            <ul>
              {services.map(s => (
                <li key={s.id}>
                  <a href="#services" onClick={e => { e.preventDefault(); scrollTo('services') }}>{s.title}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__contact">
            <h4>Liên Hệ Nhanh</h4>
            <p><i className="fas fa-phone" /> {contact.phone}</p>
            <p><i className="fas fa-envelope" /> {contact.email}</p>
            <p><i className="fas fa-location-dot" /> {contact.address}</p>
            <div className="contact__social" style={{ marginTop: '1rem' }}>
              {contact.facebook && <a href={contact.facebook} className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a>}
              {contact.youtube  && <a href={contact.youtube}  className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" /></a>}
              {contact.tiktok   && <a href={contact.tiktok}   className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok" /></a>}
              {contact.zalo && (
                <a
                  href={contact.zalo.startsWith('http') ? contact.zalo : `https://zalo.me/${contact.zalo.replace(/\D/g, '')}`}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Zalo"
                >
                  <i className="fas fa-comment-dots" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} {general.siteName}. Bảo lưu mọi quyền.</p>
          <p>Thiết kế với <i className="fas fa-heart" style={{ color: '#e74c3c' }} /> cho các gia đình Việt Nam</p>
        </div>
      </div>
    </footer>
  )
}
