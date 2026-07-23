# Named event shortcuts

This module installs twenty-four shortcut methods on `Dabby.prototype`, one per common DOM event. Each method has a dual behaviour: when called with no arguments it triggers the event on every element in the collection (equivalent to `.trigger("eventName")`); when called with a callback (and optionally a delegation selector and per-binding data) it binds a handler (equivalent to `.on("eventName", ...)`).

Importing this module pulls in [`.on()`](../on/readme.md) and [`.trigger()`](../trigger/readme.md) automatically.

## Signatures

Every shortcut shares the same four overloads. The signature for `click` is shown — substitute any of the available method names listed below.

```ts
click(): this;
click(callback: OnCallback): this;
click(selector: string, callback: OnCallback): this;
click(selector: string, data: unknown, callback: OnCallback): this;
```

`OnCallback` is `(this: Element, event: Event, ...args: unknown[]) => void | false`.

## Parameters

- `selector` (`string`, optional) — A descendant selector for delegation; the handler only fires when the event target (or an ancestor) matches it.
- `data` (`unknown`, optional) — Per-binding data exposed on the event as `event.data`.
- `callback` (`OnCallback`) — Handler invoked when the event fires; `this` is the matched element. Return `false` to call `preventDefault()` and `stopPropagation()`.

When invoked with no arguments, the method instead triggers the event and takes no parameters.

## Returns

The original Dabby collection, for chaining.

## Available methods

Mouse events
- `click()` — primary-button mouse click
- `dblclick()` — double click
- `mousedown()` — mouse button pressed
- `mouseup()` — mouse button released
- `mousemove()` — pointer moved over an element
- `mouseover()` — pointer entered an element (bubbles)
- `mouseout()` — pointer left an element (bubbles)
- `mouseenter()` — pointer entered an element (no bubble)
- `mouseleave()` — pointer left an element (no bubble)
- `contextmenu()` — context menu requested

Keyboard events
- `keydown()` — key pressed down
- `keypress()` — character key pressed (legacy)
- `keyup()` — key released

Focus events
- `focus()` — element gained focus (no bubble)
- `blur()` — element lost focus (no bubble)
- `focusin()` — element or descendant gained focus (bubbles)
- `focusout()` — element or descendant lost focus (bubbles)

Form events
- `change()` — committed value change on form controls
- `select()` — text selected in an input or textarea
- `submit()` — form submission

Window and document events
- `scroll()` — element or window scrolled
- `resize()` — window resized
- `error()` — resource failed to load (commonly on `<img>`)
- `unload()` — window is unloading

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/events/named/named";

// Bind a click handler
$("#save").click(function (event) {
    event.preventDefault();
    saveDocument();
});

// Trigger the click programmatically
$("#save").click();

declare function saveDocument(): void;
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/named/named";

// Delegated handler — one listener for many descendants
$(".list").click(".delete-button", function () {
    this.closest(".list-item")?.remove();
});

// Per-binding data exposed via event.data
$("#save").click({ role: "primary" }, (event) => {
    console.log((event as Event & { data: { role: string } }).data.role);
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/named/named";

// Inside a handler, `this` is the matched element
$("input").focus(function () {
    this.classList.add("focused");
}).blur(function () {
    this.classList.remove("focused");
});

// Replace a broken image with a placeholder
$("img").error(function () {
    (this as HTMLImageElement).src = "/images/placeholder.png";
});
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/named/named";

// Window-level shortcuts
$(window).resize(() => {
    document.body.classList.toggle("narrow", window.innerWidth < 768);
});

$(window).scroll(function () {
    const scrolled = (this as unknown as Window).scrollY > 100;
    document.body.classList.toggle("scrolled", scrolled);
});
```

## See also

- [$.fn.on()](../on/readme.md) — the underlying binding method
- [$.fn.off()](../off/readme.md) — remove bound handlers
- [$.fn.trigger()](../trigger/readme.md) — the underlying trigger method
- [$.fn.triggerHandler()](../triggerhandler/readme.md) — invoke handlers without dispatching

## Differences from jQuery

None.
