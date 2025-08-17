# .siblings()
Retrieve the siblings of each item in a collection, optionally filtered by a selector.

## Usage
```javascript
$(collection).siblings(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection by.

## Returns
A new Dabby collection containing the siblings.

## Example
```javascript
// Given the HTML:
// <div>
//   <span>Hello</span>
//   <p>World</p>
//   <a>Link</a>
// </div>

$("p").siblings(); // returns a new Dabby collection containing the <span> and <a> tags
```

## Differences to jQuery
None.