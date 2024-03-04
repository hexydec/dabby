import $, {Dabby} from "../../core/dabby/dabby.js";
import getProp from "../../internal/getprop/getprop.js";

Object.defineProperty(Dabby.prototype, "removeProp", {

	/**
	 * Removes the selected property from all objects in a collection
	 * 
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