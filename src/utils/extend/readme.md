# $.extend([deep,] target [, source1] [, source2] [, …])

Merge the properties of one or more sources into a target object.

By default the merge is shallow — top-level properties are copied and any
nested objects/arrays are shared by reference. Pass `true` as the first
argument for a recursive deep merge in which plain objects and arrays are
merged in place.

The own-property `__proto__` is skipped to avoid prototype pollution.

## Signatures

```ts
extend(deep: true, target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown>;
extend(target: Record<string, unknown>, ...sources: Record<string, unknown>[]): Record<string, unknown>;
```

## Parameters

- `deep` (literal `true`, optional) — request a deep merge.
- `target` (`Record<string, unknown>`) — the object to merge into. For deep
  merges, the target is mutated in place; for shallow merges, a new object
  is returned (the target is not modified).
- `sources` (`Record<string, unknown>[]`) — one or more objects whose
  properties are copied across.

When called with a single argument (shallow only), the properties are merged
onto the factory `$` itself, mirroring jQuery's `$.extend(plugin)` plug-in
pattern.

## Returns

For deep merges, the mutated target. For shallow merges, a new object.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/extend/extend";

// Shallow merge
const settings = $.extend({}, defaults, overrides);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/extend/extend";

// Deep merge — nested objects are recursed
const merged = $.extend(true, { ui: { theme: "light" } }, { ui: { dense: true } });
// merged.ui === { theme: "light", dense: true }
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/extend/extend";

// Plug-in pattern — augment $ itself
$.extend({
    log(message: string) { console.log("[dabby]", message); },
});
```

## See also

- [$.isPlainObject()](../isplainobject/readme.md) — used internally to decide what is recursable
- [$.each()](../each/readme.md)
