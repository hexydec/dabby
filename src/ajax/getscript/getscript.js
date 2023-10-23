import $ from "../../core/dabby/dabby.js";
import "../ajax/ajax.js";

Object.defineProperty($, "getScript", {

	/**
	 * Attach an external script to the document and process the contained Javascript
	 * @memberof Dabby
	 * @function getScript
	 * @param {(string|string[]|classCallback)} cls The class name, an array of class names, or a callback to generate the same
	 * @returns {Dabby} The original dabby collection
	 */
	value: (url, success) => $.ajax({
		url: url,
		dataType: "script",
		success: success
	})
});
