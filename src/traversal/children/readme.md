# .children()
Retrieves the children of each element in the collection, optionally filtered by a selector.

## Usage
```javascript
$(item).children();
$(item).children(selector);
```

### selector
An optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by.

## Returns
A new Dabby collection containing all the matched children.

## Example
Find all direct children of an element:

```javascript
// HTML:
// <ul id="my-list">
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li class="special">Item 3</li>
// </ul>

const items = $("#my-list").children();

// The `items` collection will now contain all three `<li>` elements.
console.log(items.length); // 3
```

Find children that match a specific selector:

```javascript
// Using the same HTML as above
const special = $("#my-list").children(".special");

// The `special` collection will now contain only the `<li>` with the class "special".
console.log(special.length); // 1
```

## Differences to jQuery
None.