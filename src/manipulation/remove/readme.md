# .detach()
Detaches some or all of the items in the collection from the DOM. This method is similar to .remove(), except it keeps all data and events associated with the detached elements. This is useful if you want to reinsert the elements into the DOM later.

## Usage
```javascript
$(selector).detach();
$(selector).detach(selector);
```

### selector
A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by.

## Returns
A new Dabby collection containing the detached nodes.

## Differences to jQuery
None.

## Examples
Detach all `<li>` elements from a `<ul>`, this will remove all list items from the `<ul>` and store them in a variable:

```javascript
const items = $("ul#my-list li").detach();
```

Detach a specific `<div>` with a filter, this will detach any `<p>` elements that are children of `#my-div`:

```javascript
const items = $("div#my-div p").detach("p");
```

# .remove()
Removes some or all of the items in the collection from the DOM. This method removes the selected elements and all of their associated data and events.

## Usage
```javascript
$(collection).remove();
$(collection).remove(selector);
```

### selector
A optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to filter the collection by.

## Returns
The original Dabby collection.

## Differences to jQuery
None.

## Examples
Remove a button from the page, this will completely remove the button and its associated data from the page:

```javascript
$("button#my-button").remove();
```

Remove specific `<li>` elements, this will remove any list items with the class completed:

```javascript
$("ul#my-list li").remove(".completed");
```