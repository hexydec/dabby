import $ from "../../core/dabby/dabby.js";
import getProp from "../../internal/getprop/getprop.js";

Object.defineProperty($.fn, "removeProp", {

	/**
	 * Removes the selected property from all objects in a collection
	 * 
	 * @memberof Dabby#
	 * @function removeProp
	 * @param {string|object} prop The name of the property to remove
	 * @returns {Dabby} The original dabby collection
	 */
	value: function (prop) {
		let i = this.length;
		prop = getProp(prop);

		while (i--) {
			delete this[i][prop];
		}
		return this;
	}
});