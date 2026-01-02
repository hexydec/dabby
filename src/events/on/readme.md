# .on()

Bind event callbacks to DOM nodes.

## Usage

```javascript
$(selector).on(events, handler);
$(selector).on(events, delegate, handler);
$(selector).on(events, data, handler);
$(selector).on(events, delegate, data, handler);
$(selector).on(eventsObject);
```

### events

A string containing a space-separated list of events to bind to, or a plain object where the key is a space-separated list of events to bind to and the value is the event handler.

### delegate

A string specifying a selector to delegate the event to.

### data

Data to be passed to the handler when the event is triggered.

### handler

When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s).

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Simple click handler
$("a").on("click", function (e) {
    e.preventDefault();
    console.log("Link clicked");
});

// Multiple events
$("input").on("focus blur", function (e) {
    console.log(`Input ${e.type}ed`);
});

// With data
$("button").on("click", { role: "submit" }, function (e) {
    console.log(e.data.role); // "submit"
});

// Event delegation
$(".container").on("click", ".button", function (e) {
    console.log("Delegated button click");
});
```

### Real-World Examples

```javascript
// Form validation
$("form").on("submit", function (e) {
    const $form = $(this);
    let isValid = true;

    $form.find("[required]").each(function () {
        if (!$(this).val()) {
            $(this).addClass("error");
            isValid = false;
        }
    });

    if (!isValid) {
        e.preventDefault();
        alert("Please fill in all required fields");
    }
});

// Dynamic content event delegation
$("body").on("click", ".delete-button", function () {
    $(this).closest(".item").remove();
});

// Input validation
$("input[type='email']").on("blur", function () {
    const email = $(this).val();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValid && email) {
        $(this).addClass("error");
        $(this).next(".error-message").text("Invalid email address");
    } else {
        $(this).removeClass("error");
        $(this).next(".error-message").text("");
    }
});

// Autocomplete
let debounceTimer;

$("#search").on("input", function () {
    const query = $(this).val();

    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
        if (query.length >= 3) {
            fetchSuggestions(query);
        }
    }, 300);
});

// Tab navigation
$(".tab-button").on("click", function () {
    const $button = $(this);
    const index = $button.index();

    $button.addClass("active").siblings().removeClass("active");
    $(".tab-panel").hide().eq(index).show();
});

// Modal triggers
$("[data-modal]").on("click", function () {
    const modalId = $(this).data("modal");
    $(`#${modalId}`).addClass("visible");
});

$(".modal-close").on("click", function () {
    $(this).closest(".modal").removeClass("visible");
});

// Live character count
$("#bio").on("input", function () {
    const length = $(this).val().length;
    const maxLength = $(this).attr("maxlength");

    $(".character-count").text(`${length}/${maxLength}`);
});

// Prevent double submission
$("form").on("submit", function () {
    $(this).find("[type='submit']").prop("disabled", true);
});

// Accordion
$(".accordion-header").on("click", function () {
    const $content = $(this).next(".accordion-content");
    const $otherContent = $(this)
        .parent()
        .siblings()
        .find(".accordion-content");

    $otherContent.slideUp();
    $content.slideToggle();
});

// Checkbox "select all"
$("#select-all").on("change", function () {
    const isChecked = $(this).prop("checked");
    $(".item-checkbox").prop("checked", isChecked);
});

// Password visibility toggle
$(".toggle-password").on("click", function () {
    const $input = $(this).siblings("input");
    const type = $input.attr("type");

    $input.attr("type", type === "password" ? "text" : "password");
    $(this).toggleClass("visible");
});

// Dropdown menu
$(".dropdown-trigger").on("click", function (e) {
    e.stopPropagation();

    const $dropdown = $(this).next(".dropdown-menu");
    $(".dropdown-menu").not($dropdown).hide();
    $dropdown.toggle();
});

$(document).on("click", function () {
    $(".dropdown-menu").hide();
});

// Infinite scroll
$(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const windowHeight = $(this).height();
    const docHeight = $(document).height();

    if (scrollTop + windowHeight >= docHeight - 100) {
        loadMoreContent();
    }
});

// File upload preview
$("input[type='file']").on("change", function (e) {
    const file = e.target.files[0];

    if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
            $(".preview-image").attr("src", e.target.result);
        };

        reader.readAsDataURL(file);
    }
});

// Form field dependencies
$("#has-address").on("change", function () {
    const isChecked = $(this).prop("checked");

    $(".address-fields").toggle(isChecked);
    $(".address-fields input").prop("required", isChecked);
});

// Rating system
$(".star").on("mouseenter", function () {
    const index = $(this).index();
    $(".star").removeClass("hovered");
    $(".star").slice(0, index + 1).addClass("hovered");
});

$(".star-rating").on("mouseleave", function () {
    $(".star").removeClass("hovered");
});

$(".star").on("click", function () {
    const rating = $(this).index() + 1;
    $(".star").removeClass("selected");
    $(".star").slice(0, rating).addClass("selected");
    $("#rating-value").val(rating);
});

// Multi-event handler object
$("button").on({
    mouseenter: function () {
        $(this).addClass("hover");
    },
    mouseleave: function () {
        $(this).removeClass("hover");
    },
    click: function () {
        $(this).addClass("clicked");
    }
});

// Custom data passing
$(".notification-button").on("click", { type: "info" }, function (e) {
    showNotification(e.data.type, "Action completed");
});

// Keyboard shortcuts
$(document).on("keydown", function (e) {
    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveDocument();
    }

    if (e.key === "Escape") {
        $(".modal").removeClass("visible");
    }
});

// Drag and drop
let draggedItem = null;

$(".draggable").on("dragstart", function (e) {
    draggedItem = this;
    $(this).addClass("dragging");
});

$(".draggable").on("dragend", function () {
    $(this).removeClass("dragging");
});

$(".drop-zone").on("dragover", function (e) {
    e.preventDefault();
    $(this).addClass("drag-over");
});

$(".drop-zone").on("dragleave", function () {
    $(this).removeClass("drag-over");
});

$(".drop-zone").on("drop", function (e) {
    e.preventDefault();
    $(this).removeClass("drag-over");

    if (draggedItem) {
        $(this).append(draggedItem);
    }
});
```

## Differences to jQuery

Doesn't support the jQuery.Event object. When the data property is passed, depending on the type of event, the data property of the event object may already be set and unwritable. In this case the data is available to the callback as event._data.
