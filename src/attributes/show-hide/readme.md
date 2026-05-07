# $.fn.show() / $.fn.hide() / $.fn.toggle()

Show, hide or toggle the visibility of every element in the collection by
modifying the inline `display` style.

The implementation remembers each element's previous `display` value so
calling `show()` after `hide()` restores the original — even if it was
something other than `block`.

## Signatures

```ts
show(): this;
hide(): this;
toggle(show?: boolean): this;
```

## Parameters

- For `toggle`:
  - `show` (`boolean`, optional) — when `true`, force-show; when `false`,
    force-hide. Omit to toggle based on current state.

## Returns

The original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/show-hide/show-hide";

// Hide the loading spinner
$(".loading").hide();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/show-hide/show-hide";

// Reveal a panel
$("#confirm-dialog").show();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/show-hide/show-hide";

// Toggle on a click
$(".menu-trigger").on("click", () => {
    $(".menu").toggle();
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/show-hide/show-hide";

// Toggle with explicit state, e.g. driven by a checkbox
$("#advanced").on("change", function () {
    $(".advanced-options").toggle((this as HTMLInputElement).checked);
});
```

## Notes

These methods modify the inline `display` style only. CSS rules with higher
specificity (or `!important`) may override the result. For animation, prefer
CSS transitions on a class you toggle with [`addClass`](../class/readme.md).

## See also

- [$.fn.addClass() / .removeClass() / .toggleClass()](../class/readme.md)
- [$.fn.css()](../css/readme.md)
