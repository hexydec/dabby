import $, {Dabby} from "../../core/dabby/dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import "../../utils/each/each.js";
import getProp from "../../internal/getprop/getprop.js";
import getVal from "../../internal/getval/getval.js";

/**
 * Get the requested property on the first element in a collection or set properties on each item in a collection
 * 
 * @memberof Dabby#
 * @function prop
 * @type {{
 * 	(prop:string) => String|undefined;
 * 	(prop:string, value:string|number) => Dabby;
 * 	(prop:object) => Dabby;
 * }}
 * @param {(string|Object)} prop The name of the property to retrieve or set, or a plain object specifying keys/values to set
 * @param {(string|number)=} [value] The value to set the property to if `prop` is a string, `undefined` to retrieve the requested `prop`
 * @returns {(Dabby|string|undefined)} The original dabby collection if setting values, or the value of the requested property
 */
const prop = function (prop, value) {
	const isObj = isPlainObject(prop);

	// set
	if (value !== undefined || isObj) {

		// only work if there are nodes to work on
		if (this[0]) {

			// normalise values
			if (!isObj) {
				const tmp = {};
				tmp[prop] = value;
				prop = tmp;
			}

			// set properties
			$.each(prop, (key, val) => {
				key = getProp(key);
				val = getVal(this, val, obj => obj[key]);
				let i = this.length;
				while (i--) {
					this[i][key] = val[i];
				}
			});
		}
		return this;
	}

	// get
	if (this[0]) {
		return this[0][getProp(prop)];
	}
};

Object.defineProperty(Dabby.prototype, "prop", {value: prop});