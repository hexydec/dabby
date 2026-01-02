# .add()

Creates a new Dabby collection with elements added to the end of the existing collection.

## Usage

```javascript
$(selector).add(nodes);
$(selector).add(nodes, context);
```

### nodes

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to add to the collection.

### context

An optional selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function indicating where the `nodes` selector should start matching.

## Returns

A new Dabby collection containing the nodes from the original collection plus the new nodes that were added.

## Examples

### Basic Usage

```javascript
// Add elements by selector
const $items = $(".item").add(".extra-item");

// Add HTML string
const $paragraphs = $("p").add("<p>New paragraph</p>");

// Add specific element
const $inputs = $("input[type='text']").add($("input[type='email']"));

// Add with context
const $elements = $("#container1 p").add("p", "#container2");
```

### Real-World Examples

```javascript
// Combine multiple element types for event handling
$("button").add("a.button").on("click", function (e) {
    e.preventDefault();
    console.log("Button-like element clicked");
});

// Add related elements for validation
function getFormFields($form) {
    return $form
        .find("input")
        .add($form.find("textarea"))
        .add($form.find("select"));
}

const $allFields = getFormFields($("form"));
console.log(`Total fields: ${$allFields.length}`);

// Combine selections for styling
$(".primary-nav a")
    .add(".secondary-nav a")
    .addClass("nav-link");

// Add dynamically created elements
const $existing = $(".product");
const $new = $("<div class='product'>New Product</div>");
const $allProducts = $existing.add($new);

$allProducts.each(function (index) {
    console.log(`Product ${index}:`, $(this).text());
});

// Combine search results from different sources
function searchAll(term) {
    const $titles = $(`.product:contains("${term}")`);
    const $descriptions = $(`.description:contains("${term}")`);

    return $titles.add($descriptions.parent());
}

// Add elements from different containers
const $leftItems = $("#left-panel .item");
const $rightItems = $("#right-panel .item");
const $allItems = $leftItems.add($rightItems);

$allItems.addClass("processed");

// Build complex selectors
const $required = $("input[required]")
    .add("textarea[required]")
    .add("select[required]");

$required.on("blur", function () {
    if (!$(this).val()) {
        $(this).addClass("error");
    }
});

// Add conditional elements
let $elements = $(".base-element");

if (includeOptional) {
    $elements = $elements.add(".optional-element");
}

if (includeExtra) {
    $elements = $elements.add(".extra-element");
}

$elements.show();

// Combine elements for animation
$(".header")
    .add(".sidebar")
    .add(".footer")
    .addClass("fade-in");

// Add elements with context
const $container1 = $("#container1");
const $container2 = $("#container2");

const $combined = $container1.find(".item").add(".item", $container2);
console.log(`Total items: ${$combined.length}`);

// Build element collection progressively
let $selection = $();

$(".section").each(function () {
    if ($(this).hasClass("active")) {
        $selection = $selection.add($(this).find(".content"));
    }
});

$selection.show();

// Add parent and child elements
const $children = $(".card .card-body");
const $withParents = $children.add($children.parent());

$withParents.addClass("highlighted");

// Combine filtered results
const $activeItems = $(".item.active");
const $featuredItems = $(".item.featured");
const $important = $activeItems.add($featuredItems);

$important.attr("data-priority", "high");

// Add elements from different pages/contexts
function combineSearchResults() {
    const $page1 = $("#page1 .result");
    const $page2 = $("#page2 .result");
    const $page3 = $("#page3 .result");

    return $page1.add($page2).add($page3);
}

// Progressive enhancement
const $basicFields = $("input[type='text']");
let $allFields = $basicFields;

if (emailSupported) {
    $allFields = $allFields.add("input[type='email']");
}

if (dateSupported) {
    $allFields = $allFields.add("input[type='date']");
}

$allFields.addClass("enhanced");
```

## Differences to jQuery

None.
