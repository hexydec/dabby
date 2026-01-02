# $()

Create a Dabby.js object, containing nodes, selected with document nodes, CSS selector, or HTML. Or when supplied with a callback function, it will be triggered on the DOMContentLoaded event.

## Usage

```javascript
$(selector, context); // => dabby
$(element); // => dabby
$(elementArray); // => dabby
$(object); // => dabby
$(); // => dabby
$(html); // => dabby
$(html, attributes); // => dabby
$(callback); // => void
```

When created with a CSS selector, DOM element, array of DOM elements, or Dabby object, selects the requested nodes and stores them internally ready for manipulation.

## Selector Patterns

### $(selector)

Select elements using CSS selectors.

```javascript
$("#id"); // select a node with the specified ID
$(".className"); // select nodes with the specified class name
$("ul"); // select nodes with the specified tag
$("ul > li"); // select any nodes the browser supports
$("#id, .className, ul"); // select multiple nodes in one

const body = $("body"); // can be any of the specified patterns
$("ul", body); // select nodes inside a specified context

$(document.getElementById("node")); // input native node
$(document.getElementsByClassName("className")); // input native node or nodes

const dabby = $(".className"); // create a Dabby object
$(dabby); // can be recycled later

$(); // create an empty object
```

### $(html)

Create HTML nodes within a Dabby object from the inputted HTML.

```javascript
$(html, ownerDocument);
$(html, attributes);
```

```javascript
$("<div>"); // create a single tag
$("<div/>"); // create a single tag
$("<div></div>");  // create a single tag
$('<div class="demo">Some <strong>text</strong><div><p>More text</p>'); //parse a string of HTML into nodes

$("<div>", iframe); // change ownerDocument

$("<div>", {
    "class": "demo",
    text: "Some text",
    click: function () {
        alert("Clicked");
    }
}); // create HTML element with attributes, uses attr() internally
```

### $(callback)

Attach a callback function to the DOMContentLoaded event. Called immediately if event has already been fired.

```javascript
$(function () {
    alert("Loaded");
}); // fired when document is loaded
```

## Returns

An instance of the Dabby.js object so it can be chained to other methods.

## Examples

### Basic Usage

```javascript
// Select by ID
const $header = $("#header");

// Select by class
const $buttons = $(".button");

// Select by tag
const $paragraphs = $("p");

// Complex selectors
const $links = $("nav a.active");

// Multiple selectors
const $elements = $("h1, h2, h3");

// With context
const $listItems = $("li", $(".menu"));
```

### Real-World Examples

```javascript
// Document ready
$(function () {
    console.log("DOM is ready");
    initialiseApp();
});

// Create elements dynamically
const $newDiv = $("<div>", {
    "class": "notification",
    text: "Hello World",
    click: function () {
        $(this).fadeOut();
    }
});

$("body").append($newDiv);

// Build complex HTML
const $card = $(`
    <div class="card">
        <h3>Product Title</h3>
        <p>Description here</p>
        <button>Add to Cart</button>
    </div>
`);

$(".product-grid").append($card);

// Work with native elements
const nativeElement = document.getElementById("myElement");
const $element = $(nativeElement);
$element.addClass("processed");

// Convert array of elements
const nativeElements = document.querySelectorAll(".item");
const $items = $(Array.from(nativeElements));

// Chain Dabby objects
const $firstLevel = $(".menu");
const $secondLevel = $("li", $firstLevel);

// Create empty collection
const $empty = $();
$empty.add(".item").addClass("processed");

// Build form elements
const $form = $("<form>", {
    action: "/submit",
    method: "POST",
    submit: function (e) {
        e.preventDefault();
        handleFormSubmit($(this));
    }
});

const $input = $("<input>", {
    type: "text",
    name: "username",
    placeholder: "Enter username",
    required: true
});

$form.append($input);

// Create list dynamically
const items = ["Apple", "Banana", "Orange"];
const $list = $("<ul>");

items.forEach(function (item) {
    $list.append($("<li>").text(item));
});

$("body").append($list);

// Clone and modify
const $template = $(".card-template");
const $newCard = $($template.clone()).removeClass("template");
$newCard.find(".title").text("New Product");

// Multiple context usage
function findInSections(selector) {
    const results = [];

    $(".section").each(function () {
        $(selector, this).each(function () {
            results.push(this);
        });
    });

    return $(results);
}

// Conditional element creation
function createNotification(type, message) {
    return $("<div>", {
        "class": `notification notification-${type}`,
        text: message,
        click: function () {
            $(this).remove();
        }
    });
}

const $success = createNotification("success", "Saved successfully");
const $error = createNotification("error", "An error occurred");

// DOM ready with immediate execution
$(function () {
    // Initialise all components
    $("[data-component='carousel']").each(function () {
        initialiseCarousel($(this));
    });

    $("[data-component='modal']").each(function () {
        initialiseModal($(this));
    });

    // Setup event delegation
    $("body").on("click", ".delete-button", function () {
        $(this).closest(".item").remove();
    });
});

// Create table dynamically
function createTable(data) {
    const $table = $("<table>");
    const $thead = $("<thead>").appendTo($table);
    const $tbody = $("<tbody>").appendTo($table);

    // Headers
    const $headerRow = $("<tr>").appendTo($thead);
    Object.keys(data[0]).forEach(function (key) {
        $("<th>").text(key).appendTo($headerRow);
    });

    // Rows
    data.forEach(function (row) {
        const $tr = $("<tr>").appendTo($tbody);
        Object.values(row).forEach(function (value) {
            $("<td>").text(value).appendTo($tr);
        });
    });

    return $table;
}

// Wrap native API results
function getAllImages() {
    const images = document.getElementsByTagName("img");
    return $(images);
}

// Progressive enhancement
$(function () {
    // Check feature support
    if ("IntersectionObserver" in window) {
        $(".lazy-image").each(function () {
            setupLazyLoading($(this));
        });
    }

    // Enhance forms
    $("form[data-enhance='true']").each(function () {
        enhanceForm($(this));
    });
});

// Build widget with attributes
const $widget = $("<div>", {
    "class": "widget weather-widget",
    "data-location": "London",
    "data-units": "celsius",
    css: {
        width: "300px",
        height: "200px"
    }
});

// Recycling Dabby objects
const $cached = $(".expensive-selector");

function processItems() {
    $($cached).each(function () {
        // Process each item
    });
}
```

## Differences to jQuery

- Only supports selectors the browser supports, so for example `$("a:first");` will not work.
- Parses HTML using the browser's innerHTML property, no other processing is performed.
