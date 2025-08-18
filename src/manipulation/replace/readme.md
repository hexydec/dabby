# .replaceAll()
Replaces all elements matched by a selector with the elements in the current Dabby collection. This method is the reverse of `.replaceWith()`.

## Usage
```javascript
$(content).replaceAll(selector);
```

### selector
A selector string, Node, array of Nodes, Dabby collection or a callback function.

### content
An HTML string, Node, array of Nodes, or a Dabby collection.

## Returns
The original Dabby collection.

## Differences to jQuery
None.

## Examples
This will replace all `<h2>` elements with the `<p>` element.

```javascript
$("<p>A new paragraph</p>").replaceAll("h2");
```

# .replaceWith()
Replaces each element in the current Dabby collection with the provided new elements.

## Usage
```javascript
$(selector).replaceWith(content);
```

### selector
A selector string, Node, array of Nodes, Dabby collection or a callback function.

### content
An HTML string, Node, array of Nodes, or a Dabby collection.

## Returns
The original Dabby collection.

## Differences to jQuery
None.

## Examples
This will replace each `.item` div with a new `<li>` element:

```javascript
$(".item").replaceWith("<li>New List Item</li>");
```