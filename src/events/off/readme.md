# $.off()

Unbinds event handlers previously bound through [$.on()](../on/readme.md).

## Usage

```javascript
$(selector).off(events[, delegate][, handler]); // unbind events as a string
$(selector).off(events[, delegate]); // unbind events as an object
$(selector).off(); // unbind all events
```

### events

A string containing a space separated list of events to unbind, or a plain object where the key is a space separated list of events to unbind and the value is the event handler.

### delegate

A string specifying a selector the event to unbind is delegated to.

### handler

When `events` is a string, this is the callback function to match against the bound handlers for removal.

## Returns

The original dabby collection.

## Example

```javascript

// simple example
$("a").off("click"); // remove all click events
$("a").off("click", handler); // remove click events bound with this handler

// multiple events as a string
$("a").off("click hover", handler);

// delegate the event
$(".container").off("click hover", "a", handler);

// multiple events as an object
$("a").off({
	click: e => handler,
	hover: e => handler
});
```

## Differences to jQuery

Doesn't suport the jQuery.Event object.
