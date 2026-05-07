# $.fn.off(events?, selector?, callback?)

Remove event handlers previously bound through [`.on()`](../on/readme.md) or [`.one()`](../on/readme.md). Without arguments, removes every Dabby-attached handler from each element. Otherwise, removes only the matching handlers, optionally narrowed by delegation selector and callback reference.

Comparison of the callback reference is performed by comparing the `toString()` of the original handler against the supplied one, so passing the exact same function reference is the most reliable way to remove a single handler.

## Signatures

```ts
off(): this;
off(events: EventMap): this;
off(events: string, callback: OnCallback): this;
off(events: string, selector: string, callback?: OnCallback): this;
```

`OnCallback` is `(this: Element, event: Event, ...args: unknown[]) => void | false`. `EventMap` is `Record<string, OnCallback>`.

## Parameters

- `events` (`string | EventMap`, optional) — A space-separated list of event names, or a plain object whose keys are event names and whose values are the handlers to remove. Omit to remove every handler bound through Dabby.
- `selector` (`string`, optional) — The delegation selector that the handler was originally bound with. Required to match a delegated handler.
- `callback` (`OnCallback`, optional) — The handler reference (or one whose `toString()` matches). Omit to remove all handlers for the named event(s).

## Returns

The original Dabby collection, for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/off/off";

// Remove every handler bound through Dabby on these elements
$(".widget").off();

// Remove every click handler
$("a").off("click");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/off/off";

// Remove a specific handler reference
function onClick() {
    console.log("clicked");
}

$("a").on("click", onClick);
$("a").off("click", onClick);

// Remove a delegated handler — the selector must match the original binding
$(".container").on("click", ".button", onClick);
$(".container").off("click", ".button", onClick);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/off/off";

// Use .one() semantics by hand: detach inside the handler after the first run
function once(this: Element) {
    console.log("first click only");
    $(this).off("click", once);
}

$("#start").on("click", once);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/off/off";

// Remove handlers using the same object passed to .on()
const handlers = {
    mouseenter() { /* ... */ },
    mouseleave() { /* ... */ },
};

$(".card").on(handlers);
$(".card").off(handlers);
```

## See also

- [$.fn.on()](../on/readme.md) — bind handlers
- [$.fn.trigger()](../trigger/readme.md) — dispatch a real event
- [$.fn.triggerHandler()](../triggerhandler/readme.md) — invoke handlers without dispatching

## Differences from jQuery

Does not support the `jQuery.Event` wrapper. Handler matching uses `Function.prototype.toString()` rather than identity, so handlers that share the exact same source as another handler may be removed together.
