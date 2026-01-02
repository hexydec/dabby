# .removeProp()

Removes the selected property from all objects in a collection.

## Usage

```javascript
$(selector).removeProp(propertyName);
```

**It is recommended that you only use this method to remove custom properties, as removing native properties from DOM objects or the `window` object may cause a browser error.**

### propertyName

The name of the property you wish to remove.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Remove a custom property
$(".item").removeProp("customData");

// Remove a data property
$("div").removeProp("myCustomProperty");
```

### Real-World Examples

```javascript
// Clean up custom properties after use
$(".product-card").each(function (index, card) {
    const $card = $(card);

    // Use custom property
    const tempData = $card.prop("tempProcessingData");
    processData(tempData);

    // Remove it after use
    $card.removeProp("tempProcessingData");
});

// Remove tracking properties
function clearTrackingData() {
    $(".tracked-element").removeProp("trackingId");
    $(".tracked-element").removeProp("lastInteraction");
}

// Clean up after dynamic operations
$(".sortable-item").on("dragend", function () {
    $(this).removeProp("dragStartTime");
    $(this).removeProp("dragOffset");
});

// Remove temporary state properties
function resetFormState() {
    $("input").each(function (index, input) {
        $(input).removeProp("validationState");
        $(input).removeProp("previousValue");
    });
}

// Clean up event-related custom properties
$(".interactive-element").on("click", function () {
    // Do something...

    // Remove temporary properties
    $(this).removeProp("clickCount");
    $(this).removeProp("lastClickTime");
});
```

### Important Notes

```javascript
// ❌ DO NOT remove native properties - this can cause errors
$("div").removeProp("innerHTML");  // Dangerous!
$("div").removeProp("className");  // Dangerous!
$("div").removeProp("style");      // Dangerous!

// ✅ DO remove only custom properties you've added
$("div").removeProp("myCustomFlag");
$("div").removeProp("temporaryData");
$("div").removeProp("cachedResult");
```

## Differences to jQuery

None.
