# .off()

Unbinds event handlers previously bound through [.on()](../on/readme.md).

## Usage

```javascript
// Unbind events as a string
$(selector).off(events, handler);
$(selector).off(events, delegate, handler);

// Unbind events as an object
$(selector).off(eventsObject);

// Unbind all events
$(selector).off();
```

### events

A string containing a space-separated list of events to unbind, or a plain object where the key is a space-separated list of events to unbind and the value is the event handler.

### delegate

A string specifying a selector the event to unbind is delegated to.

### handler

When `events` is a string, this is the callback function to match against the bound handlers for removal.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Remove all click events
$("a").off("click");

// Remove specific click handler
function myHandler(e) {
    console.log("Clicked");
}

$("a").on("click", myHandler);
$("a").off("click", myHandler);

// Remove multiple events
$("input").off("focus blur");

// Remove delegated event
$(".container").off("click", ".button");

// Remove all events
$("a").off();
```

### Real-World Examples

```javascript
// Temporary event handler
function setupTempHandler() {
    const handler = function (e) {
        console.log("Temporary handler");
        $(this).off("click", handler); // Remove after first use
    };

    $(".temp-button").on("click", handler);
}

// Disable form after submission
$("form").on("submit", function (e) {
    const $form = $(this);

    // Remove submit handler to prevent double submission
    $form.off("submit");

    // Process form
    processForm($form);
});

// Modal lifecycle
function showModal() {
    $(".modal").addClass("visible");

    // Add close handlers
    $(".modal-overlay").on("click", closeModal);
    $(document).on("keydown", escapeHandler);
}

function closeModal() {
    $(".modal").removeClass("visible");

    // Remove close handlers
    $(".modal-overlay").off("click", closeModal);
    $(document).off("keydown", escapeHandler);
}

function escapeHandler(e) {
    if (e.key === "Escape") {
        closeModal();
    }
}

// Toggle event handlers
let isEnabled = true;

function handleClick(e) {
    console.log("Button clicked");
}

$("#toggle-events").on("click", function () {
    if (isEnabled) {
        $(".action-button").off("click", handleClick);
        $(this).text("Enable Events");
    } else {
        $(".action-button").on("click", handleClick);
        $(this).text("Disable Events");
    }

    isEnabled = !isEnabled;
});

// Remove all delegated events
function cleanup() {
    // Remove all delegated events from body
    $("body").off("click", ".dynamic-button");
    $("body").off("change", ".dynamic-input");
    $("body").off("submit", ".dynamic-form");
}

// Wizard step management
function goToStep(stepNumber) {
    // Remove current step handlers
    $(".wizard-step").off("click", ".next-button");
    $(".wizard-step").off("click", ".prev-button");

    // Setup new step handlers
    setupStepHandlers(stepNumber);
}

// Live search with cleanup
let searchHandler = null;

function enableLiveSearch() {
    searchHandler = function () {
        const query = $(this).val();
        performSearch(query);
    };

    $("#search").on("input", searchHandler);
}

function disableLiveSearch() {
    if (searchHandler) {
        $("#search").off("input", searchHandler);
        searchHandler = null;
    }
}

// Tab switching cleanup
function switchTab(tabId) {
    // Remove old tab handlers
    $(".tab-content").off("click", ".tab-action");

    // Load new tab content
    loadTabContent(tabId);

    // Setup new tab handlers
    $(`#${tabId}`).on("click", ".tab-action", handleTabAction);
}

// Unbind object notation
const handlers = {
    click: function () {
        console.log("Clicked");
    },
    mouseenter: function () {
        console.log("Mouse entered");
    },
    mouseleave: function () {
        console.log("Mouse left");
    }
};

$(".element").on(handlers);
$(".element").off(handlers); // Remove all defined handlers

// One-time validation
function setupOneTimeValidation() {
    function validateOnce(e) {
        const isValid = validateForm($(this));

        if (isValid) {
            // Remove validator after first success
            $(this).off("submit", validateOnce);
        } else {
            e.preventDefault();
        }
    }

    $("form").on("submit", validateOnce);
}

// Remove specific event from multiple events
function handler(e) {
    console.log(e.type);
}

$("input").on("focus blur change", handler);
$("input").off("focus", handler); // Remove only focus

// Clean up on page navigation
function navigateAway() {
    // Remove all event handlers before leaving
    $(".dynamic-content").off();
    $(window).off("scroll");
    $(document).off("keydown");

    // Navigate
    window.location.href = "/next-page";
}

// Temporarily disable interactions
let savedHandlers = [];

function disableInteractions() {
    $(".interactive").each(function () {
        const events = $(this).data("events");

        if (events) {
            savedHandlers.push({ element: this, events: events });
        }

        $(this).off();
    });
}

function enableInteractions() {
    savedHandlers.forEach(function (item) {
        $(item.element).on(item.events);
    });

    savedHandlers = [];
}

// Remove delegated handler for specific selector
$("body").on("click", ".button-primary", handlePrimary);
$("body").on("click", ".button-secondary", handleSecondary);

// Later, remove only primary handler
$("body").off("click", ".button-primary", handlePrimary);

// Cleanup before reinitialising
function reinitialiseComponent() {
    const $component = $(".component");

    // Remove all existing handlers
    $component.off();
    $component.find("*").off();

    // Reinitialise
    initialiseComponent($component);
}

// Remove handler after condition met
let clickCount = 0;

function limitedHandler(e) {
    clickCount++;

    if (clickCount >= 5) {
        $(this).off("click", limitedHandler);
        console.log("Click limit reached");
    }
}

$(".limited-button").on("click", limitedHandler);

// Debugging event handlers
function listEventHandlers() {
    const events = $("button").data("events");
    console.log("Attached events:", events);
}

// Remove and readd with different parameters
function updateHandler() {
    $(".button").off("click", oldHandler);
    $(".button").on("click", { newData: "value" }, newHandler);
}
```

## Differences to jQuery

Doesn't support the jQuery.Event object.
