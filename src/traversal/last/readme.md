# $.fn.last()

Reduce the collection to its last element. Equivalent to `eq(-1)`.

## Signatures

```ts
last(): this;
```

## Parameters

None.

## Returns

A new Dabby collection containing only the last element. If the original
collection is empty, the returned collection is also empty.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/last/last";

// Style the final list item differently
$("li").last().addClass("final");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/last/last";

// Append a separator after the last paragraph in an article
$("article p").last().after("<hr>");
```

## See also

- [$.fn.first()](../first/readme.md)
- [$.fn.eq()](../eq/readme.md)
- [$.fn.slice()](../slice/readme.md)
