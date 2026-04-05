import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const COLORS = ['blue', 'orange', 'green', 'purple', 'pink', 'teal']

const emptyService = () => ({
  icon: 'fa-hand-holding-heart',
  color: 'blue',
  featured: false,
  title: '',
  desc: '',
  items: [],
})

export default function ServicesManager() {
  const { settings, mergeSettings, servicesCrud } = useApp()
  const [section, setSection] = useState(() => ({ ...settings.servicesSection }))
  const [modal, setModal] = useState(null)
  const [draft, setDraft] = useState(null)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const openAdd = () => {
    setDraft({ ...emptyService(), id: null })
    setModal('add')
  }

  const openEdit = (s) => {
    setDraft({
      ...s,
      itemsText: s.items.join('\n'),
      featured: Boolean(s.featured),
    })
    setModal(s.id)
  }

  const closeModal = () => {
    setModal(null)
    setDraft(null)
  }

  const saveDraft = () => {
    if (!draft.title.trim()) {
      showToast('Vui lòng nhập tiêu đề')
      return
    }
    const raw = draft.itemsText ?? (Array.isArray(draft.items) ? draft.items.join('\n') : '')
    const items = raw.split('\n').map((x) => x.trim()).filter(Boolean)
    const { id, itemsText, ...rest } = draft
    const payload = { ...rest, items }

    if (modal === 'add') {
      servicesCrud.add(payload)
      showToast('Đã thêm dịch vụ')
    } else {
      servicesCrud.update(id, payload)
      showToast('Đã cập nhật')
    }
    closeModal()
  }

  const saveSection = () => {
    mergeSettings({ servicesSection: section })
    showToast('Đã lưu tiêu đề khu vực')
  }

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Chương trình giảng dạy (Dịch vụ)</h1>
          <p>Thêm, sửa, xóa các chương trình hiển thị trên trang.</p>
        </div>
        <button type="button" className="adm-btn adm-btn--primary" onClick={openAdd}>
          <i className="fas fa-plus" /> Thêm dịch vụ
        </button>
      </div>

      <div className="adm-card">
        <div className="adm-card__header">
          <h3>Tiêu đề khu vực</h3>
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
        <div className="adm-card__header"><h3>Danh sách ({settings.services.length})</h3></div>
        <div className="adm-card__body adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Màu</th>
                <th>Nổi bật</th>
                <th style={{ width: 120 }} />
              </tr>
            </thead>
            <tbody>
              {settings.services.map((s) => (
                <tr key={s.id}>
                  <td>
                    <strong>{s.title}</strong>
                    <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-light)', marginTop: 4 }}>{s.desc.slice(0, 80)}…</div>
                  </td>
                  <td><span className="adm-badge adm-badge--primary">{s.color}</span></td>
                  <td>{s.featured ? 'Có' : '—'}</td>
                  <td>
                    <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => openEdit(s)}>Sửa</button>
                    {' '}
                    <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => { if (confirm('Xóa dịch vụ này?')) servicesCrud.remove(s.id) }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && draft && (
        <div className="adm-modal-overlay" role="dialog" onClick={closeModal}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal__header">
              <h3>{modal === 'add' ? 'Thêm dịch vụ' : 'Sửa dịch vụ'}</h3>
              <button type="button" className="adm-modal__close" onClick={closeModal} aria-label="Đóng"><i className="fas fa-times" /></button>
            </div>
            <div className="adm-modal__body">
              <div className="adm-form__group">
                <label className="adm-form__label">Icon (class FA)</label>
                <input className="adm-form__input" value={draft.icon}
                  onChange={e => setDraft(d => ({ ...d, icon: e.target.value }))} placeholder="fa-comments" />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Màu</label>
                <div className="adm-color-picker">
                  {COLORS.map(c => (
                    <button
                      key={c}
                      type="button"
                      className={`adm-color-opt adm-color-opt--${c}${draft.color === c ? ' selected' : ''}`}
                      title={c}
                      onClick={() => setDraft(d => ({ ...d, color: c }))}
                    />
                  ))}
                </div>
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Nổi bật trên trang</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                  <label className="adm-toggle" title={draft.featured ? 'Đang bật Phổ biến nhất' : 'Tắt'}>
                    <input
                      type="checkbox"
                      checked={Boolean(draft.featured)}
                      onChange={e => setDraft(d => ({ ...d, featured: e.target.checked }))}
                    />
                    <span className="adm-toggle__slider" />
                  </label>
                  <span style={{ fontSize: '0.9rem', color: 'var(--adm-text)' }}>
                    Đánh dấu &quot;Phổ biến nhất&quot; (một thẻ nổi bật trên website)
                  </span>
                </div>
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Tiêu đề</label>
                <input className="adm-form__input" value={draft.title}
                  onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Mô tả</label>
                <textarea className="adm-form__textarea" rows={3} value={draft.desc}
                  onChange={e => setDraft(d => ({ ...d, desc: e.target.value }))} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Gạch đầu dòng (mỗi dòng một ý)</label>
                <textarea className="adm-form__textarea" rows={4}
                  value={draft.itemsText ?? draft.items?.join('\n') ?? ''}
                  onChange={e => setDraft(d => ({ ...d, itemsText: e.target.value }))} />
              </div>
            </div>
            <div className="adm-modal__footer">
              <button type="button" className="adm-btn adm-btn--outline" onClick={closeModal}>Hủy</button>
              <button type="button" className="adm-btn adm-btn--primary" onClick={saveDraft}>Lưu</button>
            </div>
          </div>
        </div>
      )}

      {toast && <div className="adm-toast"><i className="fas fa-check-circle" /> {toast}</div>}
    </>
  )
}
