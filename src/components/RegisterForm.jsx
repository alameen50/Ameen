import { useState } from 'react'
import { User, Mail, Phone, MapPin, ChevronRight, ShieldCheck } from 'lucide-react'

export default function RegisterForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        nin: '',
        address: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const customers = JSON.parse(localStorage.getItem('ameen_customers') || '[]')
        customers.push({ ...formData, id: Date.now(), joined: new Date().toLocaleDateString() })
        localStorage.setItem('ameen_customers', JSON.stringify(customers))
        onSuccess()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-4">
                <Input
                    icon={User}
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={(v) => setFormData({ ...formData, fullName: v })}
                />
                <Input
                    icon={Mail}
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                />
                <Input
                    icon={Phone}
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(v) => setFormData({ ...formData, phone: v })}
                />
                <div className="relative group">
                    <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        required
                        type="text"
                        maxLength="11"
                        placeholder="National Identification Number (NIN)"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent rounded-[1.5rem] text-sm font-semibold outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-navy-300"
                        value={formData.nin}
                        onChange={(e) => setFormData({ ...formData, nin: e.target.value.replace(/\D/g, '') })}
                    />
                </div>
                <div className="relative group">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-navy-300 group-focus-within:text-emerald-500 transition-colors" />
                    <textarea
                        required
                        placeholder="Home Address"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent rounded-[1.5rem] text-sm font-semibold outline-none focus:bg-white focus:border-emerald-500 transition-all min-h-[120px] resize-none placeholder:text-navy-300"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-5 bg-navy-900 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-navy-100 hover:bg-emerald-600 transition-all active:scale-98 flex items-center justify-center gap-3 mt-6 group"
            >
                Continue to Application
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
        </form>
    )
}

// eslint-disable-next-line no-unused-vars
function Input({ icon: Icon, type = "text", placeholder, value, onChange }) {
    return (
        <div className="relative group">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300 group-focus-within:text-emerald-500 transition-colors" />
            <input
                required
                type={type}
                placeholder={placeholder}
                className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent rounded-[1.5rem] text-sm font-semibold outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-navy-300"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    )
}
