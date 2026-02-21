import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "VOSLOT - 探索無際宇宙",
  description: "使用 Next.js 開發的精緻部落格，以霓虹漸層與宇宙紫為核心。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-TW" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans relative min-h-screen flex flex-col bg-space-dark text-slate-200`}>
        {/* 全域背景裝飾 */}
        <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-space-light/50 via-space-dark to-space-dark -z-20"></div>
        <div className="fixed inset-0 bg-grid-pattern -z-10 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>

        {/* 透明懸浮導覽列 */}
        <nav className="sticky top-0 z-50 glass-nav transition-all duration-300">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-brand-pink to-brand-orange hover:opacity-80 transition-opacity drop-shadow-[0_0_8px_rgba(255,0,204,0.5)]"
            >
              VOSLOT
            </Link>
            <div className="flex gap-6 text-sm font-bold tracking-wider text-slate-300 uppercase">
              <Link href="/" className="hover:text-brand-pink transition-colors hover:drop-shadow-[0_0_5px_rgba(255,0,204,0.6)]">Home</Link>
              <a href="/feed.xml" target="_blank" className="hover:text-brand-orange transition-colors flex items-center gap-1 hover:drop-shadow-[0_0_5px_rgba(255,153,0,0.6)]">
                RSS
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </a>
            </div>
          </div>
        </nav>

        {/* 主要內容區 */}
        <div className="flex-1 w-full relative z-10">
          {children}
        </div>

        {/* 底部頁尾 */}
        <footer className="mt-auto py-10 text-center border-t border-brand-pink/20 bg-space-dark/40 backdrop-blur-sm relative overflow-hidden">
          {/* 光暈效果 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-full bg-brand-pink/10 blur-[80px] rounded-full pointer-events-none -z-10"></div>
          <p className="text-sm text-slate-400 font-medium relative z-10">
            © {new Date().getFullYear()} VOSLOT. Styled with Neon Pink & Orange Gradient.
          </p>
        </footer>
      </body>
    </html>
  );
}
