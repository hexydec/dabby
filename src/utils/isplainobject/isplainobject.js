import $ from "../../core/core.js";
import isObj from "../../internal/isobj/isobj.js";

$.isPlainObject = obj => {
	if (isObj(obj)) {
		const proto = Object.getPrototypeOf(obj);
		return proto === null || proto === Object.prototype;
	}
	return false;
};
