# $.fn.slice(start [, end])

Reduce the collection to a contiguous subset, mirroring `Array.prototype.slice`.

## Signatures

```ts
slice(start: number, end?: number): this;
```

## Parameters

- `start` (`number`) — zero-based start index, or a negative offset from the end.
- `end` (`number`, optional) — exclusive end index, or a negative offset from
  the end. If omitted, the slice runs to the end.

## Returns

A new Dabby collection containing the sliced elements in their original order.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/slice/slice";

// First three list items
$("li").slice(0, 3);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/slice/slice";

// Last two rows of a table
$("table tr").slice(-2);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/slice/slice";

// Page 3 of a paged list (10 items per page)
$(".item").slice(20, 30);
```

## See also

- [$.fn.eq()](../eq/readme.md)
- [$.fn.first()](../first/readme.md)
- [$.fn.last()](../last/readme.md)
