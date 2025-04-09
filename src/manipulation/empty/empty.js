import {Dabby} from "../../core/dabby/dabby.js";

/**
 * Empty the contents of each item in the collection
 * 
 * @memberof Dabby#
 * @function empty
 * @returns {Dabby} The input Dabby collection
 */
const empty = function () {
	let i = this.length;
	while (i--) {
		while (this[i].firstChild) {
			this[i].removeChild(this[i].firstChild);
		}
	}
	return this;
};
Object.defineProperty(Dabby.prototype, "empty", {value: empty});
