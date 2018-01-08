# .map()

Run a callback function on each node in a Dabby collection, and return an array.

## Usage

```javascript
$(selector).map(callback);
```

The callback uses the following pattern:

```javascript
function (index, element) {
	// your code here, this is the same as element
}
```

## Example

The following example extracts the innerText from the HTML as an array:

```html
<div class="map">First</div>
<div class="map">Second</div>
<div class="map">Third</div>
```
```javascript
var arr = $(".map").map(function () {
	return this.innerText;
});
```
## Return value

An array containing the values returned from the callback.

## Differences to jQuery

Dabby does not support making a collection from anything but nodes, so whereas in jQuery this method returns a jQuery collection wrapping the return values, Dabby returns a plain array.
