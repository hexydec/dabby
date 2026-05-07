# $.fn.replaceWith(content) / $.fn.replaceAll(target)

Swap elements out of the DOM for new content. The two methods are mirror
images:

- **`replaceWith`** — replaces *each element in this collection* with the
  given content.
- **`replaceAll`** — replaces *the targets matched by the argument* with
  this collection.

## Signatures

```ts
replaceWith(html: Selector | ((this: Element, index: number, html: string) => Selector)): this;
replaceAll(html: Selector): this;
```

## Parameters

- For `replaceWith`:
  - `html` (`Selector | callback`) — the replacement, or a callback returning
    one. The callback is invoked with `(index, currentHTML)` and bound (`this`)
    to the element being replaced.
- For `replaceAll`:
  - `html` (`Selector`) — the targets to replace with the current collection.

## Returns

A new Dabby collection wrapping the elements that have been swapped in.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/replace/replace";

// Replace every placeholder with rendered content
$(".placeholder").replaceWith("<p class='loaded'>Ready</p>");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/replace/replace";

// Use a callback to compute the new node from the old
$(".price").replaceWith(function (index, current) {
    return `<strong>£${current}</strong>`;
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/replace/replace";

// replaceAll — push new markup over existing targets
$("<button class='btn'>Buy</button>").replaceAll(".old-buy-link");
```

## See also

- [$.fn.append() / .prepend() / .before() / .after()](../insert/readme.md)
- [$.fn.html()](../html/readme.md)
- [$.fn.remove()](../remove/readme.md)
