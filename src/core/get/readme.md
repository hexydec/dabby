# .get()

Retrieve raw HTML nodes from a Dabby collection.

## Usage

```javascript
$(selector).get();
$(selector).get(index);
```

### index

The zero-based index of the element to retrieve. A negative number will count from the end of the collection.

## Returns

By passing `index` to this method, the node sitting at that index in the Dabby collection will be returned. If no value is passed, an array containing all nodes from the collection will be returned.

## Examples

### Basic Usage

```javascript
// Get all nodes as array
const nodes = $(".map").get();
console.log(nodes); // [div, div, div]

// Get specific node
const node = $(".map").get(1);
console.log(node.innerText); // "Second"

// Get last node
const lastNode = $("li").get(-1);

// Get first node
const firstNode = $("li").get(0);
```

### Real-World Examples

```javascript
// Access native DOM methods
const element = $("#myElement").get(0);
element.scrollIntoView({ behavior: "smooth" });

// Use with native APIs
const images = $("img").get();
images.forEach(function (img) {
    img.loading = "lazy";
});

// Get all for processing
const allDivs = $("div").get();
console.log(`Total divs: ${allDivs.length}`);

// Access specific element properties
const firstInput = $("input").get(0);
console.log(firstInput.value);
console.log(firstInput.validity.valid);

// Get last element
const lastItem = $(".item").get(-1);
lastItem.classList.add("last");

// Convert to native array for methods
const links = $("a").get();
const externalLinks = links.filter(function (link) {
    return link.hostname !== window.location.hostname;
});

// Use with IntersectionObserver
const sections = $(".section").get();
const observer = new IntersectionObserver(callback);

sections.forEach(function (section) {
    observer.observe(section);
});

// Access canvas context
const canvas = $("canvas").get(0);
if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.fillRect(0, 0, 100, 100);
}

// Get video element for media API
const video = $("video").get(0);
if (video) {
    video.play();
    video.volume = 0.5;
}

// Focus management
const firstField = $("form input").get(0);
if (firstField) {
    firstField.focus();
}

// Get all for custom iteration
const items = $(".draggable").get();

items.forEach(function (item, index) {
    item.dataset.index = index;
    item.draggable = true;
});

// Access file input
const fileInput = $("input[type='file']").get(0);
if (fileInput && fileInput.files.length > 0) {
    const file = fileInput.files[0];
    console.log(file.name, file.size);
}

// Use native getBoundingClientRect
const element = $(".positioned").get(0);
const rect = element.getBoundingClientRect();
console.log(`Position: ${rect.top}, ${rect.left}`);

// Get audio element
const audio = $("audio").get(0);
if (audio) {
    audio.play();
    audio.addEventListener("ended", function () {
        console.log("Audio finished");
    });
}

// Access form elements
const form = $("form").get(0);
if (form) {
    console.log(form.elements);
    form.reset();
}

// Iterate with index
$("li").get().forEach(function (li, index) {
    li.textContent = `Item ${index + 1}: ${li.textContent}`;
});

// Get specific element for mutation observer
const target = $("#content").get(0);
const observer = new MutationObserver(callback);
observer.observe(target, { childList: true });

// Use with custom libraries
const charts = $(".chart").get();
charts.forEach(function (chartElement) {
    new Chart(chartElement, config);
});

// Access input for custom validation
const emailInput = $("#email").get(0);
if (emailInput) {
    emailInput.setCustomValidity("");

    if (!isValidEmail(emailInput.value)) {
        emailInput.setCustomValidity("Please enter a valid email");
    }
}

// Get elements for  animation library
const animated = $(".animate").get();
animated.forEach(function (element) {
    element.animate([
        { opacity: 0 },
        { opacity: 1 }
    ], {
        duration: 500
    });
});

// Select option access
const select = $("select").get(0);
if (select) {
    const selectedOption = select.options[select.selectedIndex];
    console.log(selectedOption.text);
}

// Access specific node in collection
const secondParagraph = $("p").get(1);
secondParagraph.contentEditable = "true";
```

## Differences to jQuery

None.
