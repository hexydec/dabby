# $.fn.next() / $.fn.nextAll() / $.fn.nextUntil() / $.fn.prev() / $.fn.prevAll() / $.fn.prevUntil()

Walk forwards or backwards through the immediate sibling chain of every item
in the collection. The six methods share the same shape, differing only in
direction (`next` vs `prev`) and how far they walk (one step, all the way, or
until a boundary).

## Signatures

```ts
next(selector?: Selector): this;
nextAll(selector?: Selector): this;
nextUntil(selector: Selector, filter?: Selector): this;
prev(selector?: Selector): this;
prevAll(selector?: Selector): this;
prevUntil(selector: Selector, filter?: Selector): this;
```

## Parameters

- `selector` (`Selector`, optional on `next`/`nextAll`/`prev`/`prevAll`) — a
  CSS selector that filters the collected siblings.
- For `nextUntil` / `prevUntil`:
  - `selector` (`Selector`, **required**) — the boundary; iteration stops at the first sibling that matches.
  - `filter` (`Selector`, optional) — narrows the collected siblings.

## Returns

A new Dabby collection of sibling elements gathered in document order.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/next-prev/next-prev";

// Highlight whatever directly follows the active item
$("li.active").next().addClass("up-next");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/next-prev/next-prev";

// All paragraphs after a section heading, until the next heading
$("h2").nextUntil("h2", "p");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/next-prev/next-prev";

// Every previous form group, regardless of selector
$(".form-group.error").prevAll(".form-group");
```

## See also

- [$.fn.siblings()](../siblings/readme.md)
- [$.fn.parents()](../parents/readme.md)
- [$.fn.children()](../children/readme.md)
