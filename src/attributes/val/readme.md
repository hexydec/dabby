# .val()

Get the value of the first item in the collection, or set the values of all items in the collection.

This method is designed to work with `input`, `select` and `textarea` nodes.

## Usage

```javascript
$(selector).val();
$(selector).val(value);
$(selector).val(function (index, currentValue) {});
```

### value

The value to set to each node in the collection.

### function

A callback that receives the index of the element in the collection, and the current value. Should return a new value. `this` will reference the current item in the collection that is being processed.

## Returns

The original Dabby collection when setting the value, or the current value when getting, or `undefined` if the collection is empty.

## Examples

### Getting Values

```javascript
// Get value from text input
const username = $("input[name='username']").val();

// Get value from textarea
const message = $("textarea").val();

// Get value from select box
const selectedOption = $("select").val();

// Get value from multi-select (returns array)
const selectedOptions = $("select[multiple]").val();

// Get checked radio button value
const gender = $("input[type='radio'][name='gender']:checked").val();

// Get checked checkbox value
const termsValue = $("input[type='checkbox'][name='terms']:checked").val();

// Returns undefined if no elements match
const missing = $("input[name='nonexistent']").val(); // undefined
```

### Setting Values

```javascript
// Set value in text input
$("input[name='username']").val("JohnDoe");

// Set value in textarea
$("textarea").val("Hello, world!");

// Set value in select box
$("select").val("option2");

// Set multiple values in multi-select
$("select[multiple]").val(["option2", "option3", "option4"]);

// Check a radio button by value
$("input[type='radio'][name='gender']").val("female");

// Check a checkbox by value
$("input[type='checkbox']").val("agreed");

// Clear all form fields
$("input, textarea, select").val("");
```

### Using Callbacks

```javascript
// Transform current value
$("input[type='text']").val(function (index, currentValue) {
    return currentValue.toUpperCase();
});

// Increment numeric values
$("input[type='number']").val(function (index, currentValue) {
    return parseFloat(currentValue) + 1;
});

// Add prefix to values
$("input.price").val(function (index, currentValue) {
    return "£" + currentValue;
});
```

### Real-World Examples

```javascript
// Form submission with validation
$("form").on("submit", function (e) {
    e.preventDefault();

    const email = $("input[name='email']").val();
    const password = $("input[name='password']").val();

    if (!email || !password) {
        alert("Please fill in all fields");
        return false;
    }

    // Submit form data
    console.log({ email, password });
});

// Live search functionality
$("input[name='search']").on("input", function () {
    const searchTerm = $(this).val().toLowerCase();

    $(".search-result").each(function (index, result) {
        const text = $(result).text().toLowerCase();

        if (text.includes(searchTerm)) {
            $(result).show();
        } else {
            $(result).hide();
        }
    });
});

// Character counter for textarea
$("textarea").on("input", function () {
    const value = $(this).val();
    const length = value.length;
    const maxLength = $(this).attr("maxlength") || 500;

    $(".character-count").text(`${length}/${maxLength}`);
});

// Auto-format phone number
$("input[name='phone']").on("input", function () {
    let value = $(this).val().replace(/\D/g, "");

    if (value.length > 10) {
        value = value.substr(0, 10);
    }

    // Format as: 07XXX XXXXXX
    if (value.length > 5) {
        value = value.substr(0, 5) + " " + value.substr(5);
    }

    $(this).val(value);
});

// Calculate total from multiple inputs
function calculateTotal() {
    let total = 0;

    $(".price-input").each(function (index, input) {
        const value = parseFloat($(input).val()) || 0;
        total += value;
    });

    $(".total-display").text("£" + total.toFixed(2));
}

$(".price-input").on("input", calculateTotal);

// Reset form
$(".reset-button").on("click", function () {
    $("input[type='text'], textarea").val("");
    $("select").val("");
    $("input[type='checkbox'], input[type='radio']").prop("checked", false);
});

// Populate form from data
function populateForm(userData) {
    $("input[name='username']").val(userData.username);
    $("input[name='email']").val(userData.email);
    $("textarea[name='bio']").val(userData.bio);
    $("select[name='country']").val(userData.country);

    if (userData.subscribe) {
        $("input[name='subscribe']").prop("checked", true);
    }
}

// Collect form data into object
function getFormData() {
    return {
        username: $("input[name='username']").val(),
        email: $("input[name='email']").val(),
        password: $("input[name='password']").val(),
        country: $("select[name='country']").val(),
        interests: $("select[name='interests']").val(), // multi-select
        newsletter: $("input[name='newsletter']:checked").length > 0
    };
}

// Dynamic field validation
$("input[required]").on("blur", function () {
    const $input = $(this);
    const value = $input.val();

    if (!value) {
        $input.addClass("error");
        $input.next(".error-message").text("This field is required");
    } else {
        $input.removeClass("error");
        $input.next(".error-message").text("");
    }
});
```

## Differences to jQuery

None.
