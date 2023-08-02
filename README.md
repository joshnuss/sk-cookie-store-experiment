SvelteKit Cookie Store
----------------------

Experiment to build a Svelte cookie store.

## Features

- Isomorphic. It works server-side and client-side.
- Supports SSR (unlike local storage based stores).
- Supports any object that can be converted to JSON.

## Example

```javascript
import { persisted } from '$lib/cookieStore'

const store = persisted('my-cookie-name', initialValue)
```

## License

MIT
