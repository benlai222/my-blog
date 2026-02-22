import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 文章放置的目錄
const postsDirectory = path.join(process.cwd(), 'posts');

/**
 * 取得所有文章資料 (包含 front-matter，但不包含內文)
 * 並依據日期由新到舊排序
 */
export function getSortedPostsData() {
    // 如果資料夾不存在則回傳空陣列，避免報錯
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map((fileName) => {
            // 移除 ".md" 取得 slug
            const slug = fileName.replace(/\.md$/, '');

            // 讀取 Markdown 檔案當作字串
            const fullPath = path.join(postsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            // 使用 gray-matter 解析 front-matter
            const matterResult = matter(fileContents);

            return {
                slug,
                ...(matterResult.data as { title: string; date: string; description: string }),
            };
        });

    // 依日期遞減排序
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * 取得特定 slug 的文章資料 (包含內文)
 */
export function getPostData(slug: string) {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    // 若找不到檔案會拋錯，實戰中可根據需求加上 try-catch 或回傳 null
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // 使用 gray-matter 解析 front-matter 與 content
    const matterResult = matter(fileContents);

    return {
        slug,
        content: matterResult.content,
        ...(matterResult.data as { title: string; date: string; description: string }),
    };
}

/**
 * 取得與目前文章相鄰的「上一篇」與「下一篇」文章資訊
 * @param currentSlug 目前文章的 slug
 */
export function getPostNavigation(currentSlug: string) {
    const allPosts = getSortedPostsData();
    const currentIndex = allPosts.findIndex((post) => post.slug === currentSlug);

    if (currentIndex === -1) {
        return { prevPost: null, nextPost: null };
    }

    // 因為 getSortedPostsData 是依日期遞減排序 (新 -> 舊)
    // 所以下一篇文章 (Next) 應該是時間較舊的文章 (Index + 1)
    // 上一篇文章 (Prev) 應該是時間較新的文章 (Index - 1)

    const prevPost = currentIndex > 0 ? {
        title: allPosts[currentIndex - 1].title,
        slug: allPosts[currentIndex - 1].slug,
    } : null;

    const nextPost = currentIndex < allPosts.length - 1 ? {
        title: allPosts[currentIndex + 1].title,
        slug: allPosts[currentIndex + 1].slug,
    } : null;

    return { prevPost, nextPost };
}
