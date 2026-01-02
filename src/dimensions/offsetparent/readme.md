# .offsetParent()

Retrieves the offset parent of the first item in a collection.

## Usage

```javascript
const $offsetParent = $(selector).offsetParent();
```

## Returns

A new Dabby collection containing the offset parent of the first item in the input collection, or an empty collection if the original collection was empty.

## Examples

### Basic Usage

```javascript
// Get offset parent
const $parent = $(".child").offsetParent();

// Check if offset parent exists
if ($(".element").offsetParent().length > 0) {
    console.log("Has offset parent");
}

// Get offset parent class
const parentClass = $(".element").offsetParent().attr("class");
```

### Real-World Examples

```javascript
// Calculate relative position
function getRelativePosition($element) {
    const elementOffset = $element.offset();
    const $parent = $element.offsetParent();

    if ($parent.length === 0) {
        return elementOffset;
    }

    const parentOffset = $parent.offset();

    return {
        top: elementOffset.top - parentOffset.top,
        left: elementOffset.left - parentOffset.left
    };
}

// Position element relative to offset parent
function positionRelative($element, top, left) {
    const $parent = $element.offsetParent();

    if ($parent.length > 0) {
        const parentOffset = $parent.offset();
        const elementOffset = {
            top: parentOffset.top + top,
            left: parentOffset.left + left
        };

        $element.offset(elementOffset);
    }
}

// Find positioned ancestor
function findPositionedAncestor($element) {
    const $offsetParent = $element.offsetParent();

    if ($offsetParent.length === 0) {
        console.log("No positioned ancestor found");
        return null;
    }

    const position = $offsetParent.css("position");
    console.log(`Offset parent position: ${position}`);

    return $offsetParent;
}

// Calculate boundary for draggable
function getDraggableBounds($element) {
    const $container = $element.offsetParent();

    if ($container.length === 0) {
        return null;
    }

    const containerOffset = $container.offset();
    const containerWidth = $container.innerWidth();
    const containerHeight = $container.innerHeight();

    return {
        top: containerOffset.top,
        left: containerOffset.left,
        bottom: containerOffset.top + containerHeight,
        right: containerOffset.left + containerWidth
    };
}

// Apply styles to offset parent
$(".child-element").each(function () {
    $(this).offsetParent().addClass("has-positioned-child");
});

// Constrain element within offset parent
function constrainToParent($element) {
    const $parent = $element.offsetParent();

    if ($parent.length === 0) {
        return;
    }

    const parentWidth = $parent.innerWidth();
    const parentHeight = $parent.innerHeight();
    const elementWidth = $element.outerWidth();
    const elementHeight = $element.outerHeight();
    const position = $element.position();

    let top = position.top;
    let left = position.left;

    // Constrain to parent bounds
    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + elementWidth > parentWidth) {
        left = parentWidth - elementWidth;
    }
    if (top + elementHeight > parentHeight) {
        top = parentHeight - elementHeight;
    }

    $element.css({ top: top + "px", left: left + "px" });
}

// Check positioning context
function checkPositioningContext($element) {
    const $offsetParent = $element.offsetParent();

    if ($offsetParent.length === 0) {
        console.log("Element is positioned relative to document");
        return "document";
    }

    if ($offsetParent.is("body")) {
        console.log("Element is positioned relative to body");
        return "body";
    }

    console.log("Element is positioned relative to:", $offsetParent[0]);
    return $offsetParent;
}

// Centre element within offset parent
function centreInParent($element) {
    const $parent = $element.offsetParent();

    if ($parent.length === 0) {
        return;
    }

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

// Get all positioned ancestors
function getPositionedAncestors($element) {
    const ancestors = [];
    let $current = $element;

    whilst (true) {
        const $parent = $current.offsetParent();

        if ($parent.length === 0) {
            break;
        }

        ancestors.push($parent[0]);
        $current = $parent;
    }

    return ancestors;
}

// Apply boundary styles
$(".bounded-element").each(function () {
    const $parent = $(this).offsetParent();

    if ($parent.length > 0) {
        $parent.css({
            position: "relative",
            overflow: "hidden"
        });
    }
});

// Calculate z-index context
function getZIndexContext($element) {
    const $offsetParent = $element.offsetParent();

    if ($offsetParent.length === 0) {
        return null;
    }

    const zIndex = $offsetParent.css("z-index");
    return {
        parent: $offsetParent,
        zIndex: zIndex === "auto" ? 0 : parseInt(zIndex)
    };
}

// Position dropdown within container
function positionDropdown($trigger) {
    const $dropdown = $(".dropdown-menu");
    const $container = $trigger.offsetParent();

    const triggerPosition = $trigger.position();
    const triggerHeight = $trigger.outerHeight();

    $dropdown.css({
        position: "absolute",
        top: triggerPosition.top + triggerHeight + "px",
        left: triggerPosition.left + "px"
    });

    $container.append($dropdown);
}
```

## Differences to jQuery

None.
