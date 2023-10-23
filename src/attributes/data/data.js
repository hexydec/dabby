import $ from "../../core/dabby/dabby.js";
import "../../utils/each/each.js";
import camelise from "../../internal/camelise/camelise.js";

Object.defineProperty($.fn, "data", {
	/**
	 * Get or set arbitrary data as properties of each node in a collection
	 * @memberof Dabby#
	 * @function data
	 * @param {string} name The name of the data attribute to get/set
	 * @param {(string|object)} [data] A string or Object containing the value to set, if `data` is an Object it will be converted to JSON before being stored
	 * @returns {(Dabby|string|Object)} The original dabby collection when setting, or the requested value when getting
	 */
	value: function (name, data) {

		// convert data to object
		if (typeof name === "object") {
			data = name;
		} else if (data !== undefined) {
			let temp = {};
			temp[name] = data;
			data = temp;
		}

		// set value
		if (data !== undefined) {
			let i = this.length;
			while (i--) {
				$.each(data, (key, value) => {
					this[i].dataset[camelise(key)] = typeof value === "object" ? JSON.stringify(value) : value;
				});
			}
			return this;
		}

		// get value
		if (this[0] && this[0].dataset) {
			let parse = value => {
				try {
					return JSON.parse(value);
				} catch (e) {
					return value;
				}
			}

			// all properties
			if (name === undefined) {
				let arr = {};
				$.each(this[0].dataset, (key, value) => {
					arr[key] = parse(value);
				});
				return arr;
			}

			// retrieve specific property
			name = camelise(name);
			if (this[0].dataset.hasOwnProperty(name)) {
				return parse(this[0].dataset[name]);
			}
		}
	}
});
