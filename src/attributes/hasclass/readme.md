# .hasClass()

Determine whether any elements in a collection have the requested class.

## Usage

```javascript
$(selector).hasClass(className);
```

### className

The name of the class to test against the collection.

## Returns

`true` when any item in the supplied collection has the requested class, `false` if not.

## Examples

### Basic Usage

Using the following HTML:

```html
<div class="card"></div>
<div class="card card--featured"></div>
<div class="card card--sale"></div>
```

You can test for classes like this:

```javascript
// Check if any div has the 'card' class
const hasCard = $("div").hasClass("card"); // true

// Check if any div has the 'card--featured' class
const hasFeatured = $("div").hasClass("card--featured"); // true

// Check if any div has the 'card--premium' class
const hasPremium = $("div").hasClass("card--premium"); // false

// Check specific element
const isFeatured = $(".card").eq(1).hasClass("card--featured"); // true
```

### Real-World Examples

```javascript
// Toggle menu based on current state
$(".menu-toggle").on("click", function () {
    if ($(".navigation").hasClass("navigation--open")) {
        $(".navigation").removeClass("navigation--open");
    } else {
        $(".navigation").addClass("navigation--open");
    }
});

// Conditional styling based on class presence
if ($("body").hasClass("dark-mode")) {
    $(".logo").attr("src", "logo-light.png");
} else {
    $(".logo").attr("src", "logo-dark.png");
}

// Form validation
function validateForm() {
    const $fields = $(".form-field");
    let hasErrors = false;

    $fields.each(function (index, field) {
        if ($(field).hasClass("form-field--error")) {
            hasErrors = true;
        }
    });

    if (hasErrors) {
        alert("Please fix the errors before submitting");
        return false;
    }

    return true;
}

// Accordion behaviour
$(".accordion-header").on("click", function () {
    const $header = $(this);
    const $content = $header.next(".accordion-content");

    if ($header.hasClass("accordion-header--expanded")) {
        $header.removeClass("accordion-header--expanded");
        $content.hide();
    } else {
        // Close all other accordions
        $(".accordion-header").removeClass("accordion-header--expanded");
        $(".accordion-content").hide();

        // Open this one
        $header.addClass("accordion-header--expanded");
        $content.show();
    }
});

// Disable buttons based on state
$(".submit-button").on("click", function () {
    const $btn = $(this);

    if ($btn.hasClass("button--disabled")) {
        return false;
    }

    $btn.addClass("button--disabled");
    // Submit form...
});

// Track active items
function getActiveItems() {
    const activeItems = [];

    $(".list-item").each(function (index, item) {
        if ($(item).hasClass("list-item--active")) {
            activeItems.push($(item).data("id"));
        }
    });

    return activeItems;
}

// Conditional animations
$(".card").on("mouseenter", function () {
    if (!$(this).hasClass("card--no-hover")) {
        $(this).addClass("card--hover-effect");
    }
});
```

## Differences to jQuery

None.
