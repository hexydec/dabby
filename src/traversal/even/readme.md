# $.fn.even()

Reduce the collection to the elements at even indices (0, 2, 4, ...). Indices
are zero-based, so the first matched element is always included.

## Signatures

```ts
even(): this;
```

## Parameters

None.

## Returns

A new Dabby collection containing the elements at indices 0, 2, 4 and so on.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/even/even";

// Apply a zebra pattern to a table
$("table tbody tr").even().addClass("row-even");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/even/even";

// Highlight the 1st, 3rd, 5th... item in a list
$(".item").even().addClass("highlighted");
```

## See also

- [$.fn.odd()](../odd/readme.md)
- [$.fn.eq()](../eq/readme.md)
- [$.fn.filter()](../filter/readme.md)
- [$.fn.slice()](../slice/readme.md)
