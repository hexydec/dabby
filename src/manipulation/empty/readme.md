# $.fn.empty()

Remove every child node from each element in the collection. Leaves the
elements themselves in place.

## Signatures

```ts
empty(): this;
```

## Parameters

None.

## Returns

The original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/empty/empty";

// Clear a list before re-rendering
$("#results").empty();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/empty/empty";

// Empty multiple containers in one go
$(".panel").empty().append("<p>No data.</p>");
```

## See also

- [$.fn.html()](../html/readme.md)
- [$.fn.remove()](../remove/readme.md)
- [$.fn.detach()](../remove/readme.md)
