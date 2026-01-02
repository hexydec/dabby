# .offset()

Retrieves the coordinates of the first item in the collection, or sets the coordinates of each item in the collection, relative to the document.

## Usage

```javascript
// Get offset
const offset = $(selector).offset();

// Set offset
$(selector).offset(coords);
$(selector).offset(function (index, currentValue) {});
```

### coords

An object containing the properties `top` and `left`.

### function

A callback that receives the index of the element in the collection and the current offset value. Should return a new offset object. `this` will reference the current item in the collection that is being processed.

## Returns

The original Dabby collection when setting the coordinates, or an object containing the properties `top` and `left`, or undefined if the collection is empty.

## Examples

### Basic Usage

```javascript
// Get offset
const offset = $(".box").offset();
console.log(`Top: ${offset.top}, Left: ${offset.left}`);

// Set offset
$(".box").offset({ top: 100, left: 200 });

// Set with callback
$(".item").offset(function (index, current) {
    return {
        top: current.top + 10,
        left: current.left + 10
    };
});
```

### Real-World Examples

```javascript
// Position tooltip near element
function showTooltip($trigger, tooltipText) {
    const $tooltip = $("<div>")
        .addClass("tooltip")
        .text(tooltipText)
        .appendTo("body");

    const triggerOffset = $trigger.offset();
    const triggerHeight = $trigger.outerHeight();

    $tooltip.offset({
        top: triggerOffset.top + triggerHeight + 5,
        left: triggerOffset.left
    });
}

// Centre element on screen
function centreOnScreen($element) {
    const windowWidth = $(window).width();
    const windowHeight = $(window).height();
    const elementWidth = $element.outerWidth();
    const elementHeight = $element.outerHeight();
    const scrollTop = $(window).scrollTop();
    const scrollLeft = $(window).scrollLeft();

    $element.offset({
        top: scrollTop + (windowHeight - elementHeight) / 2,
        left: scrollLeft + (windowWidth - elementWidth) / 2
    });
}

// Align element with another
function alignElements($source, $target) {
    const sourceOffset = $source.offset();
    $target.offset(sourceOffset);
}

// Position dropdown menu
$(".dropdown-trigger").on("click", function () {
    const $menu = $(".dropdown-menu");
    const triggerOffset = $(this).offset();
    const triggerHeight = $(this).outerHeight();

    $menu.offset({
        top: triggerOffset.top + triggerHeight,
        left: triggerOffset.left
    }).show();
});

// Track element position whilst scrolling
$(window).on("scroll", function () {
    const $element = $(".tracked-element");
    const offset = $element.offset();
    const scrollTop = $(window).scrollTop();

    console.log(`Element is ${offset.top - scrollTop}px from top of viewport`);
});

// Create overlay at element position
function createOverlay($target) {
    const offset = $target.offset();
    const width = $target.outerWidth();
    const height = $target.outerHeight();

    const $overlay = $("<div>")
        .addClass("overlay")
        .css({
            width: width + "px",
            height: height + "px"
        })
        .offset(offset)
        .appendTo("body");

    return $overlay;
}

// Sticky positioning fallback
let stickyTop = 0;

function checkSticky() {
    const $element = $(".sticky-element");
    const scrollTop = $(window).scrollTop();

    if (scrollTop > stickyTop) {
        $element.css("position", "fixed").offset({ top: 0, left: 0 });
    } else {
        $element.css("position", "static");
    }
}

// Drag and drop positioning
let dragOffset = { top: 0, left: 0 };

$(".draggable").on("mousedown", function (e) {
    const offset = $(this).offset();
    dragOffset = {
        top: e.pageY - offset.top,
        left: e.pageX - offset.left
    };
});

$(document).on("mousemove", function (e) {
    if (dragOffset) {
        $(".draggable").offset({
            top: e.pageY - dragOffset.top,
            left: e.pageX - dragOffset.left
        });
    }
});

// Calculate distance between elements
function getDistance($elem1, $elem2) {
    const offset1 = $elem1.offset();
    const offset2 = $elem2.offset();

    const deltaX = offset2.left - offset1.left;
    const deltaY = offset2.top - offset1.top;

    return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
}

// Position element at mouse click
$(document).on("click", function (e) {
    $(".click-marker").offset({
        top: e.pageY,
        left: e.pageX
    });
});

// Anchor element to another whilst scrolling
function anchorElement($anchored, $anchor, offsetTop, offsetLeft) {
    const anchorOffset = $anchor.offset();

    $anchored.offset({
        top: anchorOffset.top + offsetTop,
        left: anchorOffset.left + offsetLeft
    });
}

// Check if element is in viewport
function isInViewport($element) {
    const offset = $element.offset();
    const scrollTop = $(window).scrollTop();
    const scrollLeft = $(window).scrollLeft();
    const windowHeight = $(window).height();
    const windowWidth = $(window).width();

    return (
        offset.top >= scrollTop &&
        offset.left >= scrollLeft &&
        offset.top <= scrollTop + windowHeight &&
        offset.left <= scrollLeft + windowWidth
    );
}

// Position modal relative to trigger
function showModal($trigger) {
    const $modal = $(".modal");
    const triggerOffset = $trigger.offset();
    const triggerWidth = $trigger.outerWidth();

    $modal.offset({
        top: triggerOffset.top,
        left: triggerOffset.left + triggerWidth + 10
    }).show();
}

// Stack elements with offset
$(".stack-item").each(function (index) {
    const baseOffset = $(".stack-base").offset();

    $(this).offset({
        top: baseOffset.top + index * 5,
        left: baseOffset.left + index * 5
    });
});

// Scroll to element
function scrollToElement($element) {
    const offset = $element.offset();
    const scrollTop = offset.top - 100; // 100px from top

    $("html, body").animate({ scrollTop: scrollTop }, 500);
}
```

## Differences to jQuery

None.
