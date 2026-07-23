# $.each(obj, callback)

Iterate over the keys of an array-like or plain object, calling a callback
for each entry.

Arrays (and array-likes with a numeric `length`) are iterated in index order;
plain objects in `Object.keys` order. Returning `false` from the callback
breaks the loop early.

## Signatures

```ts
each<T>(
    obj: ArrayLike<T> | Record<string, T>,
    callback: (this: T, key: number | string, value: T) => void | false,
): ArrayLike<T> | Record<string, T>;
```

## Parameters

- `obj` (`ArrayLike<T> | Record<string, T>`) — the collection to iterate.
- `callback` — invoked once per entry. Bound (`this`) to the value, with
  `(key, value)` as arguments. Returning `false` stops iteration.

## Returns

The original `obj` for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/each/each";

// Iterate over an array
$.each(["red", "green", "blue"], (i, colour) => {
    console.log(i, colour);
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/each/each";

// Iterate over an object
$.each({ name: "Ada", age: 36 }, (key, value) => {
    console.log(key, value);
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/each/each";

// Break out early — return false
$.each([1, 2, 3, 4], (i, n) => {
    if (n > 2) return false;
    console.log(n);
});
```

## Notes

For iterating a Dabby collection, prefer the instance-level `$.fn.each()`,
which is part of the core class and always available.

## See also

- [Dabby class — `each`](../../core/dabby/readme.md)
- [$.map()](../map/readme.md)
