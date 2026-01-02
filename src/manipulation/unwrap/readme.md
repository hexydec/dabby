# .unwrap()

Removes the parents of some or all of the items in the collection, leaving the children in their place.

## Usage

```javascript
$(collection).unwrap();
$(collection).unwrap(selector);
```

### selector

An optional selector to match the parent element to be removed. If provided, only parents matching this selector will be removed.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Remove the parent of all paragraphs
$("p").unwrap();

// Before:
// <div><p>Paragraph</p></div>

// After:
// <p>Paragraph</p>

// Remove only matching parents
$("p").unwrap("div.wrapper");
// Only removes <div class="wrapper"> parents, not other parents
```

### Real-World Examples

```javascript
// Remove wrapper divs
$(".content").unwrap("div");

// Unwrap images from links
$("img").unwrap("a");

// Remove styling wrappers
$("span.highlight").unwrap();

// Unwrap list items from temporary container
$("li").unwrap(".temp-container");

// Remove figure tags, leaving images
$("img").unwrap("figure");

// Clean up nested divs
$(".inner-content").unwrap(".outer-wrapper");

// Remove table cell wrappers
$("input").unwrap("td");

// Unwrap paragraphs from sections
$("p").unwrap("section");

// Remove all span wrappers
$("strong, em").unwrap("span");

// Conditional unwrapping
if (isMobile) {
    $(".desktop-only-wrapper").children().unwrap();
}
```

### Practical Example

```javascript
// Before cleanup:
// <div class="temp-wrapper">
//     <div class="another-wrapper">
//         <p class="content">Text</p>
//     </div>
// </div>

$(".content").unwrap(); // Remove .another-wrapper
// Result:
// <div class="temp-wrapper">
//     <p class="content">Text</p>
// </div>

$(".content").unwrap(); // Remove .temp-wrapper
// Result:
// <p class="content">Text</p>
```

## Differences to jQuery

None.
