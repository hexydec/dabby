# $.each()

A generic iterator method that can iterate over an array or an object, and run a callback function on each.


# $.each()

A generic iterator for looping through array-like objects or plain objects.

## Usage

```javascript
$.each(obj, callback);
```

### obj
The object or array to iterate over. This can be a Dabby object, a plain JavaScript object, or an array-like object.

### callback
A function to execute for each item. The function is called with the current item's key (index for arrays, property name for objects) as the first argument, and the value as the second argument. Returning false from the callback will stop the loop early.

## Returns
The original object or array that was passed in.

## Example
Iterate over an array:

```javascript
const arr = ["a", "b", "c"];

$.each(arr, (index, value) => {
	console.log(`Index: ${index}, Value: ${value}`);
});
// Logs:
// "Index: 0, Value: a"
// "Index: 1, Value: b"
// "Index: 2, Value: c"
```

Iterate over an object:

```javascript
const obj = {
	foo: "bar",
	baz: "qux"
};

$.each(obj, (key, value) => {
	console.log(`Key: ${key}, Value: ${value}`);
});
// Logs:
// "Key: foo, Value: bar"
// "Key: baz, Value: qux"
```

Stop the loop early by returning false:

```javascript
const arr = [1, 2, 3, 4, 5];

$.each(arr, (index, value) => {
	if (value === 3) {
		return false; // Stop the loop
	}
	console.log(value);
});
// Logs:
// 1
// 2
```

## Differences to jQuery

None.