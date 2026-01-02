# $.ajax()

Make asynchronous HTTP (AJAX) requests.

## Usage

```javascript
$.ajax(url, settings); // => xhr
$.ajax(settings); // => xhr
```

To make an AJAX request, the URL can be passed as the first parameter, or as the `url` parameter in the `settings` object.

## Settings

The `settings` object can accept the following parameters:

| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| url | string | The URL of the request | |
| method | string | The method to send the request with ("GET" or "POST") | GET |
| cache | bool | Denotes whether to allow the request to be cached | false |
| success | callback | A callback function fired on completion of a successful request | |
| error | callback | A callback function fired when a request fails | |
| complete | callback | A callback function fired after a request has completed, regardless of whether it succeeded or failed | |
| data | object/string | Parameters to send with the request | |
| dataType | string | Specify the type of request ("json", "jsonp" or "script"), if not set the type will be automatically determined | |
| processData | bool | Denotes whether to compile the data from the `data` parameter into a query string. If set to false, the data is passed to the request unprocessed | true |
| async | bool | Denotes whether to send the request asynchronously | true |
| crossDomain | bool | Denotes whether to make a cross-domain request, note if set to true, this will result in a synchronous request | false |
| scriptCharset | string | Sets the charset of synchronous and requests of type "script" | |
| jsonp | string | The parameter name that contains the name of the `jsonpCallback` | "callback" |
| jsonpCallback | string | The name of the function to execute when a synchronous JSONP request has been made | [Auto-generated] |
| contentType | string | Sets the content-type header | "application/x-www-form-urlencoded; charset=UTF-8" |
| headers | object | An object containing any headers to send with the request | |
| context | object | An HTML node or other object that will be the context of any callbacks (`this`) | |
| statusCode | object | An object of key/value pairs where the key is the HTTP response code and the value is the callback function. Will be called when the specified status code is returned (asynchronous requests only) | |
| username | string | Specifies the username for requests that require basic authentication | |
| password | string | Specifies the password for requests that require basic authentication | |

### Callbacks

The `success`, `error`, `complete`, and `statusCode` parameters enable you to set callbacks that are fired upon various results of an AJAX request. The callbacks should use the following pattern:

```javascript
function (response, status, xhr) {
    // if specified, "this" will be set to settings.context
}
```

`response` A string containing the response of the AJAX request. If `settings.dataType` is set to "json", or the setting is not set and the result is JSON parseable, an object representing the response JSON will be sent.

`status` The HTTP response code. For synchronous requests, this will be set to 200 for successful requests, and 400 on error.

`xhr` The XMLHttpRequest object used in the AJAX request. For synchronous requests this will be empty.

## Returns

For asynchronous requests, the generated XMLHttpRequest object will be returned. Synchronous requests will return `undefined`.

## Examples

### Basic Usage

