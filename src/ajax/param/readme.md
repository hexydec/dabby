# $.param()

Render a query string from an object.

## Usage

```javascript
$.param(object) // => String
```

### object

A plain object containing any variable types except functions. Objects can be nested.

## Returns

A string containing the inputted object rendered as a URL encoded query string.

## Example

```javascript
var query = $.param({
	name: "Dave Angel",
	email: "dave.angel@geezmail.com",
	settings: {
		color: "black",
		bgcolor: "green",
		roles: [2, 3, 5]
	}
});

console.log(query); // "name=Dave%20Angel&email=dave.angel%40geezmail.com&settings%5Bcolor%5D=black&settings%5Bbgcolor%5D=green&settings%5Broles%5D%5B0%5D=2&settings%5Broles%5D%5B1%5D=3&settings%5Broles%5D%5B2%5D=5"
```

## Differences to jQuery

jQuery has a second argument to this method `traditional`, which specifies whether to shallow encode the inputted object (Instead of encoding nested objects, it will encode a string saying "[object Object]"), which dabby does not support.

It also has a global ajax setting `jQuery.ajaxSettings.traditional = true;` which is not supported.
