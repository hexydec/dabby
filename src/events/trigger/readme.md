# trigger()

Triggers the specified event on the supplied dabby collection. If the event is a native javascript event, it will be triggered along with any event handlers that are bound.

## Usage

```javascript
$(selector).trigger(event[, data]);
```

### event

A string containing a Javascript event.

### data

An array or object containing any additional data to pass to the receiving event handlers.

## Returns

The original dabby collection.

## Example

```javascript
const obj = $("a");
obj.trigger("click"); // trigger a click event

// add an event handler and immediately trigger it
obj.on("click", e => alert(e.type)).trigger("click"); // alert("click")

// use custom data
obj.on("click", (e, data) => console.log(e.type, data)).trigger("click");
```

## Differences to jQuery

Doesn't suport the jQuery.Event object.
