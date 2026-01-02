# .parent(), .parents(), .parentsUntil()

Navigate up the DOM tree to find parent elements.

## .parent()

Retrieve the immediate parent of each item in a collection.

### Usage

```javascript
$(collection).parent();
$(collection).parent(selector);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

### Returns

A new Dabby collection containing the parent nodes.

## .parents()

Retrieve all ancestors of each item in a collection.

### Usage

```javascript
$(collection).parents();
$(collection).parents(selector);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function used to filter the collection.

### Returns

A new Dabby collection containing all ancestor nodes.

## .parentsUntil()

Retrieve the ancestors of each item in a collection until, but not including, the matched selector.

### Usage

```javascript
$(collection).parentsUntil(selector);
$(collection).parentsUntil(selector, filter);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function indicating where to stop matching parent nodes.

### filter

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to filter the collection.

### Returns

A new Dabby collection containing the matching ancestor nodes.

## Examples

### Basic Usage

```javascript
// Get immediate parent
const $parent = $(".button").parent();

// Get all parents
const $allParents = $(".nested-element").parents();

// Get parents matching selector
const $sections = $(".element").parents(".section");

// Get parents until container
const $ancestors = $(".element").parentsUntil(".container");

// Get filtered parents until boundary
const $divParents = $(".element").parentsUntil("body", "div");
```

### Real-World Examples

```javascript
// Find parent form on input change
$("input").on("change", function () {
    const $form = $(this).parent("form");
    if ($form.length) {
        $form.addClass("modified");
    }
});

// Navigate to parent container
$(".close-button").on("click", function () {
    $(this).parent(".modal").hide();
});

// Find and update parent statistics
$(".item-checkbox").on("change", function () {
    const $list = $(this).parents(".list-container").first();
    const checkedCount = $list.find(".item-checkbox:checked").length;
    $list.find(".count").text(checkedCount);
});

// Toggle parent accordion
$(".accordion-content").on("click", ".link", function (e) {
    e.preventDefault();
    $(this).parents(".accordion-section").toggleClass("expanded");
});

// Find all parent sections
function getSectionHierarchy($element) {
    return $element.parents("[data-section]").map(function () {
        return $(this).data("section");
    });
}

// Style parent on child hover
$(".thumbnail").hover(
    function () {
        $(this).parent(".card").addClass("child-hovered");
    },
    function () {
        $(this).parent(".card").removeClass("child-hovered");
    }
);

// Check if element is inside specific container
function isInsideContainer($element, containerSelector) {
    return $element.parents(containerSelector).length > 0;
}

if (isInsideContainer($(this), ".restricted-area")) {
    console.log("Element is in restricted area");
}

// Remove parent on button click
$(".delete-row").on("click", function () {
    $(this).parent("tr").remove();
});

// Find form group parent
$("input").on("focus", function () {
    $(this).parents(".form-group").first().addClass("focused");
});

$("input").on("blur", function () {
    $(this).parents(".form-group").first().removeClass("focused");
});

// Navigate up to table
$("td").on("click", function () {
    const $table = $(this).parents("table").first();
    const tableId = $table.attr("id");
    console.log("Cell in table:", tableId);
});

// Get breadcrumb from parents
function getBreadcrumb($element) {
    const breadcrumb = [];
    $element.parentsUntil("body", "[data-name]").each(function () {
        breadcrumb.unshift($(this).data("name"));
    });
    return breadcrumb.join(" > ");
}

// Find closest parent with class
$(".nested-button").on("click", function () {
    const $container = $(this).parents(".container").first();
    $container.addClass("active");
});

// Disable all parents until form
$(".error-field").each(function () {
    $(this).parentsUntil("form", ".fieldset").addClass("has-error");
});

// Check parent hierarchy
function hasParent($element, selector) {
    return $element.parent(selector).length > 0;
}

// Navigate through parent tree
$(".leaf-node").parents(".tree-node").each(function (index) {
    console.log(`Level ${index}:`, $(this).data("id"));
});

// Find and highlight parent sections
$(".search-result").each(function () {
    $(this).parents(".section").addClass("contains-results");
});
```

## Differences to jQuery

None.
