import { defineConfig } from 'astro/config';
export default defineConfig({
  site: 'https://alfred-pi.github.io',
  base: '/jeunesse-co-site',
  compressHTML: true,
  image: { service: { config: { quality: 90 } } },
  build: { inlineStylesheets: 'auto' },
  vite: { build: { minify: 'esbuild', cssMinify: true, rollupOptions: { output: { manualChunks: { gsap: ['gsap', 'gsap/ScrollTrigger'] } } } } }
});
