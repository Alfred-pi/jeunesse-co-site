// Outils d'animation partagés par la page Altitude et ses composants (GSAP chargé à la demande).
import type { gsap as GsapType } from 'gsap';

type Gsap = typeof GsapType;

export const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Départ ScrollTrigger « quand on le voit » : l'animation démarre quand l'élément est entièrement
 * à l'écran s'il y tient (bas à 92 % de la hauteur), sinon quand il remplit déjà l'essentiel de
 * l'écran (haut à 25 %). Fonction : recalculée à chaque rafraîchissement (rotation, redimension).
 * clamp() : un élément en fin de page, dont le bas ne peut pas monter jusqu'à 92 %, se déclenche quand même.
 */
export const seenStart = (el: Element) => () => {
  const h = el.getBoundingClientRect().height;
  return h <= window.innerHeight * 0.8 ? 'clamp(bottom 92%)' : 'clamp(top 25%)';
};

/** Même règle pour ScrollTrigger.batch, dont le départ fonctionnel reçoit l'instance ScrollTrigger. */
export const seenStartSelf = (self: { trigger?: Element | null }) =>
  self.trigger ? seenStart(self.trigger)() : 'clamp(top 75%)';

const STROKES = 'path, circle, rect, line, polyline, polygon, ellipse';

/**
 * Prépare une icône au trait : pastille cachée, traits masqués.
 * Les longueurs sont mesurées (getTotalLength) au lieu de pathLength : aucun point parasite
 * aux extrémités avant le tracé (bouts arrondis d'un tiret de longueur nulle), même rendu partout.
 * À appeler seulement quand l'animation va jouer : sans JS, l'icône reste visible.
 */
export const prepareIcon = (gsap: Gsap, icon: Element) => {
  const strokes = Array.from(icon.querySelectorAll<SVGGeometryElement>(STROKES));
  const lens = strokes.map((s) => {
    s.removeAttribute('pathLength');
    try {
      return s.getTotalLength();
    } catch {
      return 0;
    }
  });
  strokes.forEach((s, i) => {
    if (!lens[i]) return;
    // Trou plus long que le trait : décalé de len + 2, le tiret est entièrement hors du tracé.
    s.style.strokeDasharray = `${lens[i]} ${lens[i] + 4}`;
    s.style.strokeDashoffset = `${lens[i] + 2}`;
  });
  gsap.set(icon, { scale: 0.4, rotate: -12, opacity: 0 });
  return strokes.filter((_, i) => lens[i]);
};

/**
 * Icône qui rebondit puis se dessine. Retourne la timeline (à placer où l'on veut).
 * À la fin, les styles de tirets sont retirés : le trait final est net, jonctions comprises.
 */
export const popDrawIcon = (gsap: Gsap, icon: Element, strokes: SVGGeometryElement[], delay = 0) =>
  gsap
    .timeline({ delay })
    .to(icon, { scale: 1, rotate: 0, opacity: 1, duration: 0.75, ease: 'back.out(2.6)' })
    .to(strokes, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.out', stagger: 0.08 }, 0.12)
    .add(() => {
      strokes.forEach((s) => {
        s.style.strokeDasharray = '';
        s.style.strokeDashoffset = '';
      });
    });
