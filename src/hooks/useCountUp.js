import { useEffect, useState } from 'react';

/** Counts 1 -> target with an ease-out cubic curve once `run` becomes true. */
export default function useCountUp(target, run, duration = 2000) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return undefined;
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(p < 1 ? Math.floor(1 + (target - 1) * ease) : target);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, target, duration]);
  return value;
}
