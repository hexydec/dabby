import $, {Dabby} from "../../core/dabby/dabby.js";

/**
 * Create a new collection containing only the index requested
 * 
 * @memberof Dabby#
 * @function eq
* @param {number} i The index to select, a minus number will select backwards
 * @returns {Dabby} A new Dabby collection containing the node matched via the supplied index, if the requested index does not exist, an empty collection will be returned
 */
const eq = function (i) {
	if (i < 0) {
		i += this.length;
	}
	return this[i] ? $(this[i]) : $();
};
Object.defineProperty(Dabby.prototype, "eq", {value: eq});
