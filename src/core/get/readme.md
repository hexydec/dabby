# $.fn.get(index?)

Retrieve raw DOM nodes from a Dabby collection. With no argument the entire collection is returned as a plain array; with an index the single node at that position is returned. `.get()` is defined directly on the `Dabby` class, so it is always available — this module exists purely as a stub re-export for builds that import individual methods.

For the canonical documentation see [core/dabby/readme.md](../dabby/readme.md).

## Signatures

```ts
get(): DOMNode[];
get(index: number): DOMNode | undefined;
```

## Parameters

- **`index`** — optional zero-based index. Negative values count from the end of the collection (`-1` returns the last node).

## Returns

The matched node, `undefined` if `index` is out of range, or the full array of nodes when called without arguments.

## Examples

```ts
import $ from "dabbyjs";

// Whole collection as a plain array
const items = $(".item").get();

// First and last
const first = $(".item").get(0);
const last = $(".item").get(-1);
```

```ts
// Hand a node to a native API
const canvas = $("canvas").get(0);
canvas?.getContext("2d")?.fillRect(0, 0, 100, 100);

// Use Array methods on the result
const externalLinks = $("a").get().filter(
    (a) => (a as HTMLAnchorElement).hostname !== location.hostname
);
```

## See also

- [Dabby class](../dabby/readme.md)
- [`.each()`](../each/readme.md)
- [`.eq()`](../../traversal/eq/readme.md)
