# $.getScript()

Shorthand method to include a script into the DOM.

## Usage

```javascript
$.getScript(url, success); // => xhr
```

### url

The URL of the script to load.

### success

A callback function fired when the script has successfully loaded.

See [$.ajax()](../ajax/readme.md) for a full description of the parameters.

## Returns

For asynchronous requests, the generated XMLHttpRequest object will be returned. Synchronous requests will return `undefined`.

## Examples

### Basic Usage

```javascript
// Load script
$.getScript("/scripts/library.js", function () {
    console.log("Script loaded");
});

// Load and initialise
$.getScript("/scripts/chart.js", function () {
    initialiseChart();
});

// Load script without callback
$.getScript("/scripts/analytics.js");
```

### Real-World Examples

```javascript
// Lazy load analytics
$(function () {
    // Load analytics after page loads
    $.getScript("https://www.google-analytics.com/analytics.js", function () {
        ga("create", "UA-XXXXX-Y", "auto");
        ga("send", "pageview");
    });
});

// Load chart library on demand
$(".show-chart").on("click", function () {
    if (typeof Chart === "undefined") {
        $.getScript("/scripts/chart.min.js", function () {
            renderChart();
        });
    } else {
        renderChart();
    }
});

// Progressive enhancement
function loadEnhancements() {
    $.getScript("/scripts/tooltips.js", function () {
        $("[data-tooltip]").tooltip();
    });

    $.getScript("/scripts/lightbox.js", function () {
        $(".gallery-image").lightbox();
    });
}

// Load third-party widget
function loadSocialWidget() {
    $.getScript("https://platform.twitter.com/widgets.js", function () {
        twttr.widgets.load();
    });
}

// Conditional script loading
if (needsMaps) {
    $.getScript(
        "https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY",
        function () {
            initialiseMap();
        }
    );
}

// Load polyfills for older browsers
if (!window.Promise) {
    $.getScript("/scripts/promise-polyfill.js", function () {
        console.log("Promise polyfill loaded");
    });
}

// Load script based on user interaction
$(".video-player").one("click", function () {
    const $player = $(this);

    $.getScript("/scripts/video-player.js", function () {
        new VideoPlayer($player[0]);
    });
});

// Load multiple scripts in sequence
function loadScriptsSequentially(scripts, callback) {
    let index = 0;

    function loadNext() {
        if (index < scripts.length) {
            $.getScript(scripts[index], function () {
                index++;
                loadNext();
            });
        } else if (callback) {
            callback();
        }
    }

    loadNext();
}

loadScriptsSequentially([
    "/scripts/library1.js",
    "/scripts/library2.js",
    "/scripts/app.js"
], function () {
    console.log("All scripts loaded");
    initialiseApp();
});

// Load A/B testing script
$.getScript("/scripts/ab-test.js", function () {
    const variant = ABTest.getVariant();
    applyVariant(variant);
});

// Load payment processor
$("#checkout-button").on("click", function () {
    $.getScript("https://js.stripe.com/v3/", function () {
        const stripe = Stripe("pk_test_XXXXX");
        setupPaymentForm(stripe);
    });
});

// Load translation library
const userLang = navigator.language || "en";

if (userLang !== "en") {
    $.getScript(`/scripts/i18n/${userLang}.js`, function () {
        translatePage();
    });
}

// Dynamic feature loading
function enableAdvancedFeatures() {
    $.getScript("/scripts/advanced-editor.js", function () {
        $(".editor").advancedEditor();
    });
}

// Load debugging tools in development
if (location.hostname === "localhost") {
    $.getScript("/scripts/debug-tools.js", function () {
        window.debug.enable();
    });
}

// Load user-specific scripts
$.getScript(`/scripts/user/${userId}/custom.js`, function () {
    console.log("User customisation loaded");
});

// Feature detection and loading
if ("geolocation" in navigator) {
    $.getScript("/scripts/geolocation-features.js", function () {
        enableLocationFeatures();
    });
}

// Load recaptcha on form focus
$("#contact-form input").one("focus", function () {
    $.getScript(
        "https://www.google.com/recaptcha/api.js",
        function () {
            console.log("reCAPTCHA loaded");
        }
    );
});

// Lazy load comments
$(".load-comments").on("click", function () {
    $.getScript("/scripts/comments.js", function () {
        loadCommentSystem();
        $(this).remove();
    });
});

// Load markdown parser
$("#markdown-preview").on("click", function () {
    if (typeof marked === "undefined") {
        $.getScript("/scripts/marked.min.js", function () {
            const markdown = $("#markdown-input").val();
            const html = marked(markdown);
            $("#preview").html(html);
        });
    }
});

// Error handling
$.getScript("/scripts/optional-feature.js")
    .fail(function () {
        console.log("Optional feature not available");
    });
```

## Differences to jQuery

Dabby doesn't return a deferred object like jQuery does, so you cannot chain any deferred methods to this method.
