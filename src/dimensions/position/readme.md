# $.fn.position()

Retrieve the position of the first node in the collection relative to its offset parent. The values are read from the native `offsetTop` and `offsetLeft` properties.

Where `.offset()` measures against the document, `.position()` measures against the nearest positioned ancestor — useful when you are placing one element relative to its container.

## Signatures

```ts
position(): { top: number; left: number } | undefined;
```

## Parameters

This method takes no arguments.

## Returns

A `{ top, left }` object measured in pixels from the offset parent, or `undefined` if the collection is empty.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/dimensions/position/position";

// Read the position relative to the offset parent
const pos = $(".dialog").position();
console.log(pos?.top, pos?.left);

// Place a tooltip just below a trigger inside the same container
const triggerPos = $trigger.position()!;
const triggerHeight = $trigger.outerHeight()!;

$(".tooltip").css({
    position: "absolute",
    top: triggerPos.top + triggerHeight + "px",
    left: triggerPos.left + "px"
});
```

```ts
// Snap an element to a grid relative to its parent
const pos = $(".tile").position()!;
const grid = 16;

$(".tile").css({
    top: Math.round(pos.top / grid) * grid + "px",
    left: Math.round(pos.left / grid) * grid + "px"
});
```

## See also

- [`.offset()`](../offset/readme.md)
- [`.offsetParent()`](../offsetparent/readme.md)
- [`.outerWidth()` / `.outerHeight()`](../width-height/readme.md)
