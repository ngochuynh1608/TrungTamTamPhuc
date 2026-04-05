import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const emptyStep = () => ({
  num: '',
  icon: 'fa-star',
  title: '',
  desc: '',
})

export default function ProcessManager() {
  const { settings, mergeSettings, processCrud } = useApp()
  const [section, setSection] = useState(() => ({ ...settings.processSection }))
  const [modal, setModal] = useState(null)
  const [draft, setDraft] = useState(null)
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const openAdd = () => {
    setDraft({ ...emptyStep(), id: null })
    setModal('add')
  }

  const openEdit = (s) => {
    setDraft({ ...s })
    setModal(s.id)
  }

  const closeModal = () => {
    setModal(null)
    setDraft(null)
  }

  const saveDraft = () => {
    if (!draft.title.trim()) {
      showToast('Nhập tiêu đề bước')
      return
    }
    const { id, ...rest } = draft
    if (modal === 'add') processCrud.add(rest)
    else processCrud.update(id, rest)
    showToast(modal === 'add' ? 'Đã thêm bước' : 'Đã cập nhật')
    closeModal()
  }

  const saveSection = () => {
    mergeSettings({ processSection: section })
    showToast('Đã lưu tiêu đề khu vực')
  }

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Quy trình</h1>
          <p>Các bước làm việc hiển thị trên trang.</p>
        </div>
        <button type="button" className="adm-btn adm-btn--primary" onClick={openAdd}>
          <i className="fas fa-plus" /> Thêm bước
        </button>
      </div>

      <div className="adm-card">
        <div className="adm-card__header">
          <h3>Tiêu đề khu vực</h3>
          <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={saveSection}>Lưu</button>
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
        <div className="adm-card__header"><h3>Các bước ({settings.process.length})</h3></div>
        <div className="adm-card__body adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tiêu đề</th>
                <th style={{ width: 140 }} />
              </tr>
            </thead>
            <tbody>
              {settings.process.map((s) => (
                <tr key={s.id}>
                  <td><strong>{s.num}</strong></td>
                  <td>
                    {s.title}
                    <div style={{ fontSize: '0.78rem', color: 'var(--adm-text-light)', marginTop: 4 }}>{s.desc.slice(0, 100)}…</div>
                  </td>
                  <td>
                    <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => openEdit(s)}>Sửa</button>
                    {' '}
                    <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => { if (confirm('Xóa bước này?')) processCrud.remove(s.id) }}>Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modal && draft && (
        <div className="adm-modal-overlay" onClick={closeModal}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal__header">
              <h3>{modal === 'add' ? 'Thêm bước' : 'Sửa bước'}</h3>
              <button type="button" className="adm-modal__close" onClick={closeModal}><i className="fas fa-times" /></button>
            </div>
            <div className="adm-modal__body">
              <div className="adm-form__row">
                <div className="adm-form__group">
                  <label className="adm-form__label">Số thứ tự (01, 02…)</label>
                  <input className="adm-form__input" value={draft.num}
                    onChange={e => setDraft(d => ({ ...d, num: e.target.value }))} />
                </div>
                <div className="adm-form__group">
                  <label className="adm-form__label">Icon (class FA)</label>
                  <input className="adm-form__input" value={draft.icon}
                    onChange={e => setDraft(d => ({ ...d, icon: e.target.value }))} />
                </div>
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Tiêu đề</label>
                <input className="adm-form__input" value={draft.title}
                  onChange={e => setDraft(d => ({ ...d, title: e.target.value }))} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Mô tả</label>
                <textarea className="adm-form__textarea" rows={4} value={draft.desc}
                  onChange={e => setDraft(d => ({ ...d, desc: e.target.value }))} />
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
