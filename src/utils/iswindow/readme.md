# $.iswindow()

Determines whether the passed value is the `window` object.

**WARNING: This method is deprecated**

## Usage

```javascript
$.iswindow(value);
```

#### value

A variable to test whether it is the window object.

## Returns

A boolean specifying whether `value` is a function.

## Example

```javascript
const test = [42, "hello world", window, document]

test.forEach(item => {
	console.log($.iswindow(item)); // false, false, true, false
});
```

## Notes

This method is deprecated.

## Differences to jQuery

None.
