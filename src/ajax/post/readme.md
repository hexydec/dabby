# .post()

Shorthand to make AJAX requests using the POST method.

## Usage

```javascript
$.post(url[, data, success, type]);
$.post(url, success[, type]);
```

See [$.ajax()](../ajax/readme.md) for a description of the input parameters.

## Return value

For asynchronous requests, the generated XMLHttpRequest object will be returned. Synchronous requests will return `undefined`.

## Example

The following example makes an AJAX request using the POST method:

```javascript
$.post(
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