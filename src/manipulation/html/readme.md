# .html()

Sets or retrieves the HTML within each item in the collection.

## Usage

```javascript
const html = $(selector).html();
$(selector).html(html);
$(selector).html(function (index, currentHtml) {});
```

### html

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to insert as HTML into each of the items in the collection.

### function

A callback that receives the index of the element in the collection and the current HTML. Should return the new HTML content. `this` will reference the current item in the collection that is being processed.

## Returns

The original Dabby collection when setting HTML, or a string containing the HTML from the first item in the collection when getting.

## Examples

### Getting HTML

```javascript
// Get HTML from the first matching element
const content = $(".article").html();
// Returns: "<h1>Title</h1><p>Content...</p>"

// Get HTML from a specific element
const cardHtml = $("#card-1").html();

// Returns empty string if collection is empty
const missing = $(".nonexistent").html(); // ""
```

### Setting HTML

```javascript
// Set HTML content
$(".container").html("<p>New content</p>");

// Set complex HTML structure
$(".article").html(`
    <h1>Article Title</h1>
    <p>First paragraph</p>
    <p>Second paragraph</p>
`);

// Clear HTML content
$(".container").html("");

// Set HTML from another element
const sourceHtml = $(".template").html();
$(".target").html(sourceHtml);
```

### Using Callbacks

```javascript
// Transform current HTML
$(".item").html(function (index, currentHtml) {
    return "<div class='wrapper'>" + currentHtml + "</div>";
});

// Add index to content
$(".card").html(function (index, currentHtml) {
    return `<span class="card-number">${index + 1}</span>${currentHtml}`;
});

// Conditional HTML based on current content
$(".message").html(function (index, currentHtml) {
    if (currentHtml.includes("error")) {
        return "<strong>⚠️ " + currentHtml + "</strong>";
    }
    return currentHtml;
});
```

### Real-World Examples

```javascript
// Load content via AJAX
$.ajax("/api/article/123", {
    success: function (response) {
        $(".article-content").html(response.html);
    }
});

// Dynamic content updates
function updateNotifications(count) {
    if (count > 0) {
        $(".notification-badge").html(count);
    } else {
        $(".notification-badge").html("");
    }
}

// Template rendering
function renderProductCard(product) {
    return `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p class="price">£${product.price}</p>
            <button class="buy-button">Add to Basket</button>
        </div>
    `;
}

$(".product-list").html(
    products.map(renderProductCard).join("")
);

// Tab content switching
$(".tab-button").on("click", function () {
    const tabId = $(this).data("tab");

    // Clear all tabs
    $(".tab-content").html("");

    // Load content for selected tab
    $(`#${tabId}`).html(getTabContent(tabId));
});

// Error message display
function showError(message) {
    $(".error-container").html(`
        <div class="alert alert--error">
            <strong>Error:</strong> ${message}
        </div>
    `);
}

// Search results rendering
function displaySearchResults(results) {
    if (results.length === 0) {
        $(".search-results").html("<p>No results found</p>");
        return;
    }

    const resultsHtml = results.map(result => `
        <div class="search-result">
            <h3>${result.title}</h3>
            <p>${result.excerpt}</p>
        </div>
    `).join("");

    $(".search-results").html(resultsHtml);
}

// Modal content loading
$(".open-modal").on("click", function () {
    const modalContent = $(this).data("modal-content");

    $(".modal-body").html(modalContent);
    $(".modal").show();
});

// Dynamic form generation
function createFormFields(fields) {
    const html = fields.map(field => `
        <div class="form-field">
            <label>${field.label}</label>
            <input type="${field.type}" name="${field.name}" />
        </div>
    `).join("");

    $(".dynamic-form").html(html);
}

// Live preview
$("textarea[name='content']").on("input", function () {
    const content = $(this).val();
    $(".preview-pane").html(content);
});
```

## Differences to jQuery

None.
