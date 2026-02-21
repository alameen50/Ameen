import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Modal from './components/Modal'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import LoanForm from './components/LoanForm'
import ClientDashboard from './pages/ClientDashboard'

function App() {
  const [modal, setModal] = useState(null)
  const [isAdmin, setIsAdmin] = useState(() => !!sessionStorage.getItem('ameen_admin'))
  const [clientUser, setClientUser] = useState(() => {
    const stored = sessionStorage.getItem('ameen_client')
    return stored ? JSON.parse(stored) : null
  })
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('ameen_theme', 'light')
  }, [])

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

  const handleClientLogin = (user) => {
    setClientUser(user)
    setModal(null)
    navigate('/dashboard')
  }

  const clientLogout = () => {
    sessionStorage.removeItem('ameen_client')
    setClientUser(null)
    navigate('/')
  }

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className="min-h-screen flex flex-col font-body antialiased selection:bg-emerald-100 bg-white transition-colors duration-500">
      <Navbar
        onOpenRegister={() => setModal('register')}
        onOpenLogin={() => setModal('login')}
      />

      <main className={`flex-1 ${!isAdminRoute ? 'pt-20 lg:pt-24' : ''}`}>
        <Routes>
          <Route path="/" element={<LandingPage onOpenRegister={() => setModal('register')} />} />
          <Route path="/admin" element={
            isAdmin ? (
              <AdminDashboard
                onLogout={logout}
              />
            ) : (
              <AdminLogin
                onLogin={handleAdminLogin}
              />
            )
          } />
          <Route path="/dashboard" element={
            clientUser ? <ClientDashboard user={clientUser} onLogout={clientLogout} /> : <LandingPage onOpenRegister={() => setModal('register')} />
          } />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}

      <Modal isOpen={modal === 'register'} onClose={() => setModal(null)} title="Join the Future">
        <RegisterForm onSuccess={(user) => {
          setClientUser(user)
          setModal('loan')
        }} />
      </Modal>

      <Modal isOpen={modal === 'login'} onClose={() => setModal(null)} title="Welcome Back">
        <LoginForm
          onSuccess={handleClientLogin}
          onSwitchToRegister={() => setModal('register')}
        />
      </Modal>

      <Modal isOpen={modal === 'loan'} onClose={() => setModal(null)} title="Tell us more">
        <LoanForm onSuccess={() => setModal(null)} user={clientUser} />
      </Modal>
    </div>
  )
}

export default App
