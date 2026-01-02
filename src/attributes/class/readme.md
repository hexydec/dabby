# .addClass(), .removeClass(), .toggleClass()

Add, remove, or toggle a class or classes to every item in a collection.

## Usage

```javascript
$(selector).addClass(className);
$(selector).addClass(classArray);
$(selector).addClass(function (index, currentClassName));
$(selector).removeClass(className);
$(selector).removeClass(classArray);
$(selector).removeClass(function (index, currentClassName));
$(selector).toggleClass(className, state);
$(selector).toggleClass(classArray, state);
$(selector).toggleClass(function (index, currentClassName), state);
```

### className

A string of space-separated class names.

### classArray

An array of class names.

### function (index, currentClassName)

A callback function that receives the index of the current item and the current class name(s) as a string, and returns either a space-separated list of class names, or an array.

### state

A boolean to force the toggle state on or off. If omitted, the class will be toggled.

## Returns

The original Dabby collection.

## Examples

### Adding Classes

```javascript
// Add a single class to all matching elements
$(".card").addClass("card--active");

// Add multiple classes using a space-separated string
$(".card").addClass("card--active card--highlighted");

// Add multiple classes using an array
$(".card").addClass(["card--active", "card--highlighted"]);

// Add classes conditionally using a callback
$(".item").addClass(function (index, currentClass) {
    return index % 2 === 0 ? "item--even" : "item--odd";
});
```

### Removing Classes

```javascript
// Remove a single class
$(".card").removeClass("card--active");

// Remove multiple classes
$(".card").removeClass("card--active card--highlighted");

// Remove classes using an array
$(".card").removeClass(["card--active", "card--highlighted"]);

// Remove classes conditionally
$(".item").removeClass(function (index, currentClass) {
    return currentClass.includes("temporary") ? "temporary" : "";
});
```

### Toggling Classes

```javascript
// Toggle a class on click
$(".menu-button").on("click", function () {
    $(".navigation").toggleClass("navigation--open");
});

// Force a specific state with the second parameter
$(".panel").toggleClass("panel--expanded", true);  // Always add
$(".panel").toggleClass("panel--expanded", false); // Always remove

// Toggle multiple classes
$(".theme-toggle").on("click", function () {
    $("body").toggleClass(["dark-mode", "high-contrast"]);
});

// Toggle with callback
$(".list-item").toggleClass(function (index) {
    return "item-" + (index + 1);
});
```

### Real-World Example

```javascript
// Highlight selected items in a list
$(".product-list").on("click", ".product-item", function () {
    // Remove highlight from all items
    $(".product-item").removeClass("product-item--selected");

    // Add highlight to clicked item
    $(this).addClass("product-item--selected");
});

// Form validation states
function validateForm() {
    $(".form-field").each(function (index, field) {
        const $field = $(field);
        const value = $field.find("input").val();

        if (!value) {
            $field.addClass("form-field--error").removeClass("form-field--valid");
        } else {
            $field.addClass("form-field--valid").removeClass("form-field--error");
        }
    });
}
```

## Differences to jQuery

Dabby supports everything jQuery supports, plus it can handle an array of class names for all class methods.