```javascript
// Simple GET request
$.ajax("https://api.example.com/data", {
    success: function (response) {
        console.log(response);
    }
});

// POST request with data
$.ajax({
    url: "/api/user",
    method: "POST",
    data: { name: "John", email: "john@example.com" },
    success: function (response) {
        console.log("User created:", response);
    }
});

// JSON request
$.ajax({
    url: "/api/products",
    dataType: "json",
    success: function (data) {
        console.log("Products:", data);
    }
});
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
        },
        error: function () {
            $(".error-message").text("Submission failed").show();
        }
    });
});

// Load user data
function loadUserProfile(userId) {
    $.ajax({
        url: `/api/users/${userId}`,
        dataType: "json",
        success: function (user) {
            $("#username").text(user.name);
            $("#email").text(user.email);
            $("#avatar").attr("src", user.avatar);
        },
        error: function (response, status) {
            if (status === 404) {
                $(".profile").html("<p>User not found</p>");
            }
        }
    });
}

// Search with autocomplete
let searchXhr = null;

$("#search-input").on("input", function () {
    const query = $(this).val();

    // Cancel previous request
    if (searchXhr) {
        searchXhr.abort();
    }

    if (query.length < 3) {
        $(".search-results").empty();
        return;
    }

    searchXhr = $.ajax({
        url: "/api/search",
        data: { q: query },
        dataType: "json",
        success: function (results) {
            displaySearchResults(results);
        }
    });
});

// Save with status codes
function saveDocument(data) {
    $.ajax({
        url: "/api/documents",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json",
        statusCode: {
            201: function (response) {
                console.log("Document created successfully");
            },
            400: function (response) {
                console.log("Invalid data submitted");
            },
            401: function (response) {
                console.log("Unauthorised");
                redirectToLogin();
            },
            500: function (response) {
                console.log("Server error occurred");
            }
        }
    });
}

// Upload with progress
function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    $.ajax({
        url: "/api/upload",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log("Upload complete:", response.url);
        },
        error: function () {
            console.log("Upload failed");
        }
    });
}

// Authentication with custom headers
function authenticatedRequest() {
    const token = localStorage.getItem("authToken");

    $.ajax({
        url: "/api/protected-resource",
        headers: {
            "Authorization": `Bearer ${token}`,
            "X-Custom-Header": "value"
        },
        success: function (data) {
            console.log("Protected data:", data);
        },
        error: function (response, status) {
            if (status === 401) {
                // Token expired
                refreshAuthToken();
            }
        }
    });
}

// Polling for updates
function pollForUpdates() {
    $.ajax({
        url: "/api/notifications",
        dataType: "json",
        success: function (notifications) {
            updateNotificationBadge(notifications.length);

            if (notifications.length > 0) {
                displayNotifications(notifications);
            }
        },
        complete: function () {
            // Poll again in 30 seconds
            setTimeout(pollForUpdates, 30000);
        }
    });
}

// JSONP for cross-domain requests
$.ajax({
    url: "https://external-api.com/data",
    dataType: "jsonp",
    jsonp: "callback",
    success: function (data) {
        console.log("External data:", data);
    }
});

// Context binding
const app = {
    loadData: function () {
        $.ajax({
            url: "/api/data",
            context: this,
            success: function (data) {
                // 'this' refers to app object
                this.processData(data);
            }
        });
    },
    processData: function (data) {
        console.log("Processing:", data);
    }
};

// Batch requests
function loadDashboardData() {
    const requests = [
        $.ajax({ url: "/api/stats", dataType: "json" }),
        $.ajax({ url: "/api/recent-activity", dataType: "json" }),
        $.ajax({ url: "/api/notifications", dataType: "json" })
    ];

    let completed = 0;
    const data = {};

    requests.forEach(function (xhr, index) {
        const keys = ["stats", "activity", "notifications"];

        // Note: This is a simplified example
        // In production, you'd need proper promise handling
    });
}

// Retry logic
function ajaxWithRetry(settings, maxRetries) {
    let attempts = 0;

    function attempt() {
        $.ajax(Object.assign({}, settings, {
            error: function (response, status, xhr) {
                attempts++;

                if (attempts < maxRetries) {
                    console.log(`Retry attempt ${attempts}/${maxRetries}`);
                    setTimeout(attempt, 1000 * attempts);
                } else {
                    if (settings.error) {
                        settings.error(response, status, xhr);
                    }
                }
            }
        }));
    }

    attempt();
}

// Cache control
$.ajax({
    url: "/api/static-data",
    cache: true,
    success: function (data) {
        console.log("Data:", data);
    }
});

// Basic authentication
$.ajax({
    url: "/api/protected",
    username: "user",
    password: "pass",
    success: function (data) {
        console.log("Authenticated data:", data);
    }
});

// Complete callback for cleanup
function loadWithCleanup() {
    $(".loading-spinner").show();

    $.ajax({
        url: "/api/data",
        success: function (data) {
            displayData(data);
        },
        error: function () {
            $(".error-message").show();
        },
        complete: function () {
            $(".loading-spinner").hide();
        }
    });
}

// Dynamic script loading
$.ajax({
    url: "/scripts/analytics.js",
    dataType: "script",
    success: function () {
        // Script loaded and executed
        initialiseAnalytics();
    }
});
```

## Differences to jQuery

In jQuery, the `xhr` parameter of any callback functions are returned as an enhanced XMLHttpRequest called the `jqXHR` object, whereas in Dabby.js, the original XMLHttpRequest object is returned.

Dabby.js doesn't support as many `settings` as jQuery.

Dabby doesn't return a deferred object like jQuery does, so you cannot chain any deferred methods to this method.
