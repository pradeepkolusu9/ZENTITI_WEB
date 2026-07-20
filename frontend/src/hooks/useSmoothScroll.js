import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      // 1.0s made every wheel gesture feel sluggish — quick/repeated scrolling
      // restarts the ease toward a new target each time, so a full second per
      // gesture compounds into a very "delayed" feel. 0.7 keeps the smoothing
      // without the lag.
      duration: 0.7,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Lenis owns scroll position every frame — code elsewhere (e.g. Navbar's
    // section links) must drive scrolling through this instance, since a
    // native scrollIntoView()/window.scrollTo() gets overwritten on the next tick.
    window.__zentitiLenis = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.__zentitiLenis = null;
      lenis.destroy();
    };
  }, []);
};
