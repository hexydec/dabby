# .css()

Get the requested CSS properties from the first item in a collection, or set the requested properties on all the items in the collection.

## Usage

```javascript
$(selector).css(property);
$(selector).css([property, ...]);
$(selector).css({property: value, ...});
$(selector).css(property, value);
$(selector).css(property, function (index, currentValue) {});
```

You can request a property or properties from the first item in a collection by sending the property name as either a string or an array of strings. To set properties, send an object containing property names as the key, and the property value as the value, or use the two-argument form to set single properties.

### property

The property name(s) can be requested using either dash or camelCase notation.

### value

The value to set the specified property to on each item in the collection. Can be a string (e.g., `"10px"`, `"red"`) or a number (automatically converted to pixels where appropriate).

### function

A callback function to generate the value. Receives the index of the current node in the collection, and the current value. `this` will be set to the current node.

Where properties are set as an object, callback functions can also be supplied.

## Returns

When requesting properties, the return value will be either the requested property value as a string, or an object containing the requested values. If multiple properties are requested, the property names will be returned in the same form as they were requested (camelCase or dash-erised).

When setting properties, the original Dabby collection will be returned.

## Examples

### Getting CSS Properties

```javascript
// Get a single property
const colour = $(".card").css("background-color"); // e.g., "rgb(255, 0, 0)"
const colour = $(".card").css("backgroundColor");   // Same as above

// Get multiple properties
const styles = $(".card").css(["border-color", "border-width"]);
// Returns: {"border-color": "red", "border-width": "5px"}

const styles = $(".card").css(["borderColor", "borderWidth"]);
// Returns: {borderColor: "red", borderWidth: "5px"}
```

### Setting CSS Properties

```javascript
// Set a single property
$(".card").css("background-color", "blue");
$(".card").css("backgroundColor", "blue"); // Same as above

// Set a numeric value (automatically adds 'px')
$(".card").css("width", 300); // Sets width to "300px"

// Set multiple properties with an object
$(".card").css({
    "background-color": "blue",
    "border-width": "2px",
    "padding": "1rem"
});

// Same with camelCase
$(".card").css({
    backgroundColor: "blue",
    borderWidth: "2px",
    padding: "1rem"
});

// Chain multiple CSS calls
$(".card")
    .css("background-color", "blue")
    .css("color", "white")
    .css("padding", "1rem");
```

### Using Callbacks

```javascript
// Set property based on current value
$(".progress-bar").css("width", function (index, currentWidth) {
    return (parseFloat(currentWidth) + 10) + "px";
});

// Set different values for each element
$(".card").css("opacity", function (index) {
    return 1 - (index * 0.1); // Progressively fade out
});

// Use callback in object form
$(".item").css({
    width: function (index) {
        return (index + 1) * 50 + "px";
    },
    opacity: function (index, currentOpacity) {
        return parseFloat(currentOpacity) * 0.8;
    }
});
```

### Real-World Examples

```javascript
// Create a colour theme switcher
function applyTheme(theme) {
    if (theme === "dark") {
        $("body").css({
            backgroundColor: "#1a1a1a",
            color: "#f0f0f0"
        });
    } else {
        $("body").css({
            backgroundColor: "#ffffff",
            color: "#333333"
        });
    }
}

// Dynamic sizing based on content
function resizeElements() {
    $(".card").each(function (index, element) {
        const $card = $(element);
        const contentHeight = $card.find(".card-content").css("height");

        $card.css({
            minHeight: contentHeight,
            borderWidth: index === 0 ? "3px" : "1px"
        });
    });
}

// Smooth transitions
$(".button").on("mouseenter", function () {
    $(this).css({
        backgroundColor: "#007bff",
        transform: "scale(1.05)",
        transition: "all 0.3s ease"
    });
}).on("mouseleave", function () {
    $(this).css({
        backgroundColor: "#0056b3",
        transform: "scale(1)"
    });
});

// Responsive adjustments
if ($(window).width() < 768) {
    $(".sidebar").css({
        width: "100%",
        position: "static"
    });
} else {
    $(".sidebar").css({
        width: "250px",
        position: "fixed"
    });
}
```

## Differences to jQuery

None.
