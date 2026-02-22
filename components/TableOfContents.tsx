'use client';

import { useState, useEffect } from 'react';

interface Heading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // 找到所有位於文章內的 h2 和 h3 標籤
        const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3')).map(
            (elem) => ({
                id: elem.id,
                text: elem.textContent || '',
                level: Number(elem.tagName.substring(1)),
            })
        );

        // 過濾掉沒有 id 的標籤（通常被 rehype-slug 處理過都會有 id）
        const validHeadings = elements.filter(h => h.id);
        setHeadings(validHeadings);

        // 實作 Intersection Observer 來突顯當前閱讀的章節
        const observer = new IntersectionObserver(
            (entries) => {
                // Find the visible entry
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0% 0% -80% 0%' }
        );

        validHeadings.forEach((heading) => {
            const el = document.getElementById(heading.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="sticky top-24 glass-panel p-6 rounded-3xl border-brand-pink/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)] bg-space-dark/80 backdrop-blur-md">
            <h4 className="text-brand-pink font-bold uppercase tracking-widest text-sm mb-4 border-b border-brand-pink/20 pb-2">
                導覽目錄
            </h4>
            <ul className="space-y-3 max-h-[70vh] overflow-y-auto custom-scrollbar pr-2 cursor-pointer">
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`text-sm transition-all duration-300 ${heading.level === 3 ? 'ml-4' : ''
                            }`}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`block hover:text-brand-pink ${activeId === heading.id
                                    ? 'text-brand-pink font-bold drop-shadow-[0_0_5px_rgba(255,0,204,0.5)]'
                                    : 'text-slate-400'
                                }`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
