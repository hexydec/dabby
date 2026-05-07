# isWindow(value)

Type guard that returns `true` when the value is the global `window` object.

This is exposed as an internal helper and is **not** attached to the `$`
factory. The check compares the value's `self` property to itself, which is
true only for `window` (and `Window` aliases such as iframe globals).

## Signatures

```ts
isWindow(value: unknown): value is Window;
```

## Parameters

- `value` (`unknown`) — the value to test.

## Returns

`true` if `value` is a `Window`, otherwise `false`.

## Examples

```ts
import isWindow from "dabbyjs/utils/iswindow/iswindow";

isWindow(window);             // true
isWindow(document);           // false
isWindow(null);               // false
isWindow(document.body);      // false
```

## Notes

Internal helpers are kept narrow and tree-shakeable. The Dabby class uses
this internally to detect when `$()` is called with the window directly.
