import { getNotionDB, getNotionBlocks, getProp } from '@/lib/notion';
import NoticeClient from './NoticeClient';

export const revalidate = 3600;

export default async function NoticePage() {
  let postsWithBlocks: any[] = [];
  try {
    const posts = await getNotionDB(process.env.NOTION_NOTICE_DB_ID!);
    postsWithBlocks = await Promise.all(
      posts.map(async (post: any) => {
        const blocks = await getNotionBlocks(post.id);
        return { ...post, blocks };
      })
    );
  } catch (e) { console.error(e); }
  return <NoticeClient posts={postsWithBlocks} />;
}