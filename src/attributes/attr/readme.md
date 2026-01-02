# .attr()

Get attributes from the first node in a collection, or set attributes on all the nodes in a collection.

## Usage

```javascript
$(selector).attr(key); // => String
$(selector).attr(key, value); // => Dabby
$(selector).attr(attributes); // => Dabby
$(selector).attr(key, function (index, currentValue) {}); // => Dabby
```

### key

The name of the attribute to get or set.

### value

The value to set the attribute to.

### attributes

A plain object of key/value pairs representing the attributes to set.

### function

A callback that receives the index of the element in the collection, and the current value of the attribute. Should return the new attribute value. `this` will reference the current item in the collection that is being processed.

## Returns

A string containing the value of the requested attribute when getting, or the original Dabby collection when setting attributes.

## Examples

### Getting Attributes

```javascript
// Get a single attribute from the first element
const href = $("a").attr("href");
// Returns: "https://example.com"

const alt = $("img").attr("alt");
// Returns: "A descriptive image"

// Returns undefined if attribute doesn't exist
const missing = $("div").attr("data-missing"); // undefined
```

### Setting Attributes

```javascript
// Set a single attribute on all matching elements
$("a").attr("href", "https://hexydec.github.io/dabby");

// Set the target attribute on all links
$("a").attr("target", "_blank");

// Set multiple attributes using an object
$("img").attr({
    alt: "A person holding a pineapple",
    src: "images/pineapple.png",
    loading: "lazy"
});

// Chain attribute calls
$("a")
    .attr("href", "https://example.com")
    .attr("rel", "noopener noreferrer")
    .attr("target", "_blank");
```

### Using Callbacks

```javascript
// Set attribute based on current value
$("img").attr("alt", function (index, currentAlt) {
    return currentAlt ? currentAlt + " (updated)" : "Image " + (index + 1);
});

// Set different values for each element
$("a").attr("href", function (index) {
    return "page-" + (index + 1) + ".html";
});

// Add index to data attributes
$(".item").attr("data-index", function (index) {
    return index;
});
```

### Real-World Examples

```javascript
// Update all external links to open in new tab
$("a[href^='http']").attr({
    target: "_blank",
    rel: "noopener noreferrer"
});

// Lazy load images
$("img").attr({
    loading: "lazy",
    decoding: "async"
});

// Add ARIA attributes for accessibility
$(".button-icon").attr({
    "aria-label": "Close dialogue",
    "role": "button",
    "tabindex": "0"
});

// Dynamic image gallery with data attributes
$(".gallery-image").each(function (index, img) {
    $(img).attr({
        "data-gallery-index": index,
        "data-src-full": $(img).attr("src").replace("-thumb", "-full"),
        "alt": "Gallery image " + (index + 1)
    });
});

// Form field validation attributes
$("input[type='email']").attr({
    required: "required",
    pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
    title: "Please enter a valid email address"
});
```

## Differences to jQuery

None.
