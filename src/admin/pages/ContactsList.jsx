import { useState } from 'react'
import { useApp } from '../../context/AppContext'

function formatDate(iso) {
  try {
    const d = new Date(iso)
    return d.toLocaleString('vi-VN')
  } catch {
    return iso
  }
}

export default function ContactsList() {
  const { contacts, markRead, deleteContact } = useApp()
  const [filter, setFilter] = useState('all')

  const list = filter === 'unread' ? contacts.filter(c => !c.read) : contacts

  return (
    <>
      <div className="adm-page-header">
        <div>
          <h1>Danh sách đăng ký tư vấn</h1>
          <p>
            Mỗi lần khách gửi form &quot;Gửi yêu cầu tư vấn&quot; trên trang chủ, bản ghi được thêm vào{' '}
            <code style={{ fontSize: '0.85em' }}>data/site-data.json</code> qua API (hoặc lưu cục bộ nếu API không chạy).
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button type="button" className={`adm-btn adm-btn--sm${filter === 'all' ? ' adm-btn--primary' : ' adm-btn--outline'}`} onClick={() => setFilter('all')}>
            Tất cả ({contacts.length})
          </button>
          <button type="button" className={`adm-btn adm-btn--sm${filter === 'unread' ? ' adm-btn--primary' : ' adm-btn--outline'}`} onClick={() => setFilter('unread')}>
            Chưa đọc ({contacts.filter(c => !c.read).length})
          </button>
        </div>
      </div>

      <div className="adm-card">
        <div className="adm-card__body adm-table-wrap">
          {list.length === 0 ? (
            <p style={{ textAlign: 'center', padding: 40, color: 'var(--adm-text-light)' }}>Chưa có đăng ký tư vấn nào.</p>
          ) : (
            <table className="adm-table">
              <thead>
                <tr>
                  <th>Thời gian</th>
                  <th>Họ tên</th>
                  <th>Điện thoại</th>
                  <th>Email</th>
                  <th>Bé / Dịch vụ</th>
                  <th>Nội dung</th>
                  <th style={{ width: 140 }} />
                </tr>
              </thead>
              <tbody>
                {list.map((c) => (
                  <tr key={c.id} style={{ background: c.read ? 'transparent' : 'var(--adm-primary-light)' }}>
                    <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>{formatDate(c.date)}</td>
                    <td><strong>{c.name}</strong></td>
                    <td>{c.phone}</td>
                    <td>{c.email || '—'}</td>
                    <td style={{ fontSize: '0.85rem' }}>
                      {c.childAge || '—'}
                      <br />
                      <span style={{ color: 'var(--adm-text-light)' }}>{c.service || ''}</span>
                    </td>
                    <td style={{ maxWidth: 240, fontSize: '0.85rem' }}>{c.message || '—'}</td>
                    <td>
                      {!c.read && (
                        <button type="button" className="adm-btn adm-btn--outline adm-btn--sm" onClick={() => markRead(c.id)}>
                          Đã đọc
                        </button>
                      )}
                      {' '}
                      <button type="button" className="adm-btn adm-btn--danger adm-btn--sm" onClick={() => { if (confirm('Xóa bản đăng ký này?')) deleteContact(c.id) }}>
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  )
}
