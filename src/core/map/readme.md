# .map()

Run a callback function on each node in a Dabby collection, and return an array.

## Usage

```javascript
$(selector).map(callback);
```

The callback uses the following pattern:

```javascript
function (index, element) {
    // your code here, this is the same as element
}
```

## Returns

An array containing the values returned from the callback.

## Examples

### Basic Usage

```javascript
// Extract text values
const arr = $(".map").map(function () {
    return this.innerText;
});
console.log(arr); // ["First", "Second", "Third"]

// Extract attributes
const ids = $(".item").map(function () {
    return $(this).attr("id");
});

// Extract data attributes
const values = $(".product").map(function () {
    return $(this).data("price");
});
```

### Real-World Examples

```javascript
// Collect form values
const formValues = $("input[type='text']").map(function () {
    return $(this).val();
});

console.log(formValues); // ["John", "Doe", "john@example.com"]

// Extract URLs
const imageUrls = $("img").map(function () {
    return $(this).attr("src");
});

// Build array of objects
const products = $(".product").map(function () {
    return {
        id: $(this).data("id"),
        name: $(this).find(".name").text(),
        price: parseFloat($(this).find(".price").text())
    };
});

// Get all link hrefs
const links = $("a").map(function () {
    return $(this).attr("href");
});

// Extract numeric values
const prices = $(".price").map(function () {
    return parseFloat($(this).text().replace("£", ""));
});

const total = prices.reduce((sum, price) => sum + price, 0);

// Collect classes
const classes = $(".element").map(function () {
    return $(this).attr("class");
});

// Get dimensions
const dimensions = $(".box").map(function () {
    return {
        width: $(this).width(),
        height: $(this).height()
    };
});

// Extract selected values
const selectedOptions = $("select option:selected").map(function () {
    return $(this).val();
});

// Collect IDs
const elementIds = $("[id]").map(function () {
    return this.id;
});

// Build navigation data
const navItems = $("nav a").map(function () {
    return {
        text: $(this).text(),
        href: $(this).attr("href"),
        active: $(this).hasClass("active")
    };
});

// Get all checkbox states
const checkboxStates = $(".checkbox").map(function () {
    return {
        name: $(this).attr("name"),
        checked: $(this).prop("checked")
    };
});

// Extract meta information
const metaTags = $("meta").map(function () {
    return {
        name: $(this).attr("name"),
        content: $(this).attr("content")
    };
});

// Collect element positions
const positions = $(".positioned").map(function () {
    const offset = $(this).offset();
    return {
        top: offset.top,
        left: offset.left
    };
});

// Get table data
const tableData = $("table tr").map(function () {
    return $(this).find("td").map(function () {
        return $(this).text();
    });
});

// Extract data attributes
const config = $("[data-config]").map(function () {
    return JSON.parse($(this).attr("data-config"));
});

// Collect validation errors
const errors = $(".error-field").map(function () {
    return $(this).data("error-message");
});

// Get image alt text
const altTexts = $("img").map(function () {
    return $(this).attr("alt") || "No description";
});

// Build breadcrumb array
const breadcrumbs = $(".breadcrumb-item").map(function () {
    return $(this).text().trim();
});

// Extract computed styles
const colours = $(".coloured").map(function () {
    return $(this).css("background-colour");
});

// Collect API endpoints
const endpoints = $("[data-endpoint]").map(function () {
    return $(this).data("endpoint");
});

// Get indices
const indices = $(".item.selected").map(function (index) {
    return index;
});

// Build options array
const options = $("select option").map(function () {
    return {
        value: $(this).val(),
        text: $(this).text(),
        selected: $(this).prop("selected")
    };
});

// Extract timestamps
const timestamps = $(".timestamp").map(function () {
    return parseInt($(this).data("timestamp"));
});

// Collect tag names
const tagNames = $("*").map(function () {
    return this.tagName.toLowerCase();
});

// Get unique values
const categories = $(".product").map(function () {
    return $(this).data("category");
});

const uniqueCategories = [...new Set(categories)];
```

## Differences to jQuery

Dabby does not support making a collection from anything but nodes, whereas in jQuery this method returns a jQuery collection wrapping the return values. Dabby returns a plain array.
