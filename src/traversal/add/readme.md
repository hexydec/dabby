# .add()

Creates a new Dabby collection with elements added to the end of the existing collection.

## Usage

```javascript
$(selector).add(nodes);
$(selector).add(nodes, context);
```

#### nodes

A selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to add to the collection.

#### context

An optional selector, HTML string, Node, array of Nodes, Dabby collection or a callback function indicating where the `nodes` selector should start matching.

## Returns

A new Dabby collection containing the nodes from the original collection plus the new nodes that were added.

## Example

Add a new element to an existing collection:

```javascript
// Assume we have a collection of list items
const items = $("li");
console.log(items.length); // 3

// Add a new list item to the collection
const newitems = items.add("<li>Item 4</li>");
console.log(newitems.length); // 4
```

Add elements that match a selector from a specific context:

```javascript
// HTML:
// <div id="container1">
//   <p>Hello</p>
// </div>
// <div id="container2">
//   <p>World</p>
// </div>

const container1 = $("#container1");
const paragraphs = container1.add("p", "#container2");

// The paragraphs collection will now contain the <p> from #container1
// and the <p> from #container2.
console.log(paragraphs.length); // 2
```

## Differences to jQuery

None.