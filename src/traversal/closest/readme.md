# .closest()
Finds the first ancestor of each element in the collection that matches a given selector, starting with the element itself.

## Usage
```javascript
$(collection).closest(selector);
$(collection).closest(selector, context);
```

### selector
A selector, HTML string, Node, array of Nodes, Dabby collection or a callback function to find the matching ancestor.

### context
An optional HTML string, Node, array of Nodes, or a function that returns HTML, indicating where the search for an ancestor should stop.

## Returns
A new Dabby collection containing the matched ancestors.

## Example
Find the closest div ancestor:

```javascript
// HTML:
// <div class="container">
//   <p>
//     <span>Hello</span>
//   </p>
// </div>

const span = $("span");
const div = span.closest("div");

// The `div` collection will now contain the `<div class="container">` element.
console.log(div.length); // 1
```

Find the closest list item with a specific class:

```javascript
// HTML:
// <ul>
//   <li class="item-a">
//     <p>
//       <a href="#">Link</a>
//     </p>
//   </li>
//   <li class="item-b">...</li>
// </ul>

const link = $("a");
const closest = link.closest("li.item-a");

// The `closest` collection will contain the `<li>` with class "item-a".
console.log(closest.length); // 1
```

Find the closest ancestor up to a specific context:

```javascript
// HTML:
// <div id="main-content">
//   <div class="card">
//     <p>
//       <span>Text</span>
//     </p>
//   </div>
// </div>
// <div id="sidebar">...</div>

const span = $("span");
const ancestor = span.closest(".card", "#main-content");

// The search will stop at `#main-content`, and `.card` is an ancestor within that context.
console.log(ancestor.length); // 1
```

## Differences to jQuery

None.