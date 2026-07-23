# $.getScript(url, success?)

Load an external JavaScript file and execute it. This is shorthand for `$.ajax` with `dataType` set to `"script"`: a `<script>` tag is appended to the document head and the contents run in the global scope as soon as the browser fetches them.

## Signatures

```ts
getScript(url: string, success?: XhrCallback): XMLHttpRequest | undefined;
```

## Parameters

- `url` (`string`) — URL of the script to load.
- `success` (`(response, status, xhr) => void`, optional) — callback invoked once the `<script>` tag has fired its `load` event.

## Returns

`undefined`. Script loads use a `<script>` element, not an `XMLHttpRequest`, so there is no XHR object to return.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/ajax/getscript/getscript";

// Load a third-party library on demand
$.getScript("https://cdn.jsdelivr.net/npm/chart.js", () => {
    new Chart(canvas, config);
});
```

```ts
// Lazy-load a feature when the user opts in
document.querySelector(".enable-editor")?.addEventListener("click", () => {
    $.getScript("/scripts/editor.bundle.js", () => {
        initialiseEditor();
    });
});
```

```ts
// Polyfill an older browser
if (!("IntersectionObserver" in window)) {
    $.getScript("/polyfills/intersection-observer.js");
}
```

```ts
// Load several scripts in sequence
function loadInOrder(urls: string[], done: () => void) {
    const next = () => {
        const url = urls.shift();
        if (!url) return done();
        $.getScript(url, next);
    };
    next();
}

loadInOrder(["/lib/a.js", "/lib/b.js", "/app.js"], () => {
    console.log("Ready");
});
```

## Differences to jQuery

No `Deferred` is returned, so the jQuery `.fail()` / `.done()` chain is unavailable. There is no built-in error callback either — if the script fails to load, listen on the underlying `<script>` tag yourself or use `$.ajax({ url, dataType: "script", error })`.

## See also

- [$.ajax()](../ajax/readme.md)
- [$.get() / $.post()](../getpost/readme.md)
- [.load()](../load/readme.md)
