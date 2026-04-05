import { useState, useRef } from 'react'
import { useApp } from '../../context/AppContext'

export default function GalleryManager() {
  const { settings, mergeSettings } = useApp()
  const [section, setSection] = useState(() => ({ ...settings.gallerySection }))
  const [toast, setToast] = useState('')
  const fileInputRef = useRef(null)

  const gallery = settings.gallery || []

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const handleFiles = (e) => {
    const files = e.target.files
    if (!files?.length) return
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!list.length) {
      showToast('Chỉ chấp nhận file ảnh')
      e.target.value = ''
      return
    }

    Promise.all(
      list.map(
        (file, i) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () =>
              resolve({ id: Date.now() + i + Math.floor(Math.random() * 1000), url: reader.result, caption: '' })
            reader.onerror = reject
            reader.readAsDataURL(file)
          })
      )
    )
      .then((items) => {
        mergeSettings({ gallery: [...gallery, ...items] })
        showToast(`Đã thêm ${items.length} ảnh`)
      })
      .catch(() => showToast('Có lỗi khi đọc file'))
    e.target.value = ''
  }

  const updateCaption = (id, caption) => {
    mergeSettings({
      gallery: gallery.map((g) => (g.id === id ? { ...g, caption } : g)),
    })
  }

  const removeImage = (id) => {
    mergeSettings({ gallery: gallery.filter((g) => g.id !== id) })
    showToast('Đã xóa ảnh')
  }

  const saveSection = () => {
    mergeSettings({ gallerySection: section })
    showToast('Đã lưu tiêu đề khu vực')
  }

  const move = (index, dir) => {
    const next = [...gallery]
    const j = index + dir
    if (j < 0 || j >= next.length) return
    ;[next[index], next[j]] = [next[j], next[index]]
    mergeSettings({ gallery: next })
  }

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Hình ảnh hoạt động</h1>
          <p>Tải nhiều ảnh cùng lúc, sắp xếp và ghi chú từng ảnh.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button type="button" className="adm-btn adm-btn--primary" onClick={() => fileInputRef.current?.click()}>
            <i className="fas fa-images" /> Thêm ảnh (có thể chọn nhiều)
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={handleFiles}
          />
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card__header">
          <h3>Tiêu đề trên website</h3>
          <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={saveSection}>
            Lưu tiêu đề
          </button>
        </div>
        <div className="adm-card__body">
          <div className="adm-form__row">
            <div className="adm-form__group">
              <label className="adm-form__label">Tag</label>
              <input className="adm-form__input" value={section.tag}
                onChange={e => setSection(s => ({ ...s, tag: e.target.value }))} />
            </div>
            <div className="adm-form__group">
              <label className="adm-form__label">Tiêu đề</label>
              <input className="adm-form__input" value={section.title}
                onChange={e => setSection(s => ({ ...s, title: e.target.value }))} />
            </div>
          </div>
          <div className="adm-form__group">
            <label className="adm-form__label">Mô tả</label>
            <textarea className="adm-form__textarea" rows={2} value={section.description}
              onChange={e => setSection(s => ({ ...s, description: e.target.value }))} />
          </div>
        </div>
      </div>

      <div className="adm-card" style={{ marginTop: 20 }}>
        <div className="adm-card__header">
          <h3>Ảnh đã tải ({gallery.length})</h3>
        </div>
        <div className="adm-card__body">
          {gallery.length === 0 ? (
            <p style={{ color: 'var(--adm-text-light)', textAlign: 'center', padding: '32px 0' }}>
              Chưa có ảnh. Nhấn &quot;Thêm ảnh&quot; và chọn một hoặc nhiều file từ máy.
            </p>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 16 }}>
              {gallery.map((g, index) => (
                <div
                  key={g.id}
                  style={{
                    border: '1px solid var(--adm-border)',
                    borderRadius: 8,
                    overflow: 'hidden',
                    background: '#fff',
                  }}
                >
                  <div style={{ aspectRatio: '4/3', background: '#f1f5f9' }}>
                    <img src={g.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 10 }}>
                    <label className="adm-form__label" style={{ fontSize: '0.75rem' }}>Ghi chú (tùy chọn)</label>
                    <input
                      className="adm-form__input"
                      style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                      value={g.caption || ''}
                      placeholder="Mô tả ngắn…"
                      onChange={e => updateCaption(g.id, e.target.value)}
                    />
                    <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
                      <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" disabled={index === 0} onClick={() => move(index, -1)}>
                        <i className="fas fa-arrow-up" />
                      </button>
                      <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" disabled={index === gallery.length - 1} onClick={() => move(index, 1)}>
                        <i className="fas fa-arrow-down" />
                      </button>
                      <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" style={{ marginLeft: 'auto' }} onClick={() => removeImage(g.id)}>
                        <i className="fas fa-trash" /> Xóa
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
