import { Metadata } from 'next';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import Link from 'next/link';
import ScrollToTopButton from './ScrollToTopButton';
import Comments from '@/components/Comments';

export function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const postData = getPostData(params.slug);
    return {
        title: `${postData.title} - VOSLOT`,
        description: postData.description,
    };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
    const postData = getPostData(params.slug);

    return (
        <main className="pt-10 pb-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* 裝飾性背景光 */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-pink/15 blur-[120px] rounded-full pointer-events-none -z-10"></div>

            <article className="relative mx-auto max-w-3xl glass-panel rounded-[2.5rem] p-8 sm:p-12 lg:p-16 mt-8 z-10 border-brand-pink/30 shadow-[0_10px_50px_rgba(0,0,0,0.5)]">

                {/* 麵包屑/返回控制項 */}
                <nav className="mb-12">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-bold text-brand-pink hover:text-white transition-all bg-space-light/50 border border-brand-pink/30 hover:bg-brand-pink hover:shadow-[0_0_15px_rgba(255,0,204,0.5)] px-5 py-2.5 rounded-full uppercase tracking-wider"
                    >
                        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        返回航線
                    </Link>
                </nav>

                {/* 標題與元資訊 */}
                <header className="mb-14 border-b border-brand-pink/20 pb-10">
                    <div className="flex items-center gap-3 text-sm font-bold text-slate-300 mb-6 uppercase">
                        <time dateTime={postData.date} className="bg-brand-pink/20 text-brand-pink border border-brand-pink/40 shadow-[0_0_10px_rgba(255,0,204,0.2)] px-3 py-1 rounded-full text-xs tracking-widest">
                            {new Date(postData.date).toLocaleDateString('zh-TW', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </time>
                        <span className="w-1.5 h-1.5 rounded-full bg-gold shadow-[0_0_5px_rgba(255,215,0,0.8)]"></span>
                        <span className="text-gold tracking-widest">星際日誌</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 tracking-tighter leading-[1.15] mb-6 drop-shadow-md">
                        {postData.title}
                    </h1>
                </header>

                {/* Markdown 內文 (Dark/Neon 配置) */}
                <div className="prose prose-invert prose-lg sm:prose-xl max-w-none 
                                prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-white prose-headings:to-brand-orange
                                prose-p:text-slate-300 prose-p:font-light prose-p:leading-loose
                                prose-a:text-brand-pink hover:prose-a:text-brand-orange prose-a:font-bold prose-a:no-underline hover:prose-a:underline hover:prose-a:drop-shadow-[0_0_8px_rgba(255,0,204,0.6)]
                                prose-strong:text-gold prose-strong:font-bold prose-strong:drop-shadow-[0_0_4px_rgba(255,215,0,0.3)]
                                prose-img:rounded-3xl prose-img:shadow-[0_0_20px_rgba(255,0,204,0.15)] prose-img:border prose-img:border-brand-pink/20
                                prose-iframe:w-full prose-iframe:aspect-video prose-iframe:rounded-3xl prose-iframe:shadow-[0_0_30px_rgba(255,0,204,0.2)] prose-iframe:border prose-iframe:border-brand-pink/20
                                prose-pre:bg-space-dark prose-pre:rounded-3xl prose-pre:shadow-[0_0_20px_rgba(0,0,0,0.5)] prose-pre:border prose-pre:border-brand-pink/20
                                prose-blockquote:border-brand-orange prose-blockquote:bg-space-dark/60 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:not-italic prose-blockquote:rounded-r-3xl prose-blockquote:text-brand-pink prose-blockquote:font-medium">
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                        {postData.content}
                    </ReactMarkdown>
                </div>

                {/* 底部動態組件與留言板 */}
                <Comments />
                <ScrollToTopButton />
            </article>
        </main>
    );
}
