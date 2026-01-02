# .wrapAll()

Wraps all elements in the collection with a single provided wrapper element. Unlike `.wrap()`, this method wraps all elements together with one element, rather than wrapping each element individually.

## Usage

```javascript
$(selector).wrapAll(html);
```

### html

An HTML string, Node, array of Nodes, or Dabby collection to wrap around all matched elements.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Wrap all paragraphs with a single div
$("p").wrapAll("<div class='container'></div>");

// Before:
// <p>Paragraph 1</p>
// <p>Paragraph 2</p>
// <p>Paragraph 3</p>

// After:
// <div class="container">
//     <p>Paragraph 1</p>
//     <p>Paragraph 2</p>
//     <p>Paragraph 3</p>
// </div>
```

### Real-World Examples

```javascript
// Group related content
$(".article-intro, .article-body, .article-footer").wrapAll(
    "<article class='article-wrapper'></article>"
);

// Create a sidebar from multiple elements
$(".widget").wrapAll("<aside class='sidebar'></aside>");

// Group form fields
$("input[type='text'], input[type='email']").wrapAll(
    "<div class='text-inputs'></div>"
);

// Wrap list items in a group
$(".menu-item").wrapAll("<ul class='menu-list'></ul>");

// Create a gallery wrapper
$("img.gallery-image").wrapAll("<div class='image-gallery'></div>");

// Group table rows
$("tr.highlight").wrapAll("<tbody class='highlighted-rows'></tbody>");

// Wrap multiple headings and content
$("h3, p").wrapAll("<section class='content-block'></section>");

// Create a card from existing elements
$(".card-title, .card-body, .card-footer").wrapAll(
    "<div class='card'></div>"
);

// Group navigation items
$("nav a").wrapAll("<div class='nav-links'></div>");

// Wrap selected items
$(".selected").wrapAll("<div class='selection-group'></div>");
```

### Comparison with .wrap()

```javascript
// .wrap() - wraps each element individually
$("p").wrap("<div></div>");
// Result:
// <div><p>Paragraph 1</p></div>
// <div><p>Paragraph 2</p></div>
// <div><p>Paragraph 3</p></div>

// .wrapAll() - wraps all elements together
$("p").wrapAll("<div></div>");
// Result:
// <div>
//     <p>Paragraph 1</p>
//     <p>Paragraph 2</p>
//     <p>Paragraph 3</p>
// </div>
```

## Differences to jQuery

None.
