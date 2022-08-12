import $ from '../../core/core.js';

type EachObject = {
    length: number;
};

$.each = (obj: ArrayLike<EachObject>, callback: Function) => {
    const isArr = Array.isArray(obj) || obj.length !== undefined,
        keys = isArr ? 0 : Object.keys(obj), // only get keys if object
        len = isArr ? obj.length : keys;

    if (keys) {
        for (let i = 0, key; i < len; i++) {
            key = isArr ? i : keys[i]; // get index or key
            if (
                callback.call(obj[key as number], key, obj[key as number]) ===
                false
            ) {
                break; // stop if callback returns false
            }
        }
    }
    return obj;
};
