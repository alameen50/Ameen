import { useState } from 'react'
import { Mail, Lock, LogIn, AlertCircle, Leaf, ArrowLeft, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'

const ADMIN_EMAIL = 'alameenumar7450@gmail.com'
const ADMIN_PASSWORD = 'alameen1234'

export default function AdminLogin({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        setError('')


        setTimeout(() => {
            if (email.toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                sessionStorage.setItem('ameen_admin', JSON.stringify({ email: email.toLowerCase() }))
                onLogin()
            } else {
                console.warn('AdminLogin: Failed credentials')
                setError('Verification failed. Invalid admin credentials.')
                setLoading(false)
            }
        }, 800)
    }

    return (
        <div className="min-h-screen bg-navy-50 flex flex-col items-center justify-center p-6 relative">
            <div className="absolute top-0 left-0 w-full h-1/2 bg-navy-900 -z-0" />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-6 text-xs font-bold uppercase tracking-widest">
                        <ArrowLeft className="w-4 h-4" /> Go Home
                    </Link>
                    <div className="w-16 h-16 bg-emerald-600 rounded-[1.5rem] flex items-center justify-center text-white mx-auto mb-4 shadow-xl shadow-emerald-900/40">
                        <Leaf className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-black text-white">Admin Vault</h1>
                </div>

                <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white">
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-xs font-black">
                            <AlertCircle className="w-4 h-4" /> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-[10px] font-black text-navy-400 uppercase tracking-widest ml-1">Email</label>
                            <div className="relative mt-1">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-4 bg-navy-50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-emerald-500"
                                    placeholder="admin@ameen.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-[10px] font-black text-navy-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative mt-1">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-navy-300" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-4 bg-navy-50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-emerald-500"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-navy-300 hover:text-navy-900 transition-colors p-1"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-navy-900 text-white rounded-2xl font-black text-lg hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
                        >
                            {loading ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <><LogIn className="w-5 h-5" /> Login</>}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
