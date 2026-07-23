# $.fn.filter(selector) / $.fn.is(selector) / $.fn.not(selector)

Three closely-related methods that test or narrow a collection against a
selector or callback.

- **`filter`** — keep elements that match.
- **`not`** — keep elements that do **not** match.
- **`is`** — return a boolean: does at least one element match?

## Signatures

```ts
filter(selector: Selector | ((this: Element, index: number) => boolean)): this;
is(selector: Selector | ((this: Element, index: number) => boolean)): boolean;
not(selector: Selector): this;
```

## Parameters

- `selector` (`Selector | (this: Element, index: number) => boolean`) — a
  CSS selector, node, Dabby collection, or callback. The callback receives
  the element's index and is bound (`this`) to the element; return `true` to
  keep the element.

## Returns

- `filter` and `not` return a new Dabby collection.
- `is` returns a `boolean`.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/filter/filter";

// Keep only the visible items
$(".item").filter(":not(.hidden)");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/filter/filter";

// Drop items already marked as complete
$(".task").not(".complete").addClass("pending");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/filter/filter";

// Use a callback for arbitrary tests
$("input").filter(function () {
    return (this as HTMLInputElement).value.length > 0;
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/filter/filter";

// Boolean check
if ($("#submit").is(":disabled")) {
    showLoadingMessage();
}
```

## See also

- [$.fn.find()](../find/readme.md)
- [$.fn.has()](../has/readme.md)
- [$.fn.children()](../children/readme.md)
