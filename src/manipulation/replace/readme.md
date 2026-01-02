# .replaceAll(), .replaceWith()

Replace elements in the DOM with new content.

## .replaceWith()

Replaces each element in the current Dabby collection with the provided new elements.

## .replaceAll()

Replaces all elements matched by a selector with the elements in the current Dabby collection. This method is the reverse of `.replaceWith()`.

## Usage

```javascript
$(selector).replaceWith(content);
$(content).replaceAll(selector);
```

### content

An HTML string, Node, array of Nodes, Dabby collection, or callback function.

### selector

A selector string, Node, array of Nodes, or Dabby collection to be replaced.

## Returns

The original Dabby collection.

## Examples

### Basic Usage

```javascript
// Replace elements with new content
$(".old-element").replaceWith("<div class='new-element'>New content</div>");

// Replace all matching elements (inverse)
$("<div class='new-element'>New content</div>").replaceAll(".old-element");
```

### Comparison Between Methods

```javascript
// These two are equivalent:
$(".target").replaceWith("<span>New</span>");
$("<span>New</span>").replaceAll(".target");
```

### Using Callbacks

```javascript
// Replace with dynamic content
$(".status").replaceWith(function (index, currentHtml) {
    return `<span class="status-new">Updated ${index + 1}</span>`;
});

// Conditional replacement
$("img").replaceWith(function () {
    const alt = $(this).attr("alt");
    return alt
        ? `<figure><img src="${$(this).attr("src")}" alt="${alt}"><figcaption>${alt}</figcaption></figure>`
        : this;
});
```

### Real-World Examples

```javascript
// Upgrade HTML structure
$("b").replaceWith(function () {
    return `<strong>${$(this).html()}</strong>`;
});

$("i").replaceWith(function () {
    return `<em>${$(this).html()}</em>`;
});

// Replace deprecated tags
$("font").replaceWith(function () {
    const colour = $(this).attr("color");
    const content = $(this).html();
    return `<span style="color: ${colour}">${content}</span>`;
});

// Replace placeholders with actual content
$(".loading-placeholder").replaceWith(function () {
    const type = $(this).data("type");
    return loadContent(type);
});

// Replace error messages
function showSuccess() {
    $(".error-message").replaceWith(
        "<div class='success-message'>Operation successful!</div>"
    );
}

// Replace form with thank you message
$("form").on("submit", function (e) {
    e.preventDefault();

    // Submit form data...

    $(this).replaceWith(`
        <div class="thank-you">
            <h2>Thank you!</h2>
            <p>Your submission has been received.</p>
        </div>
    `);
});

// Replace images with responsive versions
$("img[data-responsive]").replaceWith(function () {
    const src = $(this).attr("src");
    const alt = $(this).attr("alt");

    return `
        <picture>
            <source media="(min-width: 768px)" srcset="${src}">
            <source media="(max-width: 767px)" srcset="${src.replace('.jpg', '-mobile.jpg')}">
            <img src="${src}" alt="${alt}">
        </picture>
    `;
});

// Replace links with buttons
$("a.button-style").replaceWith(function () {
    const href = $(this).attr("href");
    const text = $(this).text();

    return `<button data-url="${href}">${text}</button>`;
});

// Swap elements
function swapElements($el1, $el2) {
    const $temp = $("<div>");
    $el1.replaceWith($temp);
    $el2.replaceWith($el1);
    $temp.replaceWith($el2);
}

// Replace table with cards on mobile
if ($(window).width() < 768) {
    $("table.responsive").replaceWith(function () {
        const $table = $(this);
        const $cards = $("<div class='card-container'></div>");

        $table.find("tr").each(function () {
            const $row = $(this);
            const $card = $("<div class='card'></div>");

            $row.find("td").each(function (index) {
                const label = $table.find("th").eq(index).text();
                const value = $(this).text();

                $card.append(`<div><strong>${label}:</strong> ${value}</div>`);
            });

            $cards.append($card);
        });

        return $cards;
    });
}

// Replace all headings with different level
$("h3.promote").replaceWith(function () {
    return `<h2>${$(this).html()}</h2>`;
});

// Replace inline styles with classes
$("[style]").replaceWith(function () {
    const $el = $(this).clone();
    $el.removeAttr("style").addClass("styled");
    return $el;
});

// Update component versions
$(".component-v1").replaceWith(function () {
    const data = $(this).data();
    return renderComponentV2(data);
});

// Replace broken images with placeholder
$("img").on("error", function () {
    $(this).replaceWith("<div class='image-placeholder'>Image unavailable</div>");
});
```

## Differences to jQuery

None.
