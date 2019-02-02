# raf-hook

A React hook for `requestAnimationFrame()`.

### Installation

```
$ yarn add raf-hook
```

or

```
$ npm install --save raf-hook
```

### Import

```javascript
import { useRAF } from 'raf-hook';
```

### Example usage

```jsx
import React from 'react';
import { useRAF } from 'raf-hook';

export function MyRenderComponent({ active, fps }) {
  const reqId = useRAF(
    (ts) => {
      /*
        Runs at `fps` frames per second when `active` == true.

        ts is the frame timestamp from requestAnimationFrame
      */
    },
    active,
    fps
  );

  return (
    <div>
      The request id is <strong>{reqId}</strong>. It may be used with
      <code>window.cancelAnimationFrame</code> to cancel the request. This shouldn't
      be needed. The hook properly manages the requests based on the component's
      life cycle.
    </div>
  );
}
```
