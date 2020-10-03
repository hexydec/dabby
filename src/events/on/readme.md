# $.on()

Bind event callbacks to DOM nodes.

## Usage

```javascript
$.on(events[, selector][, data], handler);
$.on(events[, selector][, data]);
```

### events

A string containing a space separated list of events to bind to, or a plain object where the key is a space separated list of events to bind to and the value is the event handler.

### selector

A string specifying a selector to delegate the event to.

### data

Data to be passed to the handler when the event is triggered.

### handler

When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s).

## Returns

The original dabby collection.

## Example

```javascript

// simple example
$("a").on("click", function (e) {
	alert($(this).attr("href")); // alert the href of the link
	e.preventDefault(); // don't visit the link
});

// multiple events as a string
$("a").on("click hover", function (e) {
	alert($(this).attr("href")); // alert the href of the link
	e.preventDefault(); // don't visit the link
});

// pass data
$("a").on("click hover", {type: "simple"}, function (e) {
	console.log(e.data); // the data passed to the event
	alert($(this).attr("href")); // alert the href of the link
	e.preventDefault(); // don't visit the link
});

// delegate the event
$(".container").on("click hover", "a", function (e) {
	alert($(this).attr("href")); // alert the href of the link
	e.preventDefault(); // don't visit the link
});

// multiple events as an object
$("a").on({
	click: e => alert(e.type), // click
	hover: e => alert(e.type) // hover
});
```

## Differences to jQuery

Doesn't suport the jQuery.Event object.
