/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0f1a0a',
          'bg-alt': '#162210',
          'bg-footer': '#080e05',
          gold: '#c8a96e',
          'gold-dim': 'rgba(200,169,110,0.15)',
          'gold-border': 'rgba(200,169,110,0.2)',
          whatsapp: '#25D366',
        },
        text: {
          primary: '#e8e0d0',
          secondary: '#a09080',
          muted: '#8b8070',
          subtle: '#6b6050',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
