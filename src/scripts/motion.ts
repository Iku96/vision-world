// GSAP scroll motion. Loaded on demand by ScrollMotion.astro, only when motion is allowed
// and the page has something to animate. Transforms and opacity only, so no layout shift.
// - reveals: blocks below the fold fade and rise in, card grids one after another
// - [data-route]: orange route lines draw with the scroll and each [data-step] lights up when reached
// - [data-parallax]: gentle depth on large images, desktop only
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DESKTOP = '(min-width: 64rem)';

export function initReveals(all: HTMLElement[]) {
  // Skip anything scrolled into view while GSAP was loading, so nothing disappears once seen.
  const targets = all.filter((el) => el.getBoundingClientRect().top >= innerHeight);
  if (!targets.length) return;
  gsap.set(targets, { opacity: 0, y: 24 });
  ScrollTrigger.batch(targets, {
    start: 'top 92%',
    once: true,
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
        stagger: 0.08,
        overwrite: true,
        clearProps: 'opacity,transform',
      }),
  });
}

export function initRoutes() {
  const mm = gsap.matchMedia();
  for (const route of document.querySelectorAll<HTMLElement>('[data-route]')) {
    const steps = [...route.querySelectorAll<HTMLElement>('[data-step]')];
    const lines = [...route.querySelectorAll<HTMLElement>('[data-route-line]')];
    if (!steps.length) continue;

    // data-route="responsive": vertical on phones, a horizontal row from lg up.
    // (gsap.matchMedia only runs the callback when a condition matches, so both cases are listed.)
    const conditions =
      route.dataset.route === 'responsive' ? { horizontal: DESKTOP, vertical: `not all and ${DESKTOP}` } : { vertical: 'all' };
    mm.add(conditions, (ctx) => {
      const horizontal = ctx.conditions?.horizontal;
      const tl = gsap.timeline({
        defaults: { ease: 'none', duration: 1 },
        scrollTrigger: {
          trigger: route,
          // Vertical: the line tip follows a point 65% down the screen.
          // Horizontal: the whole row draws over a short scroll while it is in view.
          start: horizontal ? 'top 80%' : 'top 65%',
          end: horizontal ? 'top 35%' : 'bottom 65%',
          scrub: 0.4,
          onUpdate: (self) => {
            const reached = self.progress * lines.length;
            steps.forEach((step, i) => step.classList.toggle('is-reached', self.progress > 0 && reached >= i - 0.02));
          },
          onLeaveBack: () => steps.forEach((step) => step.classList.remove('is-reached')),
        },
      });
      for (const line of lines) {
        tl.fromTo(
          line,
          horizontal ? { scaleX: 0, transformOrigin: 'left center' } : { scaleY: 0, transformOrigin: 'center top' },
          horizontal ? { scaleX: 1 } : { scaleY: 1 },
        );
      }
      return () => steps.forEach((step) => step.classList.remove('is-reached'));
    });
  }
}

export function initParallax() {
  // Only real photos: a placeholder would have its label cropped by the enlargement.
  const layers = [...document.querySelectorAll<HTMLElement>('[data-parallax]')].filter((el) => el.querySelector('img'));
  if (!layers.length) return;
  gsap.matchMedia().add(DESKTOP, () => {
    for (const layer of layers) {
      const frame = layer.parentElement!;
      if (layer.dataset.parallax === 'hero') {
        // The hero photo drifts down at a quarter of the scroll speed as the hero scrolls away.
        gsap.to(layer, {
          y: () => frame.offsetHeight * 0.25,
          ease: 'none',
          scrollTrigger: { trigger: frame, start: 'top top', end: 'bottom top', scrub: true, invalidateOnRefresh: true },
        });
      } else {
        // Section photos: slightly enlarged inside a clipped frame, so they can drift without gaps.
        gsap.fromTo(
          layer,
          { scale: 1.12, yPercent: -4 },
          {
            yPercent: 4,
            ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      }
    }
  });
}
