# Jeunesse & Co

> Site vitrine pour association d'accompagnement social des jeunes à Genève.

## Stack

- Astro 5 + CSS custom
- Deux configs Astro selon l'environnement

## Commandes

- `npm run dev` — Dev server (base: /jeunesse-co-site/)
- `npm run build` — Build TEST (GitHub Pages)
- `DEPLOY_ENV=production npm run build` — Build PROD (jeunesseandco.ch)

## Deploy

- **Repo**: github.com/Alfred-pi/jeunesse-co-site
- **Git remote**: `alfred` (pas origin)
- **TEST**: https://alfred-pi.github.io/jeunesse-co-site
- **PROD**: https://jeunesseandco.ch

### ⚠️ CI/CD Pipeline (ATTENTION)

GitHub Actions auto-deploy sur push to `master`:
- `.github/workflows/deploy.yml`
- Build avec `DEPLOY_ENV=production` → deploy via GitHub Pages
- **Tout push sur master = deploy en PROD automatique**
- Tester sur une branche avant de merge

### Config différente TEST vs PROD

- `astro.config.mjs` — Détecte `DEPLOY_ENV` pour switch base path
- `astro.config.prod.mjs` — Config prod explicite (site: jeunesseandco.ch, base: /)
- TEST: base = `/jeunesse-co-site/`
- PROD: base = `/`

## Key files

- `src/pages/` — Pages du site
- `src/layouts/` — Layout principal
- `src/components/` — Composants réutilisables

## Never

- Push directement sur master sans tester (CI/CD = deploy auto PROD)
- Changer astro.config sans comprendre le dual-env setup
