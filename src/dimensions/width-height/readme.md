# .width() / .height()

Retrieve the width or height of the first element in a matched collection or set the width or height of every element in a collection.

The width and height is defined as the inner size of the element excluding padding, border, and margin.

# .innerWidth() / .innerHeight()

Retrieve the inner width or inner height of the first element in a matched collection or set the inner width or inner height of every element in a collection.

The inner width and inner height is defined as the inner size of the element including padding, but excluding border and margin.

See .width() and .height() for usage.

# .outerWidth() / .outerHeight()

Retrieve the outer width or outer height of the first element in a matched collection or set the outer width or outer height of every element in a collection.

The outer width and outer height is defined as the inner size of the element including padding and border, but excluding margin.

See .width() and .height() for usage.

## Usage

```javascript
$(selector).width();
$(selector).height();
$(selector).width(value);
$(selector).height(value);
$(selector).width(function (index, currentValue) {});
$(selector).height(function (index, currentValue) {});
$(selector).innerWidth();
$(selector).innerHeight();
$(selector).innerWidth(value);
$(selector).innerHeight(value);
$(selector).innerWidth(function (index, currentValue) {});
$(selector).innerHeight(function (index, currentValue) {});
$(selector).outerWidth();
$(selector).outerHeight();
$(selector).outerWidth(value);
$(selector).outerHeight(value);
$(selector).outerWidth(function (index, currentValue) {});
$(selector).outerHeight(function (index, currentValue) {});
```

### value

An integer or string specifying the desired dimensions of the items in the collection. As a string the value should be numeric with a unit as a suffix such as px, pt, cm, or % (Any unit suppported by the browser).

If no unit is specified, pixels (px) is assumed.

### function

A callback that receives the index of the element in the collection, and the current value of the dimension. Should return the new dimension value. `this` will reference the current item in the collection that is being processed.

## Returns

An integer or float containing the requested dimension as a pixel unit, or if setting the dimension, the input Dabby collection will be returned.

## Example

```javascript
const obj = $("div"), // cache collection
	width = obj.width(); // 800
obj.width(600); // => dabby
obj.width("50%"); // => dabby
obj.width("4cm"); // => dabby
obj.width("50%"); // => dabby
obj.width((index, currentValue) => {
	return currentValue + 20;
}); // => dabby
```

## Differences to jQuery

Doesn't support relative units such as "+2px".
