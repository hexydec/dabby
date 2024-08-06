import $, {Dabby} from "../../core/dabby/dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import isObj from "../../internal/isobj/isobj.js";


/**
 * Extend one or more objects/arrays into the first object. Can perform either a shallow or deep copy.
 * 
 * @type {{
 * 	(target:object, arr1:object, ...arrs:object) => object;
 * 	(deep:true, target:object, arr1:object, ...arrs:object) => object;
 * 	(target:object) => object
 * }}
 * @param {true} deep A boolean indicating that the merge should be deep
 * @param {(Dabby|Object)} target The object to merge other objects into
 * @param {(Dabby|Object)} arr1 An object to merge into target
 * @param {(Dabby|Object)} ...arrs Any other objects to merge in order into the target object
 * @returns {Object} The target object, with the requested objects merged in
 */
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

Object.defineProperty($, "extend", {
	value: extend
});