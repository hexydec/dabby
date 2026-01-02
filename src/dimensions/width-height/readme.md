# .width(), .height(), .innerWidth(), .innerHeight(), .outerWidth(), .outerHeight()

Get or set dimensions of elements with different measurement options.

## .width() / .height()

Retrieve the width or height of the first element in a matched collection or set the width or height of every element in a collection.

The width and height is defined as the inner size of the element excluding padding, border, and margin.

## .innerWidth() / .innerHeight()

Retrieve the inner width or inner height of the first element in a matched collection or set the inner width or inner height of every element in a collection.

The inner width and inner height is defined as the inner size of the element including padding, but excluding border and margin.

## .outerWidth() / .outerHeight()

Retrieve the outer width or outer height of the first element in a matched collection or set the outer width or outer height of every element in a collection.

The outer width and outer height is defined as the inner size of the element including padding and border, but excluding margin.

## Usage

```javascript
// Get dimensions
$(selector).width();
$(selector).height();
$(selector).innerWidth();
$(selector).innerHeight();
$(selector).outerWidth();
$(selector).outerHeight();

// Set dimensions
$(selector).width(value);
$(selector).height(value);
$(selector).innerWidth(value);
$(selector).innerHeight(value);
$(selector).outerWidth(value);
$(selector).outerHeight(value);

// Set with callback
$(selector).width(function (index, currentValue) {});
$(selector).height(function (index, currentValue) {});
$(selector).innerWidth(function (index, currentValue) {});
$(selector).innerHeight(function (index, currentValue) {});
$(selector).outerWidth(function (index, currentValue) {});
$(selector).outerHeight(function (index, currentValue) {});
```

### value

An integer or string specifying the desired dimensions of the items in the collection. As a string, the value should be numeric with a unit as a suffix such as px, pt, cm, or % (any unit supported by the browser).

If no unit is specified, pixels (px) is assumed.

### function

A callback that receives the index of the element in the collection and the current value of the dimension. Should return the new dimension value. `this` will reference the current item in the collection that is being processed.

## Returns

A number containing the requested dimension as a pixel unit when getting, or the input Dabby collection when setting.

## Examples

### Basic Usage

```javascript
// Get dimensions
const width = $(".box").width();
const height = $(".box").height();
const innerWidth = $(".box").innerWidth();
const outerWidth = $(".box").outerWidth();

// Set dimensions
$(".box").width(200);
$(".box").height(150);
$(".box").width("50%");
$(".box").height("10rem");
```

### Real-World Examples

```javascript
// Make all cards the same height
function equaliseCardHeights() {
    let maxHeight = 0;

    $(".card").each(function () {
        const cardHeight = $(this).outerHeight();
        if (cardHeight > maxHeight) {
            maxHeight = cardHeight;
        }
    });

    $(".card").height(maxHeight);
}

// Responsive image container
function resizeContainer() {
    const windowWidth = $(window).width();

    if (windowWidth < 768) {
        $(".container").width("100%");
    } else if (windowWidth < 1200) {
        $(".container").width("80%");
    } else {
        $(".container").width(1140);
    }
}

$(window).on("resize", resizeContainer);

// Create square elements
$(".square").each(function () {
    const width = $(this).width();
    $(this).height(width);
});

// Calculate aspect ratio
const $image = $(".hero-image");
const aspectRatio = $image.width() / $image.height();
console.log(`Aspect ratio: ${aspectRatio.toFixed(2)}`);

// Increase size by percentage
$(".enlarge-button").on("click", function () {
    $(".image").width(function (index, currentWidth) {
        return currentWidth * 1.2;
    });

    $(".image").height(function (index, currentHeight) {
        return currentHeight * 1.2;
    });
});

// Match content to container
function fitContent() {
    const containerHeight = $(".container").innerHeight();
    const headerHeight = $(".header").outerHeight();
    const footerHeight = $(".footer").outerHeight();

    const contentHeight = containerHeight - headerHeight - footerHeight;
    $(".content").height(contentHeight);
}

// Responsive sidebar
function adjustLayout() {
    const windowHeight = $(window).height();
    const headerHeight = $(".header").outerHeight(true);

    $(".sidebar").height(windowHeight - headerHeight);
}

// Create thumbnail grid
$(".thumbnail").each(function (index) {
    const size = 100 + (index * 10);
    $(this).width(size).height(size);
});

// Modal centring
function centreModal() {
    const $modal = $(".modal");
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const modalWidth = $modal.outerWidth();
    const modalHeight = $modal.outerHeight();

    $modal.css({
        left: (windowWidth - modalWidth) / 2 + "px",
        top: (windowHeight - modalHeight) / 2 + "px"
    });
}

// Progress bar
function updateProgress(percentage) {
    const containerWidth = $(".progress-container").width();
    const barWidth = (containerWidth * percentage) / 100;

    $(".progress-bar").width(barWidth);
}

// Flexible columns
function distributeColumns() {
    const containerWidth = $(".container").width();
    const columnCount = $(".column").length;
    const columnWidth = containerWidth / columnCount;

    $(".column").width(columnWidth);
}

// Check if element fits
function checkFit($element, $container) {
    const elementWidth = $element.outerWidth(true);
    const containerWidth = $container.innerWidth();

    return elementWidth <= containerWidth;
}

// Expand to fill parent
$(".fill-parent").each(function () {
    const parentWidth = $(this).parent().innerWidth();
    const parentHeight = $(this).parent().innerHeight();

    $(this).width(parentWidth).height(parentHeight);
});

// Animate size change
let isExpanded = false;

$(".toggle-size").on("click", function () {
    if (isExpanded) {
        $(".expandable").width(200).height(200);
    } else {
        $(".expandable").width(400).height(400);
    }

    isExpanded = !isExpanded;
});

// Calculate total width including margin
function getTotalWidth($element) {
    const outerWidth = $element.outerWidth();
    const marginLeft = parseFloat($element.css("margin-left"));
    const marginRight = parseFloat($element.css("margin-right"));

    return outerWidth + marginLeft + marginRight;
}

// Set minimum dimensions
$(".box").each(function () {
    const currentWidth = $(this).width();
    const currentHeight = $(this).height();

    if (currentWidth < 100) {
        $(this).width(100);
    }

    if (currentHeight < 100) {
        $(this).height(100);
    }
});

// Scale proportionally
function scaleElement($element, scaleFactor) {
    $element.width(function (i, w) {
        return w * scaleFactor;
    });

    $element.height(function (i, h) {
        return h * scaleFactor;
    });
}

scaleElement($(".image"), 1.5);
```

## Differences to jQuery

Doesn't support relative units such as "+2px".
