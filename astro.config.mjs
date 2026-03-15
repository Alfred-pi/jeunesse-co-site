import { defineConfig } from 'astro/config';

// Auto-détection environnement :
// - CI=true + DEPLOY_ENV=production → domaine custom (jeunesseandco.ch)
// - Sinon → GitHub Pages preview (alfred-pi.github.io/jeunesse-co-site)
const isProd = process.env.DEPLOY_ENV === 'production';

export default defineConfig({
  site: isProd ? 'https://jeunesseandco.ch' : 'https://alfred-pi.github.io',
  base: isProd ? '/' : '/jeunesse-co-site/',
  compressHTML: true,
  image: { service: { config: { quality: 90 } } },
  build: { inlineStylesheets: 'auto' },
  vite: { build: { minify: 'esbuild', cssMinify: true, rollupOptions: { output: { manualChunks: { gsap: ['gsap', 'gsap/ScrollTrigger'] } } } } }
});
