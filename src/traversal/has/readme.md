# $.fn.has(selector)

Filter the collection to elements that contain at least one descendant matching
the selector. Useful for selecting parents that hold a particular kind of child.

## Signatures

```ts
has(selector: Selector): this;
```

## Parameters

- `selector` (`Selector`) — a CSS selector string, node, array of nodes, or
  Dabby collection identifying nodes to look for inside each element.

## Returns

A new Dabby collection containing only elements that contain a matching
descendant.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/has/has";

// List items that contain a link
$("li").has("a").addClass("has-link");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/has/has";

// Articles that contain at least one image
const $illustrated = $("article").has("img");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/has/has";

// Pass a node directly — keep parents that contain a specific element
const target = document.getElementById("featured")!;
$(".panel").has(target);
```

## See also

- [$.fn.filter()](../filter/readme.md)
- [$.fn.find()](../find/readme.md)
- [$.fn.children()](../children/readme.md)
