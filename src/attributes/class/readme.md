# .addClass(), .removeClass(), .toggleClass()

Add, remove, or toggle a class or classes to every item in a collection.

## Usage

```javascript
$(selector).addClass(className);
$(selector).addClass(classArray);
$(selector).addClass(function (index, currentClassName));
$(selector).removeClass(className);
$(selector).removeClass(classArray);
$(selector).removeClass(function (index, currentClassName));
$(selector).toggleClass(className);
$(selector).toggleClass(classArray);
$(selector).toggleClass(function (index, currentClassName));
```

#### className

A string of space separated class names.

#### classArray

An array of class names.

#### function (index, currentClassName)

A function that receives the index of the current item and the current class name(s) as a string, and returns either a space separated list of class names, or an array.

## Returns

The original collection.

## Example

```javascript
$(".hub__item").addCLass("hub__item--on");
$(".hub__item").addCLass("hub__item--on hub__item-purple");
$(".hub__item").addCLass(["hub__item--on", "hub__item-purple"]);
```

## Differences to jQuery

It supports everything jQuery supports, plus it can handle an array of class names.
