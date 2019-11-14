import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";
import "../../utils/isplainobject/isplainobject.js";

export default (obj, val, current) => {
	let i = obj.length,
		values = [];
	if (i) {
		const funcVal = $.isFunction(val),
			objVal = funcVal ? 0 : $.isPlainObject(val),
			funcCurrent = $.isFunction(current);
		while (i--) {
			values[i] = funcVal ? val.call(obj[i], i, funcCurrent ? current(obj[i]) : current) : (objVal ? Object.create(val) : val);
		}
	}
	return values;
}
