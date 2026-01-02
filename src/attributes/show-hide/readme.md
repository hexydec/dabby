# .show(), .hide(), .toggle()

Show, hide, or toggle the display of elements in a collection.

## .show()

Set the display property of each object in a collection to show the items.

If the item was previously hidden, the initial display value will be used.

The display property is set as an inline property. If a CSS rule sets the property with `!important`, this method will have no effect.

## .hide()

Set the display property of each object in a collection to `none`.

The display property is set as an inline property. If a CSS rule sets the property with `!important`, this method will have no effect.

## .toggle()

Toggle the display property of each item in a collection to show or hide the items.

If the item was previously hidden, the initial display value will be used.

The display property is set as an inline property. If a CSS rule sets the property with `!important`, this method will have no effect.

## Usage

```javascript
$(selector).show();
$(selector).hide();
$(selector).toggle();
$(selector).toggle(display);
```

### display

Sets the display value of the operation, equivalent to using `$.fn.show()` or `$.fn.hide()`.

## Returns

The original Dabby collection will be returned.

## Examples

### Basic Usage

```javascript
// Show hidden elements
$(".modal").show();

// Hide elements
$(".alert").hide();

// Toggle visibility
$(".dropdown-menu").toggle();

// Force show or hide
$(".panel").toggle(true);  // Always show
$(".panel").toggle(false); // Always hide
```

### Real-World Examples

```javascript
// Toggle navigation menu
$(".menu-button").on("click", function () {
    $(".navigation").toggle();
});

// Show/hide based on condition
if (userLoggedIn) {
    $(".user-menu").show();
    $(".login-button").hide();
} else {
    $(".user-menu").hide();
    $(".login-button").show();
}

// Accordion functionality
$(".accordion-header").on("click", function () {
    const $content = $(this).next(".accordion-content");

    // Close all other sections
    $(".accordion-content").not($content).hide();

    // Toggle this section
    $content.toggle();
});

// Tab switching
$(".tab-button").on("click", function () {
    const tabId = $(this).data("tab");

    // Hide all tab content
    $(".tab-content").hide();

    // Show selected tab
    $(`#${tabId}`).show();

    // Update active button
    $(".tab-button").removeClass("tab-button--active");
    $(this).addClass("tab-button--active");
});

// Show more/less content
$(".show-more-button").on("click", function () {
    const $content = $(".extra-content");

    if ($content.is(":visible")) {
        $content.hide();
        $(this).text("Show more");
    } else {
        $content.show();
        $(this).text("Show less");
    }
});

// Modal dialogue
$(".open-modal").on("click", function () {
    $(".modal-overlay").show();
    $(".modal").show();
});

$(".close-modal, .modal-overlay").on("click", function () {
    $(".modal-overlay").hide();
    $(".modal").hide();
});

// Filter visibility based on selection
$(".filter-select").on("change", function () {
    const category = $(this).val();

    if (category === "all") {
        $(".product-item").show();
    } else {
        $(".product-item").hide();
        $(`.product-item[data-category="${category}"]`).show();
    }
});

// Dropdown menu
$(".dropdown-trigger").on("click", function () {
    const $menu = $(this).next(".dropdown-menu");

    // Close all other dropdowns
    $(".dropdown-menu").not($menu).hide();

    // Toggle this dropdown
    $menu.toggle();
});

// Close dropdown when clicking outside
$(document).on("click", function (e) {
    if (!$(e.target).closest(".dropdown").length) {
        $(".dropdown-menu").hide();
    }
});

// Show loading spinner
function showLoading() {
    $(".loading-spinner").show();
    $(".content").hide();
}

function hideLoading() {
    $(".loading-spinner").hide();
    $(".content").show();
}

// Conditional alerts
function showAlert(message, type) {
    const $alert = $(".alert");

    $alert
        .removeClass("alert--success alert--error alert--warning")
        .addClass(`alert--${type}`)
        .text(message)
        .show();

    // Auto-hide after 5 seconds
    setTimeout(function () {
        $alert.hide();
    }, 5000);
}

// Expandable sections
$(".expand-button").on("click", function () {
    const $section = $(this).closest(".section");
    const $content = $section.find(".section-content");

    $content.toggle();

    if ($content.is(":visible")) {
        $(this).text("Collapse");
    } else {
        $(this).text("Expand");
    }
});
```

## Differences to jQuery

jQuery supports extra arguments to each function to control animations. Dabby doesn't support animations, and therefore does not support these properties.
