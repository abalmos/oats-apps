import { useEffect } from 'react';

export function useRAF(render: (ts: DOMHighResTimeStamp) => void, fps = 60) {
  const interval = 1000 / fps;
  let id = 0;
  let then = 0;

  useEffect(() => {
    function loop(now: DOMHighResTimeStamp) {
      const delta = now - then;

      if (delta > interval) {
        then = now - (delta % interval);
        render(now);
      }

      id = window.requestAnimationFrame(loop);
    }

    id = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(id);
    };
  }, []);

  return () => {
    window.cancelAnimationFrame(id);
  };
}
