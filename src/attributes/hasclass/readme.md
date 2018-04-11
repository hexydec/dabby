# .hasClass()

See whether any elements in a collection have the requested class.

## Usage

```javascript
$(selector).hasClass(className);
```

#### className

The name of the class to test against the collection.

## Returns

True when any item in the supplied collection has the requested class, false if not.

## Example

Using the following HTML:

```html
<div class="foo"></div>
<div class="bar"></div>
<div class="foo bar"></div>
```

The following javascript will determine whether the requested class is set on any item in the collection:

```javascript
var foo = $("div").hasClass("foo"); // true
var bar  = $("div").hasClass("bar"); // true
var foo2 = $("div.foo").hasClass("bar"); //true
var flu = $("div").hasClass("flu"); // false
```
