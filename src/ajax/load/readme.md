# .load()

Make an AJAX request and insert the resulting HTML into the DOM.

## Usage

```javascript
$(selector).load(url, success); // => dabby
$(selector).load(url, data, success); // => dabby
$(selector).load(urlFragment, data, success); // => dabby
```

### url

The URL of the HTML page to fetch.

### data

Either a plain object or a string containing data to send to the receiving script. If the `data` parameter is sent as a plain object, the data will be sent with the POST method, otherwise GET will be used.

### success

A callback function that is fired once for each node in the Dabby collection when the request is successful.

### urlFragment

A special way of specifying the URL string, which includes a refinement selector. Here anything after the first space will be considered as a CSS selector, the resulting HTML will then be filtered by the selector before being placed into each node.

## Returns

Returns the original Dabby collection so it can be chained.

## Examples

### Basic Usage

```javascript
// Load HTML into element
$("#content").load("/pages/about.html");

// Load with selector
$("#sidebar").load("/pages/widgets.html .widget");

// Load with data (POST)
$(".results").load("/search.php", { q: "query" });

// Load with callback
$("#main").load("/content.html", function (response, status, xhr) {
    console.log("Content loaded");
});

// Load fragment with callback
$(".container").load("/page.html #section", function () {
    $(this).fadeIn();
});
```

### Real-World Examples

```javascript
// Load page content
$(".nav-link").on("click", function (e) {
    e.preventDefault();

    const url = $(this).attr("href");
    $("#main-content").load(url + " #content", function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
    });
});

// Load partial views
function loadPartial(name) {
    $(".partial-container").load(`/partials/${name}.html`, function (response, status) {
        if (status === "error") {
            $(this).html("<p>Failed to load content</p>");
        }
    });
}

// Load comments
$(".load-comments").on("click", function () {
    const postId = $(this).data("post-id");

    $(".comments-container").load("/comments.php", {
        post_id: postId
    }, function () {
        $(this).fadeIn();
        $(".load-comments").hide();
    });
});

// Refresh content
function refreshDashboard() {
    $(".stats-panel").load("/dashboard.html .stats", function () {
        console.log("Dashboard refreshed");
    });
}

setInterval(refreshDashboard, 60000); // Refresh every minute

// Load search results
$("#search-form").on("submit", function (e) {
    e.preventDefault();

    const query = $("#search-input").val();

    $(".search-results").load("/search.html", {
        q: query,
        limit: 20
    }, function (response, status, xhr) {
        if (status === "success") {
            $(".result-count").text(`Found ${$(".result-item").length} results`);
        }
    });
});

// Tabbed content loading
$(".tab").on("click", function () {
    const tabId = $(this).data("tab-id");

    $(".tab").removeClass("active");
    $(this).addClass("active");

    $(".tab-content").load(`/tabs/${tabId}.html .content`, function () {
        initialiseTabContent();
    });
});

// Load modal content
$("[data-modal-url]").on("click", function () {
    const url = $(this).data("modal-url");

    $(".modal-body").load(url, function () {
        $(".modal").addClass("visible");
    });
});

// Pagination
$(".pagination a").on("click", function (e) {
    e.preventDefault();

    const page = $(this).data("page");

    $(".content-area").load("/posts.php", {
        page: page
    }, function () {
        $("html, body").animate({ scrollTop: 0 }, 300);
    });
});

// Load user profile
function loadUserProfile(userId) {
    $(".profile-container").load(`/users/${userId}.html .profile`, function (response, status) {
        if (status === "success") {
            $(".loading-spinner").hide();
        } else {
            $(this).html("<p>Profile not found</p>");
        }
    });
}

// Dynamic form loading
$(".add-field").on("click", function () {
    const fieldType = $(this).data("field-type");

    $(".form-fields").load("/form-fields.html", {
        type: fieldType
    }, function () {
        const $newField = $(this).find(".field").last();
        $newField.fadeIn();
    });
});

// Load latest notifications
function checkNotifications() {
    $(".notifications-dropdown").load("/notifications.html .notification", function (response, status, xhr) {
        const count = $(this).find(".notification.unread").length;

        if (count > 0) {
            $(".notification-badge").text(count).show();
        } else {
            $(".notification-badge").hide();
        }
    });
}

// Auto-refresh content
setInterval(function () {
    $(".live-feed").load("/feed.html .feed-item", function () {
        const timestamp = new Date().toISOString();
        $(this).data("last-update", timestamp);
    });
}, 30000);

// Load related content
$(".article").on("mouseenter", function () {
    const articleId = $(this).data("id");

    $(".related-sidebar").load("/related.html", {
        article_id: articleId
    });
});

// Conditional loading
if (userIsLoggedIn) {
    $(".user-menu").load("/menus/authenticated.html");
} else {
    $(".user-menu").load("/menus/guest.html");
}

// Load footer dynamically
$(function () {
    $("footer").load("/includes/footer.html", function () {
        console.log("Footer loaded");
    });
});

// Error handling with fallback
$(".dynamic-content").load("/content.html .section", function (response, status, xhr) {
    if (status === "error") {
        $(this).load("/fallback.html");
    }
});

// Load shopping cart
function updateCart() {
    $(".cart-sidebar").load("/cart.html .cart-items", function () {
        const total = $(this).find(".cart-total").text();
        $(".header-cart-total").text(total);
    });
}

// Lazy load sections
$(window).on("scroll", function () {
    $(".lazy-section").each(function () {
        if (isInViewport($(this)) && !$(this).data("loaded")) {
            const url = $(this).data("url");

            $(this).load(url, function () {
                $(this).data("loaded", true);
            });
        }
    });
});

// Load template with data
function renderTemplate(templateUrl, data) {
    $(".template-container").load(templateUrl, data, function () {
        // Template loaded and rendered
        $(".placeholder").remove();
    });
}

// Multi-container loading
$(".refresh-all").on("click", function () {
    $(".panel-1").load("/panels/1.html .content");
    $(".panel-2").load("/panels/2.html .content");
    $(".panel-3").load("/panels/3.html .content");
});

// Load chat messages
function loadChatMessages(conversationId) {
    $(".chat-messages").load("/chat/messages.html", {
        conversation_id: conversationId
    }, function () {
        scrollToBottom();
        markMessagesAsRead();
    });
}

// Accordion content loading
$(".accordion-header").one("click", function () {
    const $content = $(this).next(".accordion-content");
    const contentId = $(this).data("content-id");

    $content.load(`/accordion/${contentId}.html`, function () {
        $(this).slideDown();
    });
});
```

## Differences to jQuery

In jQuery, the `xhr` parameter of any callback functions are returned as an enhanced XMLHttpRequest called the `jqXHR` object, whereas in Dabby.js, the original XMLHttpRequest object is returned.
