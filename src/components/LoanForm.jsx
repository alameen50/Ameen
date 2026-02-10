import { useState } from 'react'
import { Wallet, Target, Clock, Send, Sparkles } from 'lucide-react'

export default function LoanForm({ onSuccess }) {
    const [formData, setFormData] = useState({
        amount: '',
        purpose: '',
        duration: '12'
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const customers = JSON.parse(localStorage.getItem('ameen_customers') || '[]')
        if (customers.length === 0) return

        const loans = JSON.parse(localStorage.getItem('ameen_loans') || '[]')
        const currentCustomer = customers[customers.length - 1]

        loans.push({
            ...formData,
            id: Date.now(),
            customerName: currentCustomer.fullName,
            nin: currentCustomer.nin, // Pull NIN from customer record
            status: 'Pending',
            date: new Date().toLocaleDateString()
        })
        localStorage.setItem('ameen_loans', JSON.stringify(loans))
        onSuccess()
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-5 bg-emerald-50 rounded-[1.5rem] border border-emerald-100 flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0">
                    <Sparkles className="w-5 h-5 text-emerald-600" />
                </div>
                <p className="text-sm font-bold text-emerald-800 leading-tight">Your account is ready! Please enter your loan details.</p>
            </div>

            <div className="space-y-4">
                <div className="relative group">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        required
                        type="number"
                        placeholder="Requested Amount (₦)"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent rounded-[1.5rem] text-sm font-semibold outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-navy-300"
                        value={formData.amount}
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                </div>

                <div className="relative group">
                    <Target className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300 group-focus-within:text-emerald-500 transition-colors" />
                    <select
                        required
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent rounded-[1.5rem] text-sm font-semibold outline-none focus:bg-white focus:border-emerald-500 transition-all appearance-none text-navy-900"
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    >
                        <option value="" disabled>Select Funding Purpose</option>
                        <option value="Agric Extension">Agric Extension</option>
                        <option value="SME Business">SME Business</option>
                        <option value="Education Grant">Education Grant</option>
                        <option value="Emergency Fund">Emergency Fund</option>
                        <option value="Business Capital">Business Capital</option>
                    </select>
                </div>

                <div className="relative group">
                    <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-navy-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        required
                        type="number"
                        placeholder="Tenure (Months)"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent rounded-[1.5rem] text-sm font-semibold outline-none focus:bg-white focus:border-emerald-500 transition-all placeholder:text-navy-300"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-5 bg-emerald-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-98 flex items-center justify-center gap-3 mt-6 group"
            >
                Submit for Review
                <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
        </form>
    )
}
