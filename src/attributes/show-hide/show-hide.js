import {Dabby} from "../../core/dabby/dabby.js";

// store for current values
const display = [],
	obj = [],
	defaults = [],
	values = ["none", "block"],

	/**
	 * Factory function to generate $.fn.show(), $.fn.hide() and $.fn.toggle()
	 * 
	 * @param {number} n Integer indicating which method flavour it is, 0 = hide, 1 = show, 2 = toggle
	 * @param {boolean} [show] Whether to show or hide the items in the collection, omit to set each item to the opposite of their current state
	 * @returns {Dabby} The original dabby collection
	 */
	factory = function (n, show) {

		// for toggle they can set the show value
		if (n > 1 && show !== undefined) {
			n = parseInt(show);
		}

		// loop through each node
		let i = this.length;
		while (i--) {
			let item = obj.indexOf(this[i]),
				current = item > -1 && n < 2 ? null : getComputedStyle(this[i]).display;

			// cache the initial value of the current
			if (item === -1) {
				item = obj.length;
				obj.push(this[i]);
				display.push(current);
				defaults.push(this[i].style.display);
			}

			// determine if we are going to show or hide
			let value = values[n] || (current === "none" ? "block" : "none");

			// if show update the block value to the initial if it was not "none"
			if (value !== "none" && display[item] !== "none") {
				value = display[item];
			}

			// update the value, use the default if setting back to initial
			this[i].style.display = value === display[item] ? defaults[item] : value;
		}
		return this;
	};

/**
 * Set the display property of each object in a collection to `none`
 * 
 * @memberof Dabby#
 * @function hide
 * @returns {Dabby} The original dabby collection
 */
const hide = function () {
	return factory.apply(this, 0);
};

/**
 * Set the display property of each object in a collection to show the items
 * 
 * @memberof Dabby#
 * @function show
 * @returns {Dabby} The original dabby collection
 */
const show = function () {
	return factory.apply(this, 1);
};

/**
 * Toggle the display property of each item in a collection to show or hide the items
 * 
 * @memberof Dabby#
 * @function toggle
 * @param {boolean} [show] Whether to show or hide the items in the collection, omit to set each item to the opposite of their current state
 * @returns {Dabby} The original dabby collection
 */
const toggle = function (show) {
	return factory.apply(this, 2, show);
};

Object.defineProperty(Dabby.prototype, "hide", {value: hide});
Object.defineProperty(Dabby.prototype, "show", {value: show});
Object.defineProperty(Dabby.prototype, "toggle", {value: toggle});