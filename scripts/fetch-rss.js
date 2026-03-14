// 보안 뉴스 — 글로벌 (영문 번역)
  for (const feed of [
    { url: 'https://feeds.feedburner.com/Securityweek', source: 'SecurityWeek', category: '보안' },
    { url: 'https://www.bleepingcomputer.com/feed/', source: 'BleepingComputer', category: '보안' },
  ]) {
    try {
      console.log(`📡 ${feed.source} RSS 수집`);
      const xml = await httpGet(feed.url);
      const items = parseXML(xml);
      console.log(`  수집: ${items.length}개`);
      await processItems(items, feed.source, feed.category, fetchedUrls, newItems);
    } catch (e) { console.error(`${feed.source} 실패: ${e.message}`); }
  }

  // 보안뉴스 — 한국어 (번역 없이 바로 저장)
  try {
    console.log('📡 보안뉴스 RSS 수집');
    const xml = await httpGet('https://www.boannews.com/custom/news_rss.asp');
    const rawItems = parseXML(xml);
    console.log(`  수집: ${rawItems.length}개`);
    const filtered = rawItems.filter(item => {
      if (!item.pubDate) return false;
      try { return new Date(item.pubDate) >= FILTER_FROM; } catch { return false; }
    }).slice(0, 10);
    console.log(`  → 2026년 이후: ${filtered.length}개`);
    for (const item of filtered) {
      const link = item.link ?? '';
      if (!link || fetchedUrls.has(link)) continue;
      newItems.push({
        id: Buffer.from(link).toString('base64').slice(0, 16),
        title: item.title,
        summary: item.description || item.title,
        category: '보안',
        source: '보안뉴스',
        sourceUrl: link,
        date: new Date(item.pubDate).toISOString().slice(0, 10),
      });
      fetchedUrls.add(link);
      console.log(`  ✅ ${item.title}`);
    }
  } catch (e) { console.error(`보안뉴스 실패: ${e.message}`); }