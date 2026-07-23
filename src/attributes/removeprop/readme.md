# $.fn.removeProp(name)

Delete a JavaScript property from every element in the collection.

This affects only the DOM node's property — it does not remove the matching
HTML attribute. For removing markup attributes use
[`attr(name, null)`](../attr/readme.md).

## Signatures

```ts
removeProp(prop: string): this;
```

## Parameters

- `prop` (`string`) — the property name to delete.

## Returns

The original Dabby collection for chaining.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/removeprop/removeprop";

// Strip a custom property set earlier
$("#widget").removeProp("dabbyState");
```

```ts
import $ from "dabbyjs";
import "dabbyjs/attributes/removeprop/removeprop";

// Remove an inline-bound handler reference
$("button").removeProp("onclick");
```

## See also

- [$.fn.prop()](../prop/readme.md)
- [$.fn.attr()](../attr/readme.md) — pass `null` to remove an attribute
