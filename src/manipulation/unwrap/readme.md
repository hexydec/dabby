# $.fn.unwrap([selector])

Remove the parent of every item in the collection, leaving the items in place
as siblings of where the parent used to be.

When a selector is supplied, only parents that match are removed. The
`<body>` element is never removed, even if it would otherwise match.

## Signatures

```ts
unwrap(selector?: Selector): this;
```

## Parameters

- `selector` (`Selector`, optional) — narrows which parents are removed.

## Returns

The original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/unwrap/unwrap";

// Strip the wrapper around every emphasised paragraph
$("p.featured").unwrap();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/unwrap/unwrap";

// Only remove parents matching a selector
$("img.thumbnail").unwrap(".zoom-link");
```

## See also

- [$.fn.wrap()](../wrap/readme.md)
- [$.fn.wrapAll()](../wrapall/readme.md)
- [$.fn.parent()](../../traversal/parents/readme.md)
