import $, {Dabby} from "../../core/dabby/dabby.js";

/**
 * Retrieve the first item in the collection
 * 
 * @memberof Dabby#
 * @function first
 * @returns {Dabby} A new Dabby collection containing the first item in the collection, or an empty collection if the original collection is empty
 */
const first = function () {
	return $(this[0]);
};
Object.defineProperty(Dabby.prototype, "first", {value: first});
