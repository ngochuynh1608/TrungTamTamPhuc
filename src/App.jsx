import { Routes, Route } from 'react-router-dom'
import { useApp } from './context/AppContext'
import MainSite from './MainSite'
import AdminApp from './admin/AdminApp'
import DynamicFavicon from './components/DynamicFavicon'

function DataReady({ children }) {
  const { dataLoaded } = useApp()
  if (!dataLoaded) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f1f5f9',
          color: '#64748b',
          fontFamily: "'Be Vietnam Pro', sans-serif",
        }}
      >
        <p style={{ fontSize: '0.95rem' }}>
          <i className="fas fa-spinner fa-spin" style={{ marginRight: 10 }} />
          Đang tải dữ liệu…
        </p>
      </div>
    )
  }
  return children
}

export default function App() {
  return (
    <DataReady>
      <DynamicFavicon />
      <Routes>
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<MainSite />} />
      </Routes>
    </DataReady>
  )
}
