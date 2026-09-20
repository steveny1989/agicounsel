export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>AGI Counsel Network — Audio Briefings</title>
    <link>https://agicounsel.org/notes/</link>
    <description>Audio briefings and roundtable syntheses on AI-native legal departments, workflow architecture, institutional memory, and human-in-the-loop governance from the AGI Counsel Network.</description>
    <language>en-us</language>
    <itunes:author>AGI Counsel Network</itunes:author>
    <itunes:explicit>false</itunes:explicit>
    <itunes:category text="Technology"/>
    <itunes:category text="Business"/>
    <atom:link href="https://agicounsel.org/podcast.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>Note #01 Audio Briefing: What Would an AI-Native Legal Department Look Like?</title>
      <link>https://agicounsel.org/notes/ai-native-legal-department/</link>
      <guid isPermaLink="true">https://agicounsel.org/notes/ai-native-legal-department/#audio-briefing</guid>
      <pubDate>Sun, 20 Sep 2026 00:00:00 GMT</pubDate>
      <description>A synthesis of AGI Counsel Note #01: Why generic Copilot plug-ins hit a productivity paradox, how the Three Structural Shifts move teams from legal production to legal judgment, and how senior counsel operate as Chief of Staff to specialized agent fleets.</description>
      <itunes:duration>03:15</itunes:duration>
    </item>
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
    },
  });
}
