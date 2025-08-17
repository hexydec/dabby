# .has()
Reduce the input collection to those that have descendants matching the input selector.

## Usage
```javascript
$(selector).has(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

## Returns
A new Dabby collection containing the nodes in the original collection that have descendants matching the selector.

## Example
```javascript
// Given the HTML:
// <div>
//   <p>Hello World</p>
// </div>
// <div>
//   <span>Goodbye World</span>
// </div>

$("div").has("p"); // returns a Dabby collection containing only the first <div> tag
```

## Differences to jQuery
None.