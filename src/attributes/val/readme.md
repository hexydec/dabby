# $.fn.val([value])

Get the value of the first form element in the collection, or set the value
of every form element.

Handles the common form elements:

- **`<input>`** — reads/writes the `value` property.
- **`<input type="checkbox">`** — reads `value` only when checked, otherwise `undefined`.
- **`<input type="radio">`** — pass an array to set the checked state by value.
- **`<select multiple>`** — reads an array of selected option values; pass an array to select options.
- **`<select>`** — reads/writes the selected option value.
- **`<textarea>`** — reads/writes the textarea content.

## Signatures

```ts
val(): string | string[] | undefined;
val(value: string | number | string[] | ((this: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement, index: number, currentValue: string) => string | number | string[])): this;
```

## Parameters

- `value` (`string | number | string[] | callback`, optional) —
  - **string / number** — assigned to `value` (numbers are coerced via `String()`).
  - **string[]** — selects the matching options (`<select multiple>`) or checks the matching radios/checkboxes by value.
  - **callback** — invoked with `(index, currentValue)`, bound (`this`) to the input. Return the new value.

## Returns

When getting, the current value (`string`, `string[]` for multi-selects, or
`undefined` if the collection is empty or the element has no value). When
setting, the original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/val/val";

// Read the current value
const email = $("input[name=email]").val();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/val/val";

// Set a value
$("input[name=q]").val("dabbyjs");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/val/val";

// Pre-select options in a multi-select
$("select#tags").val(["typescript", "dom", "library"]);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/val/val";

// Trim every text input
$("input[type=text]").val(function (index, current) {
    return current.trim();
});
```

## See also

- [$.fn.prop()](../prop/readme.md)
- [$.fn.attr()](../attr/readme.md)
- [$.fn.serialize()](../../ajax/serialize/readme.md)
