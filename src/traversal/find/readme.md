# .find()
Find descendants underneath the input collection that match the given selector.

## Usage
```javascript
$(collection).find(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

## Returns
A new Dabby collection containing the matched descendants.

## Example
```javascript
// Given the HTML:
// <div>
//   <p>Text</p>
// </div>
// <div>
//   <span>More Text</span>
// </div>

$("div").find("p"); // returns a Dabby collection containing the <p> tag
```

## Differences to jQuery
None.