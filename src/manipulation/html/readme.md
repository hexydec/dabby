# $.fn.html([content])

Get or set the inner HTML of every element in the collection.

When called with no arguments, returns the `innerHTML` of the first element.
When called with a string, `TrustedHTML` value, or callback, replaces the
HTML of every element.

## Signatures

```ts
html(): string | undefined;
html(content: string | TrustedHTML | ((this: Element, index: number, currentHTML: string) => string)): this;
```

## Parameters

- `content` (`string | TrustedHTML | callback`, optional) —
  - **string** — assigned to `innerHTML` directly.
  - **`TrustedHTML`** — assigned without further coercion; required under
    strict Trusted Types CSP. The factory creates a `dabby` policy on first
    use; see [TYPESCRIPT.md](../../../TYPESCRIPT.md#trusted-types-support).
  - **callback** — invoked once per element with `(index, currentHTML)`,
    bound (`this`) to the element. Return the new HTML to assign.

## Returns

When getting, the `innerHTML` of the first element, or `undefined` if the
collection is empty. When setting, the original Dabby collection for
chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/html/html";

// Read the current contents
const current = $("#summary").html();
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/html/html";

// Replace HTML directly
$("#summary").html("<p>Loading…</p>");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/manipulation/html/html";

// Compute a new value from the current HTML
$(".article").html(function (index, current) {
    return current + "<p class='read-more'>Read more →</p>";
});
```

## Trusted Types

Pass a `TrustedHTML` value to satisfy `require-trusted-types-for 'script'`.
Strings continue to work; Dabby wraps them through its own `dabby` policy
when one is available.

## See also

- [$.fn.text()](../text/readme.md) — set text safely (no HTML parsing)
- [$.fn.append()](../insert/readme.md)
- [$.fn.empty()](../empty/readme.md)
- [$.parseHTML()](../../utils/parsehtml/readme.md)
