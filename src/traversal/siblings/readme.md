# $.fn.siblings([selector])

Get the siblings of every item in the collection. The element itself is always
excluded from the result.

## Signatures

```ts
siblings(selector?: Selector): this;
```

## Parameters

- `selector` (`Selector`, optional) — a CSS selector that filters the collected
  siblings; if omitted, all siblings are returned.

## Returns

A new Dabby collection of sibling elements (excluding the originals).

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/siblings/siblings";

// Reset siblings of the active tab
$(".tab.active").siblings().removeClass("active");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/siblings/siblings";

// Only sibling list items that are still incomplete
$("li.complete").siblings(".incomplete");
```

## See also

- [$.fn.next()](../next-prev/readme.md)
- [$.fn.prev()](../next-prev/readme.md)
- [$.fn.parent()](../parents/readme.md)
