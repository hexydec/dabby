# isFunction(value)

Type guard that returns `true` when the value is a function.

This is exposed as an internal helper and is **not** attached to the `$`
factory. Importing the module does not pull in any runtime code beyond the
single guard function.

## Signatures

```ts
isFunction(value: unknown): value is Function;
```

## Parameters

- `value` (`unknown`) — the value to test.

## Returns

`true` if `value` is callable (`typeof value === "function"`), otherwise
`false`.

## Examples

```ts
import isFunction from "dabbyjs/utils/isfunction/isfunction";

if (isFunction(handler)) {
    handler();
}
```

## Notes

Internal helpers are kept narrow and tree-shakeable. Prefer
[`$.isPlainObject()`](../isplainobject/readme.md) for object-shape checks.
