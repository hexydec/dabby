# $.map(obj, callback)

Translate every entry in an array or plain object into a new flat array.

The callback is invoked with `window` as `this`, mirroring jQuery's static
`$.map`. Returning an array spreads its values into the result; returning
`null` or `undefined` filters the entry out.

## Signatures

```ts
map<T, R>(
    obj: Record<string, T> | T[],
    callback: (this: Window, value: T, key: number | string) => R | R[] | null | undefined,
): R[];
```

## Parameters

- `obj` (`Record<string, T> | T[]`) — the array or plain object to map over.
- `callback` — invoked once per entry, with `(value, key)`. Bound (`this`) to
  `window`. Return any value, an array, or `null`/`undefined` to skip.

## Returns

A new flat array of the callback's non-nullish results. Nested arrays are
flattened by one level (not recursively).

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/map/map";

// Double every number
const doubled = $.map([1, 2, 3], (n) => n * 2);
// [2, 4, 6]
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/map/map";

// Filter out empty strings
const nonEmpty = $.map({ a: "x", b: "", c: "y" }, (v) => v || null);
// ["x", "y"]
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/map/map";

// Flatten one level — array returns are spread
const pairs = $.map([1, 2, 3], (n) => [n, n * 10]);
// [1, 10, 2, 20, 3, 30]
```

## Notes

For mapping a Dabby collection of nodes, prefer the instance-level
`$.fn.map()`, which lives on the core class and returns a Dabby collection.

## See also

- [Dabby class — `map`](../../core/dabby/readme.md)
- [$.each()](../each/readme.md)
