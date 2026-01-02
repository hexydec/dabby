# .siblings()

Retrieve the siblings of each item in a collection, optionally filtered by a selector.

## Usage

```javascript
$(collection).siblings();
$(collection).siblings(selector);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

## Returns

A new Dabby collection containing the siblings.

## Examples

### Basic Usage

```javascript
// Get all siblings
const $siblings = $(".item").siblings();

// Get siblings matching a selector
const $listSiblings = $("li.active").siblings("li");

// Get siblings with a class
const $cardSiblings = $(".card").siblings(".card");

// Get sibling inputs
const $otherInputs = $("#username").siblings("input");
```

### Real-World Examples

```javascript
// Highlight selected item, remove highlight from siblings
$(".tab").on("click", function () {
    $(this).addClass("active").siblings().removeClass("active");
});

// Show selected panel, hide sibling panels
$(".tab-button").on("click", function () {
    const index = $(this).index();
    $(".tab-panel").eq(index).show().siblings().hide();
});

// Toggle accordion sections
$(".accordion-header").on("click", function () {
    const $content = $(this).next(".accordion-content");

    // Close sibling sections
    $(this)
        .parent()
        .siblings()
        .find(".accordion-content")
        .slideUp();

    // Toggle current section
    $content.slideToggle();
});

// Radio button-style behaviour for custom elements
$(".custom-radio").on("click", function () {
    $(this)
        .addClass("selected")
        .siblings(".custom-radio")
        .removeClass("selected");
});

// Validate that siblings have different values
function checkUniqueness($input) {
    const value = $input.val();
    const $siblings = $input.siblings("input");

    let isDuplicate = false;
    $siblings.each(function () {
        if ($(this).val() === value) {
            isDuplicate = true;
            return false; // break
        }
    });

    return !isDuplicate;
}

// Disable sibling buttons
$(".submit-button").on("click", function () {
    $(this).prop("disabled", true);
    $(this).siblings("button").prop("disabled", true);
});

// Count sibling elements
const siblingCount = $(".item").first().siblings().length;
console.log(`There are ${siblingCount} sibling items`);

// Find sibling with specific attribute
$(".form-field").on("change", function () {
    const $relatedField = $(this).siblings("[data-related='true']");
    if ($relatedField.length) {
        $relatedField.removeClass("disabled");
    }
});

// Apply different style to siblings
$(".product").hover(
    function () {
        $(this).addClass("highlighted");
        $(this).siblings(".product").addClass("dimmed");
    },
    function () {
        $(this).removeClass("highlighted");
        $(this).siblings(".product").removeClass("dimmed");
    }
);

// Navigate between siblings
$(".nav-next").on("click", function () {
    const $current = $(".slide.active");
    const $next = $current.next(".slide");

    if ($next.length) {
        $current.removeClass("active");
        $next.addClass("active");
    }
});

// Clear sibling form fields
$(".clear-others").on("click", function () {
    $(this).siblings("input").val("");
});

// Check if any siblings are visible
const $items = $(".list-item");
$items.each(function () {
    const hasSiblings = $(this).siblings(":visible").length > 0;
    if (!hasSiblings) {
        $(this).addClass("only-child");
    }
});

// Toggle visibility of sibling elements
$(".toggle-siblings").on("click", function () {
    $(this).siblings(".toggleable").toggle();
});
```

## Differences to jQuery

None.
