# $.isWindow(value)

Type guard that returns `true` when the value is the global `window` object.

Importing this module attaches `isWindow` to the `$` factory as a static
helper, mirroring jQuery's `$.isWindow`. The check compares the value's
`window` property to itself, which is true only for `window` (and `Window`
aliases such as iframe globals).

## Signatures

```ts
$.isWindow(value: unknown): value is Window;
```

## Parameters

- `value` (`unknown`) — the value to test.

## Returns

`true` if `value` is a `Window`, otherwise `false`.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/iswindow/iswindow";

$.isWindow(window);             // true
$.isWindow(document);           // false
$.isWindow(null);               // false
$.isWindow(document.body);      // false
```

## Notes

Included in the `full` build. The Dabby class also uses the internal guard to
detect when `$()` is called with the window directly.
