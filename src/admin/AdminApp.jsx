import { Navigate, Route, Routes } from 'react-router-dom'
import '../admin/admin.css'
import AdminLayout from './components/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import GeneralSettings from './pages/GeneralSettings'
import MenuManager from './pages/MenuManager'
import HeroEditor from './pages/HeroEditor'
import AboutEditor from './pages/AboutEditor'
import ServicesManager from './pages/ServicesManager'
import ProcessManager from './pages/ProcessManager'
import TeamManager from './pages/TeamManager'
import GalleryManager from './pages/GalleryManager'
import ContactsList from './pages/ContactsList'

function Protected({ children }) {
  if (sessionStorage.getItem('adm_auth') !== '1') {
    return <Navigate to="/admin" replace />
  }
  return children
}

function AdminShell({ children }) {
  return <AdminLayout>{children}</AdminLayout>
}

export default function AdminApp() {
  return (
    <div className="admin-root">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Protected>
              <AdminShell>
                <Dashboard />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/settings"
          element={
            <Protected>
              <AdminShell>
                <GeneralSettings />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/menu"
          element={
            <Protected>
              <AdminShell>
                <MenuManager />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/hero"
          element={
            <Protected>
              <AdminShell>
                <HeroEditor />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/about"
          element={
            <Protected>
              <AdminShell>
                <AboutEditor />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/services"
          element={
            <Protected>
              <AdminShell>
                <ServicesManager />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/process"
          element={
            <Protected>
              <AdminShell>
                <ProcessManager />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/team"
          element={
            <Protected>
              <AdminShell>
                <TeamManager />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/gallery"
          element={
            <Protected>
              <AdminShell>
                <GalleryManager />
              </AdminShell>
            </Protected>
          }
        />
        <Route
          path="/contacts"
          element={
            <Protected>
              <AdminShell>
                <ContactsList />
              </AdminShell>
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </div>
  )
}
