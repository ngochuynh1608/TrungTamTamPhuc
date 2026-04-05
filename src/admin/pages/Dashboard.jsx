import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'

export default function Dashboard() {
  const { settings, contacts } = useApp()
  const navigate = useNavigate()

  const unreadContacts = contacts.filter(c => !c.read).length

  const stats = [
    { icon: 'fa-hand-holding-heart', color: 'blue', num: settings.services.length, label: 'Chương trình / Dịch vụ' },
    { icon: 'fa-bars', color: 'green', num: settings.menu.filter(m => m.visible).length, label: 'Mục menu hiển thị' },
    { icon: 'fa-clipboard-list', color: 'orange', num: contacts.length, label: 'Đăng ký tư vấn' },
    { icon: 'fa-envelope-open', color: 'purple', num: unreadContacts, label: 'Chưa đọc' },
  ]

  const quickLinks = [
    { icon: 'fa-sliders', label: 'Thông tin & SEO', path: '/admin/settings' },
    { icon: 'fa-bars', label: 'Menu', path: '/admin/menu' },
    { icon: 'fa-image', label: 'Hero', path: '/admin/hero' },
    { icon: 'fa-circle-info', label: 'Giới thiệu', path: '/admin/about' },
    { icon: 'fa-hand-holding-heart', label: 'Dịch vụ', path: '/admin/services' },
    { icon: 'fa-diagram-project', label: 'Quy trình', path: '/admin/process' },
    { icon: 'fa-people-group', label: 'Đội ngũ', path: '/admin/team' },
    { icon: 'fa-images', label: 'Hình ảnh hoạt động', path: '/admin/gallery' },
    { icon: 'fa-clipboard-list', label: 'Đăng ký tư vấn', path: '/admin/contacts' },
    { icon: 'fa-arrow-up-right-from-square', label: 'Xem website', path: '/', external: true },
  ]

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Xin chào, Admin!</h1>
          <p>Tổng quan hệ thống quản trị Trung Tâm {settings.general.siteName}.</p>
        </div>
      </div>

      <div className="adm-stats-grid">
        {stats.map(s => (
          <div className="adm-stat-card" key={s.label}>
            <div className={`adm-stat-card__icon adm-stat-card__icon--${s.color}`}>
              <i className={`fas ${s.icon}`} />
            </div>
            <div>
              <div className="adm-stat-card__num">{s.num}</div>
              <div className="adm-stat-card__label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        <div className="adm-card">
          <div className="adm-card__header">
            <h3><i className="fas fa-bolt" style={{ marginRight: 8, color: 'var(--adm-warning)' }} />Truy cập nhanh</h3>
          </div>
          <div className="adm-card__body">
            <div className="adm-quick-links" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {quickLinks.map(link => (
                <button
                  key={link.path + link.label}
                  className="adm-quick-link"
                  onClick={() => (link.external ? window.open(link.path, '_blank') : navigate(link.path))}
                >
                  <i className={`fas ${link.icon}`} />
                  <span>{link.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="adm-card">
          <div className="adm-card__header">
            <h3><i className="fas fa-circle-info" style={{ marginRight: 8, color: 'var(--adm-primary)' }} />Thông tin website</h3>
          </div>
          <div className="adm-card__body">
            {[
              { label: 'Tên website', value: settings.general.siteName },
              { label: 'Tiêu đề SEO', value: settings.seo.metaTitle },
              { label: 'Hotline', value: settings.contact.phone },
              { label: 'Email', value: settings.contact.email },
            ].map(row => (
              <div
                key={row.label}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid var(--adm-border)',
                  fontSize: '0.875rem',
                }}
              >
                <span style={{ color: 'var(--adm-text-light)', fontWeight: 500 }}>{row.label}</span>
                <span style={{ fontWeight: 600 }}>{row.value || '—'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
