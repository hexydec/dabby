# $.fn.remove([selector]) / $.fn.detach([selector])

Remove elements from the DOM. The two methods differ only in what they do
with the data and events bound to the removed nodes:

- **`remove`** — also unbinds events, clearing memory.
- **`detach`** — keeps data and events intact, ready to be re-inserted later.

Both accept an optional selector to filter which elements in the collection
get removed.

## Signatures

```ts
remove(selector?: Selector): this;
detach(selector?: Selector): this;
```

## Parameters

- `selector` (`Selector`, optional) — if supplied, only elements that match
  are removed; the others stay in place.

## Returns

The original Dabby collection for chaining (with the removed elements still
referenced by it, so you can re-insert them later).

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/remove/remove";

// Remove every error message
$(".error").remove();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/remove/remove";

// Filter inside the collection — drop only items marked complete
$("li.task").remove(".complete");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/remove/remove";

// detach — re-insert later with handlers intact
const $widget = $("#widget").detach();
$("#sidebar").append($widget);
```

## See also

- [$.fn.empty()](../empty/readme.md) — remove children, keep the element
- [$.fn.clone()](../clone/readme.md)
- [$.fn.replaceWith()](../replace/readme.md)
