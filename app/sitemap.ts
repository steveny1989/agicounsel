import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://agicounsel.org';
  const currentDate = new Date().toISOString().split('T')[0];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          'zh-CN': `${baseUrl}/zh/`,
        },
      },
    },
    {
      url: `${baseUrl}/zh/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          'zh-CN': `${baseUrl}/zh/`,
        },
      },
    },
    {
      url: `${baseUrl}/notes/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/notes/`,
          'zh-CN': `${baseUrl}/zh/notes/`,
        },
      },
    },
    {
      url: `${baseUrl}/zh/notes/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/notes/`,
          'zh-CN': `${baseUrl}/zh/notes/`,
        },
      },
    },
    {
      url: `${baseUrl}/notes/ai-native-legal-department/`,
      lastModified: '2026-09-20',
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          en: `${baseUrl}/notes/ai-native-legal-department/`,
          'zh-CN': `${baseUrl}/zh/notes/ai-native-legal-department/`,
          'x-default': `${baseUrl}/notes/ai-native-legal-department/`,
        },
      },
    },
    {
      url: `${baseUrl}/zh/notes/ai-native-legal-department/`,
      lastModified: '2026-09-20',
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          en: `${baseUrl}/notes/ai-native-legal-department/`,
          'zh-CN': `${baseUrl}/zh/notes/ai-native-legal-department/`,
          'x-default': `${baseUrl}/notes/ai-native-legal-department/`,
        },
      },
    },
    {
      url: `${baseUrl}/stack/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/stack/`,
          'zh-CN': `${baseUrl}/zh/stack/`,
          'x-default': `${baseUrl}/stack/`,
        },
      },
    },
    {
      url: `${baseUrl}/zh/stack/`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/stack/`,
          'zh-CN': `${baseUrl}/zh/stack/`,
          'x-default': `${baseUrl}/stack/`,
        },
      },
    },
  ];
}
