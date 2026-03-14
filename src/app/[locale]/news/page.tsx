import { getNotionDB, getNotionBlocks, getProp } from '@/lib/notion';
import NewsClient from './NewsClient';

export const revalidate = 3600;

export default async function NewsPage() {
  let posts: any[] = [];
  try {
    const list = await getNotionDB(process.env.NOTION_NEWS_DB_ID!);
    posts = await Promise.all(
      list.map(async (post: any) => ({
        ...post,
        blocks: await getNotionBlocks(post.id),
      }))
    );
  } catch (e) { console.error(e); }
  return <NewsClient posts={posts} />;
}