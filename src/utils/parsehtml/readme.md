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
A boolean indicating whether to extract and run script tags from the html.

## Returns
An array of DOM nodes.

## Differences to jQuery
 The Dabby version allows `runscripts` to be passed as the second argument, acting as a shorthand for `context` and `runscripts`.

## Examples
This will convert the string into an array of DOM nodes.

```javascript
const myNodes = $.parseHTML("<div>Hello, <b>world</b>!</div>");
console.log(myNodes);
// Expected output: [div]
```

Parse an HTML string with multiple elements, this will return an array containing both the <p> and <div> elements.

```javascript
const myNodes = $.parseHTML("<p>First paragraph</p><div>Second div</div>");
console.log(myNodes);
// Expected output: [p, div]
```