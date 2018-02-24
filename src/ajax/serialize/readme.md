# .serialize()

Serialize the value of form elements into a URL encoded query string.

## Usage

```javascript
$(selector).serialize() // => String
```

## Returns

A string containing the keys and values of the current dabby collection rendered as a URL encoded query string.

## Example

```javascript
$("input, select, textarea").serialize(); // serialises the form controls of the selector
$("form").serialize(); // serialises all the controls inside a form
$(".classOfDiv").serialize(); // serialise all form elements below this selector
```

## Differences to jQuery

None.
