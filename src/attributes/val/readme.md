# .val()

Get the value of the first item in the collection, or set the values of all items in the collection.

This method is designed to use with `input`, `select` and `textarea` nodes.

## Usage

```javascript
$(selector).val();
$(selector).val(value);
$(selector).val(function (index, currentValue) {});
```

#### value

The value to set to each node in the collection.

#### function

A callback that receives the index of the element in the collection, and the current value. Should return a new value. `this` will reference the current item in the collection that is being processed.

## Returns

The original Dabby collection when setting, or the current value when getting, or undefined if the collection is empty.

## Example

```javascript
let val = $("input").val();
let checkbox = $("input[type=checkbox]").val(); // doesn't matter whether it is checked
let radio = $("input[type=radio]").val(); // won't get the checked value
let checked = $("input[type=radio][name=myradio]:checked").val(); // get the checked value like this

$("input[type=text]").val("Hello world!"); // set the value of a text input
$("select").val("option2"); // set the value of a select box
$("select[multiple]").val(["option2", "option3", "option4"]); // set the value of a multi select box
$("input[type=radio][name=myradio]").val("item2"); // make sure to select the radio buttons that will be checked
$("input[type=radio]").val("item2"); // will set any radio button with the value "item2" to checked
```

## Differences to jQuery

None.
