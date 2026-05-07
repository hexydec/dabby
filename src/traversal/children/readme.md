# $.fn.children(selector?)

Retrieve the direct children of every element in the collection, optionally
filtered by a selector. Only immediate children are included — for elements
nested at any depth, use [`.find()`](../find/readme.md).

## Signatures

```ts
children(selector?: Selector): this;
```

## Parameters

- `selector` (`Selector`, optional) — narrows the returned children to those
  that match the supplied selector.

## Returns

A new Dabby collection containing the matched direct children of every
element in the original collection.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/children/children";

// All direct children of the menu
const $items = $(".menu").children();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/children/children";

// Only the active list items, immediately under the nav
$("nav.primary").children("li.active").addClass("highlighted");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/traversal/children/children";

// Toggle visibility of every direct child of an accordion
$(".accordion-header").on("click", function () {
    $(this).parent().children(".accordion-content").toggle();
});
```

## See also

- [$.fn.find()](../find/readme.md)
- [$.fn.parent()](../parents/readme.md)
- [$.fn.siblings()](../siblings/readme.md)
