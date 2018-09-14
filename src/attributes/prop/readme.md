# .prop()

Get the requested property on the first element in a collection or set properties on each item in a collection.

## Usage

```javascript
$(selector).prop(propertyName);
$(selector).prop(propertyName, value);
$(selector).prop(propertyName, function (index, currentValue) {});
$(selector).prop(properties);
```

#### propertyName

The name of the property you wish to get or set.

#### value

The value of the property you wish to set.

#### function

A callback function to generate a value for the property you wish to set. Receives the index of the current node in the collection, and the current value. `this` will be set to the current node.

Where attributes are set as an object, callback functions can also be supplied.

## Returns

When retrieving a value, a string will be returned containing the value of the property. If there are no elements in the collection or the requested property does not exist, `undefined` will be returned.

When setting a value or values, the original collection will be returned.

## Example

Consider the following HTML:

```html
<a href="https://github.com/hexydec/dabby" class="foo">Dabby.js</a>
<input type="checkbox" name="foo" value="bar" checked="checked" />
```

The following javascript will get and set properties:

```javascript
var href = $("a").prop("href"); // https://github.com/hexydec/dabby - may be formatted by the browser
var bar  = $("input").prop("checked"); // true, attr() will return checked
var a = $("a").prop("title", "Go to the Dabby.js GitHub page"); // set title and returns collection
```

## Differences to jQuery

None.
