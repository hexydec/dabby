# $.fn.css()

Read computed CSS properties from the first node in a collection, or set inline styles on every node in the collection. Property names may be supplied in dash-case or camelCase — the returned object preserves the form you used.

## Signatures

```ts
css(prop: string): string;
css(props: string[]): Record<string, string>;
css(prop: string, value: string | number | ((this: Element, index: number, currentValue: string) => string | number)): this;
css(props: Record<string, string | number>): this;
```

## Parameters

- `prop` (`string`) — a single CSS property name in dash-case (e.g. `background-color`) or camelCase (e.g. `backgroundColor`).
- `props` (`string[]`) — when reading, an array of property names to read in one call.
- `props` (`object`) — when setting, a plain object of property name/value pairs.
- `value` (`string | number | function`) — the value to assign. Numeric values are passed through to the browser, which adds `px` for length-based properties. A function receives `(index, currentValue)` and `this` set to the current element; it should return a string or number.

## Returns

When reading a single property, the computed value as a string. When reading multiple properties, an object keyed by the requested names. When setting, the original Dabby collection.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/css/css";

// Read a single computed property
const colour = $(".card").css("background-color");

// Read several properties at once
const box = $(".card").css(["border-color", "border-width"]);
```

```ts
// Set a single property
$(".card").css("background-color", "#0055aa");

// Numeric values become pixels
$(".card").css("width", 320);
```

```ts
// Set several properties from an object
$(".card").css({
    backgroundColor: "#0055aa",
    color: "#ffffff",
    padding: "1rem"
});
```

```ts
// Compute each value from the current value
$(".progress-bar").css("width", function (index, current) {
    return parseFloat(current) + 10 + "px";
});
```

## See also

- [$.fn.attr()](../attr/readme.md) — read or set the `style` attribute as a string.
- [$.fn.addClass()](../class/readme.md) — toggle classes rather than inline styles.
- [$.fn.show()](../show-hide/readme.md) — show, hide and toggle the `display` property.
