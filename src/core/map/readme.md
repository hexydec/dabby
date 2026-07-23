# $.fn.map(callback)

Run a callback over every node in the collection and gather the returned values into a new Dabby collection. `.map()` is defined directly on the `Dabby` class, so it is always available — this module exists purely as a stub re-export for builds that import individual methods.

For the canonical documentation see [core/dabby/readme.md](../dabby/readme.md).

## Signatures

```ts
map<T extends DOMNode = DOMNode>(
    callback: (this: T, index: number, element: T) => Selector
): Dabby;
```

## Parameters

- **`callback`** — function called with `(index, element)`. `this` is bound to the current node. May return a single node, an array of nodes, or another Dabby collection; the results are merged.

## Returns

A new Dabby collection containing the mapped nodes.

## Examples

```ts
import $ from "dabbyjs";

// Project each panel down to its first child
const $headers = $(".panel").map(function () {
    return this.firstElementChild as Element;
});
```

```ts
// Collect a flat collection from a nested query
const $allLinks = $("nav").map(function () {
    return this.querySelectorAll("a");
});
```

## Differences to jQuery

jQuery's `.map()` returns a wrapped collection of the callback's return values (which may be primitives). Dabby's `.map()` only deals in DOM nodes — to build an array of strings or numbers from a collection use `.get()` and `Array.prototype.map`, or write a `for...of` loop.

## See also

- [Dabby class](../dabby/readme.md)
- [`.each()`](../each/readme.md)
- [`.add()`](../../traversal/add/readme.md)
