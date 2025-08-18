# .wrapAll()
Wraps all elements in the collection with the provided new elements. Unlike .wrap(), this method wraps all elements with a single element, rather than wrapping each element individually.

## Usage
```javascript
$(selector).wrapAll(html);
```

### html
An HTML string, Node, array of Nodes, Dabby collection or a callback function.

## Returns
The original Dabby collection.

## Differences to jQuery
None.

## Examples
This will wrap all `<h2>` and `<p>` elements with a `<div>` element:

```javascript
// HTML before
// <h2>Item 1</h2>
// <p>Item 2</p>
// <p>Item 3</p>

$("h2, p").wrapAll("<div>");

// HTML after
// <div>
//	<h2>Item 1</h2>
//	<p>Item 2</p>
//	<p>Item 3</p>
// </div>
```