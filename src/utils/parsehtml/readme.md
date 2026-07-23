# $.parseHTML(html [, context] [, keepScripts])

Parse a string of HTML into an array of `Element` nodes.

Uses the browser's native `DOMParser`, so the result is a fully-realised DOM
tree, not an inert document fragment. Comments and whitespace-only text
nodes between top-level elements are discarded; only element children of
`<body>` are returned.

Pass `keepScripts` (or pass `true` as the second argument) to execute
`<script>` tags by appending them to the supplied document — without this,
scripts in the parsed markup will not run.

A `TrustedHTML` value is accepted for environments enforcing the Trusted
Types Content-Security-Policy.

## Signatures

```ts
parseHTML(
    html: string | TrustedHTML,
    context?: Node | Document | boolean,
    keepScripts?: boolean,
): Element[];
```

## Parameters

- `html` (`string | TrustedHTML`) — the markup to parse.
- `context` (`Node | Document | boolean`, optional) — the document used when
  appending executed scripts. Pass `true` here as a shorthand for
  `keepScripts: true` (legacy jQuery signature).
- `keepScripts` (`boolean`, optional) — when `true`, `<script>` tags inside
  the parsed markup are appended to the document and executed. Defaults to
  `false`.

## Returns

An array of top-level `Element` nodes parsed from the input.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/parsehtml/parsehtml";

// Parse and append
const nodes = $.parseHTML("<p>One</p><p>Two</p>");
$("#root").append(...nodes);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/parsehtml/parsehtml";

// Execute scripts in the parsed markup
const nodes = $.parseHTML("<script>console.log('ran')</script><p>Hi</p>", true);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/utils/parsehtml/parsehtml";

// Parse against a different document (e.g. an iframe)
const iframeDoc = (document.querySelector("iframe") as HTMLIFrameElement).contentDocument!;
const nodes = $.parseHTML("<p>From iframe</p>", iframeDoc);
```

## Trusted Types

Accepts `TrustedHTML` directly. When given a string, the value is wrapped
through Dabby's `dabby` policy if Trusted Types are enforced. See
[TYPESCRIPT.md](../../../TYPESCRIPT.md#trusted-types-support) for details.

## See also

- [$.fn.html()](../../manipulation/html/readme.md)
- [$.fn.append()](../../manipulation/insert/readme.md)
