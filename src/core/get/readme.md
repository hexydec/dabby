# .get()

Retrieve raw HTML nodes from a Dabby collection.

## Usage

```javascript
$(selector).get();
$(selector).get(index);
```

## Example

The following example puts the innerText of each DIV into an array:

```html
<div class="map">First</div>
<div class="map">Second</div>
<div class="map">Third</div>
```
```javascript
let node = $(".map").get(1).innerText; // Second
let nodes = $(".map").get(); // an array containing all the divs
```
## Return value

By passing `index` to this method, the node sitting at that index in the Dabby collection will be returned. If no value is passed, an array containing all nodes from the collection will be returned.

## Differences to jQuery

None.
