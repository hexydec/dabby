import $, {Dabby} from "../../core/dabby/dabby.js";
import getVal from "../../internal/getval/getval.js";
import isWindow from "../../internal/iswindow/iswindow.js";

/**
 * Factory function
 * 
 * @type {{
 * 	(obj:Dabby, dim:string, n:number) => number|undefined;
 * 	(obj:Dabby, dim:string, n:number, val:number|string|dimCallback) => Dabby;
 * }}
 * @param {Dabby} obj The Dabby object to set or retrieve the specified dimension
 * @param {string} dim The name of the dimension to retrieve
 * @param {number} n An integer representing which function the factory is performing
 * @param {number|string} [val] An integer or string specifying the desired dimensions of the items in the collection. As a string the value should be numeric with a unit as a suffix such as px, pt, cm, or % (Any unit suppported by the browser)
 * @returns {Dabby|number|undefined} An integer or float containing the requested dimension as a pixel unit, or if setting the dimension, the input Dabby collection will be returned
 */
const factory = (obj, dim, n, val) => {
	const width = n < 3,
		wh = width ? "width" : "height", // width or height
		whu = width ? "Width" : "Height", // with uppercase letter
		inner = n % 3 === 1,
		outer = n % 3 === 2,
		io = inner || outer,
		pos = width ? ["Left", "Right"] : ["Top", "Bottom"];

	// set value
	if (val !== undefined && typeof val !== "boolean") {
		let values = getVal(obj, val, obj => $(obj)[dim]()),
			i = obj.length,
			props = [],
			style;
		while (i--) {

			// add additional lengths
			if (io) {

				// fetch current style and build properties
				pos.forEach(item => {
					props.push("padding" + item);
					if (outer) {
						props.push("border" + item + "Width");
					}
				});

				// set width to convert to a px value
				if (isNaN(values[i]) && !values[i].includes("px")) {
					obj[i].style[wh] = values[i];
					props.push(wh);
					values[i] = 0; // reset to 0
				}

				// add values
				style = getComputedStyle(obj[i]);
				props.forEach(val => values[i] -= parseFloat(style[val]));
			}
			obj[i].style[wh] = values[i] + (isNaN(values[i]) ? "" : "px");
		}
		return obj;
	}

	// get value
	if (obj[0]) {

		// document
		if (obj[0].nodeType === 9) { // Node.DOCUMENT_NODE (document)
			return obj[0].documentElement["scroll" + whu];
		}

		// element
		if (!isWindow(obj[0])) {
			let value = obj[0][(outer ? "offset" : "client") + whu];

			// add padding on, or if outer and margins requested, add margins on
			if (!io || (outer && val === true)) {
				const style = getComputedStyle(obj[0]);
				pos.forEach(item => value += parseFloat(style[(io ? "margin" : "padding") + item]) * (io ? 1 : -1));
			}
			return value;
		}

		// window
		if (inner) {
			return obj[0].document.documentElement["client" + whu];
		}

		return obj[0]["inner" + whu];
	}
};

/**
 * Retrieve the width of the first element in a matched collection or set the width of every element in a collection
 * 
 * @type {{
 * 	() => number|undefined;
 * 	(val:number|string|dimCallback) => Dabby;
 * }}
 * @param {number|string|dimCallback} [val] An integer or string specifying the desired dimensions of the items in the collection. As a string the value should be numeric with a unit as a suffix such as px, pt, cm, or % (Any unit suppported by the browser)
 * @returns {number|Dabby|undefined} An integer or float containing the requested dimension as a pixel unit, or if setting the dimension, the input Dabby collection will be returned
 */
const width = function (val) {
	return factory(this, "width", 0, val);
};
Object.defineProperty(Dabby.prototype, "width", {value: width});

/**
 * Retrieve the inner width of the first element in a matched collection or set the inner width of every element in a collection
 * 
 * @type {{
 * 	() => number|undefined;
 * 	(val:number|string|dimCallback) => Dabby;
 * }}
 * @param {number|string|dimCallback} val An integer or string specifying the desired dimensions of the items in the collection. As a string the value should be numeric with a unit as a suffix such as px, pt, cm, or % (Any unit suppported by the browser)
 * @returns {number|Dabby|undefined} An integer or float containing the requested dimension as a pixel unit, or if setting the dimension, the input Dabby collection will be returned
 */
const innerWidth = function (val) {
	return factory(this, "innerWidth", 1, val);
};
Object.defineProperty(Dabby.prototype, "innerWidth", {value: innerWidth});

/**
 * Retrieve the outer width of the first element in a matched collection or set the outer width of every element in a collection
 * 
 * @type {{
 * 	() => number|undefined;
 * 	(val:number|string|bool|dimCallback) => Dabby;
 * }}
 * @param {number|string|bool|dimCallback} val An integer or string specifying the desired dimensions of the items in the collection. As a string the value should be numeric with a unit as a suffix such as px, pt, cm, or % (Any unit suppported by the browser)
 * @returns {number|Dabby|undefined} An integer or float containing the requested dimension as a pixel unit, or if setting the dimension, the input Dabby collection will be returned
 */
const outerWidth = function (val) {
	return factory(this, "outerWidth", 2, val);
};
Object.defineProperty(Dabby.prototype, "outerWidth", {value: outerWidth});

/**
 * Retrieve the height of the first element in a matched collection or set the height of every element in a collection
 * 
 * @type {{
 * 	() => number|undefined;
 * 	(val:number|string|dimCallback) => Dabby;
 * }}
 * @param {number|string|dimCallback} val An integer or string specifying the desired dimensions of the items in the collection. As a string the value should be numeric with a unit as a suffix such as px, pt, cm, or % (Any unit suppported by the browser)
 * @returns {number|Dabby|undefined} An integer or float containing the requested dimension as a pixel unit, or if setting the dimension, the input Dabby collection will be returned
 */
const height = function (val) {
	return factory(this, "height", 3, val);
};
Object.defineProperty(Dabby.prototype, "height", {value: height});

/**
 * Retrieve the inner height of the first element in a matched collection or set the inner height of every element in a collection
 * 
 * @type {{
 * 	() => number|undefined;
 * 	(val:number|string|dimCallback) => Dabby;
 * }}
 * @param {number|string|dimCallback} val An integer or string specifying the desired dimensions of the items in the collection. As a string the value should be numeric with a unit as a suffix such as px, pt, cm, or % (Any unit suppported by the browser)
 * @returns {number|Dabby|undefined} An integer or float containing the requested dimension as a pixel unit, or if setting the dimension, the input Dabby collection will be returned
 */
const innerHeight = function (val) {
	return factory(this, "innerHeight", 4, val);
};
Object.defineProperty(Dabby.prototype, "innerHeight", {value: innerHeight});

/**
 * Retrieve the outer height of the first element in a matched collection or set the outer height of every element in a collection
 * 
 * @type {{
 * 	() => number|undefined;
 * 	(val:number|string|dimCallback) => Dabby;
 * }}
 * @param {number|string|dimCallback} val An integer or string specifying the desired dimensions of the items in the collection. As a string the value should be numeric with a unit as a suffix such as px, pt, cm, or % (Any unit suppported by the browser)
 * @returns {number|Dabby|undefined} An integer or float containing the requested dimension as a pixel unit, or if setting the dimension, the input Dabby collection will be returned
 */
const outerHeight = function (val) {
	return factory(this, "outerHeight", 5, val);
};
Object.defineProperty(Dabby.prototype, "outerHeight", {value: outerHeight});