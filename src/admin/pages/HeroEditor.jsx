import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'

export default function HeroEditor() {
  const { settings, saveHero } = useApp()
  const [hero, setHero] = useState(() => JSON.parse(JSON.stringify(settings.hero)))
  const [toast, setToast] = useState('')
  const imageInputRef = useRef(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const updateStat = (id, field, value) => {
    setHero(h => ({
      ...h,
      stats: h.stats.map(s => (s.id === id ? { ...s, [field]: value } : s)),
    }))
  }

  const addStat = () => {
    setHero(h => ({
      ...h,
      stats: [...h.stats, { id: Date.now(), num: '0', suffix: '+', label: 'Mới' }],
    }))
  }

  const removeStat = (id) => {
    setHero(h => ({ ...h, stats: h.stats.filter(s => s.id !== id) }))
  }

  const handleSave = () => {
    saveHero(hero)
    showToast('Đã lưu Hero!')
  }

  const handleHeroImage = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setHero(h => ({ ...h, imageUrl: ev.target.result }))
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Hero (Banner chính)</h1>
          <p>Tiêu đề, mô tả, nút kêu gọi, hình ảnh và thống kê hiển thị đầu trang.</p>
        </div>
        <button className="adm-btn adm-btn--primary" onClick={handleSave}>
          <i className="fas fa-floppy-disk" /> Lưu
        </button>
      </div>

      <div className="adm-card">
        <div className="adm-card__header"><h3>Hình ảnh (cột bên phải)</h3></div>
        <div className="adm-card__body">
          <div className="adm-form__group">
            <label className="adm-form__label">Ảnh minh họa</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <div
                className="adm-logo-preview"
                style={{ width: 200, height: 220, borderRadius: 12, cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => imageInputRef.current?.click()}
                title="Chọn ảnh"
              >
                {hero.imageUrl
                  ? <img src={hero.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <><i className="fas fa-image" /><span>Chưa có ảnh</span></>
                }
              </div>
              <div>
                <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => imageInputRef.current?.click()}>
                  <i className="fas fa-upload" /> Tải ảnh lên
                </button>
                {hero.imageUrl && (
                  <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" style={{ marginLeft: 8 }}
                    onClick={() => setHero(h => ({ ...h, imageUrl: null }))}>
                    <i className="fas fa-trash" /> Gỡ ảnh
                  </button>
                )}
                <p className="adm-form__hint">JPG, PNG, WebP. Khuyến nghị tỉ lệ dọc hoặc vuông, tối đa ~5MB.</p>
              </div>
            </div>
            <input ref={imageInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleHeroImage} />
          </div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card__header"><h3>Nội dung</h3></div>
        <div className="adm-card__body">
          <div className="adm-form__group">
            <label className="adm-form__label">Dòng badge (nhỏ phía trên tiêu đề)</label>
            <input className="adm-form__input" value={hero.badge}
              onChange={e => setHero(h => ({ ...h, badge: e.target.value }))} />
          </div>
          <div className="adm-form__row">
            <div className="adm-form__group">
              <label className="adm-form__label">Tiêu đề dòng 1</label>
              <input className="adm-form__input" value={hero.title}
                onChange={e => setHero(h => ({ ...h, title: e.target.value }))} />
            </div>
            <div className="adm-form__group">
              <label className="adm-form__label">Tiêu đề dòng 2 (highlight)</label>
              <input className="adm-form__input" value={hero.titleHighlight}
                onChange={e => setHero(h => ({ ...h, titleHighlight: e.target.value }))} />
            </div>
          </div>
          <div className="adm-form__group">
            <label className="adm-form__label">Mô tả (cho phép HTML, ví dụ &lt;strong&gt;)</label>
            <textarea className="adm-form__textarea" rows={4} value={hero.description}
              onChange={e => setHero(h => ({ ...h, description: e.target.value }))} />
          </div>
          <div className="adm-form__row">
            <div className="adm-form__group">
              <label className="adm-form__label">Nút chính</label>
              <input className="adm-form__input" value={hero.ctaPrimary}
                onChange={e => setHero(h => ({ ...h, ctaPrimary: e.target.value }))} />
            </div>
            <div className="adm-form__group">
              <label className="adm-form__label">Nút phụ</label>
              <input className="adm-form__input" value={hero.ctaSecondary}
                onChange={e => setHero(h => ({ ...h, ctaSecondary: e.target.value }))} />
            </div>
          </div>
        </div>
      </div>

      <div className="adm-card" style={{ marginTop: 20 }}>
        <div className="adm-card__header">
          <h3>Thống kê (số liệu)</h3>
          <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={addStat}>
            <i className="fas fa-plus" /> Thêm dòng
          </button>
        </div>
        <div className="adm-card__body">
          {hero.stats.map(s => (
            <div key={s.id} className="adm-form__row" style={{ alignItems: 'flex-end', marginBottom: 12 }}>
              <div className="adm-form__group" style={{ flex: 1 }}>
                <label className="adm-form__label">Số</label>
                <input className="adm-form__input" value={s.num}
                  onChange={e => updateStat(s.id, 'num', e.target.value)} />
              </div>
              <div className="adm-form__group" style={{ width: 80 }}>
                <label className="adm-form__label">Hậu tố</label>
                <input className="adm-form__input" value={s.suffix}
                  onChange={e => updateStat(s.id, 'suffix', e.target.value)} placeholder="+, %..." />
              </div>
              <div className="adm-form__group" style={{ flex: 2 }}>
                <label className="adm-form__label">Nhãn</label>
                <input className="adm-form__input" value={s.label}
                  onChange={e => updateStat(s.id, 'label', e.target.value)} />
              </div>
              <button type="button" className="adm-btn adm-btn--danger adm-btn--icon" onClick={() => removeStat(s.id)}>
                <i className="fas fa-trash" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {toast && (
        <div className="adm-toast">
          <i className="fas fa-check-circle" /> {toast}
        </div>
      )}
    </>
  )
}
