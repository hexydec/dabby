# $.isFunction(value)

Type guard that returns `true` when the value is a function.

Importing this module attaches `isFunction` to the `$` factory as a static
helper, mirroring jQuery's `$.isFunction`. The underlying check is a single
`typeof value === "function"` guard, so it stays tree-shakeable.

## Signatures

```ts
$.isFunction(value: unknown): value is Function;
```

## Parameters

- `value` (`unknown`) — the value to test.

## Returns

`true` if `value` is callable (`typeof value === "function"`), otherwise
`false`.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/isfunction/isfunction";

if ($.isFunction(handler)) {
    handler();
}
```

## Notes

Included in the `full` build. Prefer
[`$.isPlainObject()`](../isplainobject/readme.md) for object-shape checks.
