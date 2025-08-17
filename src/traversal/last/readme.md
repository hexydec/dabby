# .last()
Retrieve the last item in the collection.
## Usage
```javascript
$(selector).last();
```

## Returns
A new Dabby collection containing the last item in the collection, or an empty collection if the original collection is empty.

## Example
```javascript
// Given the HTML:
// <ul>
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

$("li").last(); // returns a Dabby collection containing only the <li> for "Item 3"
```

## Differences to jQuery
None.