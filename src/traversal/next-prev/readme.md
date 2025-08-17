# .next()
Retrieve the next sibling of the first item in the collection.

## Usage
```javascript
$(collection).next(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection by.

## Returns
A new Dabby collection containing the next sibling.

## Example
```javascript
// Given the HTML:
// <div><p></p><span></span></div>

$("p").next(); // returns a new Dabby collection containing the <span>
```

## Differences to jQuery
None.

# .nextAll()
Retrieve all following siblings of each item in the collection.

## Usage
```javascript
$(collection).nextAll(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection by.

## Returns
A new Dabby collection containing the matching siblings.

## Example
```javascript
// Given the HTML:
// <div><p></p><span></span><a></a></div>

$("p").nextAll(); // returns a new Dabby collection containing the <span> and <a>
```

## Differences to jQuery
None.

# .nextUntil()
Retrieve the following siblings of each item in the collection up until the matched selector.

## Usage
```javascript
$(collection).nextUntil(selector, filter);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to capture all the following siblings until but not including the matched node.

### filter
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to filter the collection by.

## Returns
A new Dabby collection containing the matching siblings.

## Example
```javascript
// Given the HTML:
// <div><p></p><span></span><a></a></div>

$("p").nextUntil("a"); // returns a new Dabby collection containing the <span>
```

## Differences to jQuery
None.

# .prev()
Retrieve the previous sibling of the first item in the collection.

## Usage
```javascript
$(collection).prev(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection by.

## Returns
A new Dabby collection containing the previous sibling.

## Example
```javascript
// Given the HTML:
// <div><span></span><p></p></div>

$("p").prev(); // returns a new Dabby collection containing the <span>
```

## Differences to jQuery
None.

# .prevAll()
Retrieve all preceding siblings of each item in the collection.

## Usage
```javascript
$(collection).prevAll(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection by.

## Returns
A new Dabby collection containing the matching siblings.

## Example
```javascript
// Given the HTML:
// <div><a></a><span></span><p></p></div>

$("p").prevAll(); // returns a new Dabby collection containing the <span> and <a>
```

## Differences to jQuery
None.

# .prevUntil()
Retrieve the preceding siblings of each item in the collection up until the matched selector.

## Usage
```javascript
$(collection).prevUntil(selector, filter);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to capture all the preceding siblings until but not including the matched node.

### filter
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to filter the collection by.

## Returns
A new Dabby collection containing the matching siblings.

## Example
```javascript
// Given the HTML:
// <div><a></a><span></span><p></p></div>

$("p").prevUntil("a"); // returns a new Dabby collection containing the <span>
```

## Differences to jQuery
None.