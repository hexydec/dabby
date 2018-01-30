# $.getScript()

Shorthand method to include a script into the DOM.

## Usage

```javascript
$.getScript(url[, success]);
```

See [$.ajax()](../ajax/readme.md) for a description of the input parameters.

## Return value

For asynchronous requests, the generated XMLHttpRequest object will be returned. Synchronous requests will return `undefined`.

## Example

The following example includes a script and runs a callback function on success:

```javascript
$.get(
	"/javascript/chart.js",
	function () {
		console.log("Script loaded");
	}
);
```
## Differences to jQuery

Dabby doesn't return a deferred object like jQuery does, so you cannot chain any deferred methods to this method.
