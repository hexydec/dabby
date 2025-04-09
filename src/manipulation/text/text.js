import {Dabby} from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";

/**
 * Retrieves the text from all items in the collection, or sets the textContent on each item in the collection
 * 
 * @memberof Dabby#
 * @function text
 * @type {{
 * 	(text:string|function) => Dabby;
* 	() => string;
* }}
 * @param {(string|function)} text A string of text, or undefined to retrieve
 * @returns {Dabby} The original Dabby collection
 */
const text = function (text) {
	let i = this.length,
		output = [];

	// set
	if (text !== undefined) {
		const values = getVal(this, text, obj => obj.textContent);
		while (i--) {
			this[i].textContent = values[i];
		}
		return this;
	}

	// get
	while (i--) {
		output[i] = this[i].textContent;
	}
	return output.join(" ");
};

Object.defineProperty(Dabby.prototype, "text", {value: text});