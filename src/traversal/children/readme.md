# .children()

Retrieves the direct children of each element in the collection, optionally filtered by a selector.

## Usage

```javascript
$(item).children();
$(item).children(selector);
```

### selector

An optional selector, HTML string, Node, array of Nodes, Dabby collection, or callback function to filter the children.

## Returns

A new Dabby collection containing all the matched direct children.

## Examples

### Basic Usage

```javascript
// Get all direct children
const $children = $(".container").children();

// Get filtered children
const $listItems = $("ul").children("li");

// Get children with specific class
const $activeChildren = $(".nav").children(".active");

// Get children by attribute
const $requiredInputs = $("form").children("[required]");
```

### Real-World Examples

```javascript
// Style direct children only
$(".menu").children().css("padding", "10px");

// Count direct children
const childCount = $(".container").children().length;
console.log(`${childCount} direct children`);

// Hide all child elements
$(".collapsible").children().hide();

// Toggle child visibility
$(".toggle-children").on("click", function () {
    $(this).parent().children().not(this).toggle();
});

// Add class to specific children
$(".list").children("li").addClass("list-item");

// Remove specific children
$(".container").children(".obsolete").remove();

// Iterate over children
$(".parent").children().each(function (index) {
    $(this).attr("data-index", index);
});

// Find and modify specific children
$("ul").children(".selected").css("background-colour", "#e0e0e0");

// Get first/last child
const $firstChild = $(".container").children().first();
const $lastChild = $(".container").children().last();

// Filter children by data attribute
const $featured = $(".grid").children("[data-featured='true']");

// Count children of specific type
const divCount = $(".container").children("div").length;

// Difference between .children() and .find()
// .children() - only direct descendants
const $directChildren = $(".parent").children("span");
// Returns: <span> that are direct children only

// .find() - all descendants
const $allDescendants = $(".parent").find("span");
// Returns: all <span> at any nesting level

// Practical example: Accordion
$(".accordion-header").on("click", function () {
    const $parent = $(this).parent();

    // Close all other panels
    $(".accordion").children().not($parent).find(".content").hide();

    // Toggle this panel's content
    $parent.children(".content").toggle();
});

// Navigation menu highlighting
$(".nav-menu").children("li").on("click", function () {
    $(".nav-menu").children("li").removeClass("active");
    $(this).addClass("active");
});

// Form field validation
$("form").children(".form-group").each(function () {
    const $input = $(this).children("input");

    if ($input.prop("required") && !$input.val()) {
        $(this).addClass("has-error");
    }
});

// Tab functionality
$(".tab-list").children(".tab").on("click", function () {
    const index = $(this).index();

    // Hide all tab contents
    $(".tab-content-container").children().hide();

    // Show selected tab content
    $(".tab-content-container").children().eq(index).show();
});

// Dynamic content generation
function addItemsToList(items) {
    const $list = $(".item-list");

    // Clear existing children
    $list.children().remove();

    // Add new items
    items.forEach(item => {
        $list.append(`<li>${item}</li>`);
    });
}
```

## Differences to jQuery

None.
