# $.fn.offsetParent()

Retrieve the closest positioned ancestor of the first node in the collection, wrapped in a new Dabby collection. This is a thin wrapper over the native `HTMLElement.offsetParent` reference.

A node's offset parent is the nearest ancestor whose computed `position` is anything other than `static` (or the `<body>` if no such ancestor exists). It is the element that `.position()` measures against.

## Signatures

```ts
offsetParent(): this;
```

## Parameters

This method takes no arguments.

## Returns

A new Dabby collection containing the offset parent of the first node, or an empty collection when the original collection is empty or the node has no offset parent (for example, a detached element).

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/dimensions/offsetparent/offsetparent";

// Walk up to the positioning context
const $context = $(".child").offsetParent();
console.log($context[0]); // the nearest positioned ancestor

// Combine with .offset() for a relative position
const childOffset = $(".child").offset()!;
const parentOffset = $(".child").offsetParent().offset()!;
const relative = {
    top: childOffset.top - parentOffset.top,
    left: childOffset.left - parentOffset.left
};
```

```ts
// Constrain a draggable inside its positioning ancestor
const $parent = $element.offsetParent();
const bounds = {
    width: $parent.innerWidth() ?? 0,
    height: $parent.innerHeight() ?? 0
};
```

## See also

- [`.position()`](../position/readme.md)
- [`.offset()`](../offset/readme.md)
- [`.parents()`](../../traversal/parents/readme.md)
