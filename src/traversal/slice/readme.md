# .slice()
Reduce a collection by the specified indices.

## Usage
```javascript
$(collection).slice(start, end);
```

### start
A number indicating the beginning of the selection.

### end
An optional number indicating the end of the selection.

## Returns
A new Dabby collection containing the specified subset of the original collection.

## Example
```javascript
// Given the HTML:
// <ul>
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
//   <li>Item 4</li>
// </ul>

$("li").slice(1, 3); // returns a new Dabby collection containing the <li> for "Item 2" and "Item 3"
```

## Differences to jQuery
None.