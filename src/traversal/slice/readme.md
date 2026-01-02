# .slice()

Reduce a collection to a subset by specifying start and end indices.

## Usage

```javascript
$(collection).slice(start);
$(collection).slice(start, end);
```

### start

A zero-based number indicating the beginning of the selection. If negative, indicates an offset from the end of the collection.

### end

An optional zero-based number indicating the end of the selection (not inclusive). If negative, indicates an offset from the end of the collection. If omitted, selects to the end of the collection.

## Returns

A new Dabby collection containing the specified subset of the original collection.

## Examples

### Basic Usage

```javascript
// Get first 3 items
const $first3 = $("li").slice(0, 3);

// Get items from index 2 to 5
const $middle = $("li").slice(2, 5);

// Get last 3 items
const $last3 = $("li").slice(-3);

// Get all but first and last
const $middle = $("li").slice(1, -1);

// Get items from index 2 onwards
const $fromSecond = $("li").slice(2);
```

### Real-World Examples

```javascript
// Show first 5 products, hide the rest
$(".product").slice(0, 5).show();
$(".product").slice(5).hide();

// Load more functionality
let visibleCount = 10;

function showMore() {
    $(".item").slice(0, visibleCount).show();
    visibleCount += 10;

    if (visibleCount >= $(".item").length) {
        $(".load-more").hide();
    }
}

$(".load-more").on("click", showMore);

// Pagination
function showPage(pageNumber, itemsPerPage) {
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    $(".item").hide();
    $(".item").slice(start, end).show();
}

showPage(1, 10); // Show first page

// Highlight middle items
const $items = $(".item");
const total = $items.length;
const start = Math.floor(total * 0.25);
const end = Math.floor(total * 0.75);

$items.slice(start, end).addClass("middle-section");

// Create groups
const $all = $(".product");
const $group1 = $all.slice(0, 10);
const $group2 = $all.slice(10, 20);
const $group3 = $all.slice(20);

$group1.addClass("group-1");
$group2.addClass("group-2");
$group3.addClass("group-3");

// Skip first and last elements
$(".list-item").slice(1, -1).addClass("middle-item");

// Get recent items (last 5)
const $recent = $(".message").slice(-5);
$recent.addClass("recent");

// Batch processing
const $items = $(".item");
const batchSize = 50;

for (let i = 0; i < $items.length; i += batchSize) {
    const $batch = $items.slice(i, i + batchSize);

    // Process batch
    $batch.each(function () {
        // Do something with each item
    });
}

// Show range based on viewport
function showVisibleRange(scrollPosition, itemHeight, visibleCount) {
    const startIndex = Math.floor(scrollPosition / itemHeight);
    const endIndex = startIndex + visibleCount;

    $(".list-item").hide();
    $(".list-item").slice(startIndex, endIndex).show();
}

// Split into columns
const $items = $(".grid-item");
const total = $items.length;
const perColumn = Math.ceil(total / 3);

const $column1 = $items.slice(0, perColumn);
const $column2 = $items.slice(perColumn, perColumn * 2);
const $column3 = $items.slice(perColumn * 2);

$("#column1").append($column1);
$("#column2").append($column2);
$("#column3").append($column3);

// Infinite scroll
let currentPage = 0;
const itemsPerPage = 20;

$(window).on("scroll", function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height() - 100) {
        const start = currentPage * itemsPerPage;
        const end = start + itemsPerPage;

        $(".item").slice(start, end).show();
        currentPage++;
    }
});

// Alternating groups
$("tr").slice(0, 5).addClass("group-a");
$("tr").slice(5, 10).addClass("group-b");
$("tr").slice(10, 15).addClass("group-a");

// Get surrounding elements
const $active = $(".item.active");
const activeIndex = $(".item").index($active);
const $surrounding = $(".item").slice(
    Math.max(0, activeIndex - 2),
    Math.min($(".item").length, activeIndex + 3)
);

$surrounding.addClass("nearby");

// Preview first few items
function showPreview(count) {
    const $preview = $(".comment").slice(0, count);
    const $hidden = $(".comment").slice(count);

    $preview.show();
    $hidden.hide();

    $(".show-all").on("click", function () {
        $hidden.show();
        $(this).hide();
    });
}

showPreview(3);

// Extract sample
const $sample = $(".data-point").slice(0, 100);
const average = $sample.map(function () {
    return parseFloat($(this).data("value"));
}).toArray().reduce((a, b) => a + b) / $sample.length;

console.log(`Sample average: ${average}`);
```

## Differences to jQuery

None.
