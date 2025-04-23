# .clone()

Clones the items in the collection, and return a new collection.

## Usage

```javascript
const cloned = $(selector).clone();
const clonedWithData = $(selector).clone(withDataAndEvents);
const clonedDeep = $(selector).clone(withDataAndEvents, deepWithDataAndEvents);
```

### withDataAndEvents

A boolean indicating whether to clone the data and events attached to the items in the collection

### deepWithDataAndEvents

A boolean indicating whether the data and events on the children of cloned elements shold be copied, defaults to the same value as withDataAndEvents

## Returns

A new Dabby collection containing the cloned nodes.

## Differences to jQuery

None.