import {Dabby} from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";

/**
 * Sets or retrieves the HTML within each item in the collection
 * 
 * @memberof Dabby#
 * @function html
 * @type {{
 * 	(html:selector) => Dabby;
 * 	() => string;
 * }}
 * @param {selector} html An HTML string, Node, array of Nodes or function that returns HTML
 * @param {(string|function)} html A string of HTML content, a function that returns HTML, or undefined to retrieve the HTML from the first item
 * @returns {(Dabby|string)} A string of HTML when retrieving, or the original Dabby collection when setting
 */
const html = function (html) {

	// set
	if (html !== undefined) {
		let i = this.length,
			values = getVal(this, html, obj => obj.innerHTML);
		while (i--) {
			this[i].innerHTML = values[i];
		}
		return this;
	}

	// get
	if (this[0]) {
		return this[0].innerHTML;
	}
};

Object.defineProperty(Dabby.prototype, "html", {value: html});