import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";

export default (obj, val, current) => {
	let i = obj.length,
		values = [],
		funcVal = $.isFunction(val),
		funcCurrent = $.isFunction(current);
	while (i--) {
		values[i] = funcVal ? val.call(obj[i], i, funcCurrent ? current(obj[i]) : current) : val;
	}
	return values;
}
