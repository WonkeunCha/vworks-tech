import { getNotionDB, getNotionBlocks } from '@/lib/notion';
import newsAutoData from '@/data/news-auto.json';
import NewsClient from './NewsClient';

export const revalidate = 3600;

export default async function NewsPage() {
  let notionPosts: any[] = [];
  try {
    const list = await getNotionDB(process.env.NOTION_NEWS_DB_ID!);
    notionPosts = await Promise.all(
      list.map(async (post: any) => ({
        ...post,
        blocks: await getNotionBlocks(post.id),
        isAuto: false,
      }))
    );
  } catch (e) { console.error(e); }

  // RSS 자동수집 뉴스 변환
  const autoPosts = (newsAutoData.items ?? []).map((item: any) => ({
    id: item.id,
    url: item.sourceUrl,
    isAuto: true,
    blocks: [],
    properties: {
      제목: { type: 'title', title: [{ plain_text: item.title }] },
      카테고리: { type: 'select', select: { name: item.category } },
      게시일: { type: 'date', date: { start: item.date } },
      요약: { type: 'rich_text', rich_text: [{ plain_text: item.summary }] },
      썸네일URL: { type: 'url', url: null },
    },
    source: item.source,
    sourceUrl: item.sourceUrl,
    summary: item.summary,
    title: item.title,
    category: item.category,
    date: item.date,
  }));

  // 날짜순 정렬 (최신순)
  const allPosts = [...notionPosts, ...autoPosts].sort((a, b) => {
    const dateA = a.isAuto ? a.date : (a.properties?.게시일?.date?.start ?? '');
    const dateB = b.isAuto ? b.date : (b.properties?.게시일?.date?.start ?? '');
    return dateB.localeCompare(dateA);
  });

  return <NewsClient posts={allPosts} />;
}