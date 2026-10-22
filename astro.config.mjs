import { defineConfig } from 'astro/config';

// Auto-détection environnement :
// - DEPLOY_ENV=production → domaine custom (jeunesseandco.ch)
// - Sinon → GitHub Pages preview (alfred-pi.github.io/jeunesse-co-site)
// La CI calcule DEPLOY_ENV selon le repo (voir .github/workflows/deploy.yml)
const isProd = process.env.DEPLOY_ENV === 'production';

export default defineConfig({
  site: isProd ? 'https://jeunesseandco.ch' : 'https://alfred-pi.github.io',
  base: isProd ? '/' : '/jeunesse-co-site/',
  compressHTML: true,
  image: { service: { config: { quality: 90 } } },
  build: { inlineStylesheets: 'auto' },
  // Vite 8 (Astro 7) : rolldown n'accepte plus manualChunks sous forme d'objet,
  // et esbuild n'est plus fourni : minification par défaut (oxc).
  vite: { build: { minify: true, cssMinify: true, rollupOptions: { output: { manualChunks: (id) => (/[\\/]node_modules[\\/]gsap[\\/]/.test(id) ? 'gsap' : undefined) } } } }
});
