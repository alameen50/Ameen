import { useState, useEffect } from 'react'
import {
    LayoutDashboard, Wallet, History, User,
    LogOut, Leaf, Bell, TrendingUp,
    ShieldCheck, Clock, CheckCircle, ArrowRight
} from 'lucide-react'

export default function ClientDashboard({ user, onLogout }) {
    const [loans, setLoans] = useState([])
    const [activeTab, setActiveTab] = useState('dashboard')
    const [stats, setStats] = useState({
        activeBalance: 0,
        pendingAmount: 0,
        repaymentScore: 98
    })

    // Settings state
    const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })
    const [settingsError, setSettingsError] = useState('')
    const [settingsSuccess, setSettingsSuccess] = useState('')
    useEffect(() => {
        const loadDashboardData = () => {
            const allLoans = JSON.parse(localStorage.getItem('ameen_loans') || '[]')
            const myLoans = allLoans.filter(l => {
                const lName = (l.customerName || 'Anonymous').trim().toLowerCase()
                const uName = (user.fullName || user.customerName || '').trim().toLowerCase()
                return lName === uName
            })

            const active = myLoans.filter(l => l.status === 'Approved').reduce((acc, l) => acc + Number(l.amount), 0)
            const pending = myLoans.filter(l => l.status === 'Pending').reduce((acc, l) => acc + Number(l.amount), 0)

            // Batch updates or wrap in microtask to avoid react-hooks/set-state-in-effect
            setLoans(myLoans)
            setStats(prev => ({
                ...prev,
                activeBalance: active,
                pendingAmount: pending
            }))
        }

        // Use a timer to escape the immediate commit phase if the linter persists, 
        // but often just batching is enough or ensuring it's not the primary effect logic if sync.
        const timer = setTimeout(loadDashboardData, 0)
        return () => clearTimeout(timer)
    }, [user])

    const handlePasswordChange = (e) => {
        e.preventDefault()
        setSettingsError('')
        setSettingsSuccess('')

        if (passwords.new !== passwords.confirm) {
            setSettingsError('New passwords do not match')
            return
        }

        const customers = JSON.parse(localStorage.getItem('ameen_customers') || '[]')
        const index = customers.findIndex(c => c.email === user.email)

        if (index === -1) {
            setSettingsError('User not found')
            return
        }

        if (customers[index].password !== passwords.current) {
            setSettingsError('Current password is incorrect')
            return
        }

        customers[index].password = passwords.new
        localStorage.setItem('ameen_customers', JSON.stringify(customers))

        // Also update sessionStorage if needed, though we usually just store user info without password
        setSettingsSuccess('Password updated successfully!')
        setPasswords({ current: '', new: '', confirm: '' })
    }

    return (
        <div className="min-h-screen bg-navy-50/50 font-body pb-20 transition-colors duration-500">
            {/* Top Navigation / Header */}
            <div className="bg-white border-b border-navy-100 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <Leaf className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-black text-navy-900 tracking-tight">Portal</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="relative p-2 text-navy-400 hover:text-emerald-500 transition-colors">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white" />
                        </button>
                        <div className="h-8 w-[1px] bg-navy-100 hidden sm:block" />
                        <div className="flex items-center gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-black text-navy-900">{user.fullName}</p>
                                <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Premium Member</p>
                            </div>
                            <button
                                onClick={onLogout}
                                className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-white hover:bg-emerald-600 transition-all shadow-xl shadow-navy-900/10"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 pt-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar / Profile Info */}
                    <aside className="lg:w-80 space-y-8">
                        <div className="bg-white p-8 rounded-[2.5rem] border border-navy-100 shadow-xl shadow-navy-900/5 text-center">
                            <div className="w-24 h-24 bg-navy-50 rounded-full mx-auto mb-6 flex items-center justify-center text-navy-900 font-black text-3xl border-4 border-white shadow-inner">
                                {user.fullName ? user.fullName[0] : 'U'}
                            </div>
                            <h2 className="text-xl font-black text-navy-900 mb-1">{user.fullName}</h2>
                            <p className="text-sm font-bold text-navy-400 mb-6">{user.email}</p>
                            <div className="flex justify-center gap-2">
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest rounded-full">Approved</span>
                                <span className="px-3 py-1 bg-navy-50 text-navy-600 text-[10px] font-black uppercase tracking-widest rounded-full">KYC 2</span>
                            </div>
                        </div>

                        <nav className="space-y-2">
                            <NavItem
                                icon={LayoutDashboard}
                                label="Dashboard"
                                active={activeTab === 'dashboard'}
                                onClick={() => setActiveTab('dashboard')}
                            />
                            <NavItem
                                icon={Wallet}
                                label="My Loans"
                                active={activeTab === 'loans'}
                                onClick={() => setActiveTab('loans')}
                            />
                            <NavItem
                                icon={History}
                                label="Transactions"
                                active={activeTab === 'transactions'}
                                onClick={() => setActiveTab('transactions')}
                            />
                            <NavItem
                                icon={User}
                                label="Settings"
                                active={activeTab === 'settings'}
                                onClick={() => setActiveTab('settings')}
                            />
                        </nav>
                    </aside>

                    {/* Main Feed */}
                    <div className="flex-1 space-y-12">
                        {activeTab === 'dashboard' && (
                            <>
                                {/* Welcome Card */}
                                <div className="bg-gradient-to-br from-navy-900 to-slate-900 p-10 sm:p-14 rounded-[3.5rem] text-white relative overflow-hidden shadow-2xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />
                                    <div className="relative z-10">
                                        <h3 className="text-3xl sm:text-4xl font-black mb-4 tracking-tight">Available Credit</h3>
                                        <div className="flex items-baseline gap-4 mb-8">
                                            <span className="text-5xl sm:text-6xl font-black tracking-tighter">₦{(2500000 - stats.activeBalance).toLocaleString()}</span>
                                            <span className="text-emerald-400 font-bold text-lg">/ ₦2.5M</span>
                                        </div>
                                        <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 rounded-2xl font-black text-sm transition-all flex items-center gap-3 shadow-xl shadow-emerald-500/20 active:scale-95">
                                            Apply for New Funding
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                    <ClientStat label="Active Funding" value={`₦${stats.activeBalance.toLocaleString()}`} icon={CheckCircle} color="emerald" />
                                    <ClientStat label="Pending Requests" value={`₦${stats.pendingAmount.toLocaleString()}`} icon={Clock} color="amber" />
                                    <ClientStat label="Trust Score" value={`${stats.repaymentScore}%`} icon={TrendingUp} color="blue" />
                                </div>

                                {/* Loans Table */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-xl font-black text-navy-900">Recent Applications</h4>
                                        <button onClick={() => setActiveTab('loans')} className="text-emerald-600 text-xs font-black uppercase tracking-widest hover:underline">View All</button>
                                    </div>
                                    <LoansTable loans={loans.slice(0, 5)} />
                                </div>
                            </>
                        )}

                        {activeTab === 'loans' && (
                            <div className="space-y-6">
                                <h4 className="text-3xl font-black text-navy-900">My Loan Applications</h4>
                                <div className="bg-white p-8 rounded-[2.5rem] border border-navy-100 shadow-xl shadow-navy-900/5">
                                    <LoansTable loans={loans} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'transactions' && (
                            <div className="space-y-6">
                                <h4 className="text-3xl font-black text-navy-900">Transaction History</h4>
                                <div className="bg-white p-12 rounded-[2.5rem] border border-navy-100 shadow-xl shadow-navy-900/5 text-center">
                                    <History className="w-16 h-16 text-navy-100 mx-auto mb-6" />
                                    <p className="font-bold text-navy-300">No transactions recorded yet.</p>
                                    <p className="text-sm text-navy-200">Payments and disbursements will appear here.</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'settings' && (
                            <div className="space-y-12">
                                <h4 className="text-3xl font-black text-navy-900">Settings & Security</h4>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Profile Settings */}
                                    <div className="bg-white p-10 rounded-[2.5rem] border border-navy-100 shadow-xl shadow-navy-900/5 space-y-8">
                                        <h5 className="text-xl font-black text-navy-900 flex items-center gap-3">
                                            <User className="w-6 h-6 text-emerald-500" />
                                            MFB Profile Details
                                        </h5>
                                        <div className="space-y-4">
                                            <ProfileItem label="Full Name" value={user.fullName} />
                                            <ProfileItem label="Email Address" value={user.email} />
                                            <ProfileItem label="Phone Number" value={user.phone || 'Not provided'} />
                                            <ProfileItem label="NIN" value={user.nin || 'Verified'} />
                                            <ProfileItem label="Account Type" value="Tier 2 Savings" />
                                            <ProfileItem label="Bank Account" value="0123456789 (Linked)" />
                                        </div>
                                    </div>

                                    {/* Security Settings */}
                                    <div className="bg-white p-10 rounded-[2.5rem] border border-navy-100 shadow-xl shadow-navy-900/5 space-y-8">
                                        <h5 className="text-xl font-black text-navy-900 flex items-center gap-3">
                                            <ShieldCheck className="w-6 h-6 text-emerald-500" />
                                            Security & Password
                                        </h5>

                                        <form onSubmit={handlePasswordChange} className="space-y-4">
                                            {settingsError && <div className="p-3 bg-rose-50 text-rose-600 text-xs font-bold rounded-xl border border-rose-100">{settingsError}</div>}
                                            {settingsSuccess && <div className="p-3 bg-emerald-50 text-emerald-600 text-xs font-bold rounded-xl border border-emerald-100">{settingsSuccess}</div>}

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-navy-400 ml-2">Current Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-5 py-4 bg-navy-50 rounded-2xl outline-none focus:bg-white focus:ring-2 ring-emerald-500/20 transition-all font-bold text-sm"
                                                    value={passwords.current}
                                                    onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-navy-400 ml-2">New Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-5 py-4 bg-navy-50 rounded-2xl outline-none focus:bg-white focus:ring-2 ring-emerald-500/20 transition-all font-bold text-sm"
                                                    value={passwords.new}
                                                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase text-navy-400 ml-2">Confirm New Password</label>
                                                <input
                                                    type="password"
                                                    className="w-full px-5 py-4 bg-navy-50 rounded-2xl outline-none focus:bg-white focus:ring-2 ring-emerald-500/20 transition-all font-bold text-sm"
                                                    value={passwords.confirm}
                                                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                                    required
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                className="w-full py-4 bg-navy-900 text-white rounded-2xl font-black text-sm hover:bg-emerald-600 transition-all mt-4"
                                            >
                                                Update Security Credentials
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}

// eslint-disable-next-line no-unused-vars
function NavItem({ icon: Icon, label, active, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`w-full px-6 py-4 rounded-2xl flex items-center gap-4 transition-all group ${active ? 'bg-navy-900 text-white shadow-xl shadow-navy-900/20' : 'text-navy-400 hover:bg-navy-50 hover:text-navy-900'
                }`}>
            <Icon className={`w-5 h-5 ${active ? 'text-emerald-400' : 'group-hover:text-emerald-500'}`} />
            <span className="font-black text-sm tracking-tight">{label}</span>
        </button>
    )
}

function ProfileItem({ label, value }) {
    return (
        <div className="flex items-center justify-between pb-4 border-b border-navy-50 last:border-0 last:pb-0">
            <span className="text-[10px] font-black uppercase text-navy-400 tracking-widest">{label}</span>
            <span className="text-sm font-bold text-navy-900">{value}</span>
        </div>
    )
}

function LoansTable({ loans }) {
    if (loans.length === 0) {
        return (
            <div className="p-16 text-center space-y-4">
                <Wallet className="w-12 h-12 text-navy-100 mx-auto" />
                <p className="font-bold text-navy-300">No active applications found</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead className="bg-navy-50/50 border-b border-navy-100">
                    <tr>
                        <th className="px-8 py-4 text-left text-[10px] font-black uppercase text-navy-400 tracking-widest">Reference</th>
                        <th className="px-8 py-4 text-left text-[10px] font-black uppercase text-navy-400 tracking-widest">Amount</th>
                        <th className="px-8 py-4 text-left text-[10px] font-black uppercase text-navy-400 tracking-widest">Status</th>
                        <th className="px-8 py-4 text-right text-[10px] font-black uppercase text-navy-400 tracking-widest">Date</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-navy-50">
                    {loans.map(loan => (
                        <tr key={loan.id} className="hover:bg-navy-50/30 transition-colors">
                            <td className="px-8 py-6 font-bold text-navy-900">#{(loan.id).toString().substring(0, 8)}</td>
                            <td className="px-8 py-6 font-black text-navy-900">₦{Number(loan.amount).toLocaleString()}</td>
                            <td className="px-8 py-6">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${loan.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' :
                                    loan.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                                    }`}>
                                    {loan.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-right font-bold text-navy-400">{loan.date || 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

// eslint-disable-next-line no-unused-vars
function ClientStat({ label, value, icon: Icon, color }) {
    const colors = {
        emerald: 'bg-emerald-50 text-emerald-600',
        amber: 'bg-amber-50 text-amber-600',
        blue: 'bg-blue-50 text-blue-600'
    }
    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-navy-100 shadow-xl shadow-navy-900/5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${colors[color]}`}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-navy-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-2xl font-black text-navy-900">{value}</p>
        </div>
    )
}
