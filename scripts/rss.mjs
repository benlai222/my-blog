import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 使用與專案環境相同的路徑
const postsDirectory = path.join(process.cwd(), 'posts');
const publicDirectory = path.join(process.cwd(), 'public');

async function generateRssFeed() {
  // 檢查 posts 資料夾是否存在
  if (!fs.existsSync(postsDirectory)) {
    console.warn('Posts directory not found. Skipping RSS generation.');
    return;
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);

      return {
        slug,
        title: data.title || '無標題',
        date: data.date || new Date().toISOString(),
        description: data.description || '',
      };
    })
    .sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));

  // 替換換成您真實的網站網址
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://my-blog-domain.com';

  const rssItemsXml = posts
    .map((post) => {
      return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid>${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.description}]]></description>
      </item>
      `;
    })
    .join('');

  const rssFeedXml = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
      <title>我的部落格</title>
      <link>${siteUrl}</link>
      <description>分享最新的技術文章與生活點滴。</description>
      <language>zh-TW</language>
      ${rssItemsXml}
    </channel>
  </rss>`;

  // 確保 public 目錄存在
  if (!fs.existsSync(publicDirectory)) {
    fs.mkdirSync(publicDirectory, { recursive: true });
  }

  // 寫入 feed.xml
  fs.writeFileSync(path.join(publicDirectory, 'feed.xml'), rssFeedXml);
  console.log('✅ RSS feed generated successfully!');
}

generateRssFeed();
