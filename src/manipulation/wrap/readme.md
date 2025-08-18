# .wrap()
Wraps each element in the collection with the provided new elements.

## Usage
```javascript
$(selector).wrap(html);
```

### html
An HTML string, Node, array of Nodes, Dabby collection or a callback function.

## Returns
The original Dabby collection.

## Differences to jQuery
None.

## Examples
Wrap a single element, this will wrap the `<p>` element with a `<div>` element:

```javascript
// HTML before
// <p>Hello, World!</p>

$("p").wrap("<div>");

// HTML after
// <div><p>Hello, World!</p></div>
```

Wrap multiple elements, this will wrap each `<li>` element with a `<div>` element:

```javascript
// HTML before
// <p>Item 1</p>
// <p>Item 2</p>
// <p>Item 3</p>

const div = $("<div>", {"class": "wrap"});
$("p").wrap(div); // will be cloned for each item that is wrapped

// HTML after
// <div class="wrap"><p>Item 1</p></div>
// <div class="wrap"><p>Item 2</p></div>
// <div class="wrap"><p>Item 3</p></div>
```