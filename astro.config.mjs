import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://vaidyavrindavanam.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap({
      serialize(item) {
        const url = item.url;
        // Blog posts and conditions change most frequently — use today's build date
        if (url.includes('/blog/') || url.includes('/conditions/')) {
          return { ...item, lastmod: new Date().toISOString().split('T')[0] };
        }
        // Treatment and package pages — updated May 2026
        if (url.includes('/treatments/') || url.includes('/packages/') || url.includes('/karkidaka-chikitsa/')) {
          return { ...item, lastmod: '2026-05-20' };
        }
        // Core static pages (homepage, about, contact, listing pages)
        return { ...item, lastmod: '2026-04-24' };
      },
    }),
  ],
});
