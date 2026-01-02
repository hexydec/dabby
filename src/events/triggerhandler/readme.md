# .triggerHandler()

Trigger any handlers attached to the first object in a collection that were attached with [.on()](../on/readme.md). It will not trigger the native event like [.trigger()](../trigger/readme.md).

## Usage

```javascript
$(selector).triggerHandler(event);
$(selector).triggerHandler(event, data);
```

### event

The name of the event to trigger the handlers on.

### data

Any data to be sent to the handler function.

## Returns

The return value from the last handler that was triggered.

## Examples

### Basic Usage

```javascript
// Trigger handler only, not native event
$("a").triggerHandler("click");

// Trigger with data
$("form").triggerHandler("submit", ["custom", "data"]);

// Get return value from handler
const result = $("input").triggerHandler("validate");
console.log(result); // true or false
```

### Real-World Examples

```javascript
// Validation without submission
$("form").on("validate", function () {
    let isValid = true;

    $(this).find("[required]").each(function () {
        if (!$(this).val()) {
            isValid = false;
        }
    });

    return isValid;
});

// Check validity without triggering submit
const isFormValid = $("form").triggerHandler("validate");

if (isFormValid) {
    console.log("Form is valid");
}

// Trigger custom handler without side effects
$("input").on("customValidation", function (e, value) {
    const pattern = $(this).data("pattern");
    return new RegExp(pattern).test(value);
});

const email = "user@example.com";
const isValidEmail = $("#email").triggerHandler("customValidation", [email]);

// Get computed value from handler
$(".price").on("calculateTotal", function () {
    const price = parseFloat($(this).text());
    const quantity = parseInt($(this).data("quantity"));
    return price * quantity;
});

const total = $(".price").triggerHandler("calculateTotal");
$(".total").text(`£${total.toFixed(2)}`);

// Test event handler without triggering native behaviour
$("#file-input").on("change", function () {
    const file = this.files[0];
    return file && file.size <= 5000000; // 5MB limit
});

// Test if file would be accepted without actually changing
const wouldAccept = $("#file-input").triggerHandler("change");

// Programmatic value checking
$("select").on("checkSelection", function () {
    const value = $(this).val();
    const options = $(this).find("option").map(function () {
        return $(this).val();
    }).get();

    return options.includes(value);
});

const hasValidSelection = $("select").triggerHandler("checkSelection");

// Trigger save handler without navigation
$("a[href='#save']").on("click", function (e) {
    e.preventDefault();
    saveDocument();
    return "saved";
});

// Trigger save without following link
const result = $("a[href='#save']").triggerHandler("click");
console.log(result); // "saved"

// Custom calculation without display update
$(".calculator-input").on("calculate", function () {
    const value = parseFloat($(this).val());
    const multiplier = parseFloat($(this).data("multiplier"));
    return value * multiplier;
});

const calculatedValue = $(".calculator-input").triggerHandler("calculate");

// Validate field without showing errors
$("input[type='email']").on("emailValidation", function () {
    const email = $(this).val();
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
});

if (!$("input[type='email']").triggerHandler("emailValidation")) {
    console.log("Email is invalid");
}

// Get formatted value without changing display
$("#phone").on("format", function () {
    const value = $(this).val().replace(/\D/g, "");
    return value.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
});

const formattedPhone = $("#phone").triggerHandler("format");

// Test permission check
$(".admin-button").on("checkPermission", function () {
    const userRole = $(this).data("user-role");
    return userRole === "admin";
});

if ($(".admin-button").triggerHandler("checkPermission")) {
    $(".admin-button").prop("disabled", false);
}

// Get state without changing it
$(".toggle").on("getState", function () {
    return $(this).hasClass("active") ? "on" : "off";
});

const currentState = $(".toggle").triggerHandler("getState");

// Trigger data fetch handler without updating UI
$(".data-source").on("fetchData", function () {
    const endpoint = $(this).data("endpoint");
    // Synchronous for demonstration
    return { endpoint: endpoint, status: "ready" };
});

const data = $(".data-source").triggerHandler("fetchData");

// Run validation logic without displaying errors
$("form").on("silentValidate", function () {
    const errors = [];

    $(this).find("[required]").each(function () {
        if (!$(this).val()) {
            errors.push($(this).attr("name"));
        }
    });

    return errors;
});

const validationErrors = $("form").triggerHandler("silentValidate");
console.log(`Found ${validationErrors.length} errors`);

// Get current selection without modifying
$(".selectable").on("getSelected", function () {
    return $(this).find(".selected").map(function () {
        return $(this).data("id");
    }).get();
});

const selectedIds = $(".selectable").triggerHandler("getSelected");

// Calculate without rendering
$(".chart-data").on("sum", function () {
    let total = 0;

    $(this).find(".data-point").each(function () {
        total += parseFloat($(this).data("value"));
    });

    return total;
});

const sum = $(".chart-data").triggerHandler("sum");
$(".chart-total").text(sum);

// Test handler chain
$("button").on("process", function () {
    console.log("Processing...");
    return "step1";
});

$("button").on("process", function () {
    console.log("Second handler");
    return "step2";
});

const lastResult = $("button").triggerHandler("process");
console.log(lastResult); // "step2" (from last handler)

// Trigger only first element's handler
$(".item").on("getValue", function () {
    return $(this).data("value");
});

// Only triggers on first .item
const firstValue = $(".item").triggerHandler("getValue");

// Run preprocessing logic
$("textarea").on("preprocess", function (e, text) {
    return text.trim().toLowerCase().replace(/\s+/g, " ");
});

const processedText = $("textarea").triggerHandler("preprocess", ["  Hello  World  "]);
console.log(processedText); // "hello world"

// Dry-run event handler
$("#upload-form").on("prepareUpload", function () {
    const files = $(this).find("input[type='file']")[0].files;
    const validFiles = [];

    for (let file of files) {
        if (file.size <= 10000000) { // 10MB
            validFiles.push(file.name);
        }
    }

    return validFiles;
});

const uploadableFiles = $("#upload-form").triggerHandler("prepareUpload");
console.log(`Can upload: ${uploadableFiles.join(", ")}`);
```

## Differences to jQuery

Doesn't support the jQuery.Event object.
