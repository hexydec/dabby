# .first()
Retrieve the first item in the collection.

## Usage
```javascript
$(selector).first();
```

## Returns
A new Dabby collection containing the first item in the collection, or an empty collection if the original collection is empty.

## Example
```javascript
// Given the HTML:
// <ul>
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

$("li").first(); // returns a Dabby collection containing only the <li> for "Item 1"
```

## Differences to jQuery
None.