import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  {
    section: 'Tổng quan',
    items: [
      { label: 'Dashboard', icon: 'fa-gauge-high', path: '/admin/dashboard' },
    ],
  },
  {
    section: 'Cấu hình website',
    items: [
      { label: 'Thông tin & SEO', icon: 'fa-sliders', path: '/admin/settings' },
      { label: 'Menu', icon: 'fa-bars', path: '/admin/menu' },
    ],
  },
  {
    section: 'Nội dung trang',
    items: [
      { label: 'Hero', icon: 'fa-image', path: '/admin/hero' },
      { label: 'Giới thiệu', icon: 'fa-circle-info', path: '/admin/about' },
      { label: 'Dịch vụ / Chương trình', icon: 'fa-hand-holding-heart', path: '/admin/services' },
      { label: 'Quy trình', icon: 'fa-diagram-project', path: '/admin/process' },
      { label: 'Đội ngũ', icon: 'fa-people-group', path: '/admin/team' },
      { label: 'Hình ảnh hoạt động', icon: 'fa-images', path: '/admin/gallery' },
    ],
  },
  {
    section: 'Đăng ký tư vấn',
    items: [{ label: 'Danh sách đăng ký', icon: 'fa-clipboard-list', path: '/admin/contacts' }],
  },
]

const PAGE_TITLES = {
  '/admin/dashboard': { title: 'Dashboard', desc: 'Tổng quan hệ thống' },
  '/admin/settings': { title: 'Thông tin chung', desc: 'Logo, SEO, liên hệ' },
  '/admin/menu': { title: 'Quản lý menu', desc: 'Menu điều hướng trang chủ' },
  '/admin/hero': { title: 'Hero', desc: 'Banner & thống kê đầu trang' },
  '/admin/about': { title: 'Giới thiệu', desc: 'Nội dung khu vực Về chúng tôi' },
  '/admin/services': { title: 'Dịch vụ', desc: 'Chương trình can thiệp' },
  '/admin/process': { title: 'Quy trình', desc: 'Các bước làm việc' },
  '/admin/team': { title: 'Đội ngũ', desc: 'Chuyên gia & nhân sự' },
  '/admin/gallery': { title: 'Hình ảnh hoạt động', desc: 'Thư viện ảnh' },
  '/admin/contacts': { title: 'Đăng ký tư vấn', desc: 'Yêu cầu gửi từ form trên website (lưu trong data/site-data.json)' },
}

export default function AdminLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const page = PAGE_TITLES[location.pathname] ?? { title: 'Admin', desc: '' }

  const handleLogout = () => {
    sessionStorage.removeItem('adm_auth')
    navigate('/admin')
  }

  return (
    <div className="adm-layout">
      <aside className="adm-sidebar">
        <div className="adm-sidebar__brand">
          <div className="adm-sidebar__brand-inner">
            <div className="adm-sidebar__brand-icon">
              <i className="fas fa-heart" />
            </div>
            <div>
              <div className="adm-sidebar__brand-name">Tâm Phúc</div>
              <span className="adm-sidebar__brand-badge">Admin</span>
            </div>
          </div>
        </div>

        <nav className="adm-sidebar__nav">
          {NAV_ITEMS.map(group => (
            <div key={group.section}>
              <div className="adm-sidebar__section-label">{group.section}</div>
              {group.items.map(item => (
                <button
                  key={item.path}
                  type="button"
                  className={`adm-sidebar__link${location.pathname === item.path ? ' active' : ''}`}
                  onClick={() => navigate(item.path)}
                >
                  <i className={`fas ${item.icon}`} />
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </nav>

        <div className="adm-sidebar__footer">
          <a href="/" target="_blank" rel="noopener noreferrer">
            <i className="fas fa-arrow-up-right-from-square" />
            Xem website
          </a>
          <button type="button" className="adm-sidebar__link" style={{ marginTop: 4 }} onClick={handleLogout}>
            <i className="fas fa-right-from-bracket" />
            Đăng xuất
          </button>
        </div>
      </aside>

      <div className="adm-main">
        <header className="adm-topbar">
          <div className="adm-topbar__title">
            <h2>{page.title}</h2>
            <p>{page.desc}</p>
          </div>
          <div className="adm-topbar__right">
            <div className="adm-topbar__user">
              <div className="adm-topbar__avatar">
                <i className="fas fa-user" />
              </div>
              <div>
                <div className="adm-topbar__user-name">Administrator</div>
                <div className="adm-topbar__user-role">Quản trị viên</div>
              </div>
            </div>
          </div>
        </header>

        <main className="adm-content">{children}</main>
      </div>
    </div>
  )
}
