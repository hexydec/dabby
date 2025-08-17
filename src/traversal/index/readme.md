# .index()
Find the index of the first item to match the selector.

## Usage
```javascript
$(collection).index(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to filter the collection by.

## Returns
The index of the matched selector, or -1 if the selector does not match.

## Example
```javascript
// Given the HTML:
// <ul>
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li id="item-3">Item 3</li>
//   <li>Item 4</li>
// </ul>

// Find the index of the element with the id 'item-3' within the list of all <li> elements
$("li").index("#item-3"); // => 2
```

## Differences to jQuery
None.