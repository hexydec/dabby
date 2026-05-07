# $.fn.attr()

Read an HTML attribute from the first node in a collection, or set one or more attributes on every node in the collection.

The special keys `class`, `style` and `text` are mapped onto the element's `className`, `style.cssText` and `textContent` respectively. Setting a value of `null` removes the attribute. When the supplied key matches a known event name, the call is delegated to `$.fn.on()`.

## Signatures

```ts
attr(prop: string): string | null;
attr(prop: string, value: string | number | null | ((this: Element, index: number, currentValue: string | null) => string | number | null)): this;
attr(props: Record<string, string | number | null | Function>): this;
```

## Parameters

- `prop` (`string`) — the name of the attribute to read or set.
- `value` (`string | number | null | function`) — the value to assign. Use `null` to remove the attribute. A function receives `(index, currentValue)` and `this` set to the current element; it should return the new value.
- `props` (`object`) — a plain object of attribute name/value pairs. Each value can be a static value or a callback as described above.

## Returns

When reading, the attribute value as a string, or `null` if the attribute is not set or the collection is empty. When setting, the original Dabby collection.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/attr/attr";

// Read an attribute
const href = $("a.external").attr("href");
```

```ts
// Set a single attribute
$("a.external").attr("target", "_blank");

// Remove an attribute by passing null
$(".legacy").attr("data-tracked", null);
```

```ts
// Set several attributes at once
$("img.hero").attr({
    src: "images/sunset.jpg",
    alt: "Sunset over the harbour",
    loading: "lazy"
});
```

```ts
// Use a callback to derive each value
$(".gallery img").attr("alt", function (index, current) {
    return current ?? `Gallery image ${index + 1}`;
});
```

## See also

- [$.fn.prop()](../prop/readme.md) — read or set live DOM properties (e.g. `checked`, `disabled`).
- [$.fn.removeProp()](../removeprop/readme.md) — remove a custom property from each node.
- [$.fn.data()](../data/readme.md) — read or set `data-*` attributes with JSON parsing.
- [$.fn.css()](../css/readme.md) — read or set inline styles.
