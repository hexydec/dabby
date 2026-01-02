# .first()

Retrieve the first item in the collection.

## Usage

```javascript
$(selector).first();
```

## Returns

A new Dabby collection containing the first item in the collection, or an empty collection if the original collection is empty.

## Examples

### Basic Usage

```javascript
// Get first list item
const $firstItem = $("li").first();

// Get first paragraph
const $firstPara = $("p").first();

// Get first table row
const $firstRow = $("tr").first();
```

### Real-World Examples

```javascript
// Highlight first item
$(".list-item").first().addClass("first");

// Get first input value
const firstValue = $("input[type='text']").first().val();

// Auto-focus first field
$("form").find("input").first().focus();

// Style first card differently
$(".card").first().css("border-color", "#007bff");

// Remove first notification
$(".notification").first().remove();

// Expand first accordion
$(".accordion-section").first().addClass("expanded");

// Select first option
$("select option").first().prop("selected", true);

// Show first error
$(".error-message").first().show();

// Different style for first element
$(".gallery-image").first().addClass("featured");

// Get first matching element
const $firstActive = $(".item").filter(".active").first();

// Auto-select first tab
$(".tab-button").first().addClass("active");
$(".tab-content").first().show();
```

## Differences to jQuery

None.
