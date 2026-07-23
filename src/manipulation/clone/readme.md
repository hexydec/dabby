# $.fn.clone([withDataAndEvents [, deepWithDataAndEvents]])

Make a deep copy of every element in the collection. By default the copy is
data-and-events free; opt in to copying jQuery-style `data()` values and bound
event handlers.

## Signatures

```ts
clone(withDataAndEvents?: boolean, deepWithDataAndEvents?: boolean | null): this;
```

## Parameters

- `withDataAndEvents` (`boolean`, optional) — when `true`, copies data values
  set via `$.fn.data()` and event handlers bound via `$.fn.on()` to the
  cloned root element. Defaults to `false`.
- `deepWithDataAndEvents` (`boolean | null`, optional) — when `true`, also
  copies data and events from descendants. Defaults to the value of
  `withDataAndEvents`. Pass `null` to inherit the first argument explicitly.

## Returns

A new Dabby collection wrapping the cloned elements.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/clone/clone";

// Plain copy — like Element.cloneNode(true)
const $copy = $(".card").clone();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/clone/clone";

// Copy data and events too
$(".widget").clone(true, true).appendTo("#stage");
```

## See also

- [$.fn.append()](../insert/readme.md)
- [$.fn.appendTo()](../insertto/readme.md)
- [$.fn.empty()](../empty/readme.md)
