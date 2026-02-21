import { getSortedPostsData } from '@/lib/posts';
import Link from 'next/link';

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <main className="pb-24 pt-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* 主視覺 Hero Section */}
        <header className="mb-20 text-center sm:text-left pt-8 pb-12 relative flex flex-col items-center sm:items-start text-white">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-brand-pink/20 blur-[100px] rounded-full pointer-events-none -z-10"></div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-pink/10 border border-brand-pink/30 text-brand-pink text-xs font-black tracking-widest mb-6 shadow-[0_0_15px_rgba(255,0,204,0.2)] uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-pink opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-orange"></span>
            </span>
            Welcome to VOSLOT Station
          </div>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter lg:leading-[1.1] mb-6 drop-shadow-md">
            探索技術與<br className="max-sm:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-orange drop-shadow-[0_0_20px_rgba(255,0,204,0.4)]">
              星際的無限可能
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed font-light">
            在這裡，我們分享關於網頁開發、軟體工程與現代設計的美好實踐。
            點擊下方文章，進入閱讀軌道。
          </p>
        </header>

        {/* 文章列表區塊 */}
        <div className="space-y-8 relative z-10">
          {allPostsData.length === 0 ? (
            <div className="text-center py-20 glass-panel rounded-3xl">
              <div className="w-16 h-16 bg-space-light rounded-2xl flex items-center justify-center mx-auto mb-4 border border-brand-pink/30 shadow-[0_0_15px_rgba(255,0,204,0.2)]">
                <svg className="w-8 h-8 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 tracking-wide">尚未發佈日誌</h3>
              <p className="text-slate-400 font-light">目前還沒有內容可以閱讀，敬請期待後續更新。</p>
            </div>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {allPostsData.map((post) => (
                <li key={post.slug} className="group h-full flex">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="relative w-full flex flex-col p-8 glass-panel rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,0,204,0.2)] hover:border-gold/60 border border-brand-pink/20 overflow-hidden"
                  >
                    {/* 卡片發光特效 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-pink/5 to-brand-orange/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"></div>

                    <time className="relative z-10 text-xs font-black tracking-widest text-brand-orange uppercase mb-3 block">
                      {new Date(post.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </time>
                    <h3 className="relative z-10 text-2xl font-bold text-white group-hover:text-brand-pink group-hover:drop-shadow-[0_0_8px_rgba(255,0,204,0.5)] transition-all mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="relative z-10 text-slate-300 font-light leading-relaxed line-clamp-3 mb-6 flex-1">
                      {post.description}
                    </p>

                    <div className="relative z-10 mt-auto flex items-center text-sm font-bold tracking-widest text-gold group-hover:text-gold-dark transition-colors drop-shadow-[0_0_4px_rgba(255,215,0,0.3)]">
                      LIFT OFF
                      <svg className="w-4 h-4 ml-1.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
