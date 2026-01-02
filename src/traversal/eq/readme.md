# .eq()

Creates a new Dabby collection containing the element at the specified index.

## Usage

```javascript
$(collection).eq(index);
```

### index

The zero-based index of the element to select. A negative number will select elements from the end of the collection.

## Returns

A new Dabby collection containing the single element at the requested index. If the index does not exist, an empty collection will be returned.

## Examples

### Basic Usage

```javascript
// Select first element
const $first = $("li").eq(0);

// Select third element
const $third = $("li").eq(2);

// Select last element (negative index)
const $last = $("li").eq(-1);

// Select second-to-last
const $secondLast = $("li").eq(-2);
```

### Real-World Examples

```javascript
// Highlight specific item
$(".item").eq(2).addClass("highlighted");

// Get value from specific input
const thirdValue = $("input[type='text']").eq(2).val();

// Show specific tab
$(".tab-button").eq(0).on("click", function () {
    $(".tab-content").hide();
    $(".tab-content").eq(0).show();
});

// Style every third item differently
$(".product").each(function (index) {
    if (index % 3 === 0) {
        $(this).addClass("special");
    }
});
// Or using eq:
for (let i = 0; i < $(".product").length; i += 3) {
    $(".product").eq(i).addClass("special");
}

// Navigate carousel
let currentSlide = 0;
$(".next-slide").on("click", function () {
    $(".slide").hide();
    currentSlide = (currentSlide + 1) % $(".slide").length;
    $(".slide").eq(currentSlide).show();
});

// Select random element
const randomIndex = Math.floor(Math.random() * $(".item").length);
$(".item").eq(randomIndex).addClass("random-selection");

// Remove specific element
$(".list-item").eq(3).remove();

// Update specific row
$("tr").eq(1).css("background-colour", "#f0f0f0");

// Get last item safely
const $items = $(".item");
if ($items.length > 0) {
    const $lastItem = $items.eq(-1);
    console.log("Last item:", $lastItem.text());
}
```

## Differences to jQuery

None.
