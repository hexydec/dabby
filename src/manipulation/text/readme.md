# $.fn.text([content])

Get or set the text content of every element in the collection.

When called with no arguments, returns the concatenated `textContent` of
every element. When called with a string, number, boolean, or callback,
sets the text on every element.

Because the value is written via `textContent`, any HTML in the input is
rendered as literal text. This makes `text` the safe choice for displaying
user-supplied content.

## Signatures

```ts
text(): string;
text(content: string | number | boolean | ((this: Element, index: number, currentText: string) => string | number | boolean)): this;
```

## Parameters

- `content` (`string | number | boolean | callback`, optional) —
  - **primitive** — coerced to a string via `String()` before being assigned.
  - **callback** — invoked once per element with `(index, currentText)`,
    bound (`this`) to the element. Return the new value to assign.

## Returns

When getting, a string formed by concatenating the `textContent` of every
element. When setting, the original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/text/text";

// Read the heading
const heading = $("h1").text();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/text/text";

// Display a count — number is coerced to string
$(".cart-count").text(3);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/text/text";

// Format prices in place
$(".price").text(function (index, current) {
    return "£" + Number(current).toFixed(2);
});
```

## See also

- [$.fn.html()](../html/readme.md) — set HTML (parses tags)
- [$.fn.val()](../../attributes/val/readme.md) — read/write form values
- [$.fn.append()](../insert/readme.md)
