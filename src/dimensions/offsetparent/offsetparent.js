import $, {Dabby} from "../../core/dabby/dabby.js";

/**
 * Retrieves the offset parent of the first item in a collection
 * 
 * @memberof Dabby#
 * @function offsetParent
 * @returns {Dabby} A new Dabby collection containing the parent object of the first item in the input collection, or an empty collection if the original collection was empty
 */
const offsetParent = function () {
	return this[0] ? $(this[0].offsetParent) : $();
}

Object.defineProperty(Dabby.prototype, "offsetParent", {value: offsetParent});
