import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact() {
  const { settings, addContact } = useApp()
  const { contact } = settings
  const infoRef = useScrollAnimation()
  const formRef = useScrollAnimation()

  const CONTACT_ITEMS = [
    { icon: 'fa-location-dot', label: 'Địa chỉ', content: contact.address },
    { icon: 'fa-phone',        label: 'Hotline', content: contact.phone, href: `tel:${contact.phone.replace(/\s/g,'')}` },
    { icon: 'fa-envelope',     label: 'Email',   content: contact.email, href: `mailto:${contact.email}` },
    { icon: 'fa-clock',        label: 'Giờ làm việc', content: contact.workingHours },
  ]

  const [form, setForm] = useState({ name: '', phone: '', email: '', childAge: '', service: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = e => {
    e.preventDefault()
    setStatus('loading')
    const payload = {
      name: form.name.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      childAge: form.childAge,
      service: form.service,
      message: form.message.trim(),
    }
    setTimeout(() => {
      addContact(payload)
      setStatus('success')
      setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', phone: '', email: '', childAge: '', service: '', message: '' })
      }, 3000)
    }, 0)
  }

  return (
    <section className="contact section section--alt" id="contact">
      <div className="container">
        <div className="section__header">
          <span className="section__tag">Liên Hệ</span>
          <h2 className="section__title">Bắt Đầu Hành Trình Cùng Con</h2>
          <p className="section__desc">Hãy để lại thông tin – chúng tôi sẽ liên hệ tư vấn miễn phí trong vòng 24 giờ.</p>
        </div>
        <div className="contact__grid">
          <div className="contact__info" ref={infoRef}>
            <h3>Thông Tin Liên Hệ</h3>
            {CONTACT_ITEMS.map(item => (
              <div className="contact__item" key={item.label}>
                <div className="contact__item-icon"><i className={`fas ${item.icon}`} /></div>
                <div>
                  <strong>{item.label}</strong>
                  {item.href
                    ? <p><a href={item.href}>{item.content}</a></p>
                    : <p>{item.content}</p>
                  }
                </div>
              </div>
            ))}
            <div className="contact__social">
              {contact.facebook && <a href={contact.facebook} className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f" /></a>}
              {contact.youtube  && <a href={contact.youtube}  className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube" /></a>}
              {contact.tiktok   && <a href={contact.tiktok}   className="social-btn" target="_blank" rel="noopener noreferrer"><i className="fab fa-tiktok" /></a>}
              {contact.zalo && (
                <a
                  href={contact.zalo.startsWith('http') ? contact.zalo : `https://zalo.me/${contact.zalo.replace(/\D/g, '')}`}
                  className="social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Zalo"
                >
                  <i className="fas fa-comment-dots" />
                </a>
              )}
            </div>
          </div>

          <form className="contact__form" id="dang-ky-tu-van" ref={formRef} onSubmit={handleSubmit}>
            <div className="form__row">
              <div className="form__group">
                <label htmlFor="name">Họ và tên phụ huynh *</label>
                <input id="name" name="name" type="text" placeholder="Nguyễn Văn A" value={form.name} onChange={handleChange} required />
              </div>
              <div className="form__group">
                <label htmlFor="phone">Số điện thoại *</label>
                <input id="phone" name="phone" type="tel" placeholder="0909 xxx xxx" value={form.phone} onChange={handleChange} required />
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="email@example.com" value={form.email} onChange={handleChange} />
            </div>
            <div className="form__row">
              <div className="form__group">
                <label htmlFor="childAge">Tuổi của bé</label>
                <select id="childAge" name="childAge" value={form.childAge} onChange={handleChange}>
                  <option value="">Chọn độ tuổi</option>
                  <option>Dưới 2 tuổi</option><option>2 – 4 tuổi</option>
                  <option>4 – 6 tuổi</option><option>6 – 10 tuổi</option><option>Trên 10 tuổi</option>
                </select>
              </div>
              <div className="form__group">
                <label htmlFor="service">Dịch vụ quan tâm</label>
                <select id="service" name="service" value={form.service} onChange={handleChange}>
                  <option value="">Chọn dịch vụ</option>
                  {settings.services.map(s => <option key={s.id}>{s.title}</option>)}
                </select>
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="message">Mô tả ngắn về tình trạng của bé</label>
              <textarea id="message" name="message" rows={4} placeholder="Chia sẻ với chúng tôi những điều bạn đang lo ngại..." value={form.message} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn--primary btn--full" disabled={status !== 'idle'}
              style={status === 'success' ? { background: 'linear-gradient(135deg,#10B981,#059669)' } : {}}>
              {status === 'loading' && <><i className="fas fa-spinner fa-spin" /> Đang gửi...</>}
              {status === 'success' && <><i className="fas fa-check-circle" /> Gửi thành công!</>}
              {status === 'idle'    && <><i className="fas fa-paper-plane" /> Gửi Yêu Cầu Tư Vấn</>}
            </button>
            <p className="form__note">* Tư vấn hoàn toàn miễn phí. Thông tin của bạn được bảo mật tuyệt đối.</p>
          </form>
        </div>
      </div>
    </section>
  )
}
