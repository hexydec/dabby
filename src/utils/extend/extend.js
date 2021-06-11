import $ from "../../core/core.js";
import "../isplainobject/isplainobject.js";
import isObj from "../../internal/isobj/isobj.js";

$.extend = $.prototype.extend = (...arrs) => {

	// deep copy
	if (arrs[0] === true) {

		// check base is object
		if (!isObj(arrs[1])) {
			arrs[1] = {};
		}

		// merge items in second object into first
		if (isObj(arrs[2])) {
			for (const prop in arrs[2]) {

				// only allow own properties and don't merge prototypes
				if (prop !== "__proto__" && arrs[1][prop] !== arrs[2][prop]) {
					const isArr = Array.isArray(arrs[2][prop]);
					if (isArr || $.isPlainObject(arrs[2][prop])) { // only deep merge plain objects and arrays
						arrs[1][prop] = $.extend(
							true,
							Array.isArray(arrs[1][prop]) === isArr ? arrs[1][prop] : (isArr ? [] : {}), // if types do not match, make an empty object
							arrs[2][prop]
						);
					} else {
						arrs[1][prop] = arrs[2][prop];
					}
				}
			}
		}

		// merge the next object
		if (isObj(arrs[3])) {
			return $.extend(true, arrs[1], ...arrs.slice(3));
		}
		return arrs[1];
	}

	// copy into dabby object
	if (arrs[2] === undefined) {
		arrs[2] = arrs[1];
		arrs[1] = this;
	}
	return Object.assign.apply(null, arrs);
};
