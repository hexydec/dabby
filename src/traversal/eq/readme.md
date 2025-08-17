# .eq()
Creates a new Dabby collection containing the element at the specified index.

## Usage
```javascript
$(collection).eq(index);
```

### index
The zero-based index of the element to select. A negative number will select elements from the end of the collection.

## Returns
A new Dabby collection containing the single element at the requested index. If the index does not exist, an empty collection will be returned.

## Example
Select the first element of a collection:

```javascript
// HTML:
// <ul>
//   <li>Item 1</li>
//   <li>Item 2</li>
//   <li>Item 3</li>
// </ul>

const items = $('li'); // The collection contains all three <li> elements
const first = items.eq(0);

// The `first` collection now contains only the first <li> element.
console.log(first.text()); // "Item 1"
```

Select the last element of a collection using a negative index:

```javascript
// Using the same HTML as above
const last = items.eq(-1);

// The `last` collection now contains only the last <li> element.
console.log(last.text()); // "Item 3"
```

Select an element that doesn't exist:

```javascript
// Using the same HTML as above
const nonexistentItem = items.eq(5);

// The `nonexistentItem` collection will be empty.
console.log(nonexistentItem.length); // 0
```

## Differences to jQuery

None.