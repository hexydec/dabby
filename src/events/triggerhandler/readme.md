# $.fn.triggerHandler(name, data?)

Invoke the handlers bound to the first element in the collection without dispatching a real DOM event. No event bubbles, no native default action runs, and the return value of the last matching handler is returned to the caller, which makes `.triggerHandler()` ideal for treating event handlers as ordinary functions whose result you want to read.

Each matching handler receives a synthetic event-like object with `target`, `currentTarget`, and `arg` properties — the supplied `data` is exposed as `arg` rather than `detail`.

## Signatures

```ts
triggerHandler(name: string, data?: unknown): unknown;
```

## Parameters

- `name` (`string`) — The event name whose bound handlers should be invoked.
- `data` (`unknown`, optional) — A value passed to handlers via the synthetic event's `arg` property.

## Returns

The return value of the last matching handler, or `undefined` if no handler is bound to that event on the first element.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/triggerhandler/triggerhandler";

// Run a validation handler and read its return value
$("form").on("validate", function () {
    return (this as HTMLFormElement).checkValidity();
});

const isValid = $("form").triggerHandler("validate") as boolean;
if (!isValid) {
    console.log("form has errors");
}
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/triggerhandler/triggerhandler";

// Compute a value from the first matching element without changing the DOM
$(".price").on("calculateTotal", function () {
    const price = parseFloat(this.textContent ?? "0");
    const quantity = Number((this as HTMLElement).dataset.quantity ?? "1");
    return price * quantity;
});

const total = $(".price").triggerHandler("calculateTotal") as number;
$(".total").text(`£${total.toFixed(2)}`);
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/triggerhandler/triggerhandler";

// Run a click handler without following the link
$("a[href='#save']").on("click", function (event) {
    event.preventDefault();
    saveDocument();
    return "saved";
});

const result = $("a[href='#save']").triggerHandler("click");
console.log(result); // "saved"

declare function saveDocument(): void;
```

```ts
import $ from "dabbyjs";
import "dabbyjs/events/on/on";
import "dabbyjs/events/triggerhandler/triggerhandler";

// When several handlers are bound, only the last return value comes back
$("button").on("process", () => "step1");
$("button").on("process", () => "step2");

const last = $("button").triggerHandler("process");
console.log(last); // "step2"
```

## See also

- [$.fn.trigger()](../trigger/readme.md) — dispatch a real bubbling event
- [$.fn.on()](../on/readme.md) — bind handlers
- [$.fn.off()](../off/readme.md) — remove bound handlers

## Differences from jQuery

Does not support the `jQuery.Event` wrapper. Only handlers attached through Dabby's `.on()` are invoked — native listeners attached directly with `addEventListener` are not. Only the first element in the collection is processed, matching jQuery's behaviour.
