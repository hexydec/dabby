# Dabby

The `Dabby` class is the core type behind the `$()` factory: an iterable, array-like collection of DOM nodes with a chainable API. Instances are created by calling `$(selector, context)` — you rarely need to reference the class directly, but it is exported so you can use it for `instanceof` checks and type annotations.

A `Dabby` collection holds three things: a numeric `length`, indexed access to each node (`collection[0]`, `collection[1]`, ...), and the prototype methods loaded by the modules you import.

## Signatures

```ts
class Dabby implements Iterable<DOMNode> {
    readonly length: number;
    readonly [index: number]: DOMNode;

    constructor(
        selector?: Selector | TrustedHTML | ReadyCallback,
        context?: Selector | Record<string, unknown>
    );

    [Symbol.iterator](): Iterator<DOMNode>;

    each<T extends DOMNode = DOMNode>(
        callback: (this: T, index: number, element: T) => void | false
    ): this;

    get(): DOMNode[];
    get(index: number): DOMNode | undefined;

    map<T extends DOMNode = DOMNode>(
        callback: (this: T, index: number, element: T) => Selector
    ): Dabby;
}
```

The factory has the signature:

```ts
const $: DabbyFactory;
$(selector?, context?): Dabby;
```

## Parameters

- **`selector`** — what to wrap. Accepts:
    - a CSS selector string (`"#header"`, `"ul li.active"`)
    - an HTML string starting with `<` (parsed to nodes)
    - a `TrustedHTML` instance
    - a single `Node`, the `Window`, or `document`
    - an array, `NodeList`, or `HTMLCollection` of nodes
    - another `Dabby` instance (copied)
    - a callback function (registered for `DOMContentLoaded`)
- **`context`** — optional. Either a selector / element / Dabby to scope a CSS query inside, or a plain object of attributes to apply when creating a single tag (e.g. `$("<div>", { class: "card" })`).

## Returns

A new `Dabby` collection. When `selector` is a ready callback no collection is yielded — the callback fires once the DOM is parsed.

## Examples

```ts
import $ from "dabbyjs";

// CSS selector
const $links = $("nav a.active");

// Scoped query
const $items = $("li", document.querySelector(".menu"));

// Wrap a single node
const $body = $(document.body);

// Iterate with for...of
for (const node of $(".product")) {
    console.log(node.dataset.id);
}

// Indexed access and length
const first = $(".product")[0];
console.log($(".product").length);
```

```ts
// Create elements from HTML
const $card = $("<div>", {
    class: "card",
    text: "New product"
});

$("body").append($card);

// Document-ready callback
$(($) => {
    console.log("DOM ready");
});
```

```ts
// .each — iterate the collection
$("li").each(function (index) {
    this.dataset.position = String(index);
});

// .get — unwrap to a plain array
const nodes = $(".item").get();
const last = $(".item").get(-1);

// .map — build a new collection
const $children = $(".panel").map(function () {
    return this.firstElementChild;
});
```

## Differences to jQuery

- Only browser-supported CSS selectors work — extensions like `:first` are not supported.
- HTML is parsed via `innerHTML`; no further processing is performed.

## See also

- [`.each()`](../each/readme.md)
- [`.get()`](../get/readme.md)
- [`.map()`](../map/readme.md)
- [`.find()`](../../traversal/find/readme.md)
- [`.eq()`](../../traversal/eq/readme.md)
