import $ from "../../core/dabby/dabby.js";
import "../../utils/each/each.js";
import camelise from "../../internal/camelise/camelise.js";

$.fn.data = function (name, data) {

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
};
