# $.fn.wrap(html)

Wrap each item in the collection with its own copy of the supplied content.

If the wrapper has nested children, each element is placed inside the
deepest descendant. Pass a callback to compute a different wrapper per
element.

## Signatures

```ts
wrap(html: Selector | ((this: Element, index: number) => Selector)): this;
```

## Parameters

- `html` (`Selector | callback`) — the wrapper, or a callback returning one.
  - **`Selector`** — a CSS string, HTML string, node, array of nodes, or
    Dabby collection. Each target receives its own deep clone.
  - **callback** — invoked once per element with `(index)`, bound (`this`) to
    the element. Return the wrapper to use.

## Returns

The original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/wrap/wrap";

// Wrap each thumbnail with its own zoom link
$("img.thumbnail").wrap("<a class='zoom'></a>");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/wrap/wrap";

// Wrapper with nested elements — items end up in the deepest descendant
$(".chip").wrap("<div class='chip-row'><span class='chip-inner'></span></div>");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/wrap/wrap";

// Compute the wrapper per element
$("p").wrap(function (index) {
    return `<section data-index='${index}'></section>`;
});
```

## See also

- [$.fn.wrapAll()](../wrapall/readme.md) — single wrapper around the whole set
- [$.fn.unwrap()](../unwrap/readme.md)
- [$.fn.append()](../insert/readme.md)
