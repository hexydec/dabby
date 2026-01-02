# $.get() / $.post()

Shorthand methods to make AJAX requests using the GET or POST method.

## $.get()

Shorthand to make AJAX requests using the GET method.

### Usage

```javascript
$.get(url, data, success, type); // => xhr
$.get(url, success, type); // => xhr
```

## $.post()

Shorthand to make AJAX requests using the POST method.

### Usage

```javascript
$.post(url, data, success, type); // => xhr
$.post(url, success, type); // => xhr
```

### Parameters

See [$.ajax()](../ajax/readme.md) for a full description of the input parameters.

### Returns

For asynchronous requests, the generated XMLHttpRequest object will be returned. Synchronous requests will return `undefined`.

## Examples

### Basic Usage

```javascript
// Simple GET request
$.get("/api/data", function (response) {
    console.log(response);
});

// GET with data
$.get("/api/search", { q: "query" }, function (results) {
    console.log(results);
});

// GET with JSON
$.get("/api/users", function (users) {
    console.log(users);
}, "json");

// Simple POST request
$.post("/api/save", { name: "John" }, function (response) {
    console.log("Saved:", response);
});

// POST with JSON
$.post("/api/create", { title: "New Post" }, function (data) {
    console.log("Created:", data);
}, "json");
```

### Real-World Examples

```javascript
// Load products by category
function loadCategory(categoryId) {
    $.get("/api/products", { category: categoryId }, function (products) {
        $(".product-list").empty();

        products.forEach(function (product) {
            const $item = $("<div>")
                .addClass("product")
                .html(`
                    <h3>${product.name}</h3>
                    <p>${product.price}</p>
                `);

            $(".product-list").append($item);
        });
    }, "json");
}

// Search functionality
$("#search-form").on("submit", function (e) {
    e.preventDefault();

    const query = $("#search-input").val();

    $.get("/api/search", { q: query }, function (results) {
        displaySearchResults(results);
    }, "json");
});

// Form submission with POST
$("#contact-form").on("submit", function (e) {
    e.preventDefault();

    const formData = {
        name: $("#name").val(),
        email: $("#email").val(),
        message: $("#message").val()
    };

    $.post("/api/contact", formData, function (response) {
        $(".success-message").text(response.message).show();
        $("#contact-form")[0].reset();
    }, "json");
});

// Add item to cart
$(".add-to-cart").on("click", function () {
    const productId = $(this).data("product-id");
    const quantity = $(this).siblings(".quantity").val();

    $.post("/api/cart/add", {
        product_id: productId,
        quantity: quantity
    }, function (cart) {
        updateCartCount(cart.item_count);
        $(".cart-notification").text("Item added to cart").fadeIn();
    }, "json");
});

// Load more content
let currentPage = 1;

$(".load-more").on("click", function () {
    currentPage++;

    $.get("/api/posts", { page: currentPage }, function (posts) {
        posts.forEach(function (post) {
            $(".post-list").append(createPostElement(post));
        });

        if (posts.length < 10) {
            $(".load-more").hide();
        }
    }, "json");
});

// Vote on content
$(".vote-button").on("click", function () {
    const postId = $(this).data("post-id");
    const voteType = $(this).data("vote-type");

    $.post("/api/vote", {
        post_id: postId,
        type: voteType
    }, function (response) {
        $(".vote-count").text(response.total_votes);
    }, "json");
});

// Autocomplete
let autocompleteTimer;

$("#autocomplete-input").on("input", function () {
    const query = $(this).val();

    clearTimeout(autocompleteTimer);

    if (query.length < 2) {
        $(".autocomplete-results").hide();
        return;
    }

    autocompleteTimer = setTimeout(function () {
        $.get("/api/autocomplete", { q: query }, function (suggestions) {
            $(".autocomplete-results").empty();

            suggestions.forEach(function (suggestion) {
                $("<div>")
                    .addClass("suggestion")
                    .text(suggestion)
                    .appendTo(".autocomplete-results");
            });

            $(".autocomplete-results").show();
        }, "json");
    }, 300);
});

// Update user settings
$(".save-settings").on("click", function () {
    const settings = {
        email_notifications: $("#email-notifications").prop("checked"),
        theme: $("#theme-select").val(),
        language: $("#language-select").val()
    };

    $.post("/api/user/settings", settings, function (response) {
        $(".success-message").text("Settings saved successfully").show();
    }, "json");
});

// Delete item
$(".delete-button").on("click", function () {
    const itemId = $(this).data("item-id");

    if (confirm("Are you sure you want to delete this item?")) {
        $.post("/api/items/delete", { id: itemId }, function (response) {
            $(`[data-item-id="${itemId}"]`).closest(".item").remove();
            $(".notification").text("Item deleted").show();
        }, "json");
    }
});

// Filter content
$(".filter-select").on("change", function () {
    const filters = {
        category: $("#category-filter").val(),
        price_min: $("#price-min").val(),
        price_max: $("#price-max").val(),
        sort: $("#sort-select").val()
    };

    $.get("/api/products/filter", filters, function (products) {
        renderProducts(products);
    }, "json");
});

// Newsletter subscription
$("#newsletter-form").on("submit", function (e) {
    e.preventDefault();

    const email = $("#email").val();

    $.post("/api/newsletter/subscribe", { email: email }, function (response) {
        $("#newsletter-form").html(
            `<p class="success">${response.message}</p>`
        );
    }, "json");
});

// Like/unlike functionality
$(".like-button").on("click", function () {
    const $button = $(this);
    const postId = $button.data("post-id");
    const isLiked = $button.hasClass("liked");

    const action = isLiked ? "unlike" : "like";

    $.post(`/api/posts/${action}`, { id: postId }, function (response) {
        $button.toggleClass("liked");
        $button.find(".like-count").text(response.likes);
    }, "json");
});

// Fetch user data
function loadUserData(userId) {
    $.get(`/api/users/${userId}`, function (user) {
        $("#user-name").text(user.name);
        $("#user-email").text(user.email);
        $("#user-bio").text(user.bio);
        $("#user-avatar").attr("src", user.avatar);
    }, "json");
}

// Submit comment
$("#comment-form").on("submit", function (e) {
    e.preventDefault();

    const commentData = {
        post_id: $(this).data("post-id"),
        comment: $("#comment-text").val()
    };

    $.post("/api/comments", commentData, function (comment) {
        const $comment = $("<div>")
            .addClass("comment")
            .html(`
                <strong>${comment.author}</strong>
                <p>${comment.text}</p>
                <small>${comment.timestamp}</small>
            `);

        $(".comments-list").prepend($comment);
        $("#comment-text").val("");
    }, "json");
});

// Check username availability
$("#username").on("blur", function () {
    const username = $(this).val();

    if (username.length < 3) {
        return;
    }

    $.get("/api/check-username", { username: username }, function (response) {
        if (response.available) {
            $("#username").removeClass("error").addClass("success");
            $(".username-message").text("Username available");
        } else {
            $("#username").removeClass("success").addClass("error");
            $(".username-message").text("Username taken");
        }
    }, "json");
});
```

## Differences to jQuery

Dabby doesn't return a deferred object like jQuery does, so you cannot chain any deferred methods to this method.
