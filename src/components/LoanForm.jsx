import React, { useState } from 'react'
import { Send, Banknote, Calendar, PieChart, Info, MailCheck, ChevronRight } from 'lucide-react'

export default function LoanForm({ onSuccess, user }) {
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        amount: '',
        tenure: '12',
        purpose: '',
        monthlyIncome: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        const loanData = {
            ...formData,
            id: `L-${Date.now()}`,
            customerName: user?.fullName || 'Anonymous',
            nin: user?.nin || 'N/A',
            date: new Date().toLocaleDateString(),
            status: 'Pending'
        }
        const loans = JSON.parse(localStorage.getItem('ameen_loans') || '[]')
        loans.push(loanData)
        localStorage.setItem('ameen_loans', JSON.stringify(loans))
        setIsSubmitted(true)
    }

    if (isSubmitted) {
        return (
            <div className="py-12 flex flex-col items-center text-center space-y-6 animate-reveal">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 shadow-inner">
                    <MailCheck className="w-10 h-10" />
                </div>
                <div className="space-y-4">
                    <h3 className="text-2xl font-black text-navy-900">Application Received!</h3>
                    <p className="text-navy-500 font-medium leading-relaxed max-w-sm mx-auto">
                        Thank you for your application. We have received your loan request and our team will review it shortly. You can track your status in the client portal.
                    </p>
                </div>
                <button
                    onClick={onSuccess}
                    className="px-8 py-4 bg-navy-900 text-white rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all flex items-center gap-2 group"
                >
                    Finish
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-black text-navy-500 uppercase tracking-wider ml-1">Loan Amount (₦)</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400 group-focus-within:text-emerald-600 transition-colors">
                            <Banknote className="w-5 h-5" />
                        </div>
                        <input
                            required
                            type="number"
                            className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-navy-900"
                            placeholder="e.g. 500000"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-black text-navy-500 uppercase tracking-wider ml-1">Tenure (Months)</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400 group-focus-within:text-emerald-600 transition-colors">
                            <Calendar className="w-5 h-5" />
                        </div>
                        <select
                            className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-navy-900 appearance-none"
                            value={formData.tenure}
                            onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                        >
                            <option value="6">6 Months</option>
                            <option value="12">12 Months</option>
                            <option value="24">24 Months</option>
                            <option value="36">36 Months</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black text-navy-500 uppercase tracking-wider ml-1">Monthly Income (₦)</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400 group-focus-within:text-emerald-600 transition-colors">
                        <PieChart className="w-5 h-5" />
                    </div>
                    <input
                        required
                        type="number"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-navy-900"
                        placeholder="e.g. 150000"
                        value={formData.monthlyIncome}
                        onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-xs font-black text-navy-500 uppercase tracking-wider ml-1">Purpose of Loan</label>
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-navy-400 group-focus-within:text-emerald-600 transition-colors">
                        <Info className="w-5 h-5" />
                    </div>
                    <textarea
                        required
                        rows="3"
                        className="w-full pl-12 pr-4 py-4 bg-navy-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white rounded-2xl outline-none transition-all font-bold text-navy-900 resize-none"
                        placeholder="Why do you need this loan?"
                        value={formData.purpose}
                        onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
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
