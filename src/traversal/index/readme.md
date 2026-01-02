# .index()

Find the index of an element within a collection.

## Usage

```javascript
$(collection).index();
$(collection).index(selector);
```

### selector

A selector, HTML string, Node, array of Nodes, Dabby collection, or a callback function to filter the collection.

## Returns

The zero-based index of the matched element, or -1 if the selector does not match.

## Examples

### Basic Usage

```javascript
// Get index of specific element
const index = $("li").index("#item-3");

// Get index of clicked element
$("li").on("click", function () {
    const index = $("li").index(this);
    console.log(`Clicked item ${index}`);
});

// Get index within parent
const $item = $(".item").eq(2);
const index = $item.parent().children().index($item);
```

### Real-World Examples

```javascript
// Show corresponding tab content
$(".tab-button").on("click", function () {
    const index = $(".tab-button").index(this);

    $(".tab-button").removeClass("active");
    $(this).addClass("active");

    $(".tab-content").hide();
    $(".tab-content").eq(index).show();
});

// Navigate carousel
$(".carousel-dot").on("click", function () {
    const index = $(".carousel-dot").index(this);

    $(".carousel-item").hide();
    $(".carousel-item").eq(index).show();

    $(".carousel-dot").removeClass("active");
    $(this).addClass("active");
});

// Track position in list
$(".item").on("click", function () {
    const position = $(".item").index(this) + 1;
    const total = $(".item").length;
    console.log(`Item ${position} of ${total}`);
});

// Accordion panel tracking
$(".accordion-header").on("click", function () {
    const index = $(".accordion-header").index(this);
    const $content = $(".accordion-content").eq(index);

    $(".accordion-content").not($content).slideUp();
    $content.slideToggle();
});

// Find selected option index
const $select = $("select");
const selectedIndex = $select.find("option").index($select.find("option:selected"));
console.log(`Selected index: ${selectedIndex}`);

// Wizard step tracking
function updateWizard($step) {
    const currentIndex = $(".wizard-step").index($step);
    const totalSteps = $(".wizard-step").length;

    $(".step-indicator").text(`Step ${currentIndex + 1} of ${totalSteps}`);
    $(".progress-bar").css("width", `${((currentIndex + 1) / totalSteps) * 100}%`);
}

// Image gallery navigation
$(".thumbnail").on("click", function () {
    const index = $(".thumbnail").index(this);

    $(".lightbox-image").attr("src", $(".thumbnail").eq(index).data("full-url"));
    $(".image-counter").text(`${index + 1} / ${$(".thumbnail").length}`);
});

// Sortable list reordering
$(".sortable-item").on("drop", function (e) {
    const oldIndex = $(".sortable-item").index($(this));
    const newIndex = $(this).data("new-index");

    console.log(`Moved from ${oldIndex} to ${newIndex}`);
});

// Check if element is first or last
$(".list-item").each(function () {
    const index = $(".list-item").index(this);
    const total = $(".list-item").length;

    if (index === 0) {
        $(this).addClass("first");
    }
    if (index === total - 1) {
        $(this).addClass("last");
    }
});

// Pagination current page
function setActivePage(pageNumber) {
    const index = pageNumber - 1;
    $(".page-link").removeClass("active");
    $(".page-link").eq(index).addClass("active");
}

// Find position for insertion
function findInsertPosition($newItem) {
    const value = parseInt($newItem.data("value"));
    let insertIndex = -1;

    $(".item").each(function (index) {
        const itemValue = parseInt($(this).data("value"));
        if (value < itemValue && insertIndex === -1) {
            insertIndex = index;
            return false;
        }
    });

    return insertIndex;
}

// Track scroll position in list
$(".scroll-container").on("scroll", function () {
    const $items = $(this).find(".item");
    const scrollTop = $(this).scrollTop();

    let visibleIndex = -1;
    $items.each(function (index) {
        if ($(this).position().top >= 0) {
            visibleIndex = index;
            return false;
        }
    });

    console.log(`Viewing item ${visibleIndex + 1}`);
});

// Keyboard navigation
$(document).on("keydown", function (e) {
    const $active = $(".item.active");
    const currentIndex = $(".item").index($active);

    if (e.key === "ArrowDown") {
        const nextIndex = Math.min(currentIndex + 1, $(".item").length - 1);
        $(".item").removeClass("active");
        $(".item").eq(nextIndex).addClass("active");
    } else if (e.key === "ArrowUp") {
        const prevIndex = Math.max(currentIndex - 1, 0);
        $(".item").removeClass("active");
        $(".item").eq(prevIndex).addClass("active");
    }
});

// Compare positions
function isBefore($elem1, $elem2) {
    const $parent = $elem1.parent();
    const index1 = $parent.children().index($elem1);
    const index2 = $parent.children().index($elem2);

    return index1 < index2;
}

// Calculate relative position
$(".draggable").on("dragend", function () {
    const $siblings = $(this).siblings(".draggable").addBack();
    const newIndex = $siblings.index(this);

    $(this).attr("data-position", newIndex);
});
```

## Differences to jQuery

None.
