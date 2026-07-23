# $.fn.addClass(), $.fn.removeClass(), $.fn.toggleClass()

Add, remove or toggle one or more classes on every node in a collection. All three methods accept the same value forms — a single class name, a space-separated string, an array of class names, or a callback returning any of those.

`toggleClass()` accepts an optional second argument that forces the toggle on (`true`, equivalent to `addClass()`) or off (`false`, equivalent to `removeClass()`).

## Signatures

```ts
addClass(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): this;
removeClass(cls?: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[])): this;
toggleClass(cls: string | string[] | ((this: Element, index: number, currentClass: string) => string | string[]), state?: boolean): this;
```

## Parameters

- `cls` (`string | string[] | function`) — the class or classes to add, remove or toggle. A string can contain multiple class names separated by spaces. A callback receives `(index, currentClass)` and `this` set to the current element; it should return a string or an array of class names.
- `state` (`boolean`, `toggleClass` only) — when `true` the classes are forced on, when `false` they are forced off. Omit to flip each class to the opposite of its current state.

## Returns

The original Dabby collection.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/class/class";

// Add a single class
$(".card").addClass("card--active");

// Add several classes from an array
$(".card").addClass(["card--active", "card--highlighted"]);
```

```ts
// Remove a class
$(".product-item").removeClass("product-item--selected");

// Remove several classes via a space-separated string
$(".alert").removeClass("alert--error alert--warning");
```

```ts
// Toggle a class on click
$(".menu-button").on("click", () => {
    $(".navigation").toggleClass("navigation--open");
});

// Force a specific state
$(".panel").toggleClass("panel--expanded", true);
```

```ts
// Derive class names from the index
$(".list-item").addClass(function (index) {
    return index % 2 === 0 ? "list-item--even" : "list-item--odd";
});
```

## See also

- [$.fn.hasClass()](../hasclass/readme.md) — test whether any node carries a given class.
- [$.fn.attr()](../attr/readme.md) — read or set arbitrary HTML attributes.
- [$.fn.css()](../css/readme.md) — read or set inline styles directly.
