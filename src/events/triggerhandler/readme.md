# .triggerHandler()

Trigger any handlers attached to the first object in a collection that were attached with [$.fn.on()](../on/readme.md). It will not trigger the native event like [$.fn.trigger()](../trigger/readme.md).

## Usage

```javascript
$(selector).triggerHandler(event, data);
```

### event

The name of the event to trigger the handlers on.

### data

Any data to be sent to the handler function.

## Returns

The return value from the last handler that was triggered.

## Example

```javascript
const obj = $("a");

// attach an evnt handler
obj.on("click", () => {
	alert("Clicked");
});

// trigger just the handler, won't trigger navigation like if you actually clicked it
obj.triggerHandler("click");
```

## Differences to jQuery

Doesn't suport the jQuery.Event object.
