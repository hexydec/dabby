# $.fn.on(events, selector?, data?, callback)

Bind one or more event handlers to every element in the collection. Supports a single event name, a space-separated list, or a plain object mapping events to handlers, with optional event delegation and per-binding data.

A handler may return `false` to call `preventDefault()` and `stopPropagation()` on the event. Inside the handler, `this` references the element the handler is currently being invoked on (the matched delegate when delegating, otherwise the bound element).

## Signatures

```ts
on(events: EventMap): this;
on(events: string, callback: OnCallback): this;
on(events: string, selector: string, callback: OnCallback): this;
on(events: string, selector: string, data: unknown, callback: OnCallback): this;

one(events: EventMap): this;
one(events: string, callback: OnCallback): this;
one(events: string, selector: string, callback: OnCallback): this;
one(events: string, selector: string, data: unknown, callback: OnCallback): this;
```

`OnCallback` is `(this: Element, event: Event, ...args: unknown[]) => void | false`. `EventMap` is `Record<string, OnCallback>`.

## Parameters

- `events` (`string | EventMap`) — A space-separated list of event names, or a plain object whose keys are space-separated event names and whose values are the handlers for those events.
- `selector` (`string`, optional) — A descendant selector. When supplied, the handler only fires for events whose target (or its ancestor) matches this selector. Implements event delegation.
- `data` (`unknown`, optional) — Arbitrary data exposed on the event as `event.data`. If the native event already has a non-writable `data` property, the value is exposed as `event._data` instead.
- `callback` (`OnCallback`) — The handler. Invoked with the native event; additional arguments passed via `.trigger("event", [...])` are spread after the event.

## Returns

The original Dabby collection, for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";

// Simple click handler
$("a").on("click", function (event) {
    event.preventDefault();
    console.log("link clicked", this.href);
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";

// Multiple events sharing one handler
$("input").on("focus blur", function (event) {
    this.classList.toggle("focused", event.type === "focus");
});

// Multi-event handler object
$("button").on({
    mouseenter() { this.classList.add("hover"); },
    mouseleave() { this.classList.remove("hover"); },
    click()      { this.classList.add("clicked"); },
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";

// Delegation: one listener on the container handles all current and future buttons
$(".list").on("click", ".delete-button", function () {
    this.closest(".list-item")?.remove();
});

// Per-binding data exposed as event.data
$("#save").on("click", { role: "primary" }, (event) => {
    console.log((event as Event & { data: { role: string } }).data.role);
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";

// .one() detaches the handler after it fires once
$(".banner").one("click", function () {
    this.classList.add("dismissed");
});
```

## See also

- [$.fn.off()](../off/readme.md) — remove handlers bound by `.on()` / `.one()`
- [$.fn.trigger()](../trigger/readme.md) — dispatch a real event
- [$.fn.triggerHandler()](../triggerhandler/readme.md) — invoke handlers without dispatching
- [Named event shortcuts](../named/readme.md) — `.click()`, `.keydown()`, etc.

## Differences from jQuery

Does not support the `jQuery.Event` wrapper; handlers receive native `Event` objects. When the `data` property of the underlying event is not writable (which can happen for some native events), the handler reads the value from `event._data` instead of `event.data`.
