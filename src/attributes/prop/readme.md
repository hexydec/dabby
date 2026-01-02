# .prop()

Get the requested property on the first element in a collection or set properties on each item in a collection.

## Usage

```javascript
$(selector).prop(propertyName);
$(selector).prop(propertyName, value);
$(selector).prop(propertyName, function (index, currentValue) {});
$(selector).prop(properties);
```

### propertyName

The name of the property you wish to get or set.

### value

The value of the property you wish to set.

### function

A callback function to generate a value for the property you wish to set. Receives the index of the current node in the collection, and the current value. `this` will be set to the current node.

Where properties are set as an object, callback functions can also be supplied.

## Returns

When retrieving a value, the property value will be returned. If there are no elements in the collection or the requested property does not exist, `undefined` will be returned.

When setting a value or values, the original Dabby collection will be returned.

## Examples

### Getting Properties

Consider the following HTML:

```html
<a href="https://github.com/hexydec/dabby" class="external">Dabby.js</a>
<input type="checkbox" name="terms" value="agreed" checked />
<input type="text" name="username" disabled />
```

You can retrieve properties like this:

```javascript
// Get the href property (formatted by browser)
const href = $("a").prop("href");
// Returns: "https://github.com/hexydec/dabby"

// Get boolean properties
const isChecked = $("input[type='checkbox']").prop("checked"); // true
const isDisabled = $("input[name='username']").prop("disabled"); // true

// Get other properties
const tagName = $("a").prop("tagName"); // "A"
const type = $("input").prop("type"); // "checkbox"
```

### Setting Properties

```javascript
// Set a boolean property
$("input[type='checkbox']").prop("checked", true);
$("input[type='text']").prop("disabled", false);

// Set multiple properties
$("input").prop({
    required: true,
    disabled: false,
    readOnly: false
});

// Set properties with callback
$("input[type='checkbox']").prop("checked", function (index, currentValue) {
    return !currentValue; // Toggle checked state
});

// Chain property calls
$("input")
    .prop("required", true)
    .prop("disabled", false);
```

### Real-World Examples

```javascript
// Toggle checkboxes
$(".select-all").on("change", function () {
    const isChecked = $(this).prop("checked");
    $(".item-checkbox").prop("checked", isChecked);
});

// Disable form fields while submitting
$("form").on("submit", function () {
    $("input, button", this).prop("disabled", true);
    $(".submit-button").prop("value", "Submitting...");

    // Re-enable after response
    setTimeout(function () {
        $("input, button").prop("disabled", false);
        $(".submit-button").prop("value", "Submit");
    }, 2000);
});

// Mark items as selected
$(".product-item").on("click", function () {
    const $item = $(this);
    const isSelected = $item.prop("data-selected") || false;

    // Toggle selection
    $item.prop("data-selected", !isSelected);

    if (!isSelected) {
        $item.addClass("product-item--selected");
    } else {
        $item.removeClass("product-item--selected");
    }
});

// Dynamic form validation
function validateForm() {
    let isValid = true;

    $("input[required]").each(function (index, input) {
        const $input = $(input);
        const value = $input.prop("value");

        if (!value) {
            $input.addClass("error");
            isValid = false;
        } else {
            $input.removeClass("error");
        }
    });

    // Disable submit button if invalid
    $(".submit-button").prop("disabled", !isValid);

    return isValid;
}

// Toggle read-only state
$(".edit-button").on("click", function () {
    const $fields = $(".form-field");
    const isReadOnly = $fields.first().prop("readOnly");

    $fields.prop("readOnly", !isReadOnly);

    if (isReadOnly) {
        $(this).text("Cancel");
    } else {
        $(this).text("Edit");
    }
});

// Select/deselect all options
$(".select-all-options").on("click", function () {
    $("select option").prop("selected", true);
});

$(".deselect-all-options").on("click", function () {
    $("select option").prop("selected", false);
});

// Auto-expand textareas
$("textarea").each(function (index, textarea) {
    const $textarea = $(textarea);
    const scrollHeight = $textarea.prop("scrollHeight");
    $textarea.css("height", scrollHeight + "px");
});
```

### Difference Between .attr() and .prop()

```javascript
// For checkboxes, attr() and prop() return different things
const $checkbox = $("input[type='checkbox'][checked]");

// attr() returns the HTML attribute value (or undefined if not set)
$checkbox.attr("checked"); // "checked" or undefined

// prop() returns the JavaScript property value (boolean)
$checkbox.prop("checked"); // true or false

// Setting checked state
$checkbox.attr("checked", "checked"); // Sets HTML attribute
$checkbox.prop("checked", true);      // Sets JavaScript property (recommended)
```

## Differences to jQuery

None.
