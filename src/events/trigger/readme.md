# .trigger()

Triggers the specified event on the supplied Dabby collection. If the event is a native JavaScript event, it will be triggered along with any event handlers that are bound.

## Usage

```javascript
$(selector).trigger(event);
$(selector).trigger(event, data);
```

### event

A string containing a JavaScript event name.

### data

An array containing any additional data to pass to the receiving event handlers. When using .on(), each item in the array will be passed as an additional parameter.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Trigger a click event
$("a").trigger("click");

// Trigger with data
$("button").trigger("click", ["param1", "param2"]);

// Trigger custom event
$(".notification").trigger("dismiss");

// Chain triggering
$("form").find("input").first().trigger("focus");
```

### Real-World Examples

```javascript
// Programmatically submit form
$("#submit-button").on("click", function () {
    $("form").trigger("submit");
});

// Trigger validation
function validateAllFields() {
    $("input[required]").each(function () {
        $(this).trigger("blur");
    });
}

// Custom event system
$(".save-button").on("click", function () {
    // Trigger custom save event
    $(document).trigger("data:save", [{ id: 123, name: "Item" }]);
});

$(document).on("data:save", function (e, data) {
    console.log("Saving data:", data);
    saveToServer(data);
});

// Simulate user interaction
function simulateClick($element) {
    $element.trigger("mousedown");
    setTimeout(function () {
        $element.trigger("mouseup");
        $element.trigger("click");
    }, 100);
}

// Trigger change after programmatic update
$("#country").val("UK").trigger("change");

// Cascade events
$(".parent").on("activate", function () {
    $(this).find(".child").trigger("activate");
});

$(".child").on("activate", function () {
    $(this).addClass("active");
});

$(".parent").trigger("activate"); // Activates all children

// Notification system
function showNotification(message, type) {
    $(".notification-area").trigger("notify", [message, type]);
}

$(".notification-area").on("notify", function (e, message, type) {
    const $notification = $("<div>")
        .addClass(`notification notification-${type}`)
        .text(message)
        .appendTo(this);

    setTimeout(function () {
        $notification.remove();
    }, 3000);
});

showNotification("Save successful", "success");

// Trigger multiple events in sequence
function resetForm() {
    $("form input").val("");
    $("form input").trigger("change");
    $("form").trigger("reset");
}

// Auto-save trigger
let saveTimer;

$("textarea").on("input", function () {
    clearTimeout(saveTimer);

    saveTimer = setTimeout(function () {
        $(document).trigger("autosave");
    }, 2000);
});

$(document).on("autosave", function () {
    console.log("Auto-saving...");
    saveContent();
});

// Trigger with multiple parameters
$("form").on("validation", function (e, field, message, severity) {
    console.log(`Field ${field}: ${message} (${severity})`);
});

$("form").trigger("validation", ["email", "Invalid format", "error"]);

// Event-driven state machine
const states = {
    idle: function () {
        $(this).trigger("state:active");
    },
    active: function () {
        $(this).trigger("state:complete");
    },
    complete: function () {
        console.log("Process complete");
    }
};

$(".state-machine").on("state:idle", states.idle);
$(".state-machine").on("state:active", states.active);
$(".state-machine").on("state:complete", states.complete);

$(".state-machine").trigger("state:idle");

// Trigger focus for accessibility
function focusFirstError() {
    const $firstError = $(".error").first();

    if ($firstError.length) {
        $firstError.find("input, select, textarea").first().trigger("focus");
    }
}

// Trigger native events
$("input[type='file']").siblings(".upload-button").on("click", function () {
    $(this).siblings("input[type='file']").trigger("click");
});

// Trigger resize to update layouts
function updateLayouts() {
    $(window).trigger("resize");
}

// Event-based communication between components
$(".search-input").on("input", function () {
    const query = $(this).val();
    $(".search-results").trigger("search:update", [query]);
});

$(".search-results").on("search:update", function (e, query) {
    if (query.length >= 3) {
        fetchResults(query);
    } else {
        $(this).empty();
    }
});

// Trigger after AJAX success
$.ajax({
    url: "/api/data",
    success: function (data) {
        $(document).trigger("data:loaded", [data]);
    }
});

$(document).on("data:loaded", function (e, data) {
    updateUI(data);
});

// Keyboard shortcut simulation
function triggerSave() {
    const event = $.Event("keydown", {
        keyCode: 83,
        ctrlKey: true
    });

    $(document).trigger(event);
}

// Trigger validation before submission
$("form").on("submit", function (e) {
    e.preventDefault();

    const $form = $(this);

    // Trigger validation event
    $form.trigger("validate");

    // Check if valid (set by validate handler)
    if ($form.data("valid")) {
        $form[0].submit();
    }
});

$("form").on("validate", function () {
    const $form = $(this);
    let isValid = true;

    $form.find("[required]").each(function () {
        if (!$(this).val()) {
            isValid = false;
        }
    });

    $form.data("valid", isValid);
});

// Debugging event triggers
$("button").on("click", function () {
    console.log("Button clicked via user or trigger");
});

console.log("Triggering click programmatically");
$("button").trigger("click");

// Trigger custom initialization event
$(function () {
    $("[data-component]").each(function () {
        $(this).trigger("init");
    });
});

$("[data-component='carousel']").on("init", function () {
    initialiseCarousel($(this));
});

$("[data-component='modal']").on("init", function () {
    initialiseModal($(this));
});
```

## Differences to jQuery

The native event is used instead of the proprietary jQuery.Event object.

The `data` parameter only supports an array to be passed to it, not an object which jQuery also allows.
