import { useState } from 'react'
import { useApp } from '../../context/AppContext'

function Toast({ msg }) {
  return msg ? <div className="adm-toast"><i className="fas fa-check-circle" /> {msg}</div> : null
}

let nextId = 100

export default function MenuManager() {
  const { settings, saveMenu } = useApp()
  const [menu, setMenu] = useState(() => settings.menu.map(m => ({ ...m })))
  const [dragIndex, setDragIndex] = useState(null)
  const [overIndex, setOverIndex] = useState(null)
  const [toast, setToast] = useState('')
  const [editId, setEditId] = useState(null)
  const [newItem, setNewItem] = useState({ label: '', href: '' })
  const [showAdd, setShowAdd] = useState(false)

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  // Drag handlers
  const onDragStart = (i) => setDragIndex(i)
  const onDragOver = (e, i) => {
    e.preventDefault()
    setOverIndex(i)
    if (dragIndex === null || dragIndex === i) return
    const next = [...menu]
    const [removed] = next.splice(dragIndex, 1)
    next.splice(i, 0, removed)
    setMenu(next)
    setDragIndex(i)
  }
  const onDragEnd = () => { setDragIndex(null); setOverIndex(null) }

  const toggleVisible = (id) => {
    setMenu(prev => prev.map(m => m.id === id ? { ...m, visible: !m.visible } : m))
  }

  const updateLabel = (id, label) => {
    setMenu(prev => prev.map(m => m.id === id ? { ...m, label } : m))
  }

  const updateHref = (id, href) => {
    setMenu(prev => prev.map(m => m.id === id ? { ...m, href } : m))
  }

  const deleteItem = (id) => {
    setMenu(prev => prev.filter(m => m.id !== id))
  }

  const addItem = () => {
    if (!newItem.label.trim() || !newItem.href.trim()) return
    setMenu(prev => [...prev, { id: nextId++, label: newItem.label.trim(), href: newItem.href.trim(), visible: true }])
    setNewItem({ label: '', href: '' })
    setShowAdd(false)
  }

  const handleSave = () => {
    saveMenu(menu)
    showToast('Đã lưu menu!')
  }

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Quản Lý Menu</h1>
          <p>Kéo thả để sắp xếp, bật/tắt hiển thị, chỉnh sửa nhãn và liên kết.</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="adm-btn adm-btn--outline" onClick={() => setShowAdd(s => !s)}>
            <i className="fas fa-plus" /> Thêm Mục
          </button>
          <button className="adm-btn adm-btn--primary" onClick={handleSave}>
            <i className="fas fa-floppy-disk" /> Lưu Menu
          </button>
        </div>
      </div>

      {/* Add item form */}
      {showAdd && (
        <div className="adm-card" style={{ marginBottom: 20 }}>
          <div className="adm-card__header"><h3>Thêm Mục Menu Mới</h3></div>
          <div className="adm-card__body">
            <div className="adm-form__row">
              <div className="adm-form__group">
                <label className="adm-form__label">Nhãn hiển thị</label>
                <input className="adm-form__input" placeholder="VD: Tin Tức" value={newItem.label}
                  onChange={e => setNewItem(p => ({ ...p, label: e.target.value }))} />
              </div>
              <div className="adm-form__group">
                <label className="adm-form__label">Anchor ID (không có #)</label>
                <input className="adm-form__input" placeholder="VD: news" value={newItem.href}
                  onChange={e => setNewItem(p => ({ ...p, href: e.target.value }))} />
                <p className="adm-form__hint">Phải khớp với id của section trong trang</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="adm-btn adm-btn--primary" onClick={addItem}><i className="fas fa-plus" /> Thêm</button>
              <button className="adm-btn adm-btn--outline" onClick={() => setShowAdd(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}

      <div className="adm-card">
        <div className="adm-card__header">
          <h3>Danh Sách Menu</h3>
          <span className="adm-badge adm-badge--primary">{menu.filter(m => m.visible).length}/{menu.length} hiển thị</span>
        </div>
        <div className="adm-card__body">
          <p style={{ fontSize: '0.82rem', color: 'var(--adm-text-light)', marginBottom: 16 }}>
            <i className="fas fa-info-circle" style={{ marginRight: 4 }} />
            Kéo thả biểu tượng <i className="fas fa-grip-vertical" /> để sắp xếp lại thứ tự.
          </p>

          {menu.map((item, i) => (
            <div
              key={item.id}
              className={`adm-menu-item${dragIndex === i ? ' dragging' : ''}${overIndex === i && dragIndex !== i ? ' drag-over' : ''}`}
              draggable
              onDragStart={() => onDragStart(i)}
              onDragOver={(e) => onDragOver(e, i)}
              onDragEnd={onDragEnd}
            >
              <span className="adm-menu-item__drag">
                <i className="fas fa-grip-vertical" />
              </span>

              <span style={{ fontSize: '0.78rem', color: 'var(--adm-text-lighter)', minWidth: 24, textAlign: 'center', fontWeight: 700 }}>
                {i + 1}
              </span>

              {editId === item.id ? (
                <div className="adm-menu-item__content" style={{ gap: 8 }}>
                  <input
                    className="adm-form__input" style={{ flex: 1 }}
                    value={item.label}
                    onChange={e => updateLabel(item.id, e.target.value)}
                    placeholder="Nhãn"
                    onClick={e => e.stopPropagation()}
                  />
                  <input
                    className="adm-form__input" style={{ flex: 1 }}
                    value={item.href}
                    onChange={e => updateHref(item.id, e.target.value)}
                    placeholder="Anchor ID"
                    onClick={e => e.stopPropagation()}
                  />
                </div>
              ) : (
                <div className="adm-menu-item__content">
                  <span className="adm-menu-item__label">{item.label}</span>
                  <span className="adm-menu-item__href">#{item.href}</span>
                  {!item.visible && <span className="adm-badge adm-badge--gray">Ẩn</span>}
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto', flexShrink: 0 }}>
                <label className="adm-toggle" title={item.visible ? 'Đang hiển thị' : 'Đang ẩn'}>
                  <input type="checkbox" checked={item.visible} onChange={() => toggleVisible(item.id)} />
                  <span className="adm-toggle__slider" />
                </label>

                <button
                  className="adm-btn adm-btn--outline adm-btn--icon"
                  onClick={() => setEditId(editId === item.id ? null : item.id)}
                  title="Chỉnh sửa"
                >
                  <i className={`fas ${editId === item.id ? 'fa-check' : 'fa-pen'}`} />
                </button>

                <button
                  className="adm-btn adm-btn--danger adm-btn--icon"
                  onClick={() => deleteItem(item.id)}
                  title="Xóa"
                >
                  <i className="fas fa-trash" />
                </button>
              </div>
            </div>
          ))}

          {menu.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--adm-text-light)' }}>
              <i className="fas fa-inbox" style={{ fontSize: '2rem', marginBottom: 8, display: 'block', opacity: 0.3 }} />
              <p>Chưa có mục menu nào</p>
            </div>
          )}
        </div>
      </div>

      <Toast msg={toast} />
    </>
  )
}
