import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const AVATARS = [
  { value: 'team-card__avatar--1', label: 'Xanh dương' },
  { value: 'team-card__avatar--2', label: 'Hồng' },
  { value: 'team-card__avatar--3', label: 'Tím' },
  { value: 'team-card__avatar--4', label: 'Xanh lá' },
]

const emptyMember = () => ({
  avatarClass: 'team-card__avatar--1',
  icon: 'fa-user',
  name: '',
  role: '',
  desc: '',
  tags: [],
})

export default function TeamManager() {
  const { settings, mergeSettings, teamCrud } = useApp()
  const [section, setSection] = useState(() => ({ ...settings.teamSection }))
  const [modal, setModal] = useState(null)
  const [draft, setDraft] = useState(null)
  const [tagsText, setTagsText] = useState('')
  const [toast, setToast] = useState('')

  const showToast = (msg) => {
    setToast(msg)
    setTimeout(() => setToast(''), 3000)
  }

  const openAdd = () => {
    setDraft({ ...emptyMember(), id: null })
    setTagsText('')
    setModal('add')
  }

  const openEdit = (m) => {
    setDraft({ ...m })
    setTagsText((m.tags || []).join(', '))
    setModal(m.id)
  }

  const closeModal = () => {
    setModal(null)
    setDraft(null)
    setTagsText('')
  }

  const saveDraft = () => {
    if (!draft.name.trim()) {
      showToast('Nhập họ tên')
      return
    }
    const tags = tagsText.split(',').map(t => t.trim()).filter(Boolean)
    const { id, ...rest } = draft
    const payload = { ...rest, tags }
    if (modal === 'add') teamCrud.add(payload)
    else teamCrud.update(id, payload)
    showToast(modal === 'add' ? 'Đã thêm thành viên' : 'Đã cập nhật')
    closeModal()
  }

  const saveSection = () => {
    mergeSettings({ teamSection: section })
    showToast('Đã lưu tiêu đề khu vực')
  }

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Đội ngũ</h1>
          <p>Thông tin chuyên gia hiển thị trên website.</p>
        </div>
        <button type="button" className="adm-btn adm-btn--primary" onClick={openAdd}>
          <i className="fas fa-plus" /> Thêm thành viên
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
        <div className="adm-card__header"><h3>Thành viên ({settings.team.length})</h3></div>
        <div className="adm-card__body adm-table-wrap">
          <table className="adm-table">
            <thead>
              <tr>
                <th>Họ tên</th>
                <th>Vai trò</th>
                <th style={{ width: 140 }} />
              </tr>
            </thead>
            <tbody>
              {settings.team.map((m) => (
                <tr key={m.id}>
                  <td><strong>{m.name}</strong></td>
                  <td>{m.role}</td>
                  <td>
                    <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => openEdit(m)}>Sửa</button>
                    {' '}
                    <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => { if (confirm('Xóa thành viên?')) teamCrud.remove(m.id) }}>Xóa</button>
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
              <h3>{modal === 'add' ? 'Thêm thành viên' : 'Sửa thành viên'}</h3>
              <button type="button" className="adm-modal__close" onClick={closeModal}><i className="fas fa-times" /></button>
            </div>
            <div className="adm-modal__body">
              <div className="adm-form__group">
                <label className="adm-form__label">Màu avatar</label>
                <select className="adm-form__input" value={draft.avatarClass}
                  onChange={e => setDraft(d => ({ ...d, avatarClass: e.target.value }))}>
                  {AVATARS.map(a => (
                    <option key={a.value} value={a.value}>{a.label}</option>
                  ))}
                </select>
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Icon (class FA)</label>
                <input className="adm-form__input" value={draft.icon}
                  onChange={e => setDraft(d => ({ ...d, icon: e.target.value }))} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Họ tên</label>
                <input className="adm-form__input" value={draft.name}
                  onChange={e => setDraft(d => ({ ...d, name: e.target.value }))} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Vai trò / chức danh</label>
                <input className="adm-form__input" value={draft.role}
                  onChange={e => setDraft(d => ({ ...d, role: e.target.value }))} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Giới thiệu</label>
                <textarea className="adm-form__textarea" rows={4} value={draft.desc}
                  onChange={e => setDraft(d => ({ ...d, desc: e.target.value }))} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Tags (phân cách bằng dấu phẩy)</label>
                <input className="adm-form__input" value={tagsText}
                  onChange={e => setTagsText(e.target.value)} placeholder="ABA, Ngôn ngữ, ..." />
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
