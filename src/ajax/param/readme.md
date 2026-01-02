# $.param()

Render a query string from an object.

## Usage

```javascript
$.param(object); // => String
```

### object

A plain object containing any variable types except functions. Objects can be nested.

## Returns

A string containing the inputted object rendered as a URL-encoded query string.

## Examples

### Basic Usage

```javascript
// Simple object
const query = $.param({ name: "John", age: 30 });
console.log(query); // "name=John&age=30"

// With special characters
const search = $.param({ q: "hello world", filter: "a&b" });
console.log(search); // "q=hello%20world&filter=a%26b"

// Nested object
const params = $.param({
    user: {
        name: "John",
        email: "john@example.com"
    }
});
```

### Real-World Examples

```javascript
// Build search URL
function buildSearchUrl(filters) {
    const baseUrl = "/search";
    const queryString = $.param(filters);

    return `${baseUrl}?${queryString}`;
}

const searchUrl = buildSearchUrl({
    q: "laptop",
    category: "electronics",
    price_max: 1000
});
// "/search?q=laptop&category=electronics&price_max=1000"

// Form data serialisation
const formData = {
    name: "Dave Angel",
    email: "dave.angel@geezmail.com",
    settings: {
        colour: "black",
        bgcolor: "green",
        roles: [2, 3, 5]
    }
};

const query = $.param(formData);
console.log(query);
// "name=Dave%20Angel&email=dave.angel%40geezmail.com&settings%5Bcolour%5D=black&settings%5Bbgcolor%5D=green&settings%5Broles%5D%5B0%5D=2&settings%5Broles%5D%5B1%5D=3&settings%5Broles%5D%5B2%5D=5"

// API request parameters
function callAPI(endpoint, params) {
    const url = `/api/${endpoint}?${$.param(params)}`;

    return $.ajax(url);
}

callAPI("users", {
    page: 1,
    limit: 20,
    sort: "name"
});

// Filter parameters
const filters = {
    category: ["books", "electronics"],
    price_min: 10,
    price_max: 100,
    in_stock: true
};

const filterString = $.param(filters);
window.location.href = `/products?${filterString}`;

// Build redirect URL with state
function redirectWithState(url, state) {
    const stateParam = $.param(state);
    window.location.href = `${url}?${stateParam}`;
}

redirectWithState("/dashboard", {
    view: "analytics",
    period: "week",
    metrics: ["users", "revenue"]
});

// Tracking parameters
function trackEvent(eventName, properties) {
    const params = $.param({
        event: eventName,
        timestamp: Date.now(),
        properties: properties
    });

    const img = new Image();
    img.src = `/track?${params}`;
}

trackEvent("page_view", {
    page: "/home",
    referrer: document.referrer
});

// URL builder for sharing
function buildShareUrl(platform, content) {
    const baseUrls = {
        twitter: "https://twitter.com/intent/tweet",
        facebook: "https://www.facebook.com/sharer/sharer.php"
    };

    const params = $.param({
        url: content.url,
        text: content.title
    });

    return `${baseUrls[platform]}?${params}`;
}

const twitterUrl = buildShareUrl("twitter", {
    url: "https://example.com/article",
    title: "Check out this article!"
});

// Cache busting
function loadScriptWithCache(url, version) {
    const params = $.param({ v: version });
    const scriptUrl = `${url}?${params}`;

    $.getScript(scriptUrl);
}

loadScriptWithCache("/scripts/app.js", "1.2.3");

// Dynamic form action
$("#filter-form").on("submit", function (e) {
    e.preventDefault();

    const filters = {
        keyword: $("#keyword").val(),
        category: $("#category").val(),
        sort: $("#sort").val()
    };

    const queryString = $.param(filters);
    window.location.href = `/results?${queryString}`;
});

// Build embed URL
function buildEmbedUrl(videoId, options) {
    const params = $.param({
        autoplay: options.autoplay ? 1 : 0,
        controls: options.controls ? 1 : 0,
        mute: options.mute ? 1 : 0
    });

    return `https://www.youtube.com/embed/${videoId}?${params}`;
}

const embedUrl = buildEmbedUrl("abc123", {
    autoplay: false,
    controls: true,
    mute: false
});

// Preserve current URL parameters
function addParameter(key, value) {
    const currentParams = getUrlParameters();
    currentParams[key] = value;

    const newQueryString = $.param(currentParams);
    history.pushState(null, "", `?${newQueryString}`);
}

// Analytics tracking
function trackConversion(data) {
    const params = $.param({
        conversion_id: data.id,
        value: data.value,
        currency: data.currency
    });

    $.ajax({
        url: `/track-conversion?${params}`,
        method: "GET"
    });
}

// Build pagination URLs
function buildPaginationLinks(currentPage, totalPages) {
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
        const params = $.param({ page: i });
        links.push({
            page: i,
            url: `?${params}`,
            active: i === currentPage
        });
    }

    return links;
}

// Complex nested parameters
const complexData = {
    user: {
        name: "John Smith",
        address: {
            street: "123 Main St",
            city: "London",
            postcode: "SW1A 1AA"
        },
        preferences: {
            notifications: true,
            theme: "dark"
        }
    },
    tags: ["important", "urgent"]
};

const encoded = $.param(complexData);
console.log(encoded);

// Append to existing URL
function appendToUrl(url, params) {
    const separator = url.includes("?") ? "&" : "?";
    return url + separator + $.param(params);
}

const newUrl = appendToUrl("/search?q=test", {
    page: 2,
    sort: "date"
});
// "/search?q=test&page=2&sort=date"

// OAuth parameters
function buildOAuthUrl(config) {
    const params = $.param({
        client_id: config.clientId,
        redirect_uri: config.redirectUri,
        response_type: "code",
        scope: config.scope.join(" ")
    });

    return `${config.authUrl}?${params}`;
}
```

## Differences to jQuery

jQuery has a second argument to this method `traditional`, which specifies whether to shallow encode the inputted object (instead of encoding nested objects, it will encode a string saying "[object Object]"), which Dabby does not support.

It also has a global AJAX setting `jQuery.ajaxSettings.traditional = true;` which is not supported.
