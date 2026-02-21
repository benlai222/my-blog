import { Metadata } from 'next';
import { getPostData, getSortedPostsData } from '@/lib/posts';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';

// 自動產生所有文章的靜態路由參數 (SSG)
export function generateStaticParams() {
    const posts = getSortedPostsData();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

// 根據 slug 動態產生 SEO Metadata
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
    const postData = getPostData(params.slug);
    return {
        title: postData.title,
        description: postData.description,
    };
}

// 文章顯示頁面組件
export default function Post({ params }: { params: { slug: string } }) {
    const postData = getPostData(params.slug);

    return (
        <main className="mx-auto max-w-3xl py-10 px-4">
            <Link href="/" className="text-blue-500 hover:underline mb-8 block">
                ← 回首頁
            </Link>
            <header className="mb-8 border-b pb-4">
                <h1 className="text-4xl font-bold mb-2">{postData.title}</h1>
                <p className="text-gray-500 text-sm">{postData.date}</p>
            </header>

            {/* 渲染 Markdown 內文 */}
            <article className="prose prose-neutral max-w-none">
                <ReactMarkdown>{postData.content}</ReactMarkdown>
            </article>
        </main>
    );
}
