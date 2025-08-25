# Dabby.js Coding Style Guide

If you wish to contribute to the project, please follow our style guide:

### Tabs and Spacing

- Write ifs, control loops, and functions with spacing like so:
	- `if (expression) {`
	- `for (i = 0; i < len; i++) {`
	- `while (expression) {`
	- `function () {`
- Use tabs not spaces for indenting code.
- Do not write control loops or ifs on one line.
- Use a double line to divide sections of code, with preceding comment

```javascript
	lastline = true;

	// next block
	var newline = "here";
```

### Handling nodes internally

There is no internal method to loop through nodes. The fastest and simplest way to loop through Dabby nodes is to use the following pattern:

```javascript
let i = this.length;
while (i--) {
	// write node manipulation code here
	// access node with this[i]
}
```

This is normally the fastest type of loop, and uses the least code. Note that this will loop through the nodes in reverse order, so if order matters use the following pattern:

```javascript
const len = this.length;
for (let i = 0; i < len; i++) {
	// write node manipulation code here
	// access node with this[i]
}
```

### Leverage the browser, not Dabby.js

Where the vanilla Javascript code is simple, use that instead of the internal Dabby methods. For example, if you need to retrieve the parent of a node, use `this.parentNode`, rather than `$(this).parent()`.

This will make Dabby.js as fast as possible and prevent unneeded dependencies, making custom builds smaller.

Where functionality is more complex, it is better to use Dabby.js methods as described above than duplicating its functionality. See existing modules for examples of this.