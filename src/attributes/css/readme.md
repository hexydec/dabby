# .css()

Get the requested CSS attributes from the first item in a collection, or set the requested attributes on all the items in the collection.

## Usage

```javascript
$(selector).css(attribute);
$(selector).css([attribute, ...]);
$(selector).css({attribute: value, ...});
$(selector).css(attribute, value);
```

You can request an attribute or attributes from the first item in a collection by sending the attribute name as either a string or an array of strings. To set attributes, send an object containing attribute names as the key, and the attribute value as the value, or use the two argument form to set single attributes.

#### attribute

The attribute name(s) can be requested using with dash or camel case notation.

#### value

The value to set the specified attribute to on each item in the collection.

## Returns

When requesting attributes, the return value will be either the requested attribute, or an object containing the requested values. If multiple attributes are requested, the attribute names will be returned in the same form as they were requested (camelCase or dash-erised).

When setting attributes, the original collection will be returned.

## Example

```javascript
// retrieve attributes
var color = $(".item").css("border-color"); // returns the first item's border colour
var color = $(".item").css("borderColor"); // returns the same
var attr = $(".item").css(["border-color", "border-width"]); // returns {"border-color": "red", "border-width": "5px"}
var attr = $(".item").css(["borderColor", "borderWidth"]); // returns {borderColor: "red", borderWidth: "5px"}

// set attributes
$(".item").css("border-color", "green");
$(".item").css("borderColor", "green"); // does the same as above
$(".item").css({"border-color": "green", "border-width": "1px"});
$(".item").css({borderColor: "green", borderWidth: "1px"});
```

## Differences to jQuery

None.
