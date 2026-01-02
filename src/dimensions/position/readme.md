# .position()

Retrieves the position of the first element in the collection relative to its offset parent.

## Usage

```javascript
const position = $(selector).position();
```

## Returns

An object containing the properties `top` and `left`, or undefined if the collection is empty.

## Examples

### Basic Usage

```javascript
// Get position
const position = $(".box").position();
console.log(`Top: ${position.top}, Left: ${position.left}`);

// Check position
if ($(".element").position().top > 100) {
    console.log("Element is positioned more than 100px from top");
}

// Use position values
const pos = $(".item").position();
$(".other-item").css({
    top: pos.top + "px",
    left: pos.left + "px"
});
```

### Real-World Examples

```javascript
// Align element with another
function alignWithElement($target, $reference) {
    const refPosition = $reference.position();

    $target.css({
        position: "absolute",
        top: refPosition.top + "px",
        left: refPosition.left + "px"
    });
}

// Position tooltip relative to parent
function showTooltip($element, message) {
    const position = $element.position();
    const height = $element.outerHeight();

    const $tooltip = $("<div>")
        .addClass("tooltip")
        .text(message)
        .css({
            position: "absolute",
            top: position.top + height + 5 + "px",
            left: position.left + "px"
        })
        .appendTo($element.parent());
}

// Check if element is at origin
function isAtOrigin($element) {
    const position = $element.position();
    return position.top === 0 && position.left === 0;
}

// Calculate movement needed
function getMovementTo($element, targetTop, targetLeft) {
    const current = $element.position();

    return {
        top: targetTop - current.top,
        left: targetLeft - current.left
    };
}

// Constrain drag to container
function constrainDrag($element, newTop, newLeft) {
    const $parent = $element.parent();
    const parentWidth = $parent.innerWidth();
    const parentHeight = $parent.innerHeight();
    const elementWidth = $element.outerWidth();
    const elementHeight = $element.outerHeight();

    let top = newTop;
    let left = newLeft;

    if (top < 0) top = 0;
    if (left < 0) left = 0;
    if (top + elementHeight > parentHeight) {
        top = parentHeight - elementHeight;
    }
    if (left + elementWidth > parentWidth) {
        left = parentWidth - elementWidth;
    }

    $element.css({ top: top + "px", left: left + "px" });
}

// Grid snap positioning
function snapToGrid($element, gridSize) {
    const position = $element.position();

    const snappedTop = Math.round(position.top / gridSize) * gridSize;
    const snappedLeft = Math.round(position.left / gridSize) * gridSize;

    $element.css({
        top: snappedTop + "px",
        left: snappedLeft + "px"
    });
}

// Detect position change
let lastPosition = { top: 0, left: 0 };

function checkPositionChange($element) {
    const currentPosition = $element.position();

    if (
        currentPosition.top !== lastPosition.top ||
        currentPosition.left !== lastPosition.left
    ) {
        console.log("Position changed!");
        lastPosition = currentPosition;
        return true;
    }

    return false;
}

// Arrange elements in a grid
function arrangeGrid($items, columns, spacing) {
    $items.each(function (index) {
        const row = Math.floor(index / columns);
        const col = index % columns;

        $(this).css({
            position: "absolute",
            top: row * spacing + "px",
            left: col * spacing + "px"
        });
    });
}

// Centre element within parent
function centreInParent($element) {
    const $parent = $element.parent();
    const parentWidth = $parent.innerWidth();
    const parentHeight = $parent.innerHeight();
    const elementWidth = $element.outerWidth();
    const elementHeight = $element.outerHeight();

    $element.css({
        position: "absolute",
        top: (parentHeight - elementHeight) / 2 + "px",
        left: (parentWidth - elementWidth) / 2 + "px"
    });
}

// Offset element from another
function offsetFromElement($element, $reference, offsetTop, offsetLeft) {
    const refPosition = $reference.position();

    $element.css({
        position: "absolute",
        top: refPosition.top + offsetTop + "px",
        left: refPosition.left + offsetLeft + "px"
    });
}

// Track relative movement
const movements = [];

$(".draggable").on("drag", function () {
    const position = $(this).position();
    movements.push({ top: position.top, left: position.left });
});

// Position dropdown menu
$(".menu-trigger").on("click", function () {
    const position = $(this).position();
    const height = $(this).outerHeight();

    $(".dropdown-menu").css({
        position: "absolute",
        top: position.top + height + "px",
        left: position.left + "px"
    }).show();
});

// Check collision with another element
function checkCollision($elem1, $elem2) {
    const pos1 = $elem1.position();
    const pos2 = $elem2.position();
    const width1 = $elem1.outerWidth();
    const height1 = $elem1.outerHeight();
    const width2 = $elem2.outerWidth();
    const height2 = $elem2.outerHeight();

    return !(
        pos1.left + width1 < pos2.left ||
        pos1.left > pos2.left + width2 ||
        pos1.top + height1 < pos2.top ||
        pos1.top > pos2.top + height2
    );
}

// Animate to position
function animateToPosition($element, targetTop, targetLeft, duration) {
    const current = $element.position();
    const deltaTop = targetTop - current.top;
    const deltaLeft = targetLeft - current.left;
    const steps = 60;
    const stepDuration = duration / steps;

    let step = 0;

    const interval = setInterval(function () {
        step++;
        const progress = step / steps;

        $element.css({
            top: current.top + deltaTop * progress + "px",
            left: current.left + deltaLeft * progress + "px"
        });

        if (step >= steps) {
            clearInterval(interval);
        }
    }, stepDuration);
}

// Create overlay at same position
function createPositionedOverlay($target) {
    const position = $target.position();
    const width = $target.outerWidth();
    const height = $target.outerHeight();

    return $("<div>")
        .addClass("overlay")
        .css({
            position: "absolute",
            top: position.top + "px",
            left: position.left + "px",
            width: width + "px",
            height: height + "px"
        })
        .appendTo($target.parent());
}
```

## Differences to jQuery

None.
