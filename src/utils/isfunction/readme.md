# $.isfunction()

Determines whether the passed value is a function.

**WARNING: This method is deprecated**

## Usage

```javascript
$.isfunction(value);
```

#### value

A variable to test whether it is a function.

## Returns

A boolean specifying whether `value` is a function.

## Example

```javascript
const test = [42, "hello world", function () {return 42;}, item => item + 42]

test.forEach(item => {
	console.log($.isfunction(item)); // false, false, true, true
});
```

## Notes

This method is deprecated.

## Differences to jQuery

None.
