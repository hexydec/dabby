# $.map

Iterates over each item in an array or object, and runs a callback function. The results are returned as an array. Note that if an array is returned from the callback function, it will be flattened into the resulting array.

## Usage

```javascript
$.map(array);
$.map(object);
```

#### array

An array to apply the callback to each item of.

#### object

An Object to apply the callback to each item of.

## Returns

An array containing the result of each callback. If the result of a callback is an array, it will be flattened into the return array. If the result of a callback is `null` or `undefined`, it will not be returned in the array.

## Example

```javascript
const items = [42, "hello", ["my", "your"]],
	arr = $.map(items, item => typeof item === "string" ? item + " world" : null);

console.log(arr); // ["hello world", "my world", "your world"]
```

## Differences to jQuery

None.
