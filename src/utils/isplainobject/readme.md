# $.isPlainObject()
Tests a value to see if it is a plain object, that was defined with {} and has a prototype of Object.

## Usage
```javascript
$.isPlainObject(obj);
```

### obj
The value to be tested.

## Returns
A boolean indicating whether the input value is a plain object.

## Differences to jQuery
None.

## Examples
This will return `true` because the object was created using object literal notation:

```javascript
const myObject = {};
console.log($.isPlainObject(myObject));
// Expected output: true
```

This will return `false` because an array's prototype is `Array`, not `Object`:

```javascript
const myArray = [];
console.log($.isPlainObject(myArray));
// Expected output: false
```

This will return `false` because a `Date` object's prototype is `Date`:

```javascript
const myDate = new Date();
console.log($.isPlainObject(myDate));
// Expected output: false
```