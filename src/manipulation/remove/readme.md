# .detach(), .remove()

Remove elements from the DOM, either preserving or discarding their data and events.

## .detach()

Detaches some or all of the items in the collection from the DOM. This method is similar to `.remove()`, except it keeps all data and events associated with the detached elements. This is useful if you want to reinsert the elements into the DOM later.

## .remove()

Removes some or all of the items in the collection from the DOM. This method removes the selected elements and all of their associated data and events.

## Usage

```javascript
$(selector).detach();
$(selector).detach(selector);
$(selector).remove();
$(selector).remove(selector);
```

### selector

An optional selector, HTML string, Node, array of Nodes, Dabby collection, or callback function to filter the collection by.

## Returns

`.detach()` returns a new Dabby collection containing the detached nodes.

`.remove()` returns the original Dabby collection.

## Examples

### Basic Usage

```javascript
// Detach elements (preserves data/events)
const $items = $("li").detach();

// Remove elements (discards data/events)
$(".obsolete").remove();

// Remove with filter
$("li").remove(".completed");

// Detach with filter
const $selected = $("tr").detach(".selected");
```

### Difference Between .detach() and .remove()

```javascript
// .detach() - keeps data and events
$(".item").on("click", function () {
    alert("Clicked!");
});

const $detached = $(".item").detach();
// Event handler is still attached
$("body").append($detached);
// Clicking still triggers the alert

// .remove() - discards data and events
$(".item").on("click", function () {
    alert("Clicked!");
});

$(".item").remove();
const $removed = $("<div>").addClass("item");
$("body").append($removed);
// Event handler is gone, clicking does nothing
```

### Real-World Examples

```javascript
// Temporarily remove elements during reorganisation
function reorganiseList() {
    // Detach items to preserve their event handlers
    const $items = $(".sortable-list li").detach();

    // Sort items
    $items.sort(function (a, b) {
        return $(a).data("priority") - $(b).data("priority");
    });

    // Reattach in new order
    $(".sortable-list").append($items);
}

// Remove completed tasks
$(".delete-completed").on("click", function () {
    $(".todo-item.completed").remove();
    updateTaskCount();
});

// Remove items with confirmation
$(".delete-button").on("click", function () {
    const $item = $(this).closest(".item");

    if (confirm("Are you sure you want to delete this item?")) {
        $item.remove();
    }
});

// Detach for performance during bulk updates
function updateManyItems(updates) {
    // Detach container to avoid reflows
    const $container = $(".item-container").detach();

    // Make many updates
    updates.forEach(function (update) {
        $container.find(`[data-id="${update.id}"]`)
            .text(update.text)
            .data("modified", true);
    });

    // Reattach
    $(".content").append($container);
}

// Remove filtered items
function filterProducts(category) {
    if (category === "all") {
        $(".product").show();
    } else {
        $(".product").each(function (index, product) {
            const $product = $(product);

            if ($product.data("category") !== category) {
                $product.hide();
                // Or remove completely:
                // $product.remove();
            }
        });
    }
}

// Clear selected items
$(".clear-selection").on("click", function () {
    $(".selected").remove();
    $(".select-count").text("0 items selected");
});

// Remove error messages after delay
function showError(message) {
    const $error = $(`<div class="error">${message}</div>`);
    $(".error-container").append($error);

    setTimeout(function () {
        $error.remove();
    }, 5000);
}

// Detach/reattach for drag and drop
let $draggedElement = null;

$(".draggable").on("mousedown", function () {
    $draggedElement = $(this).detach();
    $(this).addClass("dragging");
});

$(".drop-zone").on("mouseup", function () {
    if ($draggedElement) {
        $(this).append($draggedElement);
        $draggedElement.removeClass("dragging");
        $draggedElement = null;
    }
});

// Remove specific child elements
$(".container").find("img").remove(); // Remove all images
$(".article").find("script").remove(); // Remove all scripts

// Pagination - remove items not on current page
function showPage(pageNumber, itemsPerPage) {
    const $items = $(".list-item");
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    $items.each(function (index, item) {
        if (index < start || index >= end) {
            $(item).hide();
            // Or remove: $(item).remove();
        } else {
            $(item).show();
        }
    });
}

// Clean up dynamic elements
$(".reset-form").on("click", function () {
    // Remove dynamically added fields
    $(".dynamic-field").remove();

    // Reset original fields
    $("input, textarea").val("");
});
```

## Differences to jQuery

None.
