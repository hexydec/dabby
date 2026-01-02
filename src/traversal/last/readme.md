# .last()

Retrieve the last item in the collection.

## Usage

```javascript
$(selector).last();
```

## Returns

A new Dabby collection containing the last item in the collection, or an empty collection if the original collection is empty.

## Examples

### Basic Usage

```javascript
// Get last list item
const $lastItem = $("li").last();

// Get last paragraph
const $lastPara = $("p").last();

// Get last table row
const $lastRow = $("tr").last();
```

### Real-World Examples

```javascript
// Highlight last item
$(".list-item").last().addClass("last");

// Get last input value
const lastValue = $("input[type='text']").last().val();

// Style last card differently
$(".card").last().css("border-bottom", "none");

// Remove last notification
$(".notification").last().remove();

// Focus last field
$("form").find("input").last().focus();

// Different style for last element
$(".gallery-image").last().addClass("no-margin");

// Get last matching element
const $lastActive = $(".item").filter(".active").last();

// Add separator to all but last
$(".menu-item").not($(".menu-item").last()).addClass("has-separator");

// Disable last option
$("select option").last().prop("disabled", true);

// Check if last item is visible
if ($(".product").last().is(":visible")) {
    console.log("All products are visible");
}

// Scroll to last element
const $lastMessage = $(".message").last();
if ($lastMessage.length) {
    $lastMessage[0].scrollIntoView({ behavior: "smooth" });
}

// Auto-expand last accordion
$(".accordion-section").last().addClass("expanded");

// Highlight last search result
$(".search-result").last().css("background-colour", "#f0f0f0");

// Get last error message
const $lastError = $(".error-message").last();
if ($lastError.length) {
    $lastError.addClass("highlighted");
}

// Different style for last row
$("table tr").last().css("font-weight", "bold");

// Add text to last item
$(".breadcrumb-item").last().addClass("current");
```

## Differences to jQuery

None.
