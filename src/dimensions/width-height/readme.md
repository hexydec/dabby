# $.fn.width(val?), $.fn.height(val?), $.fn.innerWidth(val?), $.fn.innerHeight(val?), $.fn.outerWidth(val?), $.fn.outerHeight(val?)

Six related methods for reading and writing the size of a node, modelled on the CSS box model:

- **`.width()` / `.height()`** — the content box: padding, border, and margin are all excluded.
- **`.innerWidth()` / `.innerHeight()`** — content plus padding (border and margin excluded).
- **`.outerWidth()` / `.outerHeight()`** — content plus padding plus border. Pass `true` to also include margin.

Each method reads from the first node when called with no value, and writes to every node in the collection when given a value or callback. For `document` the getters return the full scrollable size; for `window` they return the viewport size.

## Signatures

```ts
width(): number | undefined;
width(
    val: number | string
        | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)
): this;

height(): number | undefined;
height(
    val: number | string
        | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)
): this;

innerWidth(): number | undefined;
innerWidth(
    val: number | string
        | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)
): this;

innerHeight(): number | undefined;
innerHeight(
    val: number | string
        | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)
): this;

outerWidth(): number | undefined;
outerWidth(
    val: number | string | boolean
        | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)
): this;

outerHeight(): number | undefined;
outerHeight(
    val: number | string | boolean
        | ((this: Element | Window | Document, index: number, currentValue: number) => number | string)
): this;
```

## Parameters

- **`val`** — either a number (treated as pixels), a CSS length string (`"50%"`, `"10rem"`, any unit the browser supports), or a callback receiving the index and current value and returning the new value. `this` inside the callback is the current element.
- **`outerWidth(true)` / `outerHeight(true)`** — passing the boolean `true` to the getter includes the horizontal or vertical margin in the returned value.

## Returns

The getters return a number of pixels, or `undefined` for an empty collection. The setters return the original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/dimensions/width-height/width-height";

// Read the size of the first match
const w = $(".card").width();
const h = $(".card").outerHeight(true); // includes margin

// Read the viewport
const viewport = {
    width: $(window).width(),
    height: $(window).height()
};
```

```ts
// Make every card the same height
let max = 0;
$(".card").each(function () {
    max = Math.max(max, $(this).outerHeight() ?? 0);
});
$(".card").height(max);
```

```ts
// Set values using a callback — scale every image up by 20%
$(".gallery img").width(function (index, current) {
    return current * 1.2;
});

// Use a CSS length string
$(".sidebar").width("25%");
```

## Differences to jQuery

Relative units in the setter such as `"+=2px"` are not supported.

## See also

- [`.css()`](../../attributes/css/readme.md)
- [`.offset()`](../offset/readme.md)
- [`.position()`](../position/readme.md)
- [`.scrollTop()` / `.scrollLeft()`](../scroll/readme.md)
