# .each()

Run a custom callback function on each item in a Dabby collection.

## Usage

```javascript
$(selector).each(callback);
```

The `this` variable will be set to the node of each item in the collection.

The callback uses the following pattern:

```javascript
function (index, element) {
    // your code here, this is the same as element
}
```

By returning `false` from a callback function, execution of subsequent callbacks in the current process will be halted.

## Returns

Returns the inputted Dabby object.

## Examples

### Basic Usage

```javascript
// Iterate over elements
$("div").each(function (index, element) {
    console.log(index, this);
});

// Using index
$("li").each(function (index) {
    $(this).text(`Item ${index + 1}`);
});

// Break early
$(".item").each(function () {
    if ($(this).hasClass("target")) {
        // Do something
        return false; // Stop iteration
    }
});
```

### Real-World Examples

```javascript
// Collect text values
const text = [];

$(".map").each(function () {
    text.push(this.innerText);
});

console.log(text); // ["First", "Second", "Third"]

// Apply processing to each element
$(".price").each(function (index) {
    const price = parseFloat($(this).text());
    const discount = price * 0.1;
    $(this).data("discount", discount);
});

// Add sequential classes
$(".gallery-item").each(function (index) {
    $(this).addClass(`item-${index}`);
});

// Validate form fields
let isValid = true;

$("input[required]").each(function () {
    if (!$(this).val()) {
        $(this).addClass("error");
        isValid = false;
    }
});

if (!isValid) {
    alert("Please fill in all required fields");
}

// Build data structure
const products = [];

$(".product").each(function () {
    products.push({
        id: $(this).data("id"),
        name: $(this).find(".name").text(),
        price: parseFloat($(this).find(".price").text())
    });
});

// Update attributes
$("img[data-src]").each(function () {
    $(this).attr("src", $(this).data("src"));
});

// Calculate totals
let total = 0;

$(".cart-item").each(function () {
    const price = parseFloat($(this).find(".price").text());
    const quantity = parseInt($(this).find(".quantity").val());
    total += price * quantity;
});

$(".total").text(`£${total.toFixed(2)}`);

// Find first match
let firstMatch = null;

$(".item").each(function () {
    if ($(this).data("type") === "special") {
        firstMatch = this;
        return false; // Stop searching
    }
});

// Progressive enhancement
$(".enhanced-feature").each(function (index) {
    const $feature = $(this);

    setTimeout(function () {
        $feature.addClass("active");
    }, index * 100);
});

// Process table rows
$("table tr").each(function (index) {
    if (index === 0) return; // Skip header

    const $row = $(this);
    const cells = [];

    $row.find("td").each(function () {
        cells.push($(this).text());
    });

    console.log(`Row ${index}:`, cells);
});

// Add tooltips
$("[data-tooltip]").each(function () {
    const tooltip = $(this).data("tooltip");
    $(this).attr("title", tooltip);
});

// Count specific items
let count = 0;

$(".checkbox").each(function () {
    if ($(this).prop("checked")) {
        count++;
    }
});

$(".selected-count").text(count);

// Generate navigation
$("h2").each(function (index) {
    const heading = $(this).text();
    const id = `section-${index}`;

    $(this).attr("id", id);

    $(".table-of-contents").append(
        $("<a>")
            .attr("href", `#${id}`)
            .text(heading)
    );
});

// Lazy load images
$("img.lazy").each(function () {
    const $img = $(this);
    const src = $img.data("src");

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $img.attr("src", src);
                observer.unobserve(entry.target);
            }
        });
    });

    observer.observe(this);
});

// Apply alternating styles
$("tr").each(function (index) {
    if (index % 2 === 0) {
        $(this).addClass("even");
    } else {
        $(this).addClass("odd");
    }
});

// Initialise widgets
$("[data-widget]").each(function () {
    const widgetType = $(this).data("widget");

    switch (widgetType) {
        case "carousel":
            initialiseCarousel($(this));
            break;
        case "modal":
            initialiseModal($(this));
            break;
        case "dropdown":
            initialiseDropdown($(this));
            break;
    }
});

// Collect form data
const formData = {};

$("form input, form select, form textarea").each(function () {
    const name = $(this).attr("name");
    if (name) {
        formData[name] = $(this).val();
    }
});

// Add event handlers
$(".tab-button").each(function (index) {
    $(this).on("click", function () {
        $(".tab-button").removeClass("active");
        $(this).addClass("active");

        $(".tab-content").hide();
        $(".tab-content").eq(index).show();
    });
});

// Update timestamps
$(".timestamp").each(function () {
    const timestamp = $(this).data("timestamp");
    const date = new Date(timestamp * 1000);
    $(this).text(formatDate(date));
});

// Check conditions and act
$(".conditional-element").each(function () {
    const condition = $(this).data("condition");

    if (checkCondition(condition)) {
        $(this).show();
    } else {
        $(this).hide();
    }
});

// Aggregate values
const values = [];

$(".data-point").each(function () {
    values.push(parseFloat($(this).text()));
});

const average = values.reduce((a, b) => a + b, 0) / values.length;
console.log(`Average: ${average}`);
```

## Differences to jQuery

None.
