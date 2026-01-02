# $.isPlainObject()

Tests a value to see if it is a plain object, that was defined with {} and has a prototype of Object.

## Usage

```javascript
$.isPlainObject(obj);
```

### obj

The value to be tested.

## Returns

A boolean indicating whether the input value is a plain object.

## Examples

### Basic Usage

```javascript
// Plain object - returns true
const myObject = {};
console.log($.isPlainObject(myObject)); // true

// Object literal - returns true
console.log($.isPlainObject({ foo: "bar" })); // true

// Array - returns false
const myArray = [];
console.log($.isPlainObject(myArray)); // false

// Date - returns false
const myDate = new Date();
console.log($.isPlainObject(myDate)); // false

// Null - returns false
console.log($.isPlainObject(null)); // false

// Undefined - returns false
console.log($.isPlainObject(undefined)); // false
```

### Real-World Examples

```javascript
// Validate configuration object
function configure(options) {
    if (!$.isPlainObject(options)) {
        throw new Error("Options must be a plain object");
    }

    // Process options
}

// Safe deep merge
function deepMerge(target, source) {
    for (const key in source) {
        if ($.isPlainObject(source[key])) {
            if (!target[key]) {
                target[key] = {};
            }
            deepMerge(target[key], source[key]);
        } else {
            target[key] = source[key];
        }
    }

    return target;
}

// Type checking before processing
function processData(data) {
    if ($.isPlainObject(data)) {
        // Handle object
        Object.keys(data).forEach(function (key) {
            console.log(key, data[key]);
        });
    } else if (Array.isArray(data)) {
        // Handle array
        data.forEach(function (item) {
            console.log(item);
        });
    }
}

// Validate API response
function handleResponse(response) {
    if (!$.isPlainObject(response)) {
        console.error("Invalid response format");
        return;
    }

    if (response.success) {
        // Process successful response
    }
}

// Serialise only plain objects
function serialise(value) {
    if ($.isPlainObject(value)) {
        return JSON.stringify(value);
    }

    return String(value);
}

// Form data validation
function validateFormData(data) {
    const errors = [];

    if (!$.isPlainObject(data)) {
        errors.push("Form data must be an object");
        return errors;
    }

    // Validate fields
    if (!data.name) {
        errors.push("Name is required");
    }

    return errors;
}

// Safe property access
function getProperty(obj, path) {
    if (!$.isPlainObject(obj)) {
        return undefined;
    }

    const keys = path.split(".");
    let current = obj;

    for (const key of keys) {
        if (!$.isPlainObject(current) || !(key in current)) {
            return undefined;
        }
        current = current[key];
    }

    return current;
}

// Filter plain objects from array
const mixed = [
    { name: "John" },
    [1, 2, 3],
    new Date(),
    { age: 30 },
    "string"
];

const plainObjects = mixed.filter($.isPlainObject);
console.log(plainObjects); // [{name: "John"}, {age: 30}]

// Type guard for settings
function applySettings(settings) {
    if (!$.isPlainObject(settings)) {
        console.warn("Invalid settings provided, using defaults");
        settings = {};
    }

    const defaults = { theme: "light", lang: "en" };
    return $.extend({}, defaults, settings);
}

// Validate nested structure
function validateConfig(config) {
    if (!$.isPlainObject(config)) {
        return false;
    }

    if (config.api && !$.isPlainObject(config.api)) {
        return false;
    }

    if (config.ui && !$.isPlainObject(config.ui)) {
        return false;
    }

    return true;
}

// Cache only plain objects
const cache = {};

function cacheData(key, value) {
    if ($.isPlainObject(value)) {
        cache[key] = value;
        return true;
    }

    console.warn("Only plain objects can be cached");
    return false;
}

// Recursive object processor
function processObject(obj) {
    if (!$.isPlainObject(obj)) {
        return obj;
    }

    const processed = {};

    Object.keys(obj).forEach(function (key) {
        if ($.isPlainObject(obj[key])) {
            processed[key] = processObject(obj[key]);
        } else {
            processed[key] = obj[key];
        }
    });

    return processed;
}

// Distinguish between different types
function determineType(value) {
    if (value === null) {
        return "null";
    }

    if (Array.isArray(value)) {
        return "array";
    }

    if ($.isPlainObject(value)) {
        return "object";
    }

    if (value instanceof Date) {
        return "date";
    }

    return typeof value;
}

// Safe clone check
function safeClone(obj) {
    if (!$.isPlainObject(obj)) {
        throw new Error("Can only clone plain objects");
    }

    return $.extend(true, {}, obj);
}

// Data transformation
function transform(data) {
    if (!$.isPlainObject(data)) {
        return { value: data };
    }

    return data;
}

// Validate middleware options
function createMiddleware(options) {
    if (options && !$.isPlainObject(options)) {
        throw new TypeError("Middleware options must be a plain object");
    }

    return function (req, res, next) {
        // Middleware logic
        next();
    };
}
```

## Differences to jQuery

None.
