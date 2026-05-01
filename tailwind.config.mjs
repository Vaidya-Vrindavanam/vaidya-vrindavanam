/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        // Surfaces sit in the forest-green hue (~140°) at low chroma; text neutrals
        // tint toward the antique-gold hue (~80°) so accents and prose feel related.
        // Keep these in sync with :root in src/styles/global.css.
        brand: {
          bg: 'oklch(0.20 0.028 140)',
          'bg-alt': 'oklch(0.24 0.028 140)',
          'bg-footer': 'oklch(0.13 0.022 140)',
          gold: 'oklch(0.74 0.085 80)',
          'gold-dim': 'oklch(0.74 0.085 80 / 0.15)',
          'gold-border': 'oklch(0.74 0.085 80 / 0.20)',
          whatsapp: '#25D366',
        },
        text: {
          primary: 'oklch(0.90 0.025 85)',
          secondary: 'oklch(0.78 0.025 80)', // lifted to ≥7:1 on bg (was #a09080 ≈5.6:1)
          muted: 'oklch(0.62 0.020 80)',
          subtle: 'oklch(0.62 0.020 80)',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter Variable', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
