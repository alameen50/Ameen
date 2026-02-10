import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Modal from './components/Modal'
import RegisterForm from './components/RegisterForm'
import LoanForm from './components/LoanForm'

function App() {
  const [modal, setModal] = useState(null)
  const [isAdmin, setIsAdmin] = useState(() => !!sessionStorage.getItem('ameen_admin'))
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleAdminLogin = () => {
    setIsAdmin(true)
    navigate('/admin')
  }

  const logout = () => {
    sessionStorage.removeItem('ameen_admin')
    setIsAdmin(false)
    navigate('/')
  }

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col font-body antialiased selection:bg-emerald-100">
      <Navbar onOpenRegister={() => setModal('register')} />

      <main className={`flex-1 ${!isAdminRoute ? 'pt-20 lg:pt-24' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage onOpenRegister={() => setModal('register')} />} />
          <Route path="/admin" element={
            isAdmin ? <AdminDashboard onLogout={logout} /> : <AdminLogin onLogin={handleAdminLogin} />
          } />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      <Modal isOpen={modal === 'register'} onClose={() => setModal(null)} title="Join the Future">
        <RegisterForm onSuccess={() => setModal('loan')} />
      </Modal>

      <Modal isOpen={modal === 'loan'} onClose={() => setModal(null)} title="Tell us more">
        <LoanForm onSuccess={() => setModal(null)} />
      </Modal>
    </div>
  )
}

export default App
