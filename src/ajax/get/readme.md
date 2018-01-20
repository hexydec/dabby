# .get()

Shorthand to make AJAX requests using the GET method.

## Usage

```javascript
$.get(url[, data, success, type]);
$.get(url, success[, type]);
```

See [$.ajax()](../ajax/readme.md) for a description of the input parameters.

## Return value

For asynchronous requests, the generated XMLHttpRequest object will be returned. Synchronous requests will return `undefined`.

## Example

The following example makes an AJAX request using the GET method:

```javascript
$.get(
	"/api.php",
	{action: "update", id: 5},
	function (response) {
		console.log(response);
	},
	"json"
);
```
## Differences to jQuery

None.
