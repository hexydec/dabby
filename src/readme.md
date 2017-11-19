# $()

Create a Dabby.js object, containing nodes, selected with document nodes, CSS selector, or HTML. Or when supplied with a callback function, it will be triggered on the DOMContentLoaded event.

## Usage

### $(selector)

```javascript
$(selector [, context])
$(element)
$(elementArray)
$(object)
$()
```
When created with a CSS selector, DOM element, array of DOM elements, or Dabby object, selects the requested nodes and stores them internally ready for manipulation.

```javascript
$("#id"); // select a node with the specified ID
$(".className"); // select nodes with the specified class name
$("ul"); // select nodes with the specified tag
$("ul > li"); // select any nodes the browser supports
$("#id, .className, ul"); // select multiple nodes in one

var body = $("body"); // can be any of the specified patterns
$("ul", body); // select nodes inside a specified context

$(document.getElementById("node")); // input native node
$(document.getElementsByClassName("className")); // input native node or nodes

var dabby = $(".className"); // create a Dabby object
$(dabby); // can be recycled later

$(); // create an empty object
```

### $(html)

```javascript
$(html [, ownerDocument])
$(html, attributes)
```
Create HTML nodes within a dabby object from the inputted HTML.

```javascript
$("<div>"); // create a single tag
$("<div/>"); // create a single tag
$("<div></div>");  // create a single tag
$('<div class="demo">Some <strong>text</strong><div><p>More text</p>'); //parse a string of HTML into nodes

$("<div>", iframe); // change ownerDocument

$("<div>", {
	"class": "demo",
	text: "Some text",
	click: function () {alert("Clicked");}
}); // create HTML element with attributes, uses attr() internally
```

### $(callback)

```javascript
$(callback)
```
Attach a callback function to the DOMContentLoaded event. Called immediately if event has already been fired.

```javascript
$(function () {alert("Loaded");}); // fired when document is loaded
```

## Return value

An instance of the Dabby.js object so it can be chained to other methods.

## Differences to jQuery

- Only supports selectors the browser supports, so for example `$("a:first");` will not work.
- Parses HTML using the browsers innerHTML property, no other processing is performed.
