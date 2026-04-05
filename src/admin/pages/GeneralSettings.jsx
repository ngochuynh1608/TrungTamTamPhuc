import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'

function Toast({ msg, onDone }) {
  return msg ? (
    <div className="adm-toast">
      <i className="fas fa-check-circle" /> {msg}
    </div>
  ) : null
}

export default function GeneralSettings() {
  const { settings, saveSection } = useApp()
  const [tab, setTab] = useState('general')
  const [toast, setToast] = useState('')
  const logoInputRef = useRef(null)
  const faviconInputRef = useRef(null)

  // Local copies for each tab
  const [general, setGeneral] = useState({ ...settings.general })
  const [seo, setSeo] = useState({ ...settings.seo })
  const [contact, setContact] = useState({ ...settings.contact })

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleLogoUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setGeneral(p => ({ ...p, logoUrl: ev.target.result }))
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleFaviconUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setGeneral(p => ({ ...p, faviconUrl: ev.target.result }))
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const saveGeneral = () => {
    saveSection('general', general)
    showToast('Đã lưu thông tin chung!')
  }

  const saveSeo = () => {
    saveSection('seo', seo)
    showToast('Đã lưu cài đặt SEO!')
  }

  const saveContact = () => {
    saveSection('contact', contact)
    showToast('Đã lưu thông tin liên hệ!')
  }

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Thông Tin Chung</h1>
          <p>Cấu hình logo, tên website, SEO và thông tin liên hệ.</p>
        </div>
      </div>

      <div className="adm-tabs">
        {[
          { key: 'general', label: 'Logo & Website', icon: 'fa-globe' },
          { key: 'seo',     label: 'SEO',            icon: 'fa-magnifying-glass' },
          { key: 'contact', label: 'Liên Hệ',        icon: 'fa-address-book' },
        ].map(t => (
          <button
            key={t.key}
            className={`adm-tab${tab === t.key ? ' active' : ''}`}
            onClick={() => setTab(t.key)}
          >
            <i className={`fas ${t.icon}`} style={{ marginRight: 6 }} />{t.label}
          </button>
        ))}
      </div>

      {/* TAB: General */}
      {tab === 'general' && (
        <div className="adm-card">
          <div className="adm-card__header">
            <h3>Logo & Thông Tin Website</h3>
          </div>
          <div className="adm-card__body">
            {/* Logo */}
            <div className="adm-form__group">
              <label className="adm-form__label">Logo</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  className="adm-logo-preview"
                  onClick={() => logoInputRef.current?.click()}
                  title="Click để thay đổi logo"
                >
                  {general.logoUrl
                    ? <img src={general.logoUrl} alt="Logo" />
                    : <><i className="fas fa-image" /><span>Tải lên</span></>
                  }
                </div>
                <div>
                  <button className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => logoInputRef.current?.click()}>
                    <i className="fas fa-upload" /> Chọn ảnh
                  </button>
                  {general.logoUrl && (
                    <button className="adm-btn adm-btn--danger adm-btn--sm" style={{ marginLeft: 8 }}
                      onClick={() => setGeneral(p => ({ ...p, logoUrl: '' }))}>
                      <i className="fas fa-trash" /> Xóa
                    </button>
                  )}
                  <p className="adm-form__hint">PNG, JPG, SVG. Kích thước khuyến nghị: 200×80px</p>
                </div>
              </div>
              <input ref={logoInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleLogoUpload} />
            </div>

            <div className="adm-form__group">
              <label className="adm-form__label">Favicon (icon tab trình duyệt)</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div
                  className="adm-logo-preview"
                  style={{ width: 56, height: 56, minHeight: 56, padding: 4 }}
                  onClick={() => faviconInputRef.current?.click()}
                  title="Click để tải favicon"
                >
                  {general.faviconUrl ? (
                    <img src={general.faviconUrl} alt="Favicon" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                  ) : (
                    <><i className="fas fa-star" /><span>ICO / PNG</span></>
                  )}
                </div>
                <div>
                  <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => faviconInputRef.current?.click()}>
                    <i className="fas fa-upload" /> Chọn favicon
                  </button>
                  {general.faviconUrl && (
                    <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" style={{ marginLeft: 8 }}
                      onClick={() => setGeneral(p => ({ ...p, faviconUrl: null }))}>
                      <i className="fas fa-trash" /> Xóa
                    </button>
                  )}
                  <p className="adm-form__hint">PNG, ICO, SVG — khuyến nghị 32×32px hoặc 48×48px. Hiển thị sau khi Lưu.</p>
                </div>
              </div>
              <input ref={faviconInputRef} type="file" accept="image/png,image/x-icon,image/vnd.microsoft.icon,.ico,image/svg+xml,image/jpeg,image/webp" style={{ display: 'none' }} onChange={handleFaviconUpload} />
            </div>

            <div className="adm-form__row">
              <div className="adm-form__group">
                <label className="adm-form__label">Tên Trung Tâm</label>
                <input className="adm-form__input" value={general.siteName}
                  onChange={e => setGeneral(p => ({ ...p, siteName: e.target.value }))} placeholder="Tâm Phúc" />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Tiêu Đề Phụ</label>
                <input className="adm-form__input" value={general.siteSubtitle}
                  onChange={e => setGeneral(p => ({ ...p, siteSubtitle: e.target.value }))} placeholder="Trung Tâm Can Thiệp" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="adm-btn adm-btn--primary" onClick={saveGeneral}>
                <i className="fas fa-floppy-disk" /> Lưu Thay Đổi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: SEO */}
      {tab === 'seo' && (
        <div className="adm-card">
          <div className="adm-card__header">
            <h3>Cài Đặt SEO</h3>
          </div>
          <div className="adm-card__body">
            <div className="adm-form__group">
              <label className="adm-form__label">Tiêu Đề Trang (Meta Title)</label>
              <input className="adm-form__input" value={seo.metaTitle}
                onChange={e => setSeo(p => ({ ...p, metaTitle: e.target.value }))}
                placeholder="Trung Tâm Can Thiệp Tâm Phúc" />
              <p className="adm-form__hint">Nên từ 50–60 ký tự. Hiện tại: {seo.metaTitle.length} ký tự</p>
            </div>

            <div className="adm-form__group">
              <label className="adm-form__label">Mô Tả Trang (Meta Description)</label>
              <textarea className="adm-form__textarea" rows={3} value={seo.metaDesc}
                onChange={e => setSeo(p => ({ ...p, metaDesc: e.target.value }))}
                placeholder="Mô tả ngắn gọn về website..." />
              <p className="adm-form__hint">Nên từ 150–160 ký tự. Hiện tại: {seo.metaDesc.length} ký tự</p>
            </div>

            <div className="adm-form__group">
              <label className="adm-form__label">Từ Khóa (Keywords)</label>
              <input className="adm-form__input" value={seo.keywords}
                onChange={e => setSeo(p => ({ ...p, keywords: e.target.value }))}
                placeholder="trung tâm tự kỷ, can thiệp, trị liệu..." />
              <p className="adm-form__hint">Các từ khóa cách nhau bằng dấu phẩy</p>
            </div>

            {/* Preview */}
            <div style={{ background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius-sm)', padding: 16, marginBottom: 20 }}>
              <p style={{ fontSize: '0.75rem', color: 'var(--adm-text-light)', marginBottom: 8 }}>Xem trước trên Google:</p>
              <p style={{ color: '#1a0dab', fontSize: '1rem', fontWeight: 500 }}>{seo.metaTitle || 'Tiêu đề trang'}</p>
              <p style={{ color: '#006621', fontSize: '0.8rem' }}>tamphuc.vn</p>
              <p style={{ color: '#545454', fontSize: '0.85rem' }}>{seo.metaDesc || 'Mô tả trang...'}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="adm-btn adm-btn--primary" onClick={saveSeo}>
                <i className="fas fa-floppy-disk" /> Lưu SEO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB: Contact */}
      {tab === 'contact' && (
        <div className="adm-card">
          <div className="adm-card__header">
            <h3>Thông Tin Liên Hệ & Mạng Xã Hội</h3>
          </div>
          <div className="adm-card__body">
            <div className="adm-form__row">
              <div className="adm-form__group">
                <label className="adm-form__label"><i className="fas fa-phone" style={{ marginRight: 6 }} />Số Điện Thoại</label>
                <input className="adm-form__input" value={contact.phone}
                  onChange={e => setContact(p => ({ ...p, phone: e.target.value }))} placeholder="0909 123 456" />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label"><i className="fas fa-envelope" style={{ marginRight: 6 }} />Email</label>
                <input className="adm-form__input" type="email" value={contact.email}
                  onChange={e => setContact(p => ({ ...p, email: e.target.value }))} placeholder="info@tamphuc.vn" />
              </div>
            </div>

            <div className="adm-form__group">
              <label className="adm-form__label"><i className="fas fa-location-dot" style={{ marginRight: 6 }} />Địa Chỉ</label>
              <input className="adm-form__input" value={contact.address}
                onChange={e => setContact(p => ({ ...p, address: e.target.value }))} placeholder="123 Đường ABC, Quận 1, TP.HCM" />
            </div>

            <div className="adm-form__group">
              <label className="adm-form__label"><i className="fas fa-clock" style={{ marginRight: 6 }} />Giờ Làm Việc</label>
              <input className="adm-form__input" value={contact.workingHours}
                onChange={e => setContact(p => ({ ...p, workingHours: e.target.value }))}
                placeholder="Thứ 2 – Thứ 7: 7:30 – 17:30" />
            </div>

            <div style={{ marginBottom: 16 }}>
              <p className="adm-form__label" style={{ marginBottom: 12 }}>Mạng Xã Hội</p>
              <div className="adm-form__group">
                <label className="adm-form__label">
                  <i className="fab fa-facebook" style={{ marginRight: 6, color: '#1877F2' }} />Facebook URL
                </label>
                <input className="adm-form__input" value={contact.facebook}
                  onChange={e => setContact(p => ({ ...p, facebook: e.target.value }))} placeholder="https://facebook.com/tamphuc" />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">
                  <i className="fab fa-youtube" style={{ marginRight: 6, color: '#FF0000' }} />YouTube URL
                </label>
                <input className="adm-form__input" value={contact.youtube}
                  onChange={e => setContact(p => ({ ...p, youtube: e.target.value }))} placeholder="https://youtube.com/@tamphuc" />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">
                  <i className="fab fa-tiktok" style={{ marginRight: 6 }} />TikTok URL
                </label>
                <input className="adm-form__input" value={contact.tiktok}
                  onChange={e => setContact(p => ({ ...p, tiktok: e.target.value }))} placeholder="https://tiktok.com/@tamphuc" />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">
                  <i className="fas fa-comment-dots" style={{ marginRight: 6 }} />Zalo (số điện thoại hoặc link)
                </label>
                <input className="adm-form__input" value={contact.zalo ?? ''}
                  onChange={e => setContact(p => ({ ...p, zalo: e.target.value }))} placeholder="0909123456 hoặc link Zalo OA" />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button className="adm-btn adm-btn--primary" onClick={saveContact}>
                <i className="fas fa-floppy-disk" /> Lưu Liên Hệ
              </button>
            </div>
          </div>
        </div>
      )}

      <Toast msg={toast} />
    </>
  )
}
