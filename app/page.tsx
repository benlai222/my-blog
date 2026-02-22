import { getSortedPostsData } from '@/lib/posts';
import PostListWithSearch from '@/components/PostListWithSearch';

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

        {/* 包含搜尋功能與文章列表的 Client Component */}
        <PostListWithSearch posts={allPostsData} />
      </div>
    </main>
  );
}
