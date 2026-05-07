# .serialize()

Serialise the values of form controls in the collection into a URL-encoded query string suitable for sending as the body of a POST or as the query string of a GET.

The method considers named `<input>` (excluding `file`, `submit`, and unchecked `radio`/`checkbox`), `<textarea>`, and `<select>` elements. Disabled fields are skipped. If the collection itself contains form controls they are used directly; otherwise the method searches their descendants.

## Signatures

```ts
serialize(): string;
```

## Parameters

None.

## Returns

A URL-encoded query string of the matched name/value pairs.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/ajax/serialize/serialize";

// Serialise an entire form
$("#contact-form").serialize();
// => "name=Ada&email=ada%40example.com&message=Hello"
```

```ts
// AJAX submit
import "dabbyjs/ajax/getpost/getpost";

$("#login-form").on("submit", function (e) {
    e.preventDefault();
    $.post("/api/login", $(this).serialize(), (res) => {
        location.href = res.redirect;
    }, "json");
});
```

```ts
// Auto-save a draft on input
let timer: number;

$("article-form textarea, article-form input").on("input", function () {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
        $.post("/api/drafts", $("#article-form").serialize());
    }, 1000);
});
```

```ts
// Use serialised data to build a shareable URL
$("#filters").on("change", function () {
    const qs = $(this).serialize();
    history.replaceState(null, "", `?${qs}`);
});
```

## Differences to jQuery

None.

## See also

- [$.param()](../param/readme.md)
- [$.ajax()](../ajax/readme.md)
- [$.get() / $.post()](../getpost/readme.md)
- [.val()](../../attributes/val/readme.md)
