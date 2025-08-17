# .parent()
Retrieve the parent of each item in a collection.

## Usage
```javascript
$(collection).parent(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection by.

## Returns
A new Dabby collection containing the parent nodes.

## Example
```javascript
// Given the HTML:
// <div>
//   <p>Hello World</p>
// </div>

$("p").parent(); // returns a new Dabby collection containing the <div>
```

## Differences to jQuery
None.

# .parents()
Retrieve all the parents of each item in a collection.

## Usage
```javascript
$(collection).parents(selector);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection by.

## Returns
A new Dabby collection containing the parents.

## Example
```javascript
// Given the HTML:
// <body>
//   <div class="container">
//     <p>Hello World</p>
//   </div>
// </body>

$("p").parents(); // returns a new Dabby collection containing the <div> and <body>
```

## Differences to jQuery
None.

# .parentsUntil()
Retrieve the parents of each item in a collection until, but not including, the matched selector.

## Usage
```javascript
$(collection).parentsUntil(selector, filter);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function indicating where to stop matching parent nodes.

### filter
A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to filter the collection by.

## Returns
A new Dabby collection containing the parents.

## Example
```javascript
// Given the HTML:
// <body>
//   <div class="container">
//     <p>Hello World</p>
//   </div>
// </body>

$("p").parentsUntil(".container"); // returns a new Dabby collection containing only the <body>
```

## Differences to jQuery
None.