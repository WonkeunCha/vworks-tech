import { NextRequest, NextResponse } from 'next/server';

const TOKEN = process.env.NOTION_TOKEN;
const HEADERS = {
  'Authorization': `Bearer ${TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get('type');
  const id   = searchParams.get('id');

  if (type === 'db') {
    const dbId = id === 'notice' ? process.env.NOTION_NOTICE_DB_ID
               : id === 'faq'    ? process.env.NOTION_FAQ_DB_ID
               : id === 'news'   ? process.env.NOTION_NEWS_DB_ID
               : null;
    if (!dbId) return NextResponse.json({ error: 'invalid db' }, { status: 400 });

    const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        filter: { property: '상태', select: { equals: '게시중' } },
        sorts: [{ property: '게시일', direction: 'descending' }],
      }),
    });
    const data = await res.json();
    return NextResponse.json(data.results ?? []);
  }

  if (type === 'blocks') {
    const res = await fetch(`https://api.notion.com/v1/blocks/${id}/children?page_size=100`, {
      headers: HEADERS,
    });
    const data = await res.json();
    return NextResponse.json(data.results ?? []);
  }

  return NextResponse.json({ error: 'invalid type' }, { status: 400 });
}