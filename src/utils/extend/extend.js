import $, {Dabby} from "../../core/dabby/dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import isObj from "../../internal/isobj/isobj.js";

const extend = function (target, arr1, ...arrs) {

	// deep copy
	if (target === true) {

		// check base is object
		if (!isObj(arr1)) {
			arr1 = {};
		}

		// merge items in second object into first
		if (isObj(arrs[0])) {
			for (const prop in arrs[0]) {

				// only allow own properties and don't merge prototypes
				if (prop !== "__proto__" && arr1[prop] !== arrs[0][prop]) {
					const isArr = Array.isArray(arrs[0][prop]);
					if (isArr || isPlainObject(arrs[0][prop])) { // only deep merge plain objects and arrays
						arr1[prop] = extend(
							true,
							Array.isArray(arr1[prop]) === isArr ? arr1[prop] : (isArr ? [] : {}), // if types do not match, make an empty object
							arrs[0][prop]
						);
					} else {
						arr1[prop] = arrs[0][prop];
					}
				}
			}
		}

		// merge the next object
		if (isObj(arrs[1])) {
			return extend(true, arr1, ...arrs.slice(1));
		}
		return arr1;
	}

	// copy into dabby object
	if (arr1 === undefined) {
		arr1 = target;
		target = this;
	}

	// merge arguments into array
	arrs.unshift(arr1);
	arrs.unshift(target);
	return Object.assign.apply(null, arrs);
};

// attach to prototype chain
Object.defineProperty($, "extend", {
	value: extend
});
Object.defineProperty(Dabby.prototype, "extend", {
	value: extend
});
