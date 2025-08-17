# .is()
Determine whether any item in a Dabby collection matches the given selector.

## Usage
```javascript
$(collection).is(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

## Returns
A boolean value indicating whether any item in the collection matches the input selector.

## Example
```javascript
// Given the HTML:
// <ul>
//   <li>Item 1</li>
//   <li class="active">Item 2</li>
//   <li>Item 3</li>
// </ul>

$("li:first").is(".active"); // => false
$("li:nth-child(2)").is(".active"); // => true
```

## Differences to jQuery
None.

# .filter()
Create a new collection containing a subset of the nodes in the original Dabby collection that match the given selector.

## Usage
```javascript
$(selector).filter(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

## Returns
A new Dabby collection containing the nodes that match the supplied selector.

## Example
```javascript
// Given the HTML:
// <ul>
//   <li>Item 1</li>
//   <li class="active">Item 2</li>
//   <li class="active">Item 3</li>
//   <li>Item 4</li>
// </ul>

$("li").filter(".active"); // returns a Dabby collection containing the <li> for "Item 2" and "Item 3"
```

## Differences to jQuery
None.

# .not()
Create a new collection containing only the items in the input collection that do not match the input selector.

## Usage
```javascript
$(selector).not(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

## Returns
A new Dabby collection containing the nodes that do not match the selector.

## Example
```javascript
// Given the HTML:
// <ul>
//   <li>Item 1</li>
//   <li class="active">Item 2</li>
//   <li class="active">Item 3</li>
//   <li>Item 4</li>
// </ul>

$("li").not(".active"); // returns a Dabby collection containing the <li> for "Item 1" and "Item 4"
```

## Differences to jQuery
None.