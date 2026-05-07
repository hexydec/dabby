# $.fn.add(selector)

Create a new Dabby collection by appending elements to the end of the current
collection. Duplicate nodes are removed so each element appears at most once.

## Signatures

```ts
add(selector: Selector): this;
```

## Parameters

- `selector` (`Selector`) — a CSS selector string, HTML string, `Element`,
  array of elements, `NodeList`, `HTMLCollection` or another Dabby collection
  whose nodes should be appended to the current collection.

## Returns

A new Dabby collection containing the original nodes followed by the added
nodes, with duplicates removed.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/add/add";

// Combine selections by selector
$("button").add("a.button").addClass("clickable");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/add/add";

// Add a freshly-created element to an existing collection
const $existing = $(".product");
const $new = $("<div class='product'>New product</div>");
const $all = $existing.add($new);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/add/add";

// Build a collection across several form field types
const $fields = $("form").find("input")
    .add($("form").find("textarea"))
    .add($("form").find("select"));
```

## See also

- [$.fn.filter()](../filter/readme.md)
- [$.fn.find()](../find/readme.md)
- [$.fn.has()](../has/readme.md)
