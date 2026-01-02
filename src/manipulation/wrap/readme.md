# .wrap()

Wraps each element in the collection with the provided new elements.

## Usage

```javascript
$(selector).wrap(html);
$(selector).wrap(function (index) {});
```

### html

An HTML string, Node, array of Nodes, Dabby collection, or callback function that returns the wrapping element.

### function

A callback that receives the index of the element and should return the HTML, Node, or Dabby collection to wrap around the element.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Wrap each paragraph with a div
$("p").wrap("<div class='wrapper'></div>");

// Before:
// <p>Paragraph 1</p>
// <p>Paragraph 2</p>

// After:
// <div class="wrapper"><p>Paragraph 1</p></div>
// <div class="wrapper"><p>Paragraph 2</p></div>
```

### Using Callbacks

```javascript
// Wrap with different elements based on index
$("p").wrap(function (index) {
    return `<div class="wrapper-${index}"></div>`;
});

// Conditional wrapping
$("img").wrap(function (index) {
    const hasCaption = $(this).attr("alt");
    return hasCaption ? "<figure></figure>" : "<div></div>";
});
```

### Real-World Examples

```javascript
// Wrap images with links
$("img[data-full-url]").wrap(function () {
    const fullUrl = $(this).data("full-url");
    return `<a href="${fullUrl}" class="image-link"></a>`;
});

// Add container to form fields
$("input, select, textarea").each(function () {
    $(this).wrap('<div class="form-control"></div>');
});

// Wrap headings with sections
$("h2").wrap("<section class='content-section'></section>");

// Add wrapper for styling
$(".card-content").wrap("<div class='card-inner'></div>");

// Create clickable card wrappers
$(".product-card").wrap(function () {
    const productId = $(this).data("product-id");
    return `<a href="/products/${productId}" class="product-link"></a>`;
});

// Wrap table cells for additional styling
$("td.price").wrap("<div class='price-wrapper'></div>");

// Add responsive video wrapper
$("iframe[src*='youtube'], iframe[src*='vimeo']").wrap(
    "<div class='video-container'></div>"
);

// Wrap alternating rows differently
$("tr").wrap(function (index) {
    return index % 2 === 0
        ? "<div class='even-row'></div>"
        : "<div class='odd-row'></div>";
});
```

## Differences to jQuery

None.
