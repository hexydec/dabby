# .data()

Get or set arbitrary data as properties of each node in a collection.

## Usage

```javascript
$(selector).data(key);
$(selector).data(key, value);
$(selector).data(obj);
```

### key

The name of the data attribute to get/set. The key corresponds directly to any `data-*` attributes, so when reading, if the node contains a corresponding data attribute, the value will be returned.

The names of data attributes must conform to the naming convention of HTML `data-*` attributes, so they must contain only lowercase alphanumeric characters and dashes. Names can also be sent in camelCase notation.

### value

Can be anything, but note that internally, any data is converted to a JSON string, so objects that have a `.toJSON()` method may not return in the same format.

### obj

An object of key/value pairs, enabling multiple data attributes to be set.

## Returns

When reading, the contained value will be returned, or `undefined` if the data attribute hasn't been set. When setting a value, the original Dabby collection will be returned.

## Examples

### Getting Data Attributes

Using the following HTML:

```html
<div id="user" data-user-id="12345" data-role="admin" data-preferences='{"theme": "dark", "language": "en"}'></div>
```

You can retrieve data like this:

```javascript
// Get a single data attribute (automatically parsed)
const userId = $("#user").data("user-id"); // Returns: "12345"
const userId = $("#user").data("userId");   // Same as above (camelCase)

const role = $("#user").data("role"); // Returns: "admin"

// Get JSON data (automatically parsed into an object)
const prefs = $("#user").data("preferences");
// Returns: {theme: "dark", language: "en"}
```

### Setting Data Attributes

```javascript
// Set a single data attribute
$("#user").data("status", "active");
$("#user").data("last-login", "2025-12-30");

// Set numeric values
$("#user").data("login-count", 42);

// Set object values (automatically converted to JSON)
$("#user").data("settings", {
    notifications: true,
    autoSave: false
});

// Set multiple data attributes at once
$("#user").data({
    "user-id": "67890",
    "role": "moderator",
    "verified": true
});

// Chain data calls
$("#user")
    .data("status", "active")
    .data("level", 5)
    .data("badges", ["gold", "silver"]);
```

### Real-World Examples

```javascript
// Store product information
$(".product-card").each(function (index, card) {
    $(card).data({
        productId: 1000 + index,
        price: 29.99,
        inStock: true,
        categories: ["electronics", "gadgets"]
    });
});

// Retrieve and use stored data
$(".add-to-cart").on("click", function () {
    const $product = $(this).closest(".product-card");
    const productId = $product.data("product-id");
    const price = $product.data("price");

    console.log(`Adding product ${productId} (£${price}) to cart`);
});

// Toggle states with data attributes
$(".accordion-header").on("click", function () {
    const $header = $(this);
    const isExpanded = $header.data("expanded") || false;

    $header.data("expanded", !isExpanded);

    if (!isExpanded) {
        $header.next(".accordion-content").show();
    } else {
        $header.next(".accordion-content").hide();
    }
});

// Track interaction counts
$(".share-button").on("click", function () {
    const $btn = $(this);
    const clicks = $btn.data("click-count") || 0;

    $btn.data("click-count", clicks + 1);
    console.log(`Shared ${clicks + 1} times`);
});

// Store API responses
function loadUserData(userId) {
    $.ajax(`/api/users/${userId}`, {
        success: function (response) {
            $(`#user-${userId}`).data({
                userData: response,
                lastFetched: new Date().toISOString(),
                cached: true
            });
        }
    });
}

// Check cache before making API calls
function getUserData(userId) {
    const $user = $(`#user-${userId}`);
    const cached = $user.data("cached");

    if (cached) {
        return $user.data("user-data");
    } else {
        loadUserData(userId);
    }
}

// Form field validation tracking
$("input").on("blur", function () {
    const $input = $(this);
    const value = $input.val();
    const isValid = value && value.length >= 3;

    $input.data({
        validated: true,
        isValid: isValid,
        lastValidated: Date.now()
    });

    if (!isValid) {
        $input.addClass("error");
    }
});
```

## Differences to jQuery

jQuery may have its own internal data store to associate data with nodes in a collection, and thus may be able to retain more complex objects or those that have a `.toJSON()` method. The reason for this is simplicity: the JavaScript API for the `HTMLElement` object provides the `dataset` property, which Dabby uses internally.
