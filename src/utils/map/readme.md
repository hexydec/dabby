# $.map()

Iterates over each item in an array or object, and runs a callback function. The results are returned as an array. Note that if an array is returned from the callback function, it will be flattened into the resulting array.

## Usage

```javascript
$.map(array, callback);
$.map(object, callback);
```

### array

An array to apply the callback to each item of.

### object

An object to apply the callback to each property of.

### callback

A function to execute for each item. Should return the transformed value, or null/undefined to exclude it from the result.

## Returns

An array containing the result of each callback. If the result of a callback is an array, it will be flattened into the return array. If the result of a callback is `null` or `undefined`, it will not be returned in the array.

## Examples

### Basic Usage

```javascript
// Map array values
const numbers = [1, 2, 3, 4, 5];
const doubled = $.map(numbers, function (n) {
    return n * 2;
});
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter with map
const items = [42, "hello", ["my", "your"]];
const strings = $.map(items, function (item) {
    return typeof item === "string" ? item + " world" : null;
});
console.log(strings); // ["hello world"]

// Flatten arrays
const nested = [[1, 2], [3, 4], [5, 6]];
const flat = $.map(nested, function (arr) {
    return arr;
});
console.log(flat); // [1, 2, 3, 4, 5, 6]
```

### Real-World Examples

```javascript
// Transform array of objects
const users = [
    { id: 1, name: "John", active: true },
    { id: 2, name: "Jane", active: false },
    { id: 3, name: "Bob", active: true }
];

const activeUserNames = $.map(users, function (user) {
    return user.active ? user.name : null;
});
console.log(activeUserNames); // ["John", "Bob"]

// Extract properties
const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 29 },
    { id: 3, name: "Keyboard", price: 79 }
];

const prices = $.map(products, function (product) {
    return product.price;
});
console.log(prices); // [999, 29, 79]

// Map object values
const config = {
    apiUrl: "https://api.example.com",
    timeout: 5000,
    retries: 3
};

const values = $.map(config, function (value, key) {
    return `${key}: ${value}`;
});
console.log(values); // ["apiUrl: https://api.example.com", "timeout: 5000", "retries: 3"]

// Transform and filter
const data = [1, 2, 3, 4, 5, 6];
const evenDoubled = $.map(data, function (n) {
    return n % 2 === 0 ? n * 2 : null;
});
console.log(evenDoubled); // [4, 8, 12]

// Flatten nested structure
const categories = [
    { name: "Electronics", items: ["Phone", "Laptop"] },
    { name: "Books", items: ["Novel", "Guide"] },
    { name: "Clothing", items: ["Shirt", "Pants", "Shoes"] }
];

const allItems = $.map(categories, function (category) {
    return category.items;
});
console.log(allItems); // ["Phone", "Laptop", "Novel", "Guide", "Shirt", "Pants", "Shoes"]

// Build HTML options
const countries = [
    { code: "GB", name: "United Kingdom" },
    { code: "US", name: "United States" },
    { code: "FR", name: "France" }
];

const options = $.map(countries, function (country) {
    return `<option value="${country.code}">${country.name}</option>`;
});

// Parse and transform
const csvData = ["1,John,Developer", "2,Jane,Designer", "3,Bob,Manager"];
const parsed = $.map(csvData, function (row) {
    const parts = row.split(",");
    return {
        id: parts[0],
        name: parts[1],
        role: parts[2]
    };
});

// Map with index
const items = ["a", "b", "c"];
const indexed = $.map(items, function (item, index) {
    return `${index}: ${item}`;
});
console.log(indexed); // ["0: a", "1: b", "2: c"]

// Remove falsy values
const mixed = [0, 1, false, 2, "", 3, null, 4, undefined, 5];
const truthy = $.map(mixed, function (value) {
    return value || null;
});
console.log(truthy); // [1, 2, 3, 4, 5]

// Transform dates
const timestamps = [1609459200, 1612137600, 1614556800];
const dates = $.map(timestamps, function (ts) {
    return new Date(ts * 1000).toLocaleDateString();
});

// Build URL parameters
const params = {
    page: 1,
    limit: 20,
    sort: "name",
    filter: "active"
};

const queryParts = $.map(params, function (value, key) {
    return `${key}=${encodeURIComponent(value)}`;
});

const queryString = queryParts.join("&");

// Convert to different format
const oldFormat = [
    { firstName: "John", lastName: "Doe" },
    { firstName: "Jane", lastName: "Smith" }
];

const newFormat = $.map(oldFormat, function (person) {
    return { fullName: `${person.firstName} ${person.lastName}` };
});

// Extract unique values
const tags = ["javascript", "html", "css", "javascript", "html"];
const uniqueTags = $.map(tags, function (tag, index, array) {
    return array.indexOf(tag) === index ? tag : null;
});

// Parse JSON strings
const jsonStrings = ['{"name":"John"}', '{"name":"Jane"}', 'invalid'];
const objects = $.map(jsonStrings, function (str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
});

// Build menu items
const menuData = {
    home: "/",
    about: "/about",
    contact: "/contact"
};

const menuItems = $.map(menuData, function (url, label) {
    return {
        label: label.charAt(0).toUpperCase() + label.slice(1),
        url: url
    };
});

// Transform API response
const apiResponse = [
    { user_id: 1, user_name: "John" },
    { user_id: 2, user_name: "Jane" }
];

const transformed = $.map(apiResponse, function (item) {
    return {
        id: item.user_id,
        name: item.user_name
    };
});

// Split and flatten
const sentences = ["Hello world", "How are you", "Good bye"];
const words = $.map(sentences, function (sentence) {
    return sentence.split(" ");
});
console.log(words); // ["Hello", "world", "How", "are", "you", "Good", "bye"]

// Calculate derived values
const orders = [
    { items: 3, price: 50 },
    { items: 2, price: 30 },
    { items: 5, price: 100 }
];

const totals = $.map(orders, function (order) {
    return order.items * order.price;
});

// Validate and transform
const emails = ["john@example.com", "invalid-email", "jane@example.com"];
const validEmails = $.map(emails, function (email) {
    return email.includes("@") ? email.toLowerCase() : null;
});
```

## Differences to jQuery

None.
