# .scrollLeft() / .scrollTop()

Retrieves the left or top scroll position of the first element in the collection, or sets the scroll position on each item in the collection.

## Usage

```javascript
const left = $(selector).scrollLeft();
const top = $(selector).scrollTop();
$(selector).scrollLeft(scroll);
$(selector).scrollTop(scroll);
$(selector).scrollLeft(function (index, currentValue) {});
$(selector).scrollTop(function (index, currentValue) {});
```

### scroll

The scroll value to be set on each item in the input collection.

## Returns

The scroll position of the first item in the collection when retrieving, or the original Dabby collection when setting.



## Differences to jQuery

None.
