# .is(), .filter(), .not()

Test elements against a selector or filter collections based on criteria.

## .is()

Determine whether any item in a Dabby collection matches the given selector.

### Usage

```javascript
$(collection).is(selector);
```

### Returns

A boolean value indicating whether any item in the collection matches the input selector.

## .filter()

Create a new collection containing a subset of the nodes in the original Dabby collection that match the given selector.

### Usage

```javascript
$(selector).filter(selector);
$(selector).filter(function (index, element) {});
```

### Returns

A new Dabby collection containing the nodes that match the supplied selector.

## .not()

Create a new collection containing only the items in the input collection that do not match the input selector.

### Usage

```javascript
$(selector).not(selector);
$(selector).not(function (index, element) {});
```

### Returns

A new Dabby collection containing the nodes that do not match the selector.

## Parameters

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or callback function used to filter the collection.

### function

A callback that receives the index and element. Should return `true` to include the element in the result. `this` will reference the current element.

## Examples

### Using .is()

```javascript
// Check if element has a class
if ($(".button").is(".active")) {
    console.log("Button is active");
}

// Check element type
if ($(this).is("input")) {
    console.log("This is an input element");
}

// Check with callback
if ($(".items").is(function () {
    return $(this).data("selected") === true;
})) {
    console.log("At least one item is selected");
}

// Check if element is visible
if ($(".modal").is(":visible")) {
    console.log("Modal is visible");
}
```

### Using .filter()

```javascript
// Filter by class
const activeItems = $(".item").filter(".active");

// Filter by attribute
const requiredFields = $("input").filter("[required]");

// Filter with callback
const expensiveProducts = $(".product").filter(function (index, element) {
    const price = parseFloat($(element).data("price"));
    return price > 100;
});

// Filter by data attribute
const featuredPosts = $(".post").filter(function () {
    return $(this).data("featured") === true;
});

// Chain filters
const result = $("li")
    .filter(".active")
    .filter(function (index) {
        return index < 5; // First 5 active items
    });
```

### Using .not()

```javascript
// Exclude elements with a class
const nonActiveItems = $(".item").not(".active");

// Exclude by selector
const visibleDivs = $("div").not(":hidden");

// Exclude with callback
const inStockProducts = $(".product").not(function () {
    return $(this).data("stock") === 0;
});

// Exclude specific elements
const $firstItem = $(".item").first();
const otherItems = $(".item").not($firstItem);

// Exclude multiple classes
const filtered = $(".card").not(".disabled, .hidden");
```

### Real-World Examples

```javascript
// Form validation - filter invalid fields
function getInvalidFields() {
    return $("input[required]").filter(function () {
        return !$(this).val();
    });
}

// Show only selected items
$(".show-selected").on("click", function () {
    $(".item").not(".selected").hide();
    $(".item").filter(".selected").show();
});

// Highlight specific rows
$("tr").filter(function (index) {
    return index % 2 === 0;
}).addClass("even");

// Disable unavailable options
$("select option").filter(function () {
    return $(this).data("available") === false;
}).prop("disabled", true);

// Check if any errors exist
if ($(".form-field").is(".error")) {
    alert("Please fix the errors before submitting");
    return false;
}

// Filter products by price range
function filterByPriceRange(min, max) {
    return $(".product").filter(function () {
        const price = parseFloat($(this).data("price"));
        return price >= min && price <= max;
    });
}

const affordableProducts = filterByPriceRange(0, 50);
affordableProducts.show();
$(".product").not(affordableProducts).hide();

// Remove completed tasks
$(".delete-completed").on("click", function () {
    $(".task").filter(".completed").remove();
});

// Toggle visibility based on category
$(".category-filter").on("change", function () {
    const category = $(this).val();

    if (category === "all") {
        $(".product").show();
    } else {
        $(".product").not(`[data-category="${category}"]`).hide();
        $(".product").filter(`[data-category="${category}"]`).show();
    }
});

// Check if form is valid
function isFormValid() {
    const $invalidFields = $("input, textarea, select").filter(function () {
        const $field = $(this);

        if ($field.prop("required") && !$field.val()) {
            return true;
        }

        if ($field.attr("type") === "email") {
            const email = $field.val();
            return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        return false;
    });

    return $invalidFields.length === 0;
}

// Select alternating items
const oddItems = $(".list-item").filter(function (index) {
    return index % 2 === 1;
});
oddItems.addClass("odd");

// Find items with errors, excluding disabled ones
const fieldsWithErrors = $(".form-field")
    .not(".disabled")
    .filter(".error");

// Check if clicked element is a button
$("body").on("click", function (e) {
    if ($(e.target).is("button, .button")) {
        console.log("Button clicked");
    }
});
```

## Differences to jQuery

None.
