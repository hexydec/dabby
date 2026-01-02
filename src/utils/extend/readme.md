# $.extend()

Extend one or more objects/arrays into the first object. Can perform either a shallow or deep copy.

## Usage

```javascript
$.extend(target, obj1, ...objN); // shallow copy
$.extend(deep, target, obj1, ...objN); // deep copy
$.extend(obj); // copy into the Dabby prototype
```

### deep

If the first parameter is set to `true`, a deep merge will be performed.

### target

The object/array the other arguments will be merged into. To merge into a new object, pass an empty object as the first argument.

### ...objs

One or more objects/arrays to merge recursively into `target`.

## Returns

`target` updated with the properties from the other arguments copied onto the object/array.

## Examples

### Basic Usage

```javascript
// Shallow merge
const obj1 = { foo: "bar", bar: "foo" };
const obj2 = { foo: "foo", foobar: "foo" };
const obj3 = { bar: "bar", foobar: "foobar" };

$.extend(obj1, obj2, obj3);
console.log(obj1); // {foo: "foo", bar: "bar", foobar: "foobar"}

// Deep merge
const deep1 = { foo: "bar", nested: { a: 1 } };
const deep2 = { nested: { b: 2 } };

$.extend(true, deep1, deep2);
console.log(deep1); // {foo: "bar", nested: {a: 1, b: 2}}

// Merge into new object
const newObj = $.extend({}, obj1, obj2);
```

### Real-World Examples

```javascript
// Configuration merging
const defaults = {
    width: 300,
    height: 200,
    animate: true,
    duration: 500
};

const userOptions = {
    width: 400,
    animate: false
};

const config = $.extend({}, defaults, userOptions);
console.log(config);
// {width: 400, height: 200, animate: false, duration: 500}

// Deep configuration merge
const defaultConfig = {
    api: {
        baseUrl: "https://api.example.com",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json"
        }
    },
    cache: true
};

const customConfig = {
    api: {
        timeout: 10000,
        headers: {
            "Authorization": "Bearer token"
        }
    }
};

const finalConfig = $.extend(true, {}, defaultConfig, customConfig);
console.log(finalConfig);
// {
//     api: {
//         baseUrl: "https://api.example.com",
//         timeout: 10000,
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer token"
//         }
//     },
//     cache: true
// }

// Widget initialisation
function createWidget(options) {
    const defaults = {
        container: "body",
        theme: "light",
        callbacks: {
            onInit: function () {},
            onDestroy: function () {}
        }
    };

    const settings = $.extend(true, {}, defaults, options);
    return settings;
}

const widget = createWidget({
    theme: "dark",
    callbacks: {
        onInit: function () {
            console.log("Widget initialised");
        }
    }
});

// Merge form data
const formDefaults = {
    method: "POST",
    contentType: "application/json",
    processData: true
};

const formData = {
    url: "/submit",
    data: { name: "John" }
};

const request = $.extend({}, formDefaults, formData);

// Plugin settings
$.fn.myPlugin = function (options) {
    const defaults = {
        speed: "normal",
        easing: "swing",
        complete: null
    };

    const settings = $.extend({}, defaults, options);

    return this.each(function () {
        // Use settings
    });
};

// Combine data sources
const apiData = {
    users: [],
    posts: []
};

const localData = {
    drafts: [],
    favorites: []
};

const appData = $.extend({}, apiData, localData);

// Settings inheritance
const baseSettings = {
    color: "blue",
    size: "medium",
    enabled: true
};

const componentSettings = $.extend({}, baseSettings, {
    color: "red",
    label: "Custom Component"
});

// Deep array merge
const list1 = {
    items: [1, 2, 3],
    metadata: {
        count: 3
    }
};

const list2 = {
    items: [4, 5, 6],
    metadata: {
        source: "api"
    }
};

const merged = $.extend(true, {}, list1, list2);

// Validation rules merge
const defaultRules = {
    username: {
        required: true,
        minLength: 3
    },
    email: {
        required: true,
        pattern: /^.+@.+\..+$/
    }
};

const customRules = {
    username: {
        maxLength: 20
    },
    password: {
        required: true,
        minLength: 8
    }
};

const allRules = $.extend(true, {}, defaultRules, customRules);

// Theme customisation
const baseTheme = {
    colours: {
        primary: "#007bff",
        secondary: "#6c757d",
        success: "#28a745"
    },
    fonts: {
        body: "Arial, sans-serif",
        heading: "Georgia, serif"
    }
};

const customTheme = {
    colours: {
        primary: "#ff5722"
    }
};

const theme = $.extend(true, {}, baseTheme, customTheme);

// State management
const initialState = {
    user: {
        isAuthenticated: false,
        profile: null
    },
    ui: {
        sidebarOpen: false,
        theme: "light"
    }
};

function updateState(updates) {
    return $.extend(true, {}, initialState, updates);
}

const newState = updateState({
    user: {
        isAuthenticated: true,
        profile: { name: "John" }
    }
});

// Locale merging
const enTranslations = {
    common: {
        save: "Save",
        cancel: "Cancel"
    },
    errors: {
        required: "This field is required"
    }
};

const customTranslations = {
    common: {
        save: "Save Changes"
    },
    errors: {
        email: "Invalid email address"
    }
};

const translations = $.extend(true, {}, enTranslations, customTranslations);

// Feature flags
const defaultFlags = {
    features: {
        newUI: false,
        beta: false,
        experimental: {
            ai: false,
            realtime: false
        }
    }
};

const userFlags = {
    features: {
        newUI: true,
        experimental: {
            ai: true
        }
    }
};

const flags = $.extend(true, {}, defaultFlags, userFlags);

// AJAX defaults override
$.extend($.ajaxSettings, {
    timeout: 10000,
    headers: {
        "X-Custom-Header": "value"
    }
});

// Extend Dabby prototype
$.extend($.fn, {
    customMethod: function () {
        return this.each(function () {
            // Custom functionality
        });
    }
});
```

## Notes

Because properties are copied into the first object, even though the method returns the final object, the `target` object will be updated. To copy everything into a new object, pass an empty object as the first argument and save the output via the return.

Whilst the first object can be of any type, any objects to be merged must be only plain objects or arrays, otherwise the entire object or value will be copied over the respective key, it will not be merged.

Any `__proto__` property from the objects being merged will not be copied to prevent pollution of the base object's prototype.

## Differences to jQuery

None.
