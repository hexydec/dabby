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
 * @param {selector} html A selector, HTML string, Node, array of Nodes, Dabby collection or a callback function
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