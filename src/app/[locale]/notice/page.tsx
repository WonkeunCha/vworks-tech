import { getNotionDB, getNotionBlocks } from '@/lib/notion';
import NoticeClient from './NoticeClient';

export const revalidate = 3600;

export default async function NoticePage() {
  let posts: any[] = [];
  try {
    const list = await getNotionDB(process.env.NOTION_NOTICE_DB_ID!);
    posts = await Promise.all(
      list.map(async (post: any) => ({
        ...post,
        blocks: await getNotionBlocks(post.id),
      }))
    );
  } catch (e) { console.error(e); }
  return <NoticeClient posts={posts} />;
}