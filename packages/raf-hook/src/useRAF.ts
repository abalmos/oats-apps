import { useLayoutEffect } from 'react';

type Render = (ts: DOMHighResTimeStamp) => void;

export function useRAF(render: Render, active = true, fps = 60) {
  const interval = 1000 / fps;
  let id = 0;
  let then = 0;

  useLayoutEffect(() => {
    if (active) {
      id = window.requestAnimationFrame((now) => {
        const delta = now - then;

        if (delta > interval) {
          then = now - (delta % interval);
          render(now);
        }
      });
    }

    return () => {
      window.cancelAnimationFrame(id);
    };
  }, [render, active]);

  return id;
}
