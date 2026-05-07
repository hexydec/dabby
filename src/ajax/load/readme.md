# .load(url, data?, success?)

Fetch HTML and append it to each element in the collection. The URL may include a trailing CSS selector (separated by a space) which filters the returned HTML before insertion — useful for pulling a single fragment out of a full page.

If `data` is a plain object the request is sent with POST; otherwise GET is used.

## Signatures

```ts
load(url: string, data: string | PlainObject, success: XhrCallback): this;
load(url: string, success: XhrCallback): this;
load(url: string): this;
```

## Parameters

- `url` (`string`) — URL to fetch. Anything after the first space is treated as a CSS selector applied to the response.
- `data` (`string | object`, optional) — parameters to send with the request. A plain object switches the method to POST.
- `success` (`(response, status, xhr) => void`, optional) — callback fired once per element in the collection after insertion. Inside the callback `this` is the element being populated.

## Returns

The original Dabby collection so the call can be chained.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/ajax/load/load";

// Drop a full HTML page into a container
$("#main").load("/pages/about.html");
```

```ts
// Load only the .article fragment from another page
$("#preview").load("/posts/42.html .article", function () {
    $(this).find("img").addClass("loaded");
});
```

```ts
// POST data and use the rendered response
$(".comments").load("/api/comments.html", { post: 42 }, (response, status) => {
    if (status === "error") {
        console.warn("Failed to load comments");
    }
});
```

```ts
// Refresh a panel on an interval
setInterval(() => {
    $(".live-feed").load("/feed.html .feed-item");
}, 30000);
```

## Differences to jQuery

The `xhr` argument passed to the success callback is the native `XMLHttpRequest`, not jQuery's `jqXHR` wrapper.

## See also

- [$.ajax()](../ajax/readme.md)
- [$.get() / $.post()](../getpost/readme.md)
- [.append()](../../manipulation/insert/readme.md)
- [.filter()](../../traversal/filter/readme.md)
