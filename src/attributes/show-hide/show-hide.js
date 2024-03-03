import {Dabby} from "../../core/dabby/dabby.js";

// store for current values
const display = [],
	cache = [],
	defaults = [],
	values = ["none", "block"],

	/**
	 * Factory function to generate $.fn.show(), $.fn.hide() and $.fn.toggle()
	 * 
	 * @param {number} n Integer indicating which method flavour it is, 0 = hide, 1 = show, 2 = toggle
	 * @param {boolean} [show] Whether to show or hide the items in the collection, omit to set each item to the opposite of their current state
	 * @returns {Dabby} The original dabby collection
	 */
	factory = function (obj, n, show) {

		// for toggle they can set the show value
		if (n > 1 && show !== undefined) {
			n = parseInt(show);
		}

		// loop through each node
		let i = obj.length;
		while (i--) {
			let item = cache.indexOf(obj[i]),
				current = item > -1 && n < 2 ? null : getComputedStyle(obj[i]).display;

			// cache the initial value of the current
			if (item === -1) {
				item = cache.length;
				cache.push(obj[i]);
				display.push(current);
				defaults.push(obj[i].style.display);
			}

			// determine if we are going to show or hide
			let value = values[n] || (current === "none" ? "block" : "none");

			// if show update the block value to the initial if it was not "none"
			if (value !== "none" && display[item] !== "none") {
				value = display[item];
			}

			// update the value, use the default if setting back to initial
			obj[i].style.display = value === display[item] ? defaults[item] : value;
		}
		return obj;
	};

/**
 * Set the display property of each object in a collection to `none`
 * 
 * @returns {Dabby} The original dabby collection
 */
const hide = function () {
	return factory(this, 0);
};
Object.defineProperty(Dabby.prototype, "hide", {value: hide});

/**
 * Set the display property of each object in a collection to show the items
 * 
 * @returns {Dabby} The original dabby collection
 */
const show = function () {
	return factory(this, 1);
};
Object.defineProperty(Dabby.prototype, "show", {value: show});

/**
 * Toggle the display property of each item in a collection to show or hide the items
 * 
 * @param {boolean} [show] Whether to show or hide the items in the collection, omit to set each item to the opposite of their current state
 * @returns {Dabby} The original dabby collection
 */
const toggle = function (show) {
	return factory(this, 2, show);
};
Object.defineProperty(Dabby.prototype, "toggle", {value: toggle});