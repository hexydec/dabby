# $.get(...) / $.post(...)

Shorthand wrappers around `$.ajax` for GET and POST requests. They accept loose argument lists so you can supply only what you need: a URL, optionally some data, optionally a success callback, and optionally a data type.

## Signatures

```ts
get(url: string, data: DataParam, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
get(url: string, data: DataParam, success: XhrCallback): XMLHttpRequest | undefined;
get(url: string, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
get(url: string, success: XhrCallback): XMLHttpRequest | undefined;
get(url: string): XMLHttpRequest | undefined;
get(url: string, data: DataParam): XMLHttpRequest | undefined;
get(settings: AjaxSettings): XMLHttpRequest | undefined;

post(url: string, data: DataParam, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
post(url: string, data: DataParam, success: XhrCallback): XMLHttpRequest | undefined;
post(url: string, success: XhrCallback, dataType: string): XMLHttpRequest | undefined;
post(url: string, success: XhrCallback): XMLHttpRequest | undefined;
post(url: string): XMLHttpRequest | undefined;
post(url: string, data: DataParam): XMLHttpRequest | undefined;
post(settings: AjaxSettings): XMLHttpRequest | undefined;
```

## Parameters

- `url` (`string`) — URL to request.
- `data` (`string | object`) — parameters appended to the query string (GET) or sent in the request body (POST). Plain objects are serialised with `$.param`.
- `success` (`(response, status, xhr) => void`) — callback invoked on success. The `response` is parsed JSON when `dataType` is `"json"` or when the response looks like JSON.
- `dataType` (`string`) — expected response type, e.g. `"json"`, `"script"`, `"jsonp"`.
- `settings` (`AjaxSettings`) — full settings object, see [$.ajax()](../ajax/readme.md).

## Returns

The underlying `XMLHttpRequest`, or `undefined` for `script` / `jsonp` loads.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/ajax/getpost/getpost";

// Simple GET with JSON response
$.get("/api/products", (products) => {
    console.log(products);
}, "json");
```

```ts
// GET with query parameters
$.get("/api/search", { q: "laptop", category: "electronics" }, (results) => {
    renderResults(results);
}, "json");
```

```ts
// POST a form payload
$.post("/api/contact", {
    name: "Ada Lovelace",
    email: "ada@example.com",
    message: "Hello"
}, (res) => {
    console.log(res.id);
}, "json");
```

```ts
// POST inside a submit handler
import "dabbyjs/ajax/serialize/serialize";

$("#login-form").on("submit", function (e) {
    e.preventDefault();
    $.post("/api/login", $(this).serialize(), (res) => {
        location.href = res.redirect;
    }, "json");
});
```

## Differences to jQuery

No `Deferred` is returned, so you cannot chain `.done()` / `.fail()` / `.always()`. Use the `success` and `error` callbacks (or wrap the call in a `Promise`) instead.

## See also

- [$.ajax()](../ajax/readme.md)
- [$.getScript()](../getscript/readme.md)
- [.load()](../load/readme.md)
- [.serialize()](../serialize/readme.md)
- [$.param()](../param/readme.md)
