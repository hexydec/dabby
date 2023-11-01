import {Dabby} from "../../core/dabby/dabby.js";

/**
 * See whether any elements in a collection have the requested class
 * 
 * @memberof Dabby#
 * @function hasClass
 * @param {string} cls The class name to check
 * @returns {boolean} Whether any element in the collection has the requested class
 */
const hasClass = function (cls) {
	let i = this.length;
	while (i--) {
		if (this[i].classList.contains(cls)) {
			return true;
		}
	}
	return false;
};

Object.defineProperty(Dabby.prototype, "hasClass", {value: hasClass});
