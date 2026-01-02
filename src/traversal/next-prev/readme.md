# .next(), .nextAll(), .nextUntil(), .prev(), .prevAll(), .prevUntil()

Navigate between sibling elements in the DOM.

## .next()

Retrieve the next sibling of the first item in the collection.

### Usage

```javascript
$(collection).next();
$(collection).next(selector);
```

### Returns

A new Dabby collection containing the next sibling.

## .nextAll()

Retrieve all following siblings of each item in the collection.

### Usage

```javascript
$(collection).nextAll();
$(collection).nextAll(selector);
```

### Returns

A new Dabby collection containing all following siblings.

## .nextUntil()

Retrieve the following siblings of each item in the collection up until the matched selector.

### Usage

```javascript
$(collection).nextUntil(selector);
$(collection).nextUntil(selector, filter);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function indicating where to stop.

### filter

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to filter the results.

### Returns

A new Dabby collection containing the matching siblings.

## .prev()

Retrieve the previous sibling of the first item in the collection.

### Usage

```javascript
$(collection).prev();
$(collection).prev(selector);
```

### Returns

A new Dabby collection containing the previous sibling.

## .prevAll()

Retrieve all preceding siblings of each item in the collection.

### Usage

```javascript
$(collection).prevAll();
$(collection).prevAll(selector);
```

### Returns

A new Dabby collection containing all preceding siblings.

## .prevUntil()

Retrieve the preceding siblings of each item in the collection up until the matched selector.

### Usage

```javascript
$(collection).prevUntil(selector);
$(collection).prevUntil(selector, filter);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function indicating where to stop.

### filter

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to filter the results.

### Returns

A new Dabby collection containing the matching siblings.

## Examples

### Basic Usage

```javascript
// Get next sibling
const $next = $(".current").next();

// Get all following siblings
const $nextAll = $(".current").nextAll();

// Get next siblings until boundary
const $nextUntil = $(".current").nextUntil(".boundary");

// Get previous sibling
const $prev = $(".current").prev();

// Get all preceding siblings
const $prevAll = $(".current").prevAll();

// Get previous siblings until boundary
const $prevUntil = $(".current").prevUntil(".boundary");

// Get next sibling with specific selector
const $nextDiv = $(".current").next("div");
```

### Real-World Examples

```javascript
// Toggle next panel
$(".accordion-header").on("click", function () {
    $(this).next(".accordion-content").slideToggle();
});

// Show/hide description
$(".show-more").on("click", function () {
    $(this).next(".description").show();
    $(this).hide();
});

// Navigate carousel
$(".next-button").on("click", function () {
    const $current = $(".slide.active");
    const $next = $current.next(".slide");

    if ($next.length) {
        $current.removeClass("active");
        $next.addClass("active");
    } else {
        // Loop to first
        $current.removeClass("active");
        $(".slide").first().addClass("active");
    }
});

$(".prev-button").on("click", function () {
    const $current = $(".slide.active");
    const $prev = $current.prev(".slide");

    if ($prev.length) {
        $current.removeClass("active");
        $prev.addClass("active");
    } else {
        // Loop to last
        $current.removeClass("active");
        $(".slide").last().addClass("active");
    }
});

// Expand/collapse sections
$(".section-header").on("click", function () {
    const $content = $(this).nextUntil(".section-header");
    $content.slideToggle();
});

// Highlight related items
$(".item").hover(
    function () {
        $(this).nextAll(".related").addClass("highlighted");
        $(this).prevAll(".related").addClass("highlighted");
    },
    function () {
        $(this).nextAll(".related").removeClass("highlighted");
        $(this).prevAll(".related").removeClass("highlighted");
    }
);

// Wizard navigation
$(".wizard-next").on("click", function () {
    const $current = $(".wizard-step.active");
    const $next = $current.next(".wizard-step");

    if ($next.length) {
        $current.removeClass("active").addClass("completed");
        $next.addClass("active");
    }
});

$(".wizard-prev").on("click", function () {
    const $current = $(".wizard-step.active");
    const $prev = $current.prev(".wizard-step");

    if ($prev.length) {
        $current.removeClass("active");
        $prev.removeClass("completed").addClass("active");
    }
});

// Select until separator
$(".item").on("click", function () {
    $(this).addClass("selected");
    $(this).nextUntil(".separator").addClass("selected");
});

// Clear following form fields
$("input").on("change", function () {
    if (!$(this).val()) {
        $(this).nextAll("input").val("");
    }
});

// Toggle visibility of related content
$(".toggle-button").on("click", function () {
    $(this).next(".content").toggle();
});

// Highlight section
$(".section-marker").each(function () {
    $(this).nextUntil(".section-marker", ".content").addClass("section-content");
});

// Keyboard navigation in menu
$(".menu-item").on("keydown", function (e) {
    if (e.key === "ArrowDown") {
        e.preventDefault();
        const $next = $(this).next(".menu-item");
        if ($next.length) {
            $next.focus();
        }
    } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const $prev = $(this).prev(".menu-item");
        if ($prev.length) {
            $prev.focus();
        }
    }
});

// Group selection
$(".group-header").on("click", function () {
    const $items = $(this).nextUntil(".group-header");
    const allSelected = $items.filter(".selected").length === $items.length;

    if (allSelected) {
        $items.removeClass("selected");
    } else {
        $items.addClass("selected");
    }
});

// Progressive disclosure
$(".more-info").on("click", function () {
    const $hiddenContent = $(this).prevAll(".hidden-content");
    $hiddenContent.show();
    $(this).hide();
});

// Tab navigation
$(".tab").on("click", function () {
    $(this).addClass("active").siblings(".tab").removeClass("active");

    const index = $(".tab").index(this);
    $(".tab-panel").hide();
    $(".tab-panel").eq(index).show();
});

// Enable/disable related fields
$("#enable-shipping").on("change", function () {
    if ($(this).is(":checked")) {
        $(this).parent().nextAll(".shipping-field").prop("disabled", false);
    } else {
        $(this).parent().nextAll(".shipping-field").prop("disabled", true);
    }
});

// Collect form section data
function getFormSectionData($header) {
    const data = {};

    $header.nextUntil(".section-header", "input, select, textarea").each(function () {
        const name = $(this).attr("name");
        const value = $(this).val();
        if (name) {
            data[name] = value;
        }
    });

    return data;
}

// Table row expansion
$("tr.expandable").on("click", function () {
    const $details = $(this).next("tr.details");
    $details.toggle();
});

// Breadcrumb navigation
$(".breadcrumb-item").on("click", function () {
    $(this).nextAll(".breadcrumb-item").removeClass("active");
    $(this).addClass("active");
});

// Hide subsequent errors
$(".error-message").first().nextAll(".error-message").hide();

// Select range
let rangeStart = null;

$(".selectable-item").on("click", function (e) {
    if (e.shiftKey && rangeStart) {
        const $start = $(rangeStart);
        const $end = $(this);

        $start.nextUntil($end).addClass("selected");
        $end.addClass("selected");
    } else {
        rangeStart = this;
        $(this).toggleClass("selected");
    }
});
```

## Differences to jQuery

None.
