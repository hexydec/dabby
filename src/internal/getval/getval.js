import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";
import "../../utils/isplainobject/isplainobject.js";

/**
 * compiles values for each object passed to it
 *
 * @param {array|object} obj An array or interatable object from which to generate values
 * @param {mixed} val Can be a static primitive value, object, or function, objects will be cloned, functions will generate a value per item
 * @param {mixed} current The current value or a callback to retrieve the current value
 * @return {array} An array of values corresponding to each obj
 */
export default (obj, val, current) => {
	let i = obj.length,
		values = [];

	// only do something if there is something to do
	if (i) {

		// chek what types of data we are dealing with
		const funcVal = $.isFunction(val),
			objVal = funcVal ? 0 : $.isPlainObject(val),
			funcCurrent = $.isFunction(current);

		// generate calues
		while (i--) {

			// generate the value from a function
			if (funcVal) {
				values[i] = val.call(obj[i], i, funcCurrent ? current(obj[i]) : current);

			// clone if value is an object
			} else if (objVal) {
				values[i] = Object.create(val);

			// plain value
			} else {
				values[i] = val;
			}
		}
	}
	return values;
}
