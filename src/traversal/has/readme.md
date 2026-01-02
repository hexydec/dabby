# .has()

Reduce the input collection to those that have descendants matching the input selector.

## Usage

```javascript
$(selector).has(selector);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

## Returns

A new Dabby collection containing the nodes in the original collection that have descendants matching the selector.

## Examples

### Basic Usage

```javascript
// Find divs that contain paragraphs
const $divsWithP = $("div").has("p");

// Find list items with links
const $itemsWithLinks = $("li").has("a");

// Find sections containing forms
const $sectionsWithForms = $(".section").has("form");

// Find cards with images
const $cardsWithImages = $(".card").has("img");
```

### Real-World Examples

```javascript
// Highlight containers with errors
$(".form-group").has(".error").addClass("has-error");

// Find sections with required fields
const $sectionsWithRequired = $(".section").has("input[required]");
$sectionsWithRequired.addClass("contains-required");

// Show only containers with visible children
$(".container").has(":visible").show();

// Hide empty list items
$("li").not($("li").has("*")).hide();

// Find cards with specific content
const $cardsWithButtons = $(".card").has("button");
$cardsWithButtons.addClass("interactive");

// Identify forms with errors
$("form").has(".error-message").each(function () {
    $(this).addClass("has-errors");
    $(this).find(".submit-button").prop("disabled", true);
});

// Filter products with images
const $productsWithImages = $(".product").has("img");
const $productsWithoutImages = $(".product").not($productsWithImages);

$productsWithImages.addClass("has-image");
$productsWithoutImages.addClass("no-image");

// Find sections containing search results
const $sectionsWithResults = $(".section").has(".search-result");
if ($sectionsWithResults.length === 0) {
    $(".no-results").show();
}

// Highlight articles with videos
$("article").has("video, iframe").addClass("has-media");

// Find containers with checked checkboxes
const $groupsWithChecked = $(".checkbox-group").has("input:checked");
$groupsWithChecked.addClass("has-selection");

// Show tabs that have content
$(".tab-button").each(function () {
    const index = $(this).index();
    const $panel = $(".tab-panel").eq(index);

    if (!$panel.has("*").length) {
        $(this).hide();
    }
});

// Find dropdown menus with submenus
$(".menu-item").has(".submenu").addClass("has-submenu");

// Identify tables with data
$("table").has("tbody tr").addClass("has-data");
$("table").not($("table").has("tbody tr")).addClass("empty");

// Filter containers with active elements
const $containersWithActive = $(".container").has(".active");
$containersWithActive.attr("data-has-active", "true");

// Find forms with changed inputs
function getModifiedForms() {
    return $("form").has("input.modified, textarea.modified");
}

// Show sections that have visible content
$(".collapsible-section").each(function () {
    const $hasVisible = $(this).has(":visible");
    if ($hasVisible.length === 0) {
        $(this).addClass("empty");
    }
});

// Highlight navigation items with dropdowns
$(".nav-item").has(".dropdown-menu").addClass("has-dropdown");

// Find parents with disabled children
const $groupsWithDisabled = $(".input-group").has("input:disabled");
$groupsWithDisabled.addClass("contains-disabled");

// Check if containers have required elements
function validateContainers() {
    const $valid = $(".container").has(".required-element");
    const $invalid = $(".container").not($valid);

    $invalid.addClass("validation-error");
    return $invalid.length === 0;
}

// Filter lists with completed items
const $listsWithCompleted = $(".todo-list").has(".completed");
$listsWithCompleted.addClass("has-completed-items");

// Find sections with unread messages
$(".conversation").has(".message.unread").addClass("has-unread");

// Show categories with products
$(".category").has(".product").show();
$(".category").not($(".category").has(".product")).hide();
```

## Differences to jQuery

None.
