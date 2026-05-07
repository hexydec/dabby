# $.fn.trigger(name, data?)

Dispatch an event on every element in the collection. A bubbling, cancelable `CustomEvent` is created and dispatched via `dispatchEvent()`, so any handlers bound through [`.on()`](../on/readme.md) (or as native listeners) are invoked. If the element has a same-named native method (such as `click`, `focus`, or `blur`) it is also called, except for `submit`, which only ever fires through dispatch so that bound handlers receive the event before the form actually submits — and only submits if no handler called `preventDefault()`.

The `data` argument is exposed on the dispatched event as `event.detail`. When `data` is an array, its items are spread as additional arguments to handlers bound with `.on()` (after the event itself).

## Signatures

```ts
trigger(name: string, data?: unknown): this;
```

## Parameters

- `name` (`string`) — The event name to dispatch (e.g. `"click"`, `"submit"`, or any custom event name such as `"data:loaded"`).
- `data` (`unknown`, optional) — Extra payload exposed on the event as `event.detail`. Pass an array to forward items as extra arguments to handlers.

## Returns

The original Dabby collection, for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/trigger/trigger";

// Programmatic click and submit
$("#save").trigger("click");
$("#contact-form").trigger("submit");

// Trigger native change after a programmatic value update
$("#country").val("UK").trigger("change");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/trigger/trigger";

// Custom events with extra arguments — pass an array as the second argument
$(document).on("data:loaded", (event, payload, source) => {
    console.log(`from ${source}`, payload);
});

$(document).trigger("data:loaded", [{ id: 1 }, "api"]);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/trigger/trigger";

// A simple notification bus
$(".notification-area").on("notify", function (event, message: string, type: string) {
    const node = document.createElement("div");
    node.className = `notification notification-${type}`;
    node.textContent = message;
    this.appendChild(node);
});

$(".notification-area").trigger("notify", ["Saved", "success"]);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/trigger/trigger";

// Cascade a custom event down a tree
$(".panel").on("activate", function () {
    this.classList.add("active");
    $(this).find(".panel").trigger("activate");
});

$("#root-panel").trigger("activate");
```

## See also

- [$.fn.on()](../on/readme.md) — bind handlers that respond to triggered events
- [$.fn.off()](../off/readme.md) — remove bound handlers
- [$.fn.triggerHandler()](../triggerhandler/readme.md) — run handlers without dispatching a real event
- [Named event shortcuts](../named/readme.md) — `.click()`, `.submit()`, etc., as zero-argument triggers

## Differences from jQuery

The native `CustomEvent` is dispatched instead of the proprietary `jQuery.Event` wrapper. The `data` parameter must be an array (or other primitive) — passing an object as in jQuery's overloaded form is not supported; spread arguments come from array items only.
