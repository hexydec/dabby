# .insertBefore(), .prependTo(), .appendTo(), .insertAfter()

Insert the current collection before, at the start of, at the end of, or after a target selector. These are the inverse of `.before()`, `.prepend()`, `.append()`, and `.after()`.

## .insertBefore()

Insert nodes before each object matching the target selector (as a sibling).

## .prependTo()

Prepend nodes to each object matching the target selector (as the first child).

## .appendTo()

Append nodes to each object matching the target selector (as the last child).

## .insertAfter()

Insert nodes after each object matching the target selector (as a sibling).

## Usage

```javascript
$(content).insertBefore(selector);
$(content).prependTo(selector);
$(content).appendTo(selector);
$(content).insertAfter(selector);
```

### content

The Dabby collection, node, array of nodes, or HTML string to insert.

### selector

A string specifying a CSS selector, a node, an array of nodes, a document, or a Dabby collection specifying where to insert the content.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Create and insert before
$("<span>Label:</span>").insertBefore(".input");

// Create and prepend to
$("<h2>Title</h2>").prependTo(".container");

// Create and append to
$("<li>New item</li>").appendTo("ul");

// Create and insert after
$("<button>Submit</button>").insertAfter(".form");
```

### Comparison with Insert Methods

```javascript
// These two are equivalent:
$(".target").before("<span>Before</span>");
$("<span>Before</span>").insertBefore(".target");

// These two are equivalent:
$(".container").prepend("<div>First</div>");
$("<div>First</div>").prependTo(".container");

// These two are equivalent:
$(".container").append("<div>Last</div>");
$("<div>Last</div>").appendTo(".container");

// These two are equivalent:
$(".target").after("<span>After</span>");
$("<span>After</span>").insertAfter(".target");
```

### Real-World Examples

```javascript
// Add item to list
$("<li>New Task</li>").appendTo(".todo-list");

// Insert heading before content
$("<h3>Section Title</h3>").insertBefore(".section-content");

// Add label to inputs
$("input[type='text']").each(function () {
    const label = $(this).attr("name");
    $(`<label>${label}</label>`).insertBefore(this);
});

// Prepend icon to buttons
$("<span class='icon'>★</span>").prependTo(".favourite-button");

// Add separator after menu items
$("<li class='separator'>|</li>").insertAfter(".menu-item:not(:last-child)");

// Move elements to different container
$(".sidebar-widget").appendTo(".new-sidebar");

// Insert error message after field
function showFieldError(fieldName, message) {
    $(`<span class="error">${message}</span>`)
        .insertAfter(`input[name="${fieldName}"]`);
}

// Add close button to modal
$("<button class='close'>×</button>").prependTo(".modal-header");

// Insert breadcrumb separator
$(".breadcrumb-item:not(:last-child)").each(function () {
    $("<span> / </span>").insertAfter(this);
});

// Move selected items to another list
$(".source-list .selected").appendTo(".destination-list");

// Add timestamps
$("<span class='timestamp'>Just now</span>").appendTo(".comment");

// Insert notification badge
const count = getNotificationCount();
if (count > 0) {
    $(`<span class="badge">${count}</span>`).appendTo(".notification-button");
}

// Add required indicator to labels
$("label[for]").each(function () {
    const inputId = $(this).attr("for");
    const $input = $(`#${inputId}`);

    if ($input.prop("required")) {
        $("<span class='required'>*</span>").appendTo(this);
    }
});

// Insert loading spinner
$("<div class='spinner'></div>").prependTo(".content-area");

// Add tooltips
$("[data-tooltip]").each(function () {
    const tooltipText = $(this).data("tooltip");
    $(`<span class="tooltip">${tooltipText}</span>`).insertAfter(this);
});
```

## Differences to jQuery

None.
