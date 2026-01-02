# Named Events

This module adds named methods for a number of common events.

## Available Methods

- .blur()
- .change()
- .click()
- .contextmenu()
- .dblclick()
- .error()
- .focusin()
- .focusout()
- .focus()
- .keydown()
- .keypress()
- .keyup()
- .mousedown()
- .mouseup()
- .mousemove()
- .mouseover()
- .mouseout()
- .mouseenter()
- .mouseleave()
- .resize()
- .scroll()
- .select()
- .submit()
- .unload()

Using these methods is equivalent to the following code:

```javascript
$(selector).trigger("click"); // trigger an event
$(selector).on("click", callback); // bind event to callback
```

## Usage

```javascript
// Trigger an event
$(selector).click();

// Attach event with callback
$(selector).click(callback);

// Attach event with data and callback
$(selector).click(data, callback);
```

### callback

A callback function to execute when the event is triggered.

### data

Any data to pass to the callback.

## Examples

### Basic Usage

```javascript
// Trigger events
$("button").click();
$("form").submit();
$("input").focus();

// Attach handlers
$("a").click(function (e) {
    e.preventDefault();
    console.log("Link clicked");
});

$("input").focus(function () {
    $(this).addClass("focused");
});

$("input").blur(function () {
    $(this).removeClass("focused");
});

// With data
$("button").click({ action: "save" }, function (e) {
    console.log(e.data.action); // "save"
});
```

### Real-World Examples

```javascript
// Form handling
$("#submit-button").click(function () {
    $("form").submit();
});

$("form").submit(function (e) {
    e.preventDefault();
    const formData = $(this).serialize();
    submitToServer(formData);
});

// Input field focus management
$("input").focus(function () {
    $(this).parent(".form-group").addClass("active");
});

$("input").blur(function () {
    $(this).parent(".form-group").removeClass("active");

    // Validate on blur
    if ($(this).prop("required") && !$(this).val()) {
        $(this).addClass("error");
    }
});

// Input change detection
$("select").change(function () {
    const value = $(this).val();
    $(".dependent-field").toggle(value === "other");
});

$("#country").change(function () {
    const country = $(this).val();
    loadRegions(country);
});

// Double-click to edit
$(".editable").dblclick(function () {
    const currentText = $(this).text();
    const $input = $("<input>").val(currentText);

    $(this).replaceWith($input);
    $input.focus();
});

// Context menu
$(".item").contextmenu(function (e) {
    e.preventDefault();
    showContextMenu(e.pageX, e.pageY, $(this));
});

// Mouse events for interactive elements
$(".draggable").mousedown(function (e) {
    startDrag(e, $(this));
});

$(document).mouseup(function () {
    stopDrag();
});

$(document).mousemove(function (e) {
    if (isDragging) {
        updateDragPosition(e);
    }
});

// Hover effects
$(".card").mouseenter(function () {
    $(this).addClass("hover");
});

$(".card").mouseleave(function () {
    $(this).removeClass("hover");
});

// Keyboard navigation
$(document).keydown(function (e) {
    if (e.key === "Escape") {
        $(".modal").hide();
    }

    if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        saveDocument();
    }
});

$("input").keyup(function () {
    const value = $(this).val();
    $(".character-count").text(value.length);
});

// Enter key to submit
$("input[type='text']").keypress(function (e) {
    if (e.key === "Enter") {
        $(this).closest("form").submit();
    }
});

// Window resize handling
$(window).resize(function () {
    const width = $(this).width();

    if (width < 768) {
        $(".sidebar").addClass("mobile");
    } else {
        $(".sidebar").removeClass("mobile");
    }
});

// Scroll-based effects
$(window).scroll(function () {
    const scrollTop = $(this).scrollTop();

    if (scrollTop > 100) {
        $(".scroll-to-top").fadeIn();
    } else {
        $(".scroll-to-top").fadeOut();
    }
});

$(".scroll-container").scroll(function () {
    const scrollLeft = $(this).scrollLeft();
    $(".scroll-indicator").css("left", scrollLeft + "px");
});

// Text selection
$("input[type='text']").focus(function () {
    $(this)[0].select();
});

$("input[type='text']").select(function () {
    console.log("Text selected");
});

// Error handling
$("img").error(function () {
    $(this).attr("src", "/images/placeholder.png");
});

// Focus management
$("input").focusin(function () {
    $(".help-text").show();
});

$("input").focusout(function () {
    $(".help-text").hide();
});

// Auto-focus first field
$(document).ready(function () {
    $("form input").first().focus();
});

// Click outside to close
$(".dropdown").click(function (e) {
    e.stopPropagation();
});

$(document).click(function () {
    $(".dropdown-menu").hide();
});

// Prevent accidental navigation
$(window).on("beforeunload", function () {
    if (hasUnsavedChanges) {
        return "You have unsaved changes. Are you sure you want to leave?";
    }
});

// Button states
$("button").mousedown(function () {
    $(this).addClass("pressed");
});

$("button").mouseup(function () {
    $(this).removeClass("pressed");
});

// Sticky scroll position
const stickyTop = $(".sticky-header").offset().top;

$(window).scroll(function () {
    const scrollTop = $(this).scrollTop();

    if (scrollTop > stickyTop) {
        $(".sticky-header").addClass("fixed");
    } else {
        $(".sticky-header").removeClass("fixed");
    }
});

// Tabbing between fields
$("input").keydown(function (e) {
    if (e.key === "Tab") {
        const $inputs = $("input");
        const currentIndex = $inputs.index(this);

        if (e.shiftKey) {
            $inputs.eq(currentIndex - 1).focus();
        } else {
            $inputs.eq(currentIndex + 1).focus();
        }
    }
});

// Trigger programmatically
$("#reset-form").click(function () {
    $("form input").val("");
    $("form input").first().focus();
});

// Chaining multiple named events
$("button")
    .mouseenter(function () {
        $(this).addClass("hover");
    })
    .mouseleave(function () {
        $(this).removeClass("hover");
    })
    .click(function () {
        alert("Button clicked");
    });

// Responsive image loading
$(window).resize(function () {
    const width = $(this).width();

    $("img[data-src]").each(function () {
        const src = width > 768
            ? $(this).data("src-large")
            : $(this).data("src-small");

        $(this).attr("src", src);
    });
}).resize(); // Trigger immediately
```

## Differences to jQuery

None.
