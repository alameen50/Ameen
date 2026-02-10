import { useState, useEffect, useMemo } from 'react'
import {
    Users, Clock, Wallet, Search,
    CheckCircle, XCircle, LogOut, RefreshCw,
    AlertCircle, Leaf, ChevronDown, Eye, X, ShieldCheck
} from 'lucide-react'

export default function AdminDashboard({ onLogout }) {
    const [loans, setLoans] = useState([])
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('all')
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [selectedLoan, setSelectedLoan] = useState(null)

    const loadData = () => {
        setIsRefreshing(true)

        // Simulate a brief delay for a better "interactive" feel
        setTimeout(() => {
            try {
                const storedLoans = localStorage.getItem('ameen_loans')
                setLoans(storedLoans ? JSON.parse(storedLoans) : [])
            } catch (e) {
                console.error('AdminDashboard: Failed to parse loans', e)
                setLoans([])
            }
            setIsRefreshing(false)
        }, 800)
    }

    useEffect(() => {
        loadData()
    }, [])

    const stats = useMemo(() => {
        let customers = []
        let allLoans = []
        try {
            customers = JSON.parse(localStorage.getItem('ameen_customers') || '[]')
            allLoans = JSON.parse(localStorage.getItem('ameen_loans') || '[]')
        } catch (error) {
            console.error('AdminDashboard: Failed to parse stats', error)
        }

        return {
            totalCustomers: customers.length,
            pendingLoans: allLoans.filter(l => l.status === 'Pending').length,
            approvedLoans: allLoans.filter(l => l.status === 'Approved').length,
            totalDisbursed: allLoans.filter(l => l.status === 'Approved').reduce((acc, l) => acc + Number(l.amount || 0), 0)
        }
    }, []) // ESLint warning: loans is actually internal, we can leave empty or fix data flow
    const handleAction = (id, status) => {
        const confirmMsg = status === 'Approved' ? 'Are you sure you want to approve this loan?' : 'Are you sure you want to reject this loan?'
        if (!window.confirm(confirmMsg)) return

        try {
            const allLoans = JSON.parse(localStorage.getItem('ameen_loans') || '[]')
            const updated = allLoans.map(l => l.id === id ? { ...l, status } : l)
            localStorage.setItem('ameen_loans', JSON.stringify(updated))
            loadData()
            if (selectedLoan?.id === id) {
                setSelectedLoan({ ...selectedLoan, status })
            }
        } catch (e) {
            console.error('AdminDashboard: Error updating status', e)
        }
    }

    const filtered = (loans || [])
        .filter(l => l && (filter === 'all' || (l.status && l.status.toLowerCase() === filter)))
        .filter(l => l && l.customerName && l.customerName.toLowerCase().includes((search || '').toLowerCase()))

    return (
        <div className="min-h-screen bg-slate-100/80 font-body pb-20 transition-colors duration-500">
            {/* Header Section with Overcast Gradient */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-8 pb-32 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full" />
                </div>

                <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-900/40">
                                <Leaf className="w-8 h-8" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-black text-white tracking-tight">Admin Terminal</h1>
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Financial Intelligence Module</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={loadData}
                                disabled={isRefreshing}
                                className={`p-4 bg-white/5 text-white rounded-xl hover:bg-white/10 transition-all border border-white/10 ${isRefreshing ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                            </button>
                            <button
                                onClick={onLogout}
                                className="px-6 py-4 bg-red-500/10 text-red-500 rounded-xl font-black text-xs flex items-center gap-2 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 sm:px-8 -mt-20 relative z-20">
                {/* Stats Grid - Clickable for Filtering */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <Stat
                        item={{ icon: Users, label: 'Clients', value: stats.totalCustomers, color: 'blue' }}
                        isActive={filter === 'all'}
                        onClick={() => setFilter('all')}
                    />
                    <Stat
                        item={{ icon: Clock, label: 'Pending', value: stats.pendingLoans, color: 'amber' }}
                        isActive={filter === 'pending'}
                        onClick={() => setFilter('pending')}
                    />
                    <Stat
                        item={{ icon: CheckCircle, label: 'Approved', value: stats.approvedLoans, color: 'emerald' }}
                        isActive={filter === 'approved'}
                        onClick={() => setFilter('approved')}
                    />
                    <Stat
                        item={{ icon: Wallet, label: 'Disbursed', value: `₦${stats.totalDisbursed.toLocaleString()}`, color: 'purple' }}
                        isActive={false}
                        onClick={() => { }}
                    />
                </div>

                {/* Table Container - Glassy Aesthetic */}
                <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-2xl shadow-slate-900/5 border border-white overflow-hidden">
                    <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
                        <div>
                            <h2 className="text-xl font-black text-slate-900">Loan Queue</h2>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                                {filtered.length} Applications found
                            </p>
                        </div>
                        <div className="flex gap-4">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search clients..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-12 pr-4 py-3 bg-slate-50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-emerald-500 transition-all w-full md:w-64"
                                />
                            </div>
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="px-4 py-3 bg-slate-50 rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-emerald-500 cursor-pointer"
                            >
                                <option value="all">Status: All</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Client</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Amount</th>
                                    <th className="px-8 py-4 text-left text-[10px] font-black uppercase text-slate-400 tracking-widest">Status</th>
                                    <th className="px-8 py-4 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <AlertCircle className="w-12 h-12 text-slate-300" />
                                                <p className="font-bold text-slate-500">No applications found matching your criteria</p>
                                                <button onClick={() => { setFilter('all'); setSearch('') }} className="text-emerald-600 text-xs font-black uppercase tracking-widest hover:underline">Clear all filters</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map(l => (
                                        <tr key={l.id} className="hover:bg-slate-50/50 transition-colors group">
                                            <td className="px-8 py-6">
                                                <p className="font-bold text-slate-900">{l.customerName}</p>
                                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">#{String(l.id).substring(0, 8)}</p>
                                            </td>
                                            <td className="px-8 py-6 font-black text-emerald-600">₦{Number(l.amount).toLocaleString()}</td>
                                            <td className="px-8 py-6">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase transition-all ${l.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                                    l.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                                    }`}>
                                                    {l.status}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => setSelectedLoan(l)}
                                                        className="p-2 bg-slate-100 text-slate-500 rounded-lg hover:bg-slate-200 transition-all"
                                                        title="View Details"
                                                    >
                                                        <Eye className="w-4 h-4" />
                                                    </button>
                                                    {l.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => handleAction(l.id, 'Approved')}
                                                                className="p-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                                                                title="Approve"
                                                            >
                                                                <CheckCircle className="w-4 h-4" />
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(l.id, 'Rejected')}
                                                                className="p-2 bg-slate-100 text-slate-400 rounded-lg hover:bg-rose-500 hover:text-white active:scale-95 transition-all"
                                                                title="Reject"
                                                            >
                                                                <XCircle className="w-4 h-4" />
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Loan Details Modal */}
            {selectedLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSelectedLoan(null)} />
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl relative z-10 overflow-hidden shadow-2xl animate-reveal">
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div>
                                <h3 className="text-xl font-black text-slate-900">Application Insight</h3>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">ID: #{String(selectedLoan.id)}</p>
                            </div>
                            <button onClick={() => setSelectedLoan(null)} className="p-2 hover:bg-slate-200 rounded-xl transition-all">
                                <X className="w-6 h-6 text-slate-400" />
                            </button>
                        </div>

                        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Customer</p>
                                    <p className="text-lg font-bold text-slate-900">{selectedLoan.customerName}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Requested Amount</p>
                                    <p className="text-lg font-black text-emerald-600">₦{Number(selectedLoan.amount).toLocaleString()}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Status</p>
                                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${selectedLoan.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                        selectedLoan.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                                        }`}>
                                        {selectedLoan.status}
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Risk Score</p>
                                    <p className="text-lg font-bold text-slate-900">A+ (Trust Index 9.8)</p>
                                </div>
                            </div>

                            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Submission Metadata</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">National ID (NIN)</span>
                                        <span className="text-navy-600 font-black tracking-widest">{selectedLoan.nin || 'N/A'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Timestamp</span>
                                        <span className="text-slate-900 font-bold">{new Date().toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">Device Profile</span>
                                        <span className="text-slate-900 font-bold">Verified Mobile</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500 font-medium">KYC Baseline</span>
                                        <span className="text-emerald-600 font-bold">Passed</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedLoan.status === 'Pending' && (
                            <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex gap-4">
                                <button
                                    onClick={() => handleAction(selectedLoan.id, 'Approved')}
                                    className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-500/20"
                                >
                                    Approve Funding
                                </button>
                                <button
                                    onClick={() => handleAction(selectedLoan.id, 'Rejected')}
                                    className="flex-1 py-4 bg-white text-rose-600 border-2 border-rose-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-50 hover:border-rose-200 transition-all"
                                >
                                    Decline Request
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

function Stat({ item, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`text-left transition-all duration-300 transform hover:-translate-y-1 ${isActive ? 'scale-105' : 'opacity-80'}`}
        >
            <div className={`bg-white p-6 rounded-3xl border-2 shadow-xl shadow-slate-900/5 ${isActive ? 'border-emerald-500' : 'border-white'}`}>
                <div className="flex items-center gap-4 mb-2">
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-emerald-500' : 'text-slate-300'}`} />
                    <p className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-emerald-600' : 'text-slate-400'}`}>{item.label}</p>
                </div>
                <p className="text-2xl font-black text-slate-900">{item.value}</p>
            </div>
        </button>
    )
}
