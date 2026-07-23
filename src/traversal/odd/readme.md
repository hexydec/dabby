# $.fn.odd()

Reduce the collection to the elements at odd indices (1, 3, 5, …). Indices
are zero-based, so the first matched element is **not** included.

## Signatures

```ts
odd(): this;
```

## Parameters

None.

## Returns

A new Dabby collection containing the elements at indices 1, 3, 5 and so on.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/odd/odd";

// Apply a zebra pattern to a table
$("table tbody tr").odd().addClass("row-odd");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/odd/odd";

// Highlight the 2nd, 4th, 6th… item in a list
$(".item").odd().addClass("highlighted");
```

## See also

- [$.fn.even()](../even/readme.md)
- [$.fn.eq()](../eq/readme.md)
- [$.fn.filter()](../filter/readme.md)
- [$.fn.slice()](../slice/readme.md)
