# $.fn.prop(name [, value])

Get a JavaScript property from the first element, or set one on every
element. Properties differ from attributes — they live on the DOM node
object, not on the rendered HTML — and reflect the *current* state of the
element rather than the markup that created it.

Common examples include `checked` (vs the `checked` attribute), `selected`,
`disabled`, `value`, `tagName`, `nodeName`, `htmlFor` (the `for` attribute),
and `className` (the `class` attribute).

## Signatures

```ts
prop(prop: string): unknown;
prop(prop: string, value: unknown | ((this: Element, index: number, currentValue: unknown) => unknown)): this;
prop(props: Record<string, unknown>): this;
```

## Parameters

- `prop` (`string`) — the property name. Common HTML→DOM aliases (e.g.
  `for` → `htmlFor`, `class` → `className`) are handled automatically.
- `value` (`unknown | callback`) — the value to assign, or a callback
  invoked with `(index, currentValue)` and bound (`this`) to the element.
- `props` (`Record<string, unknown>`) — a map of property names to values
  for setting many at once.

## Returns

When getting, the property's current value. When setting, the original
Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/prop/prop";

// Read a checkbox's current state (vs the markup attribute)
const isOn = $("#agree").prop("checked"); // boolean
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/prop/prop";

// Disable every form input
$("form input").prop("disabled", true);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/prop/prop";

// Set multiple properties on each option
$("option").prop({ disabled: false, selected: false });
```

## See also

- [$.fn.attr()](../attr/readme.md) — read/write HTML attributes
- [$.fn.removeProp()](../removeprop/readme.md)
- [$.fn.val()](../val/readme.md)
