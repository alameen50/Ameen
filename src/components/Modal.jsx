import { X } from 'lucide-react'

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-navy-950/40 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_32px_128px_-32px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-8 duration-500">
                {/* Header */}
                <div className="px-8 sm:px-12 pt-8 sm:pt-12 pb-2 flex justify-between items-start">
                    <div className="space-y-1">
                        <h3 className="text-3xl font-black text-navy-900 tracking-tight">{title}</h3>
                        <div className="h-1.5 w-12 bg-emerald-500 rounded-full" />
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 -mr-2 hover:bg-navy-50 rounded-2xl transition-all text-navy-300 hover:text-navy-900"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Body */}
                <div className="px-8 sm:px-12 pb-10 sm:pb-12 pt-6">
                    {children}
                </div>
            </div>
        </div>
    )
}
