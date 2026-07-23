# $.fn.wrapAll(html)

Wrap every item in the collection together with a single shared wrapper.

Unlike [`wrap`](../wrap/readme.md), only one copy of the wrapper is inserted;
all items are gathered inside its deepest descendant in their original DOM
order. The wrapper is inserted at the position of the first item in the
collection.

## Signatures

```ts
wrapAll(html: Selector | ((this: Element) => Selector)): this;
```

## Parameters

- `html` (`Selector | callback`) — the wrapper, or a callback returning one.
  - **`Selector`** — a CSS string, HTML string, node, array of nodes, or
    Dabby collection. Only the first matching node is used.
  - **callback** — invoked once with no arguments, bound (`this`) to the first
    element in the collection. Return the wrapper to use.

## Returns

The original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/wrapall/wrapall";

// Group every chip into a single shared row
$(".chip").wrapAll("<div class='chip-row'></div>");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/wrapall/wrapall";

// Wrapper with nested elements — items end up in the deepest descendant
$(".error-message").wrapAll("<div class='alert'><div class='alert-body'></div></div>");
```

## See also

- [$.fn.wrap()](../wrap/readme.md) — one wrapper per element
- [$.fn.unwrap()](../unwrap/readme.md)
- [$.fn.append()](../insert/readme.md)
