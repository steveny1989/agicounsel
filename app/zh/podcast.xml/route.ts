export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AGI Counsel Network — 播客深读 (中文版)</title>
    <link>https://agicounsel.org/zh/notes/</link>
    <description>AGI Counsel Network 核心研究音频对谈（林薇 × 姚迪）：系统拆解 AI 原生法务部门的三重结构性跃迁、多智能体参谋长机制与自学习知识飞轮。</description>
    <language>zh-cn</language>
    <itunes:author>AGI Counsel Network (林薇 × 姚迪)</itunes:author>
    <itunes:explicit>false</itunes:explicit>
    <itunes:category text="Technology"/>
    <itunes:category text="Business"/>
    <atom:link href="https://agicounsel.org/zh/podcast.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>Note #01 播客深读：AI 原生法务部门会是什么样？</title>
      <link>https://agicounsel.org/zh/notes/ai-native-legal-department/</link>
      <guid isPermaLink="true">https://agicounsel.org/zh/notes/ai-native-legal-department/#deep-dive-podcast</guid>
      <pubDate>Sun, 20 Sep 2026 00:00:00 GMT</pubDate>
      <description>林薇与姚迪深度拆解《AGI Counsel Note #01》：为什么外挂式对话插件陷入生产力悖论？如何完成工作流重构、自学习知识飞轮与人机协同治理的三重跃迁？</description>
      <itunes:duration>05:18</itunes:duration>
    </item>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
