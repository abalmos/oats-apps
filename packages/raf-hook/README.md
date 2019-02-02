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

export function MyRenderComponent({ active, fps }) {
  const id = useRAF(
    () => {
      /*
        Runs at `fps` frames per second when `active` == true
      */
    },
    active,
    fps
  );
}
```
