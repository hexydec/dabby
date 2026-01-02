# .empty()

Empty the contents of each item in the collection, removing all child nodes.

## Usage

```javascript
$(selector).empty();
```

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Remove all children from a container
$(".container").empty();

// Clear a list
$("ul").empty();

// Empty multiple elements
$(".card-body").empty();
```

### Real-World Examples

```javascript
// Clear search results before new search
$("input[name='search']").on("input", function () {
    $(".search-results").empty();

    const term = $(this).val();

    if (term.length >= 3) {
        // Perform search and append new results
        performSearch(term);
    }
});

// Reset form containers
function resetForm() {
    $(".error-messages").empty();
    $(".dynamic-fields").empty();
    $("form")[0].reset();
}

// Clear and rebuild a list
function updateProductList(products) {
    const $list = $(".product-list");

    // Remove all existing products
    $list.empty();

    // Add new products
    products.forEach(function (product) {
        $list.append(createProductCard(product));
    });
}

// Empty modal content before loading new content
$(".modal-trigger").on("click", function () {
    $(".modal-body").empty();

    const contentUrl = $(this).data("content-url");

    $.ajax(contentUrl, {
        success: function (html) {
            $(".modal-body").html(html);
            $(".modal").show();
        }
    });
});

// Clear notification area
function clearNotifications() {
    $(".notification-container").empty();
}

// Reset table body
function clearTable() {
    $("table tbody").empty();
}

// Clear dropdown options (except first)
function resetDropdown() {
    $("select option:not(:first)").remove();
    // Or: $("select").empty().append("<option>Select...</option>");
}

// Clear chat messages
$(".clear-chat").on("click", function () {
    if (confirm("Clear all messages?")) {
        $(".chat-messages").empty();
    }
});

// Remove tab content when switching
$(".tab-button").on("click", function () {
    // Empty all tab panels
    $(".tab-panel").empty();

    // Load content for selected tab
    const tabId = $(this).data("tab");
    loadTabContent(tabId);
});

// Clear filters
$(".clear-filters").on("click", function () {
    $(".active-filters").empty();
    $(".filter-checkbox").prop("checked", false);
    loadProducts(); // Reload without filters
});
```

## Differences to jQuery

None.
