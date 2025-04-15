# .offset()

Retrieves the coordinates of the first item in the collection, or sets the coordinates of each item in the collection, relative to the document.

## Usage

```javascript
const offset = $(selector).offset();
$(selector).offset(coords);
$(selector).offset(function (index, currentValue) {});
```
### coords

An object containing the properties `top` and `left`.

#### function

A callback that receives the index of the element in the collection, and the current value. Should return a new value. `this` will reference the current item in the collection that is being processed.

## Returns

The original Dabby collection when setting the coordinates, or an object containing the properties `top` and `left`, or undefined if the collection is empty.

## Differences to jQuery

None.