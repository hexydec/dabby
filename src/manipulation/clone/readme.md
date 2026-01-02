# .clone()

Clones the items in the collection and returns a new collection.

## Usage

```javascript
const cloned = $(selector).clone();
const clonedWithData = $(selector).clone(withDataAndEvents);
const clonedDeep = $(selector).clone(withDataAndEvents, deepWithDataAndEvents);
```

### withDataAndEvents

A boolean indicating whether to clone the data and events attached to the items in the collection.

### deepWithDataAndEvents

A boolean indicating whether the data and events on the children of cloned elements should be copied. Defaults to the same value as `withDataAndEvents`.

## Returns

A new Dabby collection containing the cloned nodes.

## Examples

### Basic Usage

```javascript
// Simple clone (no data or events)
const $clone = $(".template").clone();

// Clone with data and events
const $cloneWithEvents = $(".card").clone(true);

// Clone with deep data and events
const $deepClone = $(".container").clone(true, true);
```

### Real-World Examples

```javascript
// Template cloning for forms
function addFormField() {
    const $template = $(".form-field-template");
    const $clone = $template.clone();

    // Update cloned field
    $clone.removeClass("form-field-template");
    $clone.find("input").val("");

    $(".form-fields").append($clone);
}

// Clone list items
$(".add-item").on("click", function () {
    const $lastItem = $(".list li").last();
    const $newItem = $lastItem.clone();

    $newItem.find("input").val("");
    $newItem.find(".item-number").text($(".list li").length + 1);

    $(".list").append($newItem);
});

// Clone with event preservation
$(".card").on("click", function () {
    alert("Card clicked!");
});

// Clone without events (default)
const $copy1 = $(".card").clone();
$(".container").append($copy1);
// Clicking $copy1 does nothing

// Clone with events
const $copy2 = $(".card").clone(true);
$(".container").append($copy2);
// Clicking $copy2 shows alert

// Product card duplication
$(".duplicate-product").on("click", function () {
    const $card = $(this).closest(".product-card");
    const $duplicate = $card.clone(true, true);

    // Update duplicate
    $duplicate.find(".product-title").text($card.find(".product-title").text() + " (Copy)");
    $duplicate.insertAfter($card);
});

// Clone table rows
$(".clone-row").on("click", function () {
    const $row = $(this).closest("tr");
    const $clonedRow = $row.clone();

    // Clear input values in clone
    $clonedRow.find("input").val("");
    $clonedRow.find("select").prop("selectedIndex", 0);

    $row.after($clonedRow);
});

// Drag to clone functionality
$(".cloneable").on("dragstart", function (e) {
    const $clone = $(this).clone(true);
    $clone.data("is-clone", true);

    // Store clone for drop event
    $(this).data("dragged-clone", $clone);
});

$(".drop-zone").on("drop", function (e) {
    const $clone = $(".dragged-element").data("dragged-clone");

    if ($clone) {
        $(this).append($clone);
    }
});

// Clone for preview
function previewChanges() {
    // Clone current state
    const $original = $(".editable-content");
    const $preview = $original.clone();

    // Show preview in modal
    $(".preview-modal .content").empty().append($preview);
    $(".preview-modal").show();
}

// Repeating elements pattern
function createRepeatingElements(template, count) {
    const $template = $(template);
    const $container = $(".repeating-container");

    for (let i = 0; i < count; i++) {
        const $clone = $template.clone();

        $clone.find(".index").text(i + 1);
        $clone.data("index", i);

        $container.append($clone);
    }
}

// Clone with ID updates
function cloneWithNewId($element) {
    const $clone = $element.clone(true);
    const oldId = $clone.attr("id");

    if (oldId) {
        const newId = oldId + "-" + Date.now();
        $clone.attr("id", newId);

        // Update any labels that reference the old ID
        $clone.find(`label[for="${oldId}"]`).attr("for", newId);
    }

    return $clone;
}

// Backup before modifications
let $backup = null;

function saveBackup() {
    $backup = $(".content").clone(true, true);
}

function restoreBackup() {
    if ($backup) {
        $(".content").replaceWith($backup.clone(true, true));
    }
}

// Clone nested structures
const $menu = $(".main-menu");
const $clonedMenu = $menu.clone(true, true);

// Use clone as mobile menu
$clonedMenu.addClass("mobile-menu");
$(".mobile-nav").append($clonedMenu);
```

## Differences to jQuery

None.
