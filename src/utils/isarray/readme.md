# $.isArray(value)

Type guard that returns `true` when the value is an array.

Importing this module attaches `isArray` to the `$` factory as a static
helper, mirroring jQuery's `$.isArray`. It is a thin wrapper around the native
`Array.isArray`, so it returns `true` for genuine arrays (including arrays from
other realms) and `false` for array-like values such as `NodeList` or
`arguments`.

## Signatures

```ts
$.isArray(value: unknown): value is unknown[];
```

## Parameters

- `value` (`unknown`) — the value to test.

## Returns

`true` if `value` is an array, otherwise `false`.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/isarray/isarray";

$.isArray([1, 2, 3]);                 // true
$.isArray(document.body.children);    // false (HTMLCollection)
$.isArray("dabby");                   // false
```

## Notes

Included in the `full` build. For new code, prefer the native `Array.isArray`
directly — this helper exists for jQuery API compatibility.
