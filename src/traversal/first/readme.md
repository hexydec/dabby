# $.fn.first()

Reduce the collection to its first element. Equivalent to `eq(0)`, but slightly
faster and more readable when you only want the head of the collection.

## Signatures

```ts
first(): this;
```

## Parameters

None.

## Returns

A new Dabby collection containing only the first element. If the original
collection is empty, the returned collection is also empty.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/first/first";

// Highlight the first item in a list
$("li").first().addClass("first");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/first/first";

// Read the value of the first input that matches
const initial = $("input.editable").first().val();
```

## See also

- [$.fn.last()](../last/readme.md)
- [$.fn.eq()](../eq/readme.md)
- [$.fn.slice()](../slice/readme.md)
