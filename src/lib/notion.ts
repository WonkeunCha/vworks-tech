const TOKEN = process.env.NOTION_TOKEN;
const HEADERS = {
  'Authorization': `Bearer ${TOKEN}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

export async function getNotionDB(dbId: string, sortProperty = '게시일') {
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      filter: { property: '상태', select: { equals: '게시중' } },
      sorts: [{ property: sortProperty, direction: sortProperty === '순서' ? 'ascending' : 'descending' }],
    }),
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return data.results ?? [];
}

export async function getNotionBlocks(pageId: string) {
  const res = await fetch(
    `https://api.notion.com/v1/blocks/${pageId}/children?page_size=100`,
    { headers: HEADERS, next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.results ?? [];
}

export async function getNotionPageMeta(pageId: string) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    headers: HEADERS,
    next: { revalidate: 3600 },
  });
  return res.json();
}

export function getProp(page: any, key: string) {
  const p = page.properties?.[key];
  if (!p) return '';
  switch (p.type) {
    case 'title':     return p.title?.[0]?.plain_text ?? '';
    case 'rich_text': return p.rich_text?.[0]?.plain_text ?? '';
    case 'select':    return p.select?.name ?? '';
    case 'date':      return p.date?.start ?? '';
    case 'checkbox':  return p.checkbox ?? false;
    case 'number':    return p.number ?? 0;
    default:          return '';
  }
}