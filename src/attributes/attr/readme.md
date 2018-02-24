# .attr()

Get attributes from the first node in a collection, or set attributes on all the nodes in a collection.

## Usage

```javascript
$(selector).attr(key) // => String
$(selector).attr(key, value) // => dabby
$(selector).attr(attributes) // => dabby
$(selector).attr(key, function (index, currentValue) {}) // => dabby
```

### key

The name of the attribute to get or set.

### value

The value to set the attribute to.

### attributes

A plain object of key / value pairs representing the attributes to set.

### function

A callback that receives the index of the element in the collection, and the current value of the attrivute. Should return the new attribute value. `this` will reference the current item in the collection that is being processed.

## Returns

A string containing the keys and values of the current dabby collection rendered as a URL encoded query string.

## Example

```javascript
$("a").attr("href"); // retrieves the href attribute of the first element in the collection
$("a").attr("href", "https://hexydec.github.io/dabby"); // sets the href attribute of all anchors on the page
$("img").attr({ // set multiple attributes
	alt: "A man with a pineapple on his head"
	src: "images/pineapple.png"
});
```

## Differences to jQuery

None.
