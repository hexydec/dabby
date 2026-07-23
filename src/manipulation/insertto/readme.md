# $.fn.insertBefore() / $.fn.prependTo() / $.fn.appendTo() / $.fn.insertAfter()

Insert the **current** collection into a target. These are the inverse of
`before`, `prepend`, `append` and `after`: instead of *receiving* content,
the current collection is *moved* (or cloned) into a target you specify.

| Method        | Where the current collection ends up         |
|---------------|----------------------------------------------|
| `insertBefore`| immediately before the target (sibling)      |
| `prependTo`   | as the target's first child                  |
| `appendTo`    | as the target's last child                   |
| `insertAfter` | immediately after the target (sibling)       |

## Signatures

```ts
insertBefore(selector: Selector): this;
prependTo(selector: Selector): this;
appendTo(selector: Selector): this;
insertAfter(selector: Selector): this;
```

## Parameters

- `selector` (`Selector`) — a CSS selector string, node, array of nodes, or
  Dabby collection identifying the target(s) to insert into.

## Returns

The original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/insertto/insertto";

// Move an existing element into a new container
$("#announcement").appendTo("#topbar");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/insertto/insertto";

// Insert a freshly created element before a known node
$("<hr class='separator'>").insertBefore("#footer");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/insertto/insertto";

// prependTo — appears as the first child of every target
$("<span class='badge'>New</span>").prependTo(".product-card");
```

## See also

- [$.fn.append() / .prepend() / .before() / .after()](../insert/readme.md)
- [$.fn.clone()](../clone/readme.md)
- [$.fn.replaceWith()](../replace/readme.md)
