import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Leaf, Menu, X, ArrowRight, Sun, Moon } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar({ onOpenRegister, onOpenLogin }) {
    const isClientLoggedIn = !!sessionStorage.getItem('ameen_client')
    const [mobileOpen, setMobileOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const isAdminPage = location.pathname.startsWith('/admin')

    const handleNav = (id) => {
        if (location.pathname !== '/') {
            navigate(`/#${id}`)
        } else {
            const element = document.getElementById(id)
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' })
            }
        }
        setMobileOpen(false)
    }

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (isAdminPage) return null

    const navTheme = "text-navy-900 border-navy-900/10"
    const baseBg = "bg-white shadow-sm border-b"
    const scrolledTheme = "bg-white/95 backdrop-blur-md shadow-xl border-b"

    return (
        <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-700 ${scrolled ? 'py-3' : 'py-4'}`}>
            <div className="max-w-5xl mx-auto px-6 sm:px-8">
                <div className={`rounded-full px-6 py-2.5 flex justify-between items-center border transition-all duration-500 ${navTheme} ${scrolled ? scrolledTheme : baseBg}`}>
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center text-white group-hover:rotate-12 group-hover:scale-110 transition-all shadow-lg shadow-emerald-500/20">
                            <Leaf className="w-4 h-4" />
                        </div>
                        <span className="text-lg font-black tracking-tight">Ameen</span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        {['Services', 'Process', 'Testimonials', 'FAQ'].map(item => (
                            <button
                                key={item}
                                onClick={() => handleNav(item.toLowerCase().replace(' ', '-'))}
                                className="text-[12px] font-bold transition-all tracking-tight hover:text-emerald-500 text-navy-900/60"
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="hidden lg:flex items-center gap-4">
                        {isClientLoggedIn ? (
                            <>
                                <Link
                                    to="/dashboard"
                                    className="px-5 py-2 rounded-full font-black text-[12px] transition-all active:scale-95 flex items-center gap-2.5 group shadow-xl bg-emerald-500 text-white hover:bg-emerald-600"
                                >
                                    Dashboard
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={onOpenLogin}
                                    className="px-5 py-2 rounded-full font-black text-[12px] transition-all active:scale-95 text-navy-900 hover:text-emerald-500"
                                >
                                    Client Portal
                                </button>
                                <button
                                    onClick={onOpenRegister}
                                    className="px-5 py-2 rounded-full font-black text-[12px] transition-all active:scale-95 flex items-center gap-2.5 group shadow-xl bg-navy-900 text-white hover:bg-emerald-500"
                                >
                                    Get Started
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-2 lg:hidden">
                        <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-navy-900">
                            {mobileOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={`lg:hidden absolute top-full inset-x-6 mt-4 transition-all duration-500 ${mobileOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                    <div className="bg-white rounded-[2.5rem] p-8 border border-navy-100 shadow-2xl space-y-4">
                        {['Services', 'Process', 'Testimonials', 'FAQ'].map(item => (
                            <button
                                key={item}
                                onClick={() => handleNav(item.toLowerCase().replace(' ', '-'))}
                                className="block w-full text-left py-4 text-lg font-bold text-navy-900 border-b border-navy-50"
                            >
                                {item}
                            </button>
                        ))}
                        <button
                            onClick={() => { onOpenRegister(); setMobileOpen(false); }}
                            className="w-full py-4 bg-navy-900 text-white rounded-2xl font-bold text-lg mt-4 shadow-xl shadow-navy-900/10"
                        >
                            Get Started Now
                        </button>
                        {!isClientLoggedIn && (
                            <button
                                onClick={() => { onOpenLogin(); setMobileOpen(false); }}
                                className="w-full py-4 bg-white text-navy-900 border border-navy-100 rounded-2xl font-bold text-lg mt-2"
                            >
                                Client Portal
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
