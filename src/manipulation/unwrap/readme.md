# .unwrap()
Removes the parents of some or all of the items in the collection, leaving the children in their place.

## Usage
```javascript
$(collection).unwrap();
$(collection).unwrap(selector);
```

### selector
An optional selector to match the parent element to be removed.

## Returns
The original Dabby collection.

## Differences to jQuery
None.

## Examples
Unwrap all `<div>` elements, this will remove the `<div>` parent of all `p` tags with the target class, moving the `p` tags up one level in the DOM tree.

```javascript
$("p.target").unwrap("div");
```

Unwrap a specific element, this will unwrap the `<p>` element from its `<span>` parent, leaving the `<span>`'s content in its place.

```javascript
$("p.my-paragraph").unwrap();
```