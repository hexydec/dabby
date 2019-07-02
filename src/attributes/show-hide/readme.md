# .show()

Set the display property of each object in a collection to show the items.

If the item was previously hidden, the initial display value will be used.

The display property is set as an inline property, if a CSS rule sets the property with !important, this method will have no effect.

# .hide()

Set the display property of each object in a collection to none.

The display property is set as an inline property, if a CSS rule sets the property with !important, this method will have no effect.

# .toggle()

Toggle the display property of each item in a collection to show or hide the items.

If the item was previously hidden, the initial display value will be used.

The display property is set as an inline property, if a CSS rule sets the property with !important, this method will have no effect.

## Usage

```javascript
$(selector).show();
$(selector).hide();
$(selector).toggle();
```

## Returns

The input Dabby collection will be returned.

## Differences to jQuery

None.
