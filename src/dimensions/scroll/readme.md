# .scrollLeft() / .scrollTop()

Retrieves the left or top scroll position of the first element in the collection, or sets the scroll position on each item in the collection.

## Usage

```javascript
// Get scroll position
const left = $(selector).scrollLeft();
const top = $(selector).scrollTop();

// Set scroll position
$(selector).scrollLeft(scroll);
$(selector).scrollTop(scroll);

// Set with callback
$(selector).scrollLeft(function (index, currentValue) {});
$(selector).scrollTop(function (index, currentValue) {});
```

### scroll

The scroll value to be set on each item in the input collection.

### function

A callback that receives the index of the element in the collection and the current scroll value. Should return the new scroll value. `this` will reference the current item in the collection that is being processed.

## Returns

The scroll position of the first item in the collection when retrieving, or the original Dabby collection when setting.

## Examples

### Basic Usage

```javascript
// Get scroll position
const scrollTop = $(window).scrollTop();
const scrollLeft = $(".container").scrollLeft();

// Set scroll position
$(window).scrollTop(500);
$(".container").scrollLeft(200);

// Scroll to top
$(window).scrollTop(0);

// Increase scroll position
$(".container").scrollTop(function (i, current) {
    return current + 100;
});
```

### Real-World Examples

```javascript
// Scroll to element
function scrollToElement($element) {
    const elementOffset = $element.offset().top;
    const offsetFromTop = 100; // Space from top

    $("html, body").animate({
        scrollTop: elementOffset - offsetFromTop
    }, 500);
}

// Sticky header
let lastScrollTop = 0;

$(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();

    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        $(".header").addClass("hidden");
    } else {
        // Scrolling up
        $(".header").removeClass("hidden");
    }

    lastScrollTop = scrollTop;
});

// Scroll progress indicator
$(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const docHeight = $(document).height();
    const windowHeight = $(this).height();
    const scrollPercent = (scrollTop / (docHeight - windowHeight)) * 100;

    $(".progress-bar").css("width", scrollPercent + "%");
});

// Infinite scroll
$(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const windowHeight = $(this).height();
    const docHeight = $(document).height();

    if (scrollTop + windowHeight >= docHeight - 100) {
        loadMoreContent();
    }
});

// Parallax scrolling
$(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();

    $(".parallax-background").css({
        transform: `translateY(${scrollTop * 0.5}px)`
    });
});

// Scroll spy navigation
$(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();

    $(".section").each(function () {
        const sectionTop = $(this).offset().top - 100;
        const sectionBottom = sectionTop + $(this).outerHeight();
        const sectionId = $(this).attr("id");

        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            $(".nav-link").removeClass("active");
            $(`.nav-link[href="#${sectionId}"]`).addClass("active");
        }
    });
});

// Show/hide back to top button
$(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();

    if (scrollTop > 300) {
        $(".back-to-top").fadeIn();
    } else {
        $(".back-to-top").fadeOut();
    }
});

// Back to top button
$(".back-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 600);
});

// Horizontal scroll gallery
$(".scroll-left").on("click", function () {
    const $gallery = $(".gallery");
    const currentScroll = $gallery.scrollLeft();

    $gallery.animate({ scrollLeft: currentScroll - 300 }, 300);
});

$(".scroll-right").on("click", function () {
    const $gallery = $(".gallery");
    const currentScroll = $gallery.scrollLeft();

    $gallery.animate({ scrollLeft: currentScroll + 300 }, 300);
});

// Sync scroll between elements
$(".scroll-source").on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const scrollLeft = $(this).scrollLeft();

    $(".scroll-target").scrollTop(scrollTop).scrollLeft(scrollLeft);
});

// Check if scrolled to bottom
function isScrolledToBottom($element) {
    const scrollTop = $element.scrollTop();
    const scrollHeight = $element[0].scrollHeight;
    const clientHeight = $element[0].clientHeight;

    return scrollTop + clientHeight >= scrollHeight - 10;
}

$(".chat-container").on("scroll", function () {
    if (isScrolledToBottom($(this))) {
        console.log("Reached bottom of chat");
        loadMoreMessages();
    }
});

// Smooth scroll to anchor
$('a[href^="#"]').on("click", function (e) {
    e.preventDefault();

    const target = $(this).attr("href");
    const $target = $(target);

    if ($target.length) {
        const targetTop = $target.offset().top - 80;

        $("html, body").animate({
            scrollTop: targetTop
        }, 800);
    }
});

// Save and restore scroll position
function saveScrollPosition() {
    const scrollTop = $(window).scrollTop();
    const scrollLeft = $(window).scrollLeft();

    sessionStorage.setItem("scrollTop", scrollTop);
    sessionStorage.setItem("scrollLeft", scrollLeft);
}

function restoreScrollPosition() {
    const scrollTop = sessionStorage.getItem("scrollTop");
    const scrollLeft = sessionStorage.getItem("scrollLeft");

    if (scrollTop) $(window).scrollTop(parseInt(scrollTop));
    if (scrollLeft) $(window).scrollLeft(parseInt(scrollLeft));
}

// Fade in elements on scroll
$(window).on("scroll", function () {
    const scrollTop = $(this).scrollTop();
    const windowHeight = $(this).height();

    $(".fade-in-element").each(function () {
        const elementTop = $(this).offset().top;

        if (scrollTop + windowHeight > elementTop + 100) {
            $(this).addClass("visible");
        }
    });
});

// Lock scroll
function lockScroll() {
    const scrollTop = $(window).scrollTop();

    $("body").css({
        position: "fixed",
        top: -scrollTop + "px",
        width: "100%"
    });
}

function unlockScroll() {
    const scrollTop = Math.abs(parseInt($("body").css("top")));

    $("body").css({
        position: "",
        top: "",
        width: ""
    });

    $(window).scrollTop(scrollTop);
}

// Scroll to bottom of chat
function scrollChatToBottom() {
    const $chat = $(".chat-messages");
    const scrollHeight = $chat[0].scrollHeight;

    $chat.scrollTop(scrollHeight);
}

// Detect scroll direction
let lastScroll = 0;

$(window).on("scroll", function () {
    const currentScroll = $(this).scrollTop();

    if (currentScroll > lastScroll) {
        console.log("Scrolling down");
    } else {
        console.log("Scrolling up");
    }

    lastScroll = currentScroll;
});
```

## Differences to jQuery

None.
