# trigger()

Triggers the specified event on the supplied dabby collection. If the event is a native javascript event, it will be triggered along with any event handlers that are bound.

## Usage

```javascript
$(selector).trigger(event[, data]);
```

### event

A string containing a Javascript event.

### data

An array containing any additional data to pass to the receiving event handlers. When using $.fn.on(), each item in the array will be passed as an additional parameter.

## Returns

The original dabby collection.

## Example

```javascript
const obj = $("a");
obj.trigger("click"); // trigger a click event

// add an event handler and immediately trigger it
obj.on("click", e => alert(e.type)).trigger("click"); // alert("click")

// use custom data
obj.on("click", (e, param1 param2) => console.log(e.type, param1, param2)).trigger("click", ["foo", "bar"]); // "click", "foo", "bar"
```

## Differences to jQuery

The native event is used instead of the proprietory jQuery.event object.

The `data` parameter only supports an array to be passed to it, not an object which jQuery also allows.
