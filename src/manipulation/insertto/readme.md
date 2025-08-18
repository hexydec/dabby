# .insertBefore()
Add nodes before each object in a Dabby collection.

# .prependTo()
Prepend nodes to each object in a Dabby collection.

# .appendTo()
Append nodes to each object in a Dabby collection.

# .insertAfter()
Add nodes after each object in a Dabby collection.

## Usage
```javascript
$(content).insertBefore(selector);
$(content).prependTo(selector);
$(content).appendTo(selector);
$(content).insertAfter(selector);
```

### content
The Dabby collection, node, array of nodes, or document to insert.

### selector
A string specifying a CSS selector, a node, an array of nodes, a document, or a Dabby collection to attach the Dabby collection to.

## Returns
The original Dabby collection.

## Differences to jQuery
None.

## Examples

### Using .insertBefore()
This will insert the `<span>` element before the` <p>` element.

```javascript
$("<span>Hello</span>").insertBefore("p.target");
```

### Using .prependTo()
This will prepend the `<h2>` element to the `<section>` element.

```javascript
$("<h2>My Title</h2>").prependTo("section.main");
```

### Using .appendTo()
This will append the `<li>` element to the `<ul>` element.

```javascript
$("<li>Item 3</li>").appendTo("ul#my-list");
```

### Using .insertAfter()
This will insert the `<button>` element after the `<div>` element.

```javascript
$("<button>Click Me</button>").insertAfter("div#container");
```