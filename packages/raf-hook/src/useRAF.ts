import { useLayoutEffect } from 'react';

type Render = (ts: DOMHighResTimeStamp) => void;

export function useRAF(render: Render, active = true, fps = 60) {
  const interval = 1000 / fps;
  let id = 0;
  let then = 0;

  const callback = (now: DOMHighResTimeStamp) => {
    const delta = now - then;

    if (delta > interval) {
      then = now - (delta % interval);
      render(now);
    }

    window.requestAnimationFrame(callback);
  };

  useLayoutEffect(() => {
    if (active) {
      id = window.requestAnimationFrame(callback);

      return () => {
        window.cancelAnimationFrame(id);
      };
    }
  }, [render, active]);

  return id;
}
