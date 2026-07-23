# $.isPlainObject(value)

Test whether a value is a plain object literal — created with `{}`, `new Object()`,
or `Object.create(null)`.

Returns `false` for arrays, DOM nodes, dates, class instances, and primitive
values. Useful for guarding deep-merge or copy-on-write logic.

## Signatures

```ts
isPlainObject(obj: unknown): boolean;
```

## Parameters

- `obj` (`unknown`) — the value to test.

## Returns

`true` if the prototype of `obj` is `Object.prototype` or `null`, otherwise
`false`.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/isplainobject/isplainobject";

$.isPlainObject({});                 // true
$.isPlainObject(Object.create(null)); // true
$.isPlainObject([]);                 // false
$.isPlainObject(new Date());         // false
$.isPlainObject(null);               // false
$.isPlainObject(document.body);      // false
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/isplainobject/isplainobject";

// Use as a guard before deep-merging
function merge(target: unknown, source: unknown) {
    if (!$.isPlainObject(source)) return target;
    return $.extend(true, target as Record<string, unknown>, source as Record<string, unknown>);
}
```

## See also

- [$.extend()](../extend/readme.md)
- [$.iswindow()](../iswindow/readme.md)
