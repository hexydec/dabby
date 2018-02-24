# .load()

Make an AJAX request and insert the resulting HTML it into the DOM

## Usage

```javascript
$(selector).load(url[, success]) // => dabby
$(selector).load(url[, data, success]) // => dabby
$(selector).load(url fragment[, data, success]) // => dabby
```

### url

The URL of the HTML page to fetch.

### data

Either a plain object or a string containing data to send to the receiving script. If the `data` parameter is sent as a plain object, the data will be sent with the POST method, otherwise GET will be used.

### success

A callback function that is fired once for each node in the Dabby collection when the request is successful.

### url fragment

A special way of specifying the URL string, which includes a refinement selector. Here anything after the first space will be considered as a CSS selector, the resulting HTML will then be filtered by the selector before being placed into each node.

## Return value

Returns the original dabby collection so it can be chained.

## Example

This full example fetches a script from the server and sets the result to each node in the collection.

```html
<div class="container1"></div>
<div class="container2"></div>
```

```javascript
$(".container1, .container2").load("fragment.html #wrap", {foo: "bar"}, function (response, status, xhr) {
	alert($(this).attr("class")); // container1 then container2
});
```

## Differences to jQuery

In jQuery, the `xhr` parameter of any callback functions are returned as an enhanced XMLHttpRequest called the `jqXHR` object, whereas in Dabby.js, the orignal XMLHttpRequest object is returned.
