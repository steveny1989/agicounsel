export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AGI Counsel Network — Deep Dive Podcast</title>
    <link>https://agicounsel.org/notes/</link>
    <description>Executive audio briefings and conversational walkthroughs on Legal AI engineering, the Five-Layer Legal AI Value Stack, multi-agent governance, and full-stack compute compliance from the AGI Counsel Network.</description>
    <language>en-us</language>
    <itunes:author>AGI Counsel Network (Sarah × Yao Di)</itunes:author>
    <itunes:explicit>false</itunes:explicit>
    <itunes:category text="Technology"/>
    <itunes:category text="Business"/>
    <atom:link href="https://agicounsel.org/podcast.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>Note #01 Deep Dive: What Would an AI-Native Legal Department Look Like?</title>
      <link>https://agicounsel.org/notes/ai-native-legal-department/</link>
      <guid isPermaLink="true">https://agicounsel.org/notes/ai-native-legal-department/#deep-dive-podcast</guid>
      <pubDate>Sun, 20 Sep 2026 00:00:00 GMT</pubDate>
      <description>Sarah and Yao Di unpack AGI Counsel Note #01: Why Layer-1 Legal Copilot wrappers hit a productivity paradox, how the 5-Layer Legal AI Value Stack builds a durable System-of-Record moat, and how senior counsel operate as Chief of Staff to specialized agent fleets.</description>
      <itunes:duration>05:12</itunes:duration>
    </item>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
