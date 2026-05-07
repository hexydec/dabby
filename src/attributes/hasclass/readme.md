# $.fn.hasClass()

Determine whether any node in the collection has the requested class. Returns as soon as a match is found.

## Signatures

```ts
hasClass(cls: string): boolean;
```

## Parameters

- `cls` (`string`) — the class name to test for.

## Returns

`true` when any node in the collection has the class, otherwise `false`.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/hasclass/hasclass";

// Test whether any element matches
const isDark = $("body").hasClass("dark-mode");
```

```ts
// Test a specific element
const $card = $(".card").eq(1);
if ($card.hasClass("card--featured")) {
    $card.addClass("card--highlighted");
}
```

```ts
// Conditional behaviour
$(".menu-button").on("click", () => {
    const $nav = $(".navigation");
    if ($nav.hasClass("navigation--open")) {
        $nav.removeClass("navigation--open");
    } else {
        $nav.addClass("navigation--open");
    }
});
```

## See also

- [$.fn.addClass(), $.fn.removeClass(), $.fn.toggleClass()](../class/readme.md) — modify the class list.
- [$.fn.attr()](../attr/readme.md) — read the `class` attribute as a string.
