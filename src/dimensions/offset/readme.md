# $.fn.offset(coords?)

Get or set a node's coordinates relative to the document. The getter returns the position of the first node in the collection; the setter writes new coordinates onto every node in the collection.

When setting, any element whose computed `position` is `static` is changed to `relative` so the new offset takes effect. The values are then adjusted by the offset parent so the final document coordinate matches what you asked for.

## Signatures

```ts
offset(): { top: number; left: number } | undefined;
offset(
    coords: { top: number; left: number }
        | ((this: Element, index: number, currentValue: { top: number; left: number }) => { top: number; left: number })
): this;
```

## Parameters

- **`coords`** — either a `{ top, left }` object measured in pixels from the top-left of the document, or a callback receiving the index and the current offset and returning the new `{ top, left }`. `this` inside the callback is the current element.

## Returns

The getter returns a `{ top, left }` object, or `undefined` for an empty collection. The setter returns the original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/dimensions/offset/offset";

// Read the document position of the first match
const pos = $(".dialog").offset();
console.log(pos?.top, pos?.left);

// Write absolute document coordinates
$(".dialog").offset({ top: 120, left: 240 });
```

```ts
// Position a tooltip directly under its trigger
const triggerPos = $trigger.offset()!;
const triggerHeight = $trigger.outerHeight()!;

$(".tooltip").offset({
    top: triggerPos.top + triggerHeight + 4,
    left: triggerPos.left
});
```

```ts
// Nudge every selected item using a callback
$(".selected").offset(function (index, current) {
    return {
        top: current.top + 10,
        left: current.left + 10
    };
});
```

## See also

- [`.position()`](../position/readme.md)
- [`.offsetParent()`](../offsetparent/readme.md)
- [`.scrollTop()` / `.scrollLeft()`](../scroll/readme.md)
- [`.outerWidth()` / `.outerHeight()`](../width-height/readme.md)
