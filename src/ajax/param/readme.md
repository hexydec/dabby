# $.param(obj)

Serialise a plain object into a URL-encoded query string. Nested objects and arrays are encoded with bracket notation, function values are evaluated and their return value encoded, and `null` becomes an empty string.

## Signatures

```ts
param(obj: { [key: string]: string | number | boolean | null | ParamValue[] | { [key: string]: ParamValue } | (() => ParamValue) }): string;
```

## Parameters

- `obj` (`object`) — values to serialise. May contain strings, numbers, booleans, `null`, nested objects, arrays, or functions that return any of the above.

## Returns

A URL-encoded query string with no leading `?`.

## Examples

```ts
import $ from "dabbyjs";
import "dabbyjs/ajax/param/param";

// Flat object
$.param({ q: "hello world", page: 2 });
// => "q=hello%20world&page=2"
```

```ts
// Nested object — bracket notation
$.param({
    user: {
        name: "Ada Lovelace",
        roles: ["admin", "editor"]
    }
});
// => "user%5Bname%5D=Ada%20Lovelace&user%5Broles%5D%5B%5D=admin&user%5Broles%5D%5B%5D=editor"
```

```ts
// Building a search URL
const filters = { category: "books", price_max: 25, in_stock: true };
location.href = `/search?${$.param(filters)}`;
```

```ts
// Function values are called at serialisation time
$.param({
    timestamp: () => Date.now(),
    user: "ada"
});
// => "timestamp=1700000000000&user=ada"
```

## Differences to jQuery

jQuery's second `traditional` argument (and the global `jQuery.ajaxSettings.traditional`) is not supported — Dabby always uses the modern bracket-notation encoding.

## See also

- [$.ajax()](../ajax/readme.md)
- [.serialize()](../serialize/readme.md)
- [$.get() / $.post()](../getpost/readme.md)
