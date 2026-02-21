'use client'

export default function ScrollToTopButton() {
    return (
        <div className="mt-20 pt-10 border-t border-brand-pink/20 flex justify-center">
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="inline-flex flex-col items-center justify-center p-4 rounded-full bg-space-dark text-gold hover:bg-gradient-to-r hover:from-brand-pink hover:to-brand-orange hover:text-white hover:shadow-[0_0_20px_rgba(255,0,204,0.5)] hover:-translate-y-1 transition-all duration-300 border border-gold/50 hover:border-transparent"
                title="回到頂部"
            >
                <svg className="w-5 h-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                <span className="text-[10px] font-black tracking-widest uppercase">TOP</span>
            </button>
        </div>
    );
}
