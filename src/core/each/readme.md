# $.fn.each(callback)

Iterate every node in a Dabby collection, calling the supplied callback once per node. `.each()` is defined directly on the `Dabby` class, so it is always available — this module exists purely as a stub re-export for builds that import individual methods.

For the canonical documentation see [core/dabby/readme.md](../dabby/readme.md).

## Signatures

```ts
each<T extends DOMNode = DOMNode>(
    callback: (this: T, index: number, element: T) => void | false
): this;
```

## Parameters

- **`callback`** — function called with `(index, element)`. `this` is bound to the current node. Return `false` to break out of the loop early.

## Returns

The original Dabby collection, so calls can be chained.

## Examples

```ts
import $ from "dabbyjs";

// Iterate and read
$("li").each(function (index) {
    console.log(index, this.textContent);
});

// Break early
$(".item").each(function () {
    if (this.classList.contains("target")) {
        return false; // stop here
    }
});
```

```ts
// Build a list of values
const ids: string[] = [];
$(".product").each(function () {
    ids.push(this.dataset.id ?? "");
});
```

## See also

- [Dabby class](../dabby/readme.md)
- [`.map()`](../map/readme.md)
- [`.get()`](../get/readme.md)
