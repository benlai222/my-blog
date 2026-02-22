import Link from 'next/link';

interface PostLink {
    title: string;
    slug: string;
}

interface PostNavigationProps {
    prevPost: PostLink | null;
    nextPost: PostLink | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
    if (!prevPost && !nextPost) return null;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-16 pt-8 border-t border-brand-pink/20">
            {/* 上一篇 (Previous Post - newer date) */}
            {prevPost ? (
                <Link
                    href={`/blog/${prevPost.slug}`}
                    className="group flex flex-col items-start p-6 glass-panel rounded-2xl border border-brand-pink/20 hover:border-brand-pink hover:shadow-[0_0_20px_rgba(255,0,204,0.3)] transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <span className="text-xs text-brand-pink uppercase tracking-widest font-bold mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        上一篇
                    </span>
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300 line-clamp-2">
                        {prevPost.title}
                    </span>
                </Link>
            ) : (
                <div /> // Empty placeholder for grid layout
            )}

            {/* 下一篇 (Next Post - older date) */}
            {nextPost ? (
                <Link
                    href={`/blog/${nextPost.slug}`}
                    className="group flex flex-col items-end text-right p-6 glass-panel rounded-2xl border border-brand-pink/20 hover:border-brand-pink hover:shadow-[0_0_20px_rgba(255,0,204,0.3)] transition-all duration-300 relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-l from-brand-pink/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    <span className="text-xs text-brand-pink uppercase tracking-widest font-bold mb-2 flex items-center justify-end gap-2 text-right w-full">
                        下一篇
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                    <span className="text-slate-300 font-medium group-hover:text-white transition-colors duration-300 line-clamp-2 w-full">
                        {nextPost.title}
                    </span>
                </Link>
            ) : (
                <div /> // Empty placeholder for grid layout
            )}
        </div>
    );
}
