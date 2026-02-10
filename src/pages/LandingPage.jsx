import {
    ArrowRight, Zap, Shield, BarChart3,
    Users, Clock, Wallet, Star, ChevronDown,
    TrendingUp, Sparkles, Award, Globe, ZapIcon
} from 'lucide-react'
import { useState } from 'react'

export default function LandingPage({ onOpenRegister }) {
    return (
        <div className="bg-overcast min-h-screen overflow-hidden selection:bg-emerald-100 selection:text-emerald-900 relative">
            {/* Background Decorations */}
            <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/30 rounded-full blur-[120px] animate-blob" />
                <div className="absolute top-[20%] right-[-15%] w-[50%] h-[50%] bg-navy-100/50 rounded-full blur-[140px] animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-10%] left-[10%] w-[35%] h-[35%] bg-emerald-50/50 rounded-full blur-[100px] animate-blob animation-delay-4000" />
            </div>

            <HeroSection onOpenRegister={onOpenRegister} />
            <TrustSection />
            <ServicesSection />
            <HowItWorksSection />
            <GrowthSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection onOpenRegister={onOpenRegister} />
        </div>
    )
}

function HeroSection({ onOpenRegister }) {
    return (
        <section className="relative min-h-[80vh] flex items-center justify-center pt-24 pb-20 overflow-hidden">
            {/* Background Image & Cinematic Swifter Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/hero-bg.png"
                    alt="Hero Background"
                    className="w-full h-full object-cover"
                />
                {/* Refined cinematic overlay */}
                <div className="absolute inset-0 bg-navy-900/60" />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/30 via-transparent to-navy-900/80" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center">
                <div className="max-w-4xl mx-auto space-y-8 animate-reveal">
                    {/* Minimalist Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] mx-auto">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        Licensed & Audited 2026
                    </div>

                    {/* Refined Headline */}
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight">
                        Finance for <br />
                        the <span className="text-emerald-500 italic">Driven.</span>
                    </h1>

                    {/* Clean supporting text */}
                    <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-medium leading-relaxed">
                        Ethical capital and digital tools African entrepreneurs need to scale from local to global.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <button
                            onClick={onOpenRegister}
                            className="w-full sm:w-auto px-8 py-4 bg-white text-navy-900 rounded-full font-bold text-sm hover:bg-emerald-400 hover:text-white transition-all active:scale-95 flex items-center justify-center gap-2 group shadow-xl"
                        >
                            Get Started
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <a
                            href="#services"
                            className="w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-md text-white border border-white/10 rounded-full font-bold text-sm hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg"
                        >
                            Explore Solutions
                        </a>
                    </div>

                    {/* Minimalist Social Proof */}
                    <div className="pt-8 flex flex-col items-center gap-5">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="w-12 h-12 rounded-full border-2 border-navy-900 bg-navy-800 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-500" />
                                </div>
                            ))}
                        </div>
                        <p className="text-[11px] font-black text-white/40 uppercase tracking-[0.2em]">
                            Trusted by <span className="text-emerald-500">12,000+</span> founders
                        </p>
                    </div>
                </div>
            </div>

            {/* Modern Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer opacity-50 hover:opacity-100 transition-opacity">
                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-emerald-500 rounded-full" />
                </div>
            </div>
        </section>
    )
}

function TrustSection() {
    return (
        <section id="trust" className="py-20 relative overflow-hidden bg-white/30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-center gap-10 animate-reveal" style={{ animationDelay: '200ms' }}>
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-navy-400/60">Supported by Global Leaders</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-24 opacity-40">
                        {['WorldBank', 'NDIC', 'CBN', 'IFC', 'TechStars'].map(brand => (
                            <span key={brand} className="text-2xl font-black tracking-tighter text-navy-900 hover:opacity-100 transition-opacity cursor-default">{brand}</span>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

function ServicesSection() {
    const items = [
        { icon: Zap, title: "Velocity Credit", desc: "Access business funding in under 24 hours with our AI-powered risk assessment." },
        { icon: Globe, title: "Global Settlement", desc: "Transact with international partners using our unified digital bridge." },
        { icon: Shield, title: "Ethical Yield", desc: "Interest-free options and community-backed social credit systems." }
    ]
    return (
        <section id="services" className="py-32 lg:py-48 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-2xl space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-100">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                            <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">The Service Layer</p>
                        </div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-navy-900 tracking-tight leading-tight">
                            Financial Infrastructure <br /> built for <span className="text-emerald-600">scale.</span>
                        </h2>
                    </div>
                    <p className="text-navy-400 text-base font-medium max-w-xs leading-relaxed">
                        Precision tools for the next generation of African enterprise.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {items.map((item, i) => (
                        <div
                            key={i}
                            className="group p-12 bg-white rounded-[3rem] border border-navy-100 hover:border-emerald-500/30 hover:shadow-[0_40px_80px_-20px_rgba(15,23,42,0.1)] transition-all duration-700 relative overflow-hidden animate-reveal"
                            style={{ animationDelay: `${i * 150}ms` }}
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-[4rem] -z-0 group-hover:scale-125 transition-transform duration-700" />
                            <div className="relative z-10">
                                <div className="w-16 h-16 bg-navy-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-emerald-500 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-inner">
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black text-navy-900 mb-3 tracking-tight">{item.title}</h3>
                                <p className="text-navy-500/80 font-medium leading-relaxed text-base">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function HowItWorksSection() {
    const steps = [
        { title: "Onboarding", desc: "Quick identity verification with BVN/NIN." },
        { title: "Risk Profile", desc: "Our AI builds your social-financial score." },
        { title: "Credit Line", desc: "Choose your limit and preferred timeframe." },
        { title: "Disbursement", desc: "Funds arrive instantly in your vault." }
    ]
    return (
        <section id="process" className="py-32 lg:py-48 bg-navy-900 overflow-hidden relative rounded-[4rem] sm:rounded-[6rem] mx-4 sm:mx-8 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.5)]">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[180px] -z-0" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[180px] -z-0" />

            <div className="max-w-7xl mx-auto px-8 sm:px-12 relative z-10">
                <div className="grid lg:grid-cols-2 gap-24 items-center">
                    <div className="space-y-16">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 backdrop-blur-md">
                                <span className="w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_12px_rgba(52,211,153,0.5)]" />
                                <p className="text-[11px] font-black uppercase tracking-widest text-emerald-400">Efficiency Engine</p>
                            </div>
                            <h2 className="text-3xl sm:text-5xl font-black text-white leading-tight tracking-tight">How we simplify <br /> the complex.</h2>
                            <p className="text-navy-400 text-base font-medium max-w-lg leading-relaxed">Decentralized metrics meeting centralized reliability to deliver capital instantly.</p>
                        </div>

                        <div className="space-y-12">
                            {steps.map((s, i) => (
                                <div key={i} className="flex gap-8 items-start group">
                                    <div className="flex-shrink-0 w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-xl text-emerald-400 group-hover:bg-emerald-500 group-hover:text-navy-900 group-hover:scale-110 transition-all duration-500 shadow-xl">
                                        0{i + 1}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-black text-white mb-2 tracking-tighter group-hover:text-emerald-400 transition-colors">{s.title}</h4>
                                        <p className="text-navy-400 text-base font-medium leading-relaxed">{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative group">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full group-hover:scale-125 transition-transform duration-1000 -z-0" />
                        <div className="aspect-[4/5] bg-navy-800 rounded-[3.5rem] border border-white/5 overflow-hidden shadow-2xl relative z-10">
                            <img src="https://images.unsplash.com/photo-1573163281534-dd4280732f13?auto=format&fit=crop&q=80&w=1000" alt="tech" className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-2000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/20 to-transparent" />
                            <div className="absolute bottom-10 left-10 right-10 p-10 glass rounded-[2.5rem] border border-white/10 transition-all group-hover:translate-y-[-10px]">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-16 bg-emerald-600 rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40">
                                        <ZapIcon className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <p className="text-3xl font-black text-white">0.012s</p>
                                        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Decision Latency</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function GrowthSection() {
    return (
        <section id="growth" className="py-32 lg:py-48 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-emerald-50/50 p-12 sm:p-20 rounded-[3.5rem] border border-emerald-100/40 flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden group animate-reveal">
                    <div className="max-w-xl space-y-10 text-center lg:text-left relative z-10">
                        <h3 className="text-3xl sm:text-4xl font-black text-navy-900 leading-tight tracking-tight">Zero-Collateral <br /> Growth Capital</h3>
                        <p className="text-navy-500 text-base font-medium leading-relaxed">We trust you more than traditional banks. Our community-driven metrics allow us to lend based on your hustle, not just your assets.</p>
                        <div className="flex flex-col sm:flex-row gap-8 font-black text-navy-900 text-[10px] uppercase tracking-[0.3em] justify-center lg:justify-start">
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                No hidden fees
                            </div>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                Repay on terms
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-8 relative z-10 w-full lg:w-auto">
                        <div className="p-10 bg-white rounded-[2.5rem] border border-emerald-100 shadow-[0_30px_60px_-15px_rgba(16,185,129,0.1)] text-center hover:-translate-y-2 transition-transform duration-500">
                            <p className="text-4xl font-black text-navy-900 tracking-tight">₦8.4B+</p>
                            <p className="text-[11px] font-black text-navy-400 uppercase tracking-widest mt-3">Volume</p>
                        </div>
                        <div className="p-10 bg-navy-900 rounded-[2.5rem] shadow-2xl text-center text-white translate-y-10 hover:translate-y-8 transition-transform duration-500">
                            <p className="text-4xl font-black text-emerald-400 tracking-tight">99.2%</p>
                            <p className="text-[11px] font-black text-navy-300 uppercase tracking-widest mt-3">Score</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-32 lg:py-48 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-24 space-y-6 animate-reveal">
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-emerald-600">The Growth Wall</p>
                    <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight leading-tight max-w-2xl mx-auto">Trusted by over 12,000 innovators across Africa.</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-10 sm:gap-12 animate-reveal" style={{ animationDelay: '300ms' }}>
                    <Testimonial text="Ameen's portal is faster than any bank. I received equipment financing within a day." author="Fatima Bello" role="Logistics Owner" />
                    <Testimonial text="The only bank that understands SME cycles. Their flex-repay is a life-saver for my business." author="Halima Umar" role="SME Distributor" />
                </div>
            </div>
        </section>
    )
}

function Testimonial({ text, author, role }) {
    return (
        <div className="p-12 bg-white rounded-[3.5rem] border border-navy-50 flex flex-col justify-between hover:border-emerald-500/20 hover:shadow-[0_45px_100px_-20px_rgba(15,23,42,0.1)] transition-all duration-700 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
                <Star className="w-24 h-24 text-navy-900" />
            </div>
            <div className="relative z-10">
                <div className="flex gap-1.5 mb-10">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 text-emerald-500 fill-current" />)}
                </div>
                <p className="text-xl font-medium text-navy-800 leading-relaxed mb-12 tracking-tight">"{text}"</p>
            </div>
            <div className="flex items-center gap-6 relative z-10">
                <div className="w-14 h-14 bg-navy-900 rounded-2xl flex items-center justify-center font-black text-white text-xl border border-navy-800 shadow-xl">{author[0]}</div>
                <div>
                    <p className="text-lg font-black text-navy-900 tracking-tighter">{author}</p>
                    <p className="text-[11px] font-black text-navy-400 uppercase tracking-[0.2em]">{role}</p>
                </div>
            </div>
        </div>
    )
}

function FAQSection() {
    const [open, setOpen] = useState(0)
    const items = [
        { q: "How fast is the disbursement?", a: "Once approved, funds reach your nominated bank vault in under 60 minutes, 24/7." },
        { q: "What is the maximum limit?", a: "Individual entrepreneurs start with up to ₦2.5M, while established SMEs can access up to ₦50M." },
        { q: "Are there hidden charges?", a: "Absolutely not. Transparency is our bedrock. You see exactly what you repay before you commit." }
    ]
    return (
        <section id="faq" className="py-32 lg:py-48 bg-navy-50/30">
            <div className="max-w-4xl mx-auto px-6">
                <div className="text-center mb-24 space-y-6">
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-navy-400">Support Center</p>
                    <h2 className="text-3xl sm:text-4xl font-black text-navy-900 tracking-tight">Common Inquiries</h2>
                </div>
                <div className="grid gap-6 animate-reveal" style={{ animationDelay: '300ms' }}>
                    {items.map((item, i) => (
                        <div key={i} className={`rounded-[2.5rem] border transition-all duration-700 ${open === i ? 'bg-white shadow-[0_30px_60px_-15px_rgba(15,23,42,0.1)] border-emerald-100' : 'bg-white/50 border-navy-100 backdrop-blur-sm'}`}>
                            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full px-10 py-8 flex justify-between items-center text-left group">
                                <span className={`text-xl font-black tracking-tighter transition-colors ${open === i ? 'text-emerald-600' : 'text-navy-900'}`}>{item.q}</span>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${open === i ? 'bg-emerald-500 text-white rotate-180 shadow-lg shadow-emerald-500/30' : 'bg-navy-50 text-navy-400'}`}>
                                    <ChevronDown className="w-5 h-5" />
                                </div>
                            </button>
                            {open === i && <div className="px-10 pb-10 text-navy-500 text-lg font-medium leading-relaxed max-w-2xl">{item.a}</div>}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function CTASection({ onOpenRegister }) {
    return (
        <section id="cta" className="py-32 lg:py-60 px-4 sm:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="bg-navy-900 p-16 sm:p-32 rounded-[4rem] sm:rounded-[6rem] text-center relative overflow-hidden shadow-[0_60px_120px_-20px_rgba(15,23,42,0.6)] group animate-reveal">
                    {/* Background sophisticated glow */}
                    <div className="absolute inset-0 bg-emerald-500 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-1000" />
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-glow" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px]" />

                    <div className="relative z-10 space-y-12 max-w-3xl mx-auto flex flex-col items-center">
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-emerald-400 text-[11px] font-black uppercase tracking-[0.3em] backdrop-blur-md">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                            Global Ecosystem
                        </div>
                        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight">Your evolution <br /> starts now.</h2>
                        <p className="text-navy-400 text-lg font-medium max-w-xl mx-auto leading-relaxed">Join the 12,400+ African enterprises building their future on Ameen Digital.</p>
                        <button
                            onClick={onOpenRegister}
                            className="px-14 py-6 bg-emerald-500 text-white rounded-full font-black text-xl hover:bg-emerald-400 hover:scale-105 hover:shadow-[0_20px_50px_rgba(16,185,129,0.5)] transition-all active:scale-95 flex items-center gap-5 group relative overflow-hidden"
                        >
                            <span className="relative z-10 flex items-center gap-5">
                                Open Account
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                            </span>
                            {/* Shimmer pulse effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

function CheckCircle2(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" /><path d="m9 12 2 2 4-4" /></svg>
    )
}
