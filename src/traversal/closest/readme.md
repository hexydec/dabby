# $.fn.closest(selector, context?)

For each element in the collection, find the first matching ancestor by
walking upwards through the parent chain. The search begins with the element
itself, so an element that matches `selector` will be returned as its own
closest ancestor.

## Signatures

```ts
closest(selector: Selector, context?: Selector): this;
```

## Parameters

- `selector` (`Selector`) — the selector used to identify the target ancestor.
- `context` (`Selector`, optional) — scopes the search; only ancestors within
  the supplied context are considered.

## Returns

A new Dabby collection containing the matched ancestors. If no ancestor
matches for a given element, that element contributes nothing to the result.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/closest/closest";

// Remove the list item that owns the clicked delete button
$(".list").on("click", ".delete-button", function () {
    $(this).closest(".list-item").remove();
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/closest/closest";

// Find the form that contains an input
const $form = $("input[name='email']").closest("form");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/closest/closest";

// Toggle the surrounding accordion section
$(".accordion-header").on("click", function () {
    $(this).closest(".accordion-section").toggleClass("expanded");
});
```

## See also

- [$.fn.parent()](../parents/readme.md)
- [$.fn.parents()](../parents/readme.md)
- [$.fn.find()](../find/readme.md)
