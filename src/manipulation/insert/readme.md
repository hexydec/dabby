# .before(), .prepend(), .append(), .after()

Insert content before, at the start of, at the end of, or after each element in a Dabby collection.

## .before()

Add nodes before each object in a Dabby collection (as a sibling).

## .prepend()

Prepend nodes to each object in a Dabby collection (as the first child).

## .append()

Append nodes to each object in a Dabby collection (as the last child).

## .after()

Add nodes after each object in a Dabby collection (as a sibling).

## Usage

```javascript
$(selector).before(...content);
$(selector).prepend(...content);
$(selector).append(...content);
$(selector).after(...content);
```

### ...content

One or more arguments containing a node, array of nodes, HTML string, Dabby collection, or callback function to insert relative to each item in the target Dabby collection.

When using a callback, it receives the index of the element and the current HTML, and should return the content to insert.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Insert HTML strings
$(".container").append("<p>New paragraph</p>");
$(".container").prepend("<h2>Title</h2>");
$(".item").before("<hr>");
$(".item").after("<div class='spacer'></div>");

// Insert DOM elements
const newDiv = document.createElement("div");
$(".container").append(newDiv);

// Insert Dabby collections
const $newElement = $("<span>Hello</span>");
$(".container").append($newElement);

// Insert multiple items at once
$(".list").append("<li>Item 1</li>", "<li>Item 2</li>", "<li>Item 3</li>");
```

### Visualising Insert Methods

Given this HTML:

```html
<div class="container">
    <p class="existing">Existing content</p>
</div>
```

```javascript
// .before() - adds as previous sibling
$(".existing").before("<p>Before</p>");
// Result:
// <div class="container">
//     <p>Before</p>
//     <p class="existing">Existing content</p>
// </div>

// .prepend() - adds as first child
$(".container").prepend("<p>First child</p>");
// Result:
// <div class="container">
//     <p>First child</p>
//     <p class="existing">Existing content</p>
// </div>

// .append() - adds as last child
$(".container").append("<p>Last child</p>");
// Result:
// <div class="container">
//     <p class="existing">Existing content</p>
//     <p>Last child</p>
// </div>

// .after() - adds as next sibling
$(".existing").after("<p>After</p>");
// Result:
// <div class="container">
//     <p class="existing">Existing content</p>
//     <p>After</p>
// </div>
```

### Using Callbacks

```javascript
// Append with callback
$(".card").append(function (index, currentHtml) {
    return `<div class="card-footer">Card ${index + 1}</div>`;
});

// Prepend based on current content
$(".section").prepend(function (index, currentHtml) {
    const hasTitle = currentHtml.includes("<h");
    return hasTitle ? "" : "<h3>Section " + (index + 1) + "</h3>";
});

// Dynamic insertion
$(".item").after(function (index) {
    return index < 5 ? "<hr>" : "";
});
```

### Real-World Examples

```javascript
// Add items to a list
function addTodoItem(text) {
    $(".todo-list").append(`
        <li class="todo-item">
            <input type="checkbox">
            <span>${text}</span>
            <button class="delete">×</button>
        </li>
    `);
}

// Prepend notification
function showNotification(message) {
    $(".notification-container").prepend(`
        <div class="notification">
            ${message}
            <button class="close">×</button>
        </div>
    `);

    // Auto-remove after 5 seconds
    setTimeout(function () {
        $(".notification").first().remove();
    }, 5000);
}

// Build a table dynamically
function addTableRow(data) {
    $("table tbody").append(`
        <tr>
            <td>${data.id}</td>
            <td>${data.name}</td>
            <td>${data.email}</td>
            <td>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </td>
        </tr>
    `);
}

// Add breadcrumb items
function buildBreadcrumb(path) {
    const parts = path.split("/").filter(Boolean);

    $(".breadcrumb").empty();

    parts.forEach(function (part, index) {
        $(".breadcrumb").append(`
            <li class="breadcrumb-item">
                <a href="/${parts.slice(0, index + 1).join("/")}">${part}</a>
            </li>
        `);

        if (index < parts.length - 1) {
            $(".breadcrumb").append('<li class="separator">/</li>');
        }
    });
}

// Insert loading spinner
function showLoading() {
    $(".content").prepend(`
        <div class="loading-overlay">
            <div class="spinner"></div>
        </div>
    `);
}

function hideLoading() {
    $(".loading-overlay").remove();
}

// Add pagination controls
function addPagination(currentPage, totalPages) {
    const $pagination = $(".pagination");
    $pagination.empty();

    // Previous button
    $pagination.append(`
        <button class="page-btn prev" ${currentPage === 1 ? "disabled" : ""}>
            Previous
        </button>
    `);

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        $pagination.append(`
            <button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">
                ${i}
            </button>
        `);
    }

    // Next button
    $pagination.append(`
        <button class="page-btn next" ${currentPage === totalPages ? "disabled" : ""}>
            Next
        </button>
    `);
}

// Insert ad after every 3rd paragraph
$(".article p").each(function (index, paragraph) {
    if ((index + 1) % 3 === 0) {
        $(paragraph).after('<div class="advertisement">Ad</div>');
    }
});

// Build navigation menu
function buildMenu(items) {
    const $menu = $(".main-nav");

    items.forEach(function (item) {
        $menu.append(`
            <li class="nav-item">
                <a href="${item.url}">${item.label}</a>
            </li>
        `);
    });
}

// Add form fields dynamically
$(".add-field-button").on("click", function () {
    $(".dynamic-form").append(`
        <div class="form-row">
            <input type="text" name="field[]" placeholder="Enter value">
            <button class="remove-field">Remove</button>
        </div>
    `);
});

$(document).on("click", ".remove-field", function () {
    $(this).closest(".form-row").remove();
});

// Chat message insertion
function addMessage(message, isOwn) {
    const messageHtml = `
        <div class="message ${isOwn ? "message--own" : "message--other"}">
            <div class="message-content">${message.text}</div>
            <div class="message-time">${message.time}</div>
        </div>
    `;

    $(".chat-messages").append(messageHtml);

    // Scroll to bottom
    $(".chat-messages").scrollTop($(".chat-messages")[0].scrollHeight);
}

// Insert footnote references
$(".article").find("[data-footnote]").each(function (index, element) {
    const footnoteText = $(element).data("footnote");

    // Add superscript number
    $(element).append(`<sup>${index + 1}</sup>`);

    // Add footnote at bottom
    $(".footnotes").append(`
        <p class="footnote">
            <sup>${index + 1}</sup> ${footnoteText}
        </p>
    `);
});
```

## Differences to jQuery

None.
