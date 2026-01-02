# .serialize()

Serialise the value of form elements into a URL-encoded query string.

## Usage

```javascript
$(selector).serialize(); // => String
```

## Returns

A string containing the keys and values of the current Dabby collection rendered as a URL-encoded query string.

## Examples

### Basic Usage

```javascript
// Serialise form
const formData = $("form").serialize();
console.log(formData); // "name=John&email=john%40example.com&message=Hello"

// Serialise specific inputs
const data = $("input, select, textarea").serialize();

// Serialise within a container
const sectionData = $(".form-section").serialize();
```

### Real-World Examples

```javascript
// Form submission
$("form").on("submit", function (e) {
    e.preventDefault();

    $.ajax({
        url: $(this).attr("action"),
        method: "POST",
        data: $(this).serialize(),
        success: function (response) {
            $(".success-message").text("Form submitted successfully").show();
        }
    });
});

// AJAX contact form
$("#contact-form").on("submit", function (e) {
    e.preventDefault();

    $.post("/api/contact", $(this).serialize(), function (response) {
        alert("Thank you for your message!");
        $("#contact-form")[0].reset();
    });
});

// Save form data to localStorage
function saveFormState() {
    const formData = $("#preferences-form").serialize();
    localStorage.setItem("formData", formData);
}

$("#preferences-form input, #preferences-form select").on("change", saveFormState);

// Build search URL
$("#search-form").on("submit", function (e) {
    e.preventDefault();

    const params = $(this).serialize();
    window.location.href = `/search?${params}`;
});

// Filter products
$(".filter-form").on("change", function () {
    const filters = $(this).serialize();

    $.get(`/api/products?${filters}`, function (products) {
        renderProducts(products);
    });
});

// Auto-save draft
let saveTimer;

$("form textarea, form input").on("input", function () {
    clearTimeout(saveTimer);

    saveTimer = setTimeout(function () {
        const draftData = $("form").serialize();

        $.post("/api/drafts/save", draftData, function () {
            $(".save-status").text("Draft saved").fadeIn();
        });
    }, 2000);
});

// Multi-step form
let formSteps = [];

$(".next-step").on("click", function () {
    const currentStepData = $(".current-step").serialize();
    formSteps.push(currentStepData);

    // Move to next step
    showNextStep();
});

$(".submit-form").on("click", function () {
    // Combine all steps
    const allData = formSteps.join("&") + "&" + $(".current-step").serialize();

    $.post("/api/submit", allData, function (response) {
        showSuccessMessage();
    });
});

// Compare form changes
let originalFormData = $("form").serialize();

$("#reset-form").on("click", function () {
    $("form")[0].reset();
    originalFormData = $("form").serialize();
});

$("#save-changes").on("click", function () {
    const currentFormData = $("form").serialize();

    if (currentFormData !== originalFormData) {
        $.post("/api/save", currentFormData, function () {
            originalFormData = currentFormData;
            alert("Changes saved");
        });
    } else {
        alert("No changes to save");
    }
});

// Form validation before serialisation
function validateAndSerialise($form) {
    let isValid = true;

    $form.find("[required]").each(function () {
        if (!$(this).val()) {
            $(this).addClass("error");
            isValid = false;
        }
    });

    if (isValid) {
        return $form.serialize();
    }

    return null;
}

$("#submit").on("click", function () {
    const formData = validateAndSerialise($("form"));

    if (formData) {
        $.post("/api/submit", formData, function () {
            alert("Form submitted");
        });
    }
});

// Serialise partial form
$(".save-section").on("click", function () {
    const sectionId = $(this).data("section");
    const sectionData = $(`#${sectionId}`).serialize();

    $.post(`/api/sections/${sectionId}`, sectionData, function () {
        console.log("Section saved");
    });
});

// Newsletter subscription
$("#newsletter-form").on("submit", function (e) {
    e.preventDefault();

    const subscriptionData = $(this).serialize();

    $.post("/api/newsletter", subscriptionData, function (response) {
        $(".subscription-message").text(response.message).show();
        $("#newsletter-form")[0].reset();
    });
});

// Dynamic form submission
$(".dynamic-form").each(function () {
    $(this).on("submit", function (e) {
        e.preventDefault();

        const endpoint = $(this).data("endpoint");
        const formData = $(this).serialize();

        $.post(endpoint, formData, function (response) {
            handleFormResponse(response);
        });
    });
});

// Serialise and log
function debugForm() {
    const serialised = $("form").serialize();
    console.log("Form data:", serialised);
    console.log("Decoded:", decodeURIComponent(serialised));
}

// Add to cart
$(".add-to-cart-form").on("submit", function (e) {
    e.preventDefault();

    const cartData = $(this).serialize();

    $.post("/api/cart/add", cartData, function (cart) {
        updateCartIcon(cart.count);
        $(".cart-notification").text("Item added to cart").fadeIn();
    });
});

// Registration form
$("#registration-form").on("submit", function (e) {
    e.preventDefault();

    const userData = $(this).serialize();

    $.post("/api/register", userData, function (response) {
        if (response.success) {
            window.location.href = "/welcome";
        } else {
            $(".error-message").text(response.error).show();
        }
    });
});

// Survey submission
$("#survey-form").on("submit", function (e) {
    e.preventDefault();

    const surveyData = $(this).serialize();
    const surveyId = $(this).data("survey-id");

    $.post(`/api/surveys/${surveyId}/submit`, surveyData, function () {
        $(".survey-container").html("<h2>Thank you for your feedback!</h2>");
    });
});

// Booking form
$("#booking-form").on("submit", function (e) {
    e.preventDefault();

    const bookingData = $(this).serialize();

    $.ajax({
        url: "/api/bookings",
        method: "POST",
        data: bookingData,
        success: function (response) {
            $(".confirmation").html(`
                <h3>Booking Confirmed</h3>
                <p>Confirmation number: ${response.confirmation_number}</p>
            `).show();
        },
        error: function () {
            $(".error").text("Booking failed. Please try again.").show();
        }
    });
});

// Comment submission
$(".comment-form").on("submit", function (e) {
    e.preventDefault();

    const commentData = $(this).serialize();

    $.post("/api/comments", commentData, function (comment) {
        const $comment = $("<div>")
            .addClass("comment")
            .html(`<p>${comment.text}</p>`);

        $(".comments-list").prepend($comment);
        $(".comment-form")[0].reset();
    });
});

// Export form data
$("#export-data").on("click", function () {
    const formData = $("form").serialize();
    const dataUrl = `data:text/plain;charset=utf-8,${encodeURIComponent(formData)}`;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "form-data.txt";
    link.click();
});

// Prefill form from URL
function prefillFormFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);

    urlParams.forEach(function (value, key) {
        $(`[name="${key}"]`).val(value);
    });
}

$(prefillFormFromUrl);
```

## Differences to jQuery

None.
