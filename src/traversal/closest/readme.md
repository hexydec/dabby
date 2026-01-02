# .closest()

Finds the first ancestor of each element in the collection that matches a given selector, starting with the element itself.

## Usage

```javascript
$(collection).closest(selector);
$(collection).closest(selector, context);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or callback function to find the matching ancestor.

### context

An optional HTML string, Node, array of Nodes, or function indicating where the search for an ancestor should stop.

## Returns

A new Dabby collection containing the matched ancestors.

## Examples

### Basic Usage

```javascript
// Find closest parent with class
const $card = $(".button").closest(".card");

// Find closest form
const $form = $("input").closest("form");

// Find closest list item
const $listItem = $(".link").closest("li");

// Find with context limit
const $section = $(".element").closest(".section", ".container");
```

### Real-World Examples

```javascript
// Event delegation - find closest clickable parent
$(".list").on("click", ".delete-button", function () {
    $(this).closest(".list-item").remove();
});

// Form handling
$("input").on("change", function () {
    const $formGroup = $(this).closest(".form-group");
    $formGroup.removeClass("error");
});

// Find parent card on button click
$(".card-button").on("click", function () {
    const $card = $(this).closest(".card");
    const cardId = $card.data("id");
    console.log("Card clicked:", cardId);
});

// Toggle accordion sections
$(".accordion-header").on("click", function () {
    const $section = $(this).closest(".accordion-section");
    $section.toggleClass("expanded");
    $section.find(".accordion-content").toggle();
});

// Navigate up to table row
$(".edit-cell").on("click", function () {
    const $row = $(this).closest("tr");
    $row.addClass("editing");
});

// Find modal container
$(".modal-close").on("click", function () {
    $(this).closest(".modal").hide();
});

// Validate field's parent form
function validateField($field) {
    const $form = $field.closest("form");
    const isValid = $form.find("input[required]").filter(function () {
        return !$(this).val();
    }).length === 0;

    return isValid;
}

// Update parent statistics
$(".item-checkbox").on("change", function () {
    const $container = $(this).closest(".container");
    const checkedCount = $container.find(".item-checkbox:checked").length;

    $container.find(".checked-count").text(checkedCount);
});

// Find data container
$(".item").on("click", function () {
    const $dataContainer = $(this).closest("[data-category]");
    const category = $dataContainer.data("category");
    console.log("Category:", category);
});
```

## Differences to jQuery

None.
