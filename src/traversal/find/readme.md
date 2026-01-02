# .find()

Find descendants underneath the input collection that match the given selector.

## Usage

```javascript
$(collection).find(selector);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or callback function used to filter descendants.

## Returns

A new Dabby collection containing the matched descendants.

## Examples

### Basic Usage

```javascript
// Find all paragraphs within divs
$("div").find("p");

// Find elements by class
$(".container").find(".item");

// Find by attribute
$("form").find("input[required]");

// Find nested elements
$("#main").find(".section .content");
```

### Real-World Examples

```javascript
// Find and manipulate nested elements
$(".card").find(".card-title").css("colour", "blue");

// Find form inputs
const $inputs = $("form").find("input, textarea, select");

// Find and validate required fields
$("form").on("submit", function (e) {
    const $requiredFields = $(this).find("[required]");
    let isValid = true;

    $requiredFields.each(function () {
        if (!$(this).val()) {
            $(this).addClass("error");
            isValid = false;
        }
    });

    if (!isValid) {
        e.preventDefault();
    }
});

// Find specific child elements
const $images = $(".gallery").find("img");
$images.attr("loading", "lazy");

// Find and count items
const itemCount = $(".container").find(".item").length;
$(".item-count").text(`${itemCount} items`);

// Find links within navigation
$("nav").find("a").on("click", function (e) {
    $("nav a").removeClass("active");
    $(this).addClass("active");
});

// Find table cells
$("table").find("td.price").each(function () {
    const price = parseFloat($(this).text());
    if (price > 100) {
        $(this).addClass("expensive");
    }
});

// Find within search results
function searchWithin(term) {
    $(".search-results").find(".result-item").each(function () {
        const text = $(this).text().toLowerCase();

        if (text.includes(term.toLowerCase())) {
            $(this).show();
        } else {
            $(this).hide();
        }
    });
}

// Find and attach event handlers
$(".accordion").find(".accordion-header").on("click", function () {
    $(this).next(".accordion-content").toggle();
});
```

## Differences to jQuery

None.
