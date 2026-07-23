# $.fn.scrollLeft(pos?), $.fn.scrollTop(pos?)

Get or set the horizontal and vertical scroll positions of nodes in a Dabby collection. Both methods follow the same pattern: with no argument they return the value of the first node; with an argument they set every node and return the collection for chaining.

When the wrapped element is `window`, the getter reads `pageXOffset` / `pageYOffset` rather than `scrollLeft` / `scrollTop`, so `$(window).scrollTop()` always reports the document scroll.

## Signatures

```ts
scrollLeft(): number | undefined;
scrollLeft(
    pos: number | ((this: Element | Window, index: number, currentValue: number) => number)
): this;

scrollTop(): number | undefined;
scrollTop(
    pos: number | ((this: Element | Window, index: number, currentValue: number) => number)
): this;
```

## Parameters

- **`pos`** — either a pixel value to assign, or a callback receiving the index and current scroll value and returning the new value. `this` inside the callback is the current node (or `window`).

## Returns

The getter returns the current scroll position in pixels, or `undefined` if the collection is empty. The setter returns the original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/dimensions/scroll/scroll";

// Read the document scroll
const y = $(window).scrollTop();

// Scroll the page back to the top
$(window).scrollTop(0);

// Scroll a container horizontally
$(".gallery").scrollLeft(320);
```

```ts
// Step a scrollable region forward by 200px
$(".gallery").scrollLeft(function (index, current) {
    return current + 200;
});
```

```ts
// Toggle a sticky header based on scroll direction
let lastY = 0;

$(window).on("scroll", () => {
    const y = $(window).scrollTop() ?? 0;
    $(".header").toggleClass("hidden", y > lastY && y > 80);
    lastY = y;
});
```

## See also

- [`.offset()`](../offset/readme.md)
- [`.height()` / `.outerHeight()`](../width-height/readme.md)
- [`.position()`](../position/readme.md)
