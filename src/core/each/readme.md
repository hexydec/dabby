# .each()

Run a custom callback function on each item in a Dabby collection.

## Usage

```javascript
$(selector).each(callback);
```

The `this` variable will be set to the node of each item in the collection.

The callback uses the following pattern:

```javascript
function (index, element) {
	// your code here, this is the same as element
}
```

By returning `false` from a callback function, execution of subsequent callbacks in the current process will be halted.

## Example

The following example puts the innerText of each DIV into an array:

```html
<div class="map">First</div>
<div class="map">Second</div>
<div class="map">Third</div>
```
```javascript
let text = [];
$(".map").each(function () {
	text.push(this.innerText);
});
```
## Return value

Returns the inputted Dabby object.

## Differences to jQuery

None.
