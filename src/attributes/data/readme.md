# .data()

Get or set arbitrary data as properties of each node in a collection.

## Usage

```javascript
$(selector).data(key);
$(selector).data(key, value);
$(selector).data(obj);
```

#### key

The name of the data attribute to get/set. The key corresponds directly to any data-\* attributes, so when reading, if the node contains a corresponding data attribute, the value will be returned.

The names of data attributes must conform to the naming convention of HTML data-\* attributes, so they must contain only lowercase alpha numeric characters and dashes. Names can also be sent in camelCase notation.

#### value

Can be anything, but note that internally, any data is converted to a JSON string, so objects that have a .toJSON() method may not return in the same format.

#### obj

An object of key/value pairs, enabling multiple data attributes to be set.

## Returns

When reading, the contained value will be returned, or undefined if the data attribute hasn't been set. When setting a value, the original collection will be returned.

## Example

Using the following HTML:

```html
<div id="item" data-value="5" data-longer-name="{'hello': 'world', 'foo': 'bar'}"></div>
```

The following javascript will access the data attributes.

```javascript

// read values
var value = $("#item").data("value"); // = 5
var obj = $("#item").data("longer-name"); // {hello: "world", foo: "bar"} - native javascript object
var obj = $("#item").data("longerName"); // same as above

// set values
$("#item").data("value", 6); // overwrite value
$("#item").data("new-value", {test: "me", test2: "me2"}); // create new value - object
$("#item").data("longerName", {hello: "mars", foo: "pub"}); // overwrite value
$("#item").data({value: 10, "newValue": "String now", "new-value-2": "Another string?"}); // set values as objects
```

## Differences to jQuery

jQuery may have its own internal data store to associate data with nodes in a collection, and thus may be able to retain more complex objects or those that have a .toJSON() method. The reason for this is simplicity, the Javascript API for the HTMLElement object provides the `dataset` property, which dabby uses internally.
