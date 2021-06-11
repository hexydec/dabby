# .extend()

Extend one or more objects/arrays into the first object. Can perform either a shallow or deep copy.

## Usage

```javascript
$.extend(target, obj1[, ...objN]); // shallow copy
$.extend(deep, target, obj1[, ...objN]); // deep copy
$.extend(target, obj1[, ...objN]); // shallow copy
$.extend(deep, target, obj1[, ...objN]); // deep copy
$.extend(obj); // copy into the dabby prototype
```

#### deep

If the first parameter is set to `true`, a deep merge will be performed.

#### target

The object/array the other arguments will be merged into. To merge into a new object, pass an empty object as the first argument.

#### ...objs

One or more objects/arrays to merge recursively into `target`.

## Returns

`target` updated with the properties from the other arguments copied onto the object/array.

## Example

Shallow merge some objects:

```javascript
const obj1 = {foo: "bar", bar: "foo"},
	obj2 = {foo: "foo", foobar: "foo"},
	obj3 = {bar: "bar", foobar: "foobar"};

// merge obj2 and obj3 into obj1
$.extend(obj1, obj2, obj3);
console.log(obj1); // {foo: "foo", bar: "bar", foobar: "foobar"}
```

Deep merge some objects:

```javascript
const obj1 = {foo: "bar", bar: "foo", foobar: {foo: "bar"}},
	obj2 = {foo: "foo", foobar: {bar: "foo"}, foobar: "foo"},
	obj3 = {bar: "bar", foobar: {foo: "foo", foobar: "foo"}};

// merge obj2 and obj3 into obj1
$.extend(true, obj1, obj2, obj3);
console.log(obj1); // {foo: "foo", bar: "bar", foobar: {bar: "foo", foo: "foo", foobar: "foo"}}
```

Deep merge some objects into a new object:

```javascript
const obj1 = {foo: "bar", bar: "foo", foobar: {foo: "bar"}},
	obj2 = {foo: "foo", foobar: {bar: "foo"}, foobar: "foo"},
	obj3 = {bar: "bar", foobar: {foo: "foo", foobar: "foo"}};

// merge obj2 and obj3 into obj1
const newobj = $.extend(true, {}, obj1, obj2, obj3);
console.log(newobj); // {foo: "foo", bar: "bar", foobar: {bar: "foo", foo: "foo", foobar: "foo"}}
```

## Notes

Because properties are copied into the first object, even though the method returns the final object, the `target` object will be updated. To copy everything into a new object, pass an empty object as the first argument and save the output via the return.

Whilst the first object can be of any type, any objects to be merged must be only plain objects or arrays, otherwise the entire object or value will be copied over the respective key, it will not be merged.

Any `__proto__` property from the objects being merged will not be copied to prevent pollution of the base object's prototype.

## Differences to jQuery

None
