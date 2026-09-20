export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AGI Counsel Network Notes</title>
    <link>https://agicounsel.org/notes/</link>
    <description>Collective thinking, questions, and shared insights from legal professionals across the AI ecosystem.</description>
    <language>en</language>
    <atom:link href="https://agicounsel.org/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>What Would an AI-Native Legal Department Look Like?</title>
      <link>https://agicounsel.org/notes/ai-native-legal-department/</link>
      <guid>https://agicounsel.org/notes/ai-native-legal-department/</guid>
      <pubDate>Sat, 01 Aug 2026 00:00:00 GMT</pubDate>
      <description><![CDATA[Three emerging ideas about workflows, knowledge architecture, and the changing value of human judgment.]]></description>
    </item>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
