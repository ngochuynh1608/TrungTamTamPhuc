import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })

  useEffect(() => {
    if (sessionStorage.getItem('adm_auth') === '1') {
      navigate('/admin/dashboard', { replace: true })
    }
  }, [navigate])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username.trim(),
          password: form.password,
        }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok) {
        throw new Error(payload.error || 'Đăng nhập thất bại')
      }
      sessionStorage.setItem('adm_auth', '1')
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.message || 'Tên đăng nhập hoặc mật khẩu không đúng.')
      setLoading(false)
    }
  }

  return (
    <div className="adm-login">
      <div className="adm-login__card">
        <div className="adm-login__logo">
          <div className="adm-login__logo-icon">
            <i className="fas fa-shield-halved" />
          </div>
          <div className="adm-login__logo-text">
            <h1>Tâm Phúc</h1>
            <p>Hệ Thống Quản Trị</p>
          </div>
        </div>

        <h2 className="adm-login__title">Đăng nhập</h2>
        <p className="adm-login__sub">Chào mừng trở lại! Vui lòng đăng nhập để tiếp tục.</p>

        {error && (
          <div className="adm-login__error">
            <i className="fas fa-circle-exclamation" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="adm-form__group">
            <label className="adm-form__label">Tên đăng nhập</label>
            <div className="adm-form__input-wrap">
              <i className="fas fa-user adm-form__icon" />
              <input
                className="adm-form__input adm-form__input--icon"
                type="text"
                placeholder="Nhập tên đăng nhập"
                value={form.username}
                onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
                required
                autoFocus
              />
            </div>
          </div>

          <div className="adm-form__group">
            <label className="adm-form__label">Mật khẩu</label>
            <div className="adm-form__input-wrap">
              <i className="fas fa-lock adm-form__icon" />
              <input
                className="adm-form__input adm-form__input--icon"
                type="password"
                placeholder="Nhập mật khẩu"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="adm-btn adm-btn--primary"
            style={{ width: '100%', justifyContent: 'center', padding: '12px' }}
            disabled={loading}
          >
            {loading
              ? <><i className="fas fa-spinner fa-spin" /> Đang đăng nhập...</>
              : <><i className="fas fa-right-to-bracket" /> Đăng Nhập</>
            }
          </button>
        </form>
      </div>
    </div>
  )
}
