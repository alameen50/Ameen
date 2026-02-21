import { useState } from 'react'
import { Mail, ShieldCheck, ChevronRight, LogIn, AlertCircle } from 'lucide-react'

export default function LoginForm({ onSuccess, onSwitchToRegister }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        const emailStr = formData.email.trim().toLowerCase()
        const passStr = formData.password.trim()

        const customers = JSON.parse(localStorage.getItem('ameen_customers') || '[]')

        // Find all users with matching email and password
        const allMatches = customers.filter(c => {
            const cEmail = (c.email || '').trim().toLowerCase()
            const cPass = (c.password || '').trim()
            return cEmail === emailStr && cPass === passStr
        })

        if (allMatches.length === 0) {
            setError('Invalid email or password. Please check your credentials.')
            return
        }

        // Prioritize approved profile if duplicates exist (legacy data)
        const approvedUser = allMatches.find(u => (u.status || '').toLowerCase() === 'approved')
        const user = approvedUser || allMatches[0]

        // Check if the user is approved
        if (!user.status || user.status.toLowerCase() !== 'approved') {
            const currentStatus = user.status || 'Pending'
            setError(`Account Access Restricted: Your current status is "${currentStatus}". Please wait for Admin approval to access the portal.`)
            return
        }

        // Successfully logged in
        console.log('Login successful for:', user.email)
        sessionStorage.setItem('ameen_client', JSON.stringify(user))
        onSuccess(user)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
                <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 animate-shake">
                    <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                    <p className="text-sm font-semibold text-rose-700">{error}</p>
                </div>
            )}

            <div className="space-y-4">
                <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        required
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent rounded-[1.5rem] text-sm font-semibold outline-none focus:bg-white transition-all placeholder:text-navy-300 text-navy-900"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        required
                        type="password"
                        placeholder="Password"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent rounded-[1.5rem] text-sm font-semibold outline-none focus:bg-white transition-all placeholder:text-navy-300 text-navy-900"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-5 bg-navy-900 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-navy-100 hover:bg-emerald-600 transition-all active:scale-98 flex items-center justify-center gap-3 mt-6 group"
            >
                Sign In to Portal
                <LogIn className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <p className="text-center text-sm font-bold text-navy-400 mt-6">
                Don't have an account?{' '}
                <button
                    type="button"
                    onClick={onSwitchToRegister}
                    className="text-emerald-600 hover:underline font-black"
                >
                    Register here
                </button>
            </p>
        </form>
    )
}
