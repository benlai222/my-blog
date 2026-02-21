'use client';

import Giscus from '@giscus/react';

export default function Comments() {
    return (
        <div className="mt-16 pt-10 border-t border-brand-pink/20">
            <Giscus
                id="comments"
                repo="benlai222/my-blog"
                repoId="R_kgDORVLs0g"
                category="General"
                categoryId="DIC_kwDORVLs0s4C27Gc"
                mapping="pathname"
                term="Welcome to @giscus/react component!"
                reactionsEnabled="1"
                emitMetadata="0"
                inputPosition="bottom"
                theme="transparent_dark"
                lang="zh-TW"
                loading="lazy"
            />
        </div>
    );
}
