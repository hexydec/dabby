# $.fn.index([selector])

Return the position of an element relative to a set of siblings or another
collection. Returns `-1` if no match is found.

## Signatures

```ts
index(selector?: Selector): number;
```

## Parameters

- `selector` (`Selector`, optional) — controls what the position is measured against:
  - **omitted** — the position of the first element among its parent's children.
  - **CSS string** — the position of the first element among the matched set.
  - **node or Dabby collection** — the position of that node within the current collection.

## Returns

The zero-based position, or `-1` if no match is found.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/index/index";

// Position of the active list item among its siblings
const position = $("li.active").index();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/index/index";

// Carousel: which dot was clicked?
$(".carousel-dot").on("click", function () {
    const i = $(".carousel-dot").index(this);
    showSlide(i);
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/index/index";

// Find the active item's position within a filtered set
const i = $("li").index("li.active");
```

## See also

- [$.fn.eq()](../eq/readme.md)
- [$.fn.first()](../first/readme.md)
- [$.fn.last()](../last/readme.md)
