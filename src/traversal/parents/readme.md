# $.fn.parent() / $.fn.parents() / $.fn.parentsUntil()

Walk upwards through the ancestor chain of every item in the collection. Three
related methods: a single step (`parent`), all the way to the document
(`parents`), or stopping at a boundary selector (`parentsUntil`).

## Signatures

```ts
parent(selector?: Selector): this;
parents(selector?: Selector): this;
parentsUntil(selector: Selector, filter?: Selector): this;
```

## Parameters

- `selector` (`Selector`, optional on `parent`/`parents`) — a CSS selector
  that filters the collected ancestors.
- For `parentsUntil`:
  - `selector` (`Selector`, **required**) — the boundary; iteration stops at the first ancestor that matches.
  - `filter` (`Selector`, optional) — narrows the collected ancestors.

## Returns

A new Dabby collection of ancestor elements.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/parents/parents";

// The immediate parent
$("a.external").parent();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/parents/parents";

// Every ancestor that is a section
$(".callout").parents("section");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/parents/parents";

// Walk up only as far as the article boundary
$(".callout").parentsUntil("article");
```

## See also

- [$.fn.closest()](../closest/readme.md) — nearest matching ancestor
- [$.fn.children()](../children/readme.md)
- [$.fn.siblings()](../siblings/readme.md)
