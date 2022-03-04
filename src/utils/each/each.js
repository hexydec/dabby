import $ from "../../core/dabby/dabby";
$.each = (obj, callback) => {
    const isArr = Array.isArray(obj) || obj.hasOwnProperty('length'), keys = isArr ? [...obj.keys()] : [...Object.keys(obj)], // only get keys if object
    len = keys.length;
    for (let i = 0; i < len; i++) {
        let key = keys[i]; // get index or key
        if (callback.call(obj[key], key, obj[key]) === false) {
            break; // stop if callback returns false
        }
    }
    return obj;
};
//# sourceMappingURL=each.js.map