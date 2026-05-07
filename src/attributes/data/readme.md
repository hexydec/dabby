# $.fn.data()

Read or set `data-*` attributes on the elements in a collection. Internally, Dabby uses the native `dataset` property, so values are JSON-parsed when read and serialised to JSON when set.

Names may be supplied in dash-case (e.g. `user-id`) or camelCase (e.g. `userId`); they are normalised to the camelCase form used by `dataset`.

## Signatures

```ts
data(): Record<string, unknown>;
data(name: string): unknown;
data(name: string, value: string | number | boolean | object | null): this;
data(props: Record<string, string | number | boolean | object | null>): this;
```

## Parameters

- `name` (`string`) — the data attribute name, without the `data-` prefix.
- `value` (`string | number | boolean | object | null`) — the value to store. Objects are serialised with `JSON.stringify`; primitives are stringified by the browser.
- `props` (`object`) — a plain object of name/value pairs to set in one call.

## Returns

When called with no arguments, an object containing every data value from the first node. When called with a single name, the parsed value of that attribute, or `undefined` if it is not set. When setting, the original Dabby collection.

## Examples

```html
<div id="user" data-user-id="12345" data-role="admin"
     data-preferences='{"theme":"dark","language":"en"}'></div>
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/data/data";

// Read a single value (numbers and JSON are parsed automatically)
const userId = $("#user").data("user-id");      // "12345"
const prefs = $("#user").data("preferences");   // { theme: "dark", language: "en" }

// Read every data value
const all = $("#user").data();
```

```ts
// Set one value
$("#user").data("status", "active");

// Set an object — stored as JSON
$("#user").data("settings", { notifications: true, autoSave: false });
```

```ts
// Set several values at once
$("#user").data({
    role: "moderator",
    verified: true,
    lastLogin: "2026-05-07"
});
```

## See also

- [$.fn.attr()](../attr/readme.md) — read or set arbitrary HTML attributes (no JSON parsing).
- [$.fn.prop()](../prop/readme.md) — read or set live DOM properties.
