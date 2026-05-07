# $.fn.find(selector)

Find descendants of every item in the collection that match the selector. The
selector is evaluated against each element's subtree (not against the elements
themselves), and the results are gathered into a single new collection.

## Signatures

```ts
find(selector: Selector): this;
```

## Parameters

- `selector` (`Selector`) — a CSS selector string, node, array of nodes, or
  Dabby collection identifying descendants to keep.

## Returns

A new Dabby collection containing every matched descendant of the original
collection.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/find/find";

// All external links inside any article
$("article").find("a.external");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/find/find";

// Find a particular form field within a known wrapper
const $email = $(".signup-form").find("input[name=email]");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/find/find";

// Find can take a Dabby collection or node, not just a string
const $rows = $("table");
const $cells = $rows.find($("td.value"));
```

## See also

- [$.fn.children()](../children/readme.md) — direct children only
- [$.fn.filter()](../filter/readme.md) — filter the current collection
- [$.fn.closest()](../closest/readme.md) — walk up to the nearest matching ancestor
