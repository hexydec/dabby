# $.fn.before() / $.fn.prepend() / $.fn.append() / $.fn.after()

Insert content into the DOM relative to every element in the collection. All
four methods are variadic: pass any combination of selectors, HTML strings,
nodes or Dabby collections. Pass a single callback to compute different
content per element.

| Method     | Where the content is inserted                  |
|------------|------------------------------------------------|
| `before`   | as a previous sibling (outside the element)    |
| `prepend`  | as the first child (inside, at the start)      |
| `append`   | as the last child (inside, at the end)         |
| `after`    | as a next sibling (outside the element)        |

When the collection contains multiple targets, the inserted nodes are
deep-cloned for each but the last so every target receives its own copy.

## Signatures

```ts
before(...content: Array<Selector | TrustedHTML | ((this: Element, index: number, html: string) => Selector)>): this;
prepend(...content: Array<Selector | TrustedHTML | ((this: Element, index: number, html: string) => Selector)>): this;
append(...content: Array<Selector | TrustedHTML | ((this: Element, index: number, html: string) => Selector)>): this;
after(...content: Array<Selector | TrustedHTML | ((this: Element, index: number, html: string) => Selector)>): this;
```

## Parameters

- `...content` — one or more values to insert. Each value may be:
  - a CSS selector or HTML string (parsed into nodes),
  - a `TrustedHTML` value,
  - an `Element`, an array of nodes, a `NodeList`, an `HTMLCollection`, or another Dabby collection,
  - **or** (as a single argument) a callback `(index, currentHTML) => Selector`. The callback receives the element's index and current `innerHTML` and is bound (`this`) to the element.

## Returns

The original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/insert/insert";

// Append a single child
$("#cart").append("<li class='item'>Coffee</li>");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/insert/insert";

// Variadic — multiple values at once
$(".todo-list").append(
    "<li>Buy milk</li>",
    "<li>Walk dog</li>",
    "<li>Write tests</li>",
);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/insert/insert";

// Mix nodes and strings
const $separator = $("<hr>");
$(".article p").after($separator, "<p class='note'>End of section.</p>");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/insert/insert";

// Compute content per element
$(".chapter").prepend(function (index) {
    return `<h3>Chapter ${index + 1}</h3>`;
});
```

## See also

- [$.fn.appendTo() / .prependTo() / .insertBefore() / .insertAfter()](../insertto/readme.md)
- [$.fn.html()](../html/readme.md)
- [$.fn.text()](../text/readme.md)
- [$.fn.replaceWith()](../replace/readme.md)
