# $.fn.eq(index)

Reduce the collection to the single element at the given index. Negative
indices count back from the end of the collection.

## Signatures

```ts
eq(index: number): this;
```

## Parameters

- `index` (`number`) — the zero-based index of the element to select. A
  negative value selects from the end of the collection (e.g. `-1` is the
  last element).

## Returns

A new Dabby collection containing the single element at the requested index.
If the index is out of range, the returned collection is empty.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/eq/eq";

// Highlight the third list item
$("li").eq(2).addClass("highlighted");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/eq/eq";

// Select the last row of a table
const $lastRow = $("table tr").eq(-1);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/eq/eq";

// Simple carousel — show the slide for the active dot
$(".carousel-dot").on("click", function () {
    const index = $(".carousel-dot").index(this);
    $(".slide").hide().eq(index).show();
});
```

## See also

- [$.fn.first()](../first/readme.md)
- [$.fn.last()](../last/readme.md)
- [$.fn.slice()](../slice/readme.md)
- [$.fn.index()](../index/readme.md)
