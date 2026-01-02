# .text()

Retrieves the text from all items in the collection, or sets the text content on each item in the collection.

## Usage

```javascript
$(selector).text();
$(selector).text(text);
$(selector).text(function (index, currentText) {});
```

### text

A string of text, or a function that returns a string.

### function

A callback that receives the index of the element in the collection and the current text. Should return the new text content. `this` will reference the current item in the collection that is being processed.

## Returns

When getting text: A string containing the combined text of all elements in the collection.

When setting text: The original Dabby collection.

## Examples

### Getting Text

```javascript
// Get text from a single element
const title = $("h1").text();
// Returns: "Welcome to Our Site"

// Get combined text from multiple elements
const items = $("li").text();
// Returns: "Item 1Item 2Item 3" (concatenated)

// Get text from nested elements
const paragraph = $(".article p").text();

// Returns empty string if collection is empty
const missing = $(".nonexistent").text(); // ""
```

### Setting Text

```javascript
// Set text content
$("h1").text("New Page Title");

// Set text on multiple elements
$(".price").text("£29.99");

// Clear text content
$(".notification").text("");

// Set text with special characters (automatically escaped)
$(".message").text("Price: £50 & free delivery");
// Renders as: "Price: £50 & free delivery" (not interpreted as HTML)
```

### Using Callbacks

```javascript
// Transform current text
$("li").text(function (index, currentText) {
    return "Item " + (index + 1) + ": " + currentText;
});

// Add prefix to existing text
$(".price").text(function (index, currentText) {
    return "£" + currentText;
});

// Modify text based on condition
$(".status").text(function (index, currentText) {
    return currentText.toUpperCase();
});

// Add numbering
$(".step").text(function (index, currentText) {
    return `Step ${index + 1}: ${currentText}`;
});
```

### Real-World Examples

```javascript
// Update counter display
function updateCartCount(count) {
    $(".cart-count").text(count);

    if (count > 0) {
        $(".cart-badge").text(count).show();
    } else {
        $(".cart-badge").hide();
    }
}

// Search and highlight
$("input[name='search']").on("input", function () {
    const searchTerm = $(this).val().toLowerCase();

    $(".search-item").each(function (index, item) {
        const text = $(item).text().toLowerCase();

        if (text.includes(searchTerm)) {
            $(item).show();
        } else {
            $(item).hide();
        }
    });
});

// Live character count
$("textarea").on("input", function () {
    const length = $(this).val().length;
    const maxLength = 500;

    $(".character-count").text(`${length}/${maxLength} characters`);
});

// Extract and display data
function displayUserInfo(user) {
    $(".user-name").text(user.name);
    $(".user-email").text(user.email);
    $(".user-role").text(user.role);
    $(".last-login").text(formatDate(user.lastLogin));
}

// Form validation messages
$("input[required]").on("blur", function () {
    const $input = $(this);
    const value = $input.val();
    const $error = $input.next(".error-message");

    if (!value) {
        $error.text("This field is required");
    } else {
        $error.text("");
    }
});

// Dynamic breadcrumb generation
function updateBreadcrumb(path) {
    const parts = path.split("/").filter(Boolean);

    $(".breadcrumb-item").each(function (index, item) {
        if (parts[index]) {
            $(item).text(parts[index]);
        }
    });
}

// Safe user-generated content display
function displayComment(comment) {
    // .text() automatically escapes HTML, preventing XSS
    $(".comment-author").text(comment.author);
    $(".comment-body").text(comment.text);
    $(".comment-date").text(comment.date);
}

// Table cell updates
function updatePrices(discount) {
    $(".price-cell").text(function (index, currentPrice) {
        const price = parseFloat(currentPrice.replace("£", ""));
        const newPrice = price * (1 - discount);
        return "£" + newPrice.toFixed(2);
    });
}

// Status indicators
function updateStatus(status) {
    const statusText = {
        pending: "Pending Approval",
        approved: "Approved",
        rejected: "Rejected",
        processing: "Processing..."
    };

    $(".status-indicator").text(statusText[status] || "Unknown");
}

// Aggregate calculations
function displayTotal() {
    let total = 0;

    $(".item-price").each(function (index, element) {
        const price = parseFloat($(element).text().replace("£", ""));
        total += price;
    });

    $(".total-amount").text("£" + total.toFixed(2));
}

// Truncate long text
$(".description").each(function (index, element) {
    const $el = $(element);
    const text = $el.text();

    if (text.length > 100) {
        $el.text(text.substring(0, 100) + "...");
    }
});
```

## Differences to jQuery

None.
