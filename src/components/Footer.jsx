import { Leaf, Twitter, Ghost, Instagram, Mail, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="bg-white border-t border-navy-50 pt-24 pb-12 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 pb-16 border-b border-navy-50">
                    <div className="space-y-8">
                        <Link to="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-navy-900 rounded-xl flex items-center justify-center text-white shadow-lg shadow-navy-900/10">
                                <Leaf className="w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-navy-900">Ameen</span>
                        </Link>
                        <p className="text-navy-500 font-medium leading-relaxed max-w-xs">
                            Modern microfinance infrastructure for African digital economies.
                        </p>
                        <div className="flex gap-4">
                            <SocialLink icon={Twitter} href="https://twitter.com" />
                            <SocialLink icon={Ghost} href="https://snapchat.com/t/4DvMIfbl" />
                            <SocialLink icon={Instagram} href="https://www.instagram.com/__i_alameen_/" />
                            <SocialLink icon={WhatsAppIcon} href="https://wa.me/2348143596535" />
                        </div>
                    </div>

                    <FooterSection title="Company">
                        <FooterLink href="#services">Architecture</FooterLink>
                        <FooterLink href="#process">The Process</FooterLink>
                        <FooterLink href="#testimonials">Success stories</FooterLink>
                        <FooterLink href="#faq">Knowledge Base</FooterLink>
                    </FooterSection>

                    <FooterSection title="Products">
                        <FooterLink href="#">Velocity Credit</FooterLink>
                        <FooterLink href="#">Global Bridge</FooterLink>
                        <FooterLink href="#">Yield Plus</FooterLink>
                        <FooterLink href="#">Safety Vault</FooterLink>
                    </FooterSection>

                    <div className="space-y-6">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">Headquarters</h4>
                        <div className="space-y-4 font-bold text-[11px] text-navy-900 tracking-wider">
                            <div className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-emerald-500" />
                                KATSINA, NIGERIA
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-emerald-500" />
                                <a href="mailto:alameenumar7450@gmail.com" className="hover:text-emerald-500 transition-colors">
                                    alameenumar7450@gmail.com
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <p className="text-[11px] font-bold text-navy-300 uppercase tracking-wider">© 2026 Ameen Digital MFB</p>
                        <span className="hidden md:block w-1.5 h-1.5 bg-navy-100 rounded-full" />
                        <p className="text-[11px] font-bold text-emerald-500 uppercase tracking-wider">Regulated by CBN • NDIC Insured</p>
                    </div>
                    <div className="flex gap-8">
                        <Link to="/admin" className="text-[11px] font-bold text-navy-300 hover:text-navy-900 transition-colors uppercase tracking-wider">Operator Portal</Link>
                        <a href="#" className="text-[11px] font-bold text-navy-300 hover:text-navy-900 transition-colors uppercase tracking-wider">Terms</a>
                        <a href="#" className="text-[11px] font-bold text-navy-300 hover:text-navy-900 transition-colors uppercase tracking-wider">Privacy</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

function FooterSection({ title, children }) {
    return (
        <div className="space-y-8">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-emerald-600">{title}</h4>
            <div className="flex flex-col gap-4">
                {children}
            </div>
        </div>
    )
}

function FooterLink({ href, children }) {
    return (
        <a href={href} className="text-[13px] font-bold text-navy-400 hover:text-navy-900 transition-colors">
            {children}
        </a>
    )
}

function WhatsAppIcon({ className }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.435 5.63 1.435h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

// eslint-disable-next-line no-unused-vars
function SocialLink({ icon: IconComponent, href }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 bg-navy-50 rounded-xl flex items-center justify-center text-navy-400 hover:bg-navy-900 hover:text-white transition-all shadow-sm"
        >
            <IconComponent className="w-4.5 h-4.5" />
        </a>
    )
}

