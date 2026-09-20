export const dynamic = 'force-static';
export const revalidate = false;

export async function GET() {
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AGI Counsel Network 社群笔记</title>
    <link>https://agicounsel.org/zh/notes/</link>
    <description>将 AGI Counsel Network 对话中的集体思考，沉淀为简短的社群笔记。</description>
    <language>zh-CN</language>
    <atom:link href="https://agicounsel.org/zh/feed.xml" rel="self" type="application/rss+xml" />
    <item>
      <title>AI 原生法务部门会是什么样？</title>
      <link>https://agicounsel.org/zh/notes/ai-native-legal-department/</link>
      <guid>https://agicounsel.org/zh/notes/ai-native-legal-department/</guid>
      <pubDate>Sat, 01 Aug 2026 00:00:00 GMT</pubDate>
      <description><![CDATA[关于工作流、知识架构，以及人类判断力价值变化的三点初步观察。]]></description>
    </item>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}
