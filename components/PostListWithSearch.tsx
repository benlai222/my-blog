'use client';

import { useState } from 'react';
import Link from 'next/link';

// 和 lib/posts.ts 裡的資料結構一致
interface PostData {
    slug: string;
    title: string;
    date: string;
    description: string;
}

export default function PostListWithSearch({ posts }: { posts: PostData[] }) {
    const [searchQuery, setSearchQuery] = useState('');

    // 過濾邏輯：檢查標題與描述是否包含關鍵字 (忽略大小寫)
    const filteredPosts = posts.filter((post) => {
        const query = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(query) ||
            post.description.toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-12 relative z-10 w-full">
            {/* 搜尋列區塊 */}
            <div className="max-w-2xl mx-auto w-full relative group">
                {/* 發光邊框底圖 */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-brand-pink to-brand-orange rounded-full opacity-30 group-focus-within:opacity-100 blur-sm transition-opacity duration-500"></div>

                <div className="relative flex items-center glass-panel rounded-full px-6 py-4 bg-space-dark/80 backdrop-blur-xl border border-brand-pink/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                    <svg className="w-6 h-6 text-brand-pink mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="search"
                        placeholder="搜尋全站文章 (標題、內文摘要)..."
                        className="w-full bg-transparent text-white placeholder-slate-400 focus:outline-none text-lg font-light tracking-wide placeholder:font-light"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    {/* 清除按鈕 */}
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="ml-4 text-slate-400 hover:text-brand-pink transition-colors focus:outline-none"
                            aria-label="清除搜尋"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            {/* 結果顯示區塊 */}
            {filteredPosts.length === 0 ? (
                /* 無搜尋結果畫面 */
                <div className="text-center py-20 glass-panel rounded-3xl mt-8">
                    <div className="w-20 h-20 bg-space-light rounded-3xl flex items-center justify-center mx-auto mb-6 border border-brand-pink/30 shadow-[0_0_20px_rgba(255,0,204,0.3)]">
                        <svg className="w-10 h-10 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-3 tracking-wide">找不到相符的文章</h3>
                    <p className="text-slate-400 font-light text-lg">
                        嘗試使用其他關鍵字，或者瀏覽下方的熱門文章分類。
                    </p>
                    <button
                        onClick={() => setSearchQuery('')}
                        className="mt-8 px-6 py-2.5 rounded-full border border-brand-pink/50 text-brand-pink hover:bg-brand-pink hover:text-white transition-all shadow-[0_0_15px_rgba(255,0,204,0.3)] font-medium uppercase tracking-widest text-sm"
                    >
                        清除搜尋條件
                    </button>
                </div>
            ) : (
                /* 渲染文章網格 */
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
                    {filteredPosts.map((post) => (
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
    );
}
