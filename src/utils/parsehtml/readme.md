# $.parseHTML()

Parses a string of HTML into an array of DOM nodes.

## Usage

```javascript
$.parseHTML(html);
$.parseHTML(html, context);
$.parseHTML(html, runscripts);
$.parseHTML(html, context, runscripts);
```

### html

A string of HTML to parse.

### context

A node to use as context for generating the DOM. If not specified, the document is used.

### runscripts

A boolean indicating whether to extract and run script tags from the HTML.

## Returns

An array of DOM nodes.

## Examples

### Basic Usage

```javascript
// Simple HTML string
const nodes = $.parseHTML("<div>Hello, <b>world</b>!</div>");
console.log(nodes); // [div]

// Multiple elements
const elements = $.parseHTML("<p>First</p><div>Second</div>");
console.log(elements); // [p, div]

// Plain text
const text = $.parseHTML("Just text");
console.log(text); // [TextNode]

// Complex HTML
const complex = $.parseHTML(`
    <article>
        <h2>Title</h2>
        <p>Content</p>
    </article>
`);
```

### Real-World Examples

```javascript
// Parse API response
$.ajax({
    url: "/api/content",
    success: function (html) {
        const nodes = $.parseHTML(html);
        $(".container").append(nodes);
    }
});

// Create elements from template
const template = `
    <div class="card">
        <h3 class="card-title"></h3>
        <p class="card-content"></p>
        <button class="card-action">Click me</button>
    </div>
`;

const card = $.parseHTML(template)[0];
card.querySelector(".card-title").textContent = "Product Name";
card.querySelector(".card-content").textContent = "Description";
$(".grid").append(card);

// Parse HTML with scripts
const htmlWithScript = `
    <div>Content</div>
    <script>console.log("Hello");</script>
`;

const nodes = $.parseHTML(htmlWithScript, document, true);
// Script will execute

// Safe HTML parsing (no scripts)
const userContent = $.parseHTML(untrustedHTML, document, false);
$(".user-content").append(userContent);

// Parse in iframe context
const iframe = document.querySelector("iframe");
const iframeDoc = iframe.contentDocument;
const iframeNodes = $.parseHTML("<div>Content</div>", iframeDoc);

// Build notification from HTML
function createNotification(message, type) {
    const html = `
        <div class="notification notification-${type}">
            <span class="icon"></span>
            <span class="message">${message}</span>
            <button class="close">&times;</button>
        </div>
    `;

    const notification = $.parseHTML(html)[0];
    return $(notification);
}

// Parse table rows
const rowsHTML = `
    <tr><td>John</td><td>Developer</td></tr>
    <tr><td>Jane</td><td>Designer</td></tr>
    <tr><td>Bob</td><td>Manager</td></tr>
`;

const rows = $.parseHTML(rowsHTML);
$("table tbody").append(rows);

// Load fragment
function loadFragment(html) {
    const nodes = $.parseHTML(html);
    const fragment = document.createDocumentFragment();

    nodes.forEach(function (node) {
        fragment.appendChild(node);
    });

    return fragment;
}

// Parse and filter
const mixedHTML = `
    <div>Keep this</div>
    <script>alert("Remove this");</script>
    <p>Keep this too</p>
`;

const safeNodes = $.parseHTML(mixedHTML, document, false);
const divAndP = safeNodes.filter(function (node) {
    return node.nodeName === "DIV" || node.nodeName === "P";
});

// Create list items
const itemsHTML = $.map(["Apple", "Banana", "Orange"], function (fruit) {
    return `<li>${fruit}</li>`;
}).join("");

const items = $.parseHTML(itemsHTML);
$("ul").append(items);

// Parse markdown-generated HTML
function renderMarkdown(markdown) {
    const html = convertMarkdownToHTML(markdown);
    const nodes = $.parseHTML(html);
    return nodes;
}

// Parse email template
const emailTemplate = `
    <div class="email">
        <header>
            <img src="logo.png" alt="Logo">
        </header>
        <main>
            <p>Dear {{name}},</p>
            <p>{{content}}</p>
        </main>
        <footer>
            <p>Best regards</p>
        </footer>
    </div>
`;

const emailNodes = $.parseHTML(emailTemplate);
const emailElement = emailNodes[0];

// Parse SVG
const svgHTML = `
    <svg width="100" height="100">
        <circle cx="50" cy="50" r="40" fill="red"/>
    </svg>
`;

const svg = $.parseHTML(svgHTML)[0];
$(".icon-container").append(svg);

// Build menu from data
const menuData = [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" }
];

const menuHTML = menuData.map(function (item) {
    return `<a href="${item.url}">${item.label}</a>`;
}).join("");

const menuNodes = $.parseHTML(menuHTML);
$("nav").append(menuNodes);

// Parse and sanitise
function sanitiseHTML(html) {
    const nodes = $.parseHTML(html, document, false);

    // Filter out unwanted elements
    return nodes.filter(function (node) {
        const allowedTags = ["P", "DIV", "SPAN", "A", "STRONG", "EM"];
        return allowedTags.includes(node.nodeName);
    });
}

// Create modal content
function showModal(title, content) {
    const modalHTML = `
        <div class="modal-overlay">
            <div class="modal">
                <h2>${title}</h2>
                <div class="modal-content">${content}</div>
                <button class="modal-close">Close</button>
            </div>
        </div>
    `;

    const modal = $.parseHTML(modalHTML)[0];
    document.body.appendChild(modal);
}

// Parse form fields
const fieldsHTML = `
    <input type="text" name="username" placeholder="Username">
    <input type="email" name="email" placeholder="Email">
    <input type="password" name="password" placeholder="Password">
`;

const fields = $.parseHTML(fieldsHTML);
$("form").append(fields);

// Extract specific elements
const pageHTML = $.ajax({ url: "/page", async: false }).responseText;
const nodes = $.parseHTML(pageHTML);

const contentNode = nodes.find(function (node) {
    return node.id === "main-content";
});

// Build breadcrumbs
const breadcrumbs = ["Home", "Products", "Electronics", "Laptops"];
const breadcrumbHTML = breadcrumbs.map(function (crumb, index) {
    const isLast = index === breadcrumbs.length - 1;
    const separator = isLast ? "" : " > ";
    return `<span>${crumb}${separator}</span>`;
}).join("");

const breadcrumbNodes = $.parseHTML(breadcrumbHTML);
$(".breadcrumbs").append(breadcrumbNodes);
```

## Differences to jQuery

The Dabby version allows `runscripts` to be passed as the second argument, acting as a shorthand for `context` and `runscripts`.
