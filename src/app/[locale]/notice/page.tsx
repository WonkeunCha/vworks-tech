import { getNotionDB, getNotionBlocks, getProp } from '@/lib/notion';
import NoticeClient from './NoticeClient';

export const revalidate = 3600;

export default async function NoticePage() {
  let posts: any[] = [];
  try {
    posts = await getNotionDB(process.env.NOTION_NOTICE_DB_ID!);
  } catch (e) { console.error(e); }
  return <NoticeClient posts={posts} />;
}