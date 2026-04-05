import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'

export default function AboutEditor() {
  const { settings, saveAbout } = useApp()
  const [about, setAbout] = useState(() => JSON.parse(JSON.stringify(settings.about)))
  const [toast, setToast] = useState('')
  const mainImageRef = useRef(null)
  const secondaryImageRef = useRef(null)

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const updateFeature = (id, field, value) => {
    setAbout(a => ({
      ...a,
      features: a.features.map(f => (f.id === id ? { ...f, [field]: value } : f)),
    }))
  }

  const addFeature = () => {
    setAbout(a => ({
      ...a,
      features: [...a.features, { id: Date.now(), icon: 'fa-star', title: 'Tiêu đề', desc: 'Mô tả ngắn' }],
    }))
  }

  const removeFeature = (id) => {
    setAbout(a => ({ ...a, features: a.features.filter(f => f.id !== id) }))
  }

  const handleSave = () => {
    saveAbout(about)
    showToast('Đã lưu phần Giới thiệu!')
  }

  const readImage = (e, field) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => setAbout(a => ({ ...a, [field]: ev.target.result }))
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Giới thiệu</h1>
          <p>Tiêu đề, hình ảnh, nội dung và các điểm nổi bật.</p>
        </div>
        <button className="adm-btn adm-btn--primary" onClick={handleSave}>
          <i className="fas fa-floppy-disk" /> Lưu
        </button>
      </div>

      <div className="adm-card">
        <div className="adm-card__header"><h3>Hình ảnh khu vực trái</h3></div>
        <div className="adm-card__body">
          <p className="adm-form__hint" style={{ marginBottom: 16 }}>
            Ảnh lớn (chính) và ảnh nhỏ (góc). Nếu không tải ảnh, trang sẽ hiển thị icon mặc định.
          </p>
          <div className="adm-form__row" style={{ alignItems: 'flex-start' }}>
            <div className="adm-form__group" style={{ flex: 1 }}>
              <label className="adm-form__label">Ảnh chính (lớn)</label>
              <div
                className="adm-logo-preview"
                style={{ width: '100%', maxWidth: 280, height: 200, borderRadius: 12, cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => mainImageRef.current?.click()}
              >
                {about.imageMainUrl
                  ? <img src={about.imageMainUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <><i className="fas fa-image" /><span>Chọn ảnh</span></>
                }
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => mainImageRef.current?.click()}>
                  <i className="fas fa-upload" /> Tải lên
                </button>
                {about.imageMainUrl && (
                  <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => setAbout(a => ({ ...a, imageMainUrl: null }))}>
                    Gỡ
                  </button>
                )}
              </div>
              <input ref={mainImageRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => readImage(e, 'imageMainUrl')} />
              <div className="adm-form__group" style={{ marginTop: 12 }}>
                <label className="adm-form__label">Chú thích dưới ảnh (hoặc dưới icon)</label>
                <input className="adm-form__input" value={about.imageMainCaption ?? ''}
                  onChange={e => setAbout(a => ({ ...a, imageMainCaption: e.target.value }))} placeholder="Đồng hành cùng gia đình" />
              </div>
            </div>
            <div className="adm-form__group" style={{ flex: 1 }}>
              <label className="adm-form__label">Ảnh phụ (nhỏ, góc)</label>
              <div
                className="adm-logo-preview"
                style={{ width: 160, height: 120, borderRadius: 12, cursor: 'pointer', overflow: 'hidden' }}
                onClick={() => secondaryImageRef.current?.click()}
              >
                {about.imageSecondaryUrl
                  ? <img src={about.imageSecondaryUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  : <><i className="fas fa-image" /><span>Chọn</span></>
                }
              </div>
              <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => secondaryImageRef.current?.click()}>
                  <i className="fas fa-upload" /> Tải lên
                </button>
                {about.imageSecondaryUrl && (
                  <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => setAbout(a => ({ ...a, imageSecondaryUrl: null }))}>
                    Gỡ
                  </button>
                )}
              </div>
              <input ref={secondaryImageRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => readImage(e, 'imageSecondaryUrl')} />
              <div className="adm-form__group" style={{ marginTop: 12 }}>
                <label className="adm-form__label">Chú thích</label>
                <input className="adm-form__input" value={about.imageSecondaryCaption ?? ''}
                  onChange={e => setAbout(a => ({ ...a, imageSecondaryCaption: e.target.value }))} placeholder="Phương pháp khoa học" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card__header"><h3>Tiêu đề khu vực</h3></div>
        <div className="adm-card__body">
          <div className="adm-form__row">
            <div className="adm-form__group">
              <label className="adm-form__label">Tag nhỏ</label>
              <input className="adm-form__input" value={about.tag}
                onChange={e => setAbout(a => ({ ...a, tag: e.target.value }))} />
            </div>
            <div className="adm-form__group">
              <label className="adm-form__label">Số năm kinh nghiệm (badge)</label>
              <input className="adm-form__input" value={about.expYears}
                onChange={e => setAbout(a => ({ ...a, expYears: e.target.value }))} placeholder="10+" />
            </div>
          </div>
          <div className="adm-form__group">
            <label className="adm-form__label">Tiêu đề chính</label>
            <input className="adm-form__input" value={about.title}
              onChange={e => setAbout(a => ({ ...a, title: e.target.value }))} />
          </div>
          <div className="adm-form__group">
            <label className="adm-form__label">Mô tả ngắn (dưới tiêu đề)</label>
            <textarea className="adm-form__textarea" rows={2} value={about.sectionDesc}
              onChange={e => setAbout(a => ({ ...a, sectionDesc: e.target.value }))} />
          </div>
          <div className="adm-form__group">
            <label className="adm-form__label">Tiêu đề khối nội dung</label>
            <input className="adm-form__input" value={about.subtitle}
              onChange={e => setAbout(a => ({ ...a, subtitle: e.target.value }))} />
          </div>
          <div className="adm-form__group">
            <label className="adm-form__label">Đoạn văn 1</label>
            <textarea className="adm-form__textarea" rows={3} value={about.text1}
              onChange={e => setAbout(a => ({ ...a, text1: e.target.value }))} />
          </div>
          <div className="adm-form__group">
            <label className="adm-form__label">Đoạn văn 2</label>
            <textarea className="adm-form__textarea" rows={3} value={about.text2}
              onChange={e => setAbout(a => ({ ...a, text2: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="adm-card" style={{ marginTop: 20 }}>
        <div className="adm-card__header">
          <h3>Điểm nổi bật</h3>
          <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={addFeature}>
            <i className="fas fa-plus" /> Thêm
          </button>
        </div>
        <div className="adm-card__body">
          {about.features.map(f => (
            <div key={f.id} style={{ border: '1px solid var(--adm-border)', borderRadius: 8, padding: 16, marginBottom: 12 }}>
              <div className="adm-form__row">
                <div className="adm-form__group">
                  <label className="adm-form__label">Icon (class Font Awesome)</label>
                  <input className="adm-form__input" value={f.icon}
                    onChange={e => updateFeature(f.id, 'icon', e.target.value)}
                    placeholder="fa-certificate" />
                </div>
                <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" style={{ alignSelf: 'flex-end' }} onClick={() => removeFeature(f.id)}>
                  Xóa
                </button>
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Tiêu đề</label>
                <input className="adm-form__input" value={f.title}
                  onChange={e => updateFeature(f.id, 'title', e.target.value)} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Mô tả</label>
                <textarea className="adm-form__textarea" rows={2} value={f.desc}
                  onChange={e => updateFeature(f.id, 'desc', e.target.value)} />
              </div>
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
