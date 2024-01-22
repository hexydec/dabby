import {Dabby} from "../../core/dabby/dabby.js";
import "../on/on.js";
import "../trigger/trigger.js";

/**
 * @typedef {import('../on/on.js').onCallback} onCallback
 */

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const focusin = function (selector, data, callback) {
	return data ? this.on("focusin", selector, data, callback) : this.trigger("focusin");
};

Object.defineProperty(Dabby.prototype, "focusin", {value: focusin});

/**
 * Handler for the focusout event
 * 
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const focusout = function (selector, data, callback) {
	return data ? this.on("focusout", selector, data, callback) : this.trigger("focusout");
};

Object.defineProperty(Dabby.prototype, "focusout", {value: focusout});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const focus = function (selector, data, callback) {
	return data ? this.on("focus", selector, data, callback) : this.trigger("focus");
};

Object.defineProperty(Dabby.prototype, "focus", {value: focus});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const blur = function (selector, data, callback) {
	return data ? this.on("blur", selector, data, callback) : this.trigger("blur");
};

Object.defineProperty(Dabby.prototype, "blur", {value: blur});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const resize = function (selector, data, callback) {
	return data ? this.on("resize", selector, data, callback) : this.trigger("resize");
};

Object.defineProperty(Dabby.prototype, "resize", {value: resize});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const scroll = function (selector, data, callback) {
	return data ? this.on("scroll", selector, data, callback) : this.trigger("scroll");
};

Object.defineProperty(Dabby.prototype, "scroll", {value: scroll});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const unload = function (selector, data, callback) {
	return data ? this.on("unload", selector, data, callback) : this.trigger("unload");
};

Object.defineProperty(Dabby.prototype, "unload", {value: unload});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const click = function (selector, data, callback) {
	return data ? this.on("click", selector, data, callback) : this.trigger("click");
};

Object.defineProperty(Dabby.prototype, "click", {value: click});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const dblclick = function (selector, data, callback) {
	return data ? this.on("dblclick", selector, data, callback) : this.trigger("dblclick");
};

Object.defineProperty(Dabby.prototype, "dblclick", {value: dblclick});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const mousedown = function (selector, data, callback) {
	return data ? this.on("mousedown", selector, data, callback) : this.trigger("mousedown");
};

Object.defineProperty(Dabby.prototype, "mousedown", {value: mousedown});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const mouseup = function (selector, data, callback) {
	return data ? this.on("mouseup", selector, data, callback) : this.trigger("mouseup");
};

Object.defineProperty(Dabby.prototype, "mouseup", {value: mouseup});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const mousemove = function (selector, data, callback) {
	return data ? this.on("mousemove", selector, data, callback) : this.trigger("mousemove");
};

Object.defineProperty(Dabby.prototype, "mousemove", {value: mousemove});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const mouseover = function (selector, data, callback) {
	return data ? this.on("mouseover", selector, data, callback) : this.trigger("mouseover");
};

Object.defineProperty(Dabby.prototype, "mouseover", {value: mouseover});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const mouseout = function (selector, data, callback) {
	return data ? this.on("mouseout", selector, data, callback) : this.trigger("mouseout");
};

Object.defineProperty(Dabby.prototype, "mouseout", {value: mouseout});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const mouseenter = function (selector, data, callback) {
	return data ? this.on("mouseenter", selector, data, callback) : this.trigger("mouseenter");
};

Object.defineProperty(Dabby.prototype, "mouseenter", {value: mouseenter});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const mouseleave = function (selector, data, callback) {
	return data ? this.on("mouseleave", selector, data, callback) : this.trigger("mouseleave");
};

Object.defineProperty(Dabby.prototype, "mouseleave", {value: mouseleave});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const contextmenu = function (selector, data, callback) {
	return data ? this.on("contextmenu", selector, data, callback) : this.trigger("contextmenu");
};

Object.defineProperty(Dabby.prototype, "contextmenu", {value: contextmenu});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const change = function (selector, data, callback) {
	return data ? this.on("change", selector, data, callback) : this.trigger("change");
};

Object.defineProperty(Dabby.prototype, "change", {value: change});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const select = function (selector, data, callback) {
	return data ? this.on("select", selector, data, callback) : this.trigger("select");
};

Object.defineProperty(Dabby.prototype, "select", {value: select});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const keydown = function (selector, data, callback) {
	return data ? this.on("keydown", selector, data, callback) : this.trigger("keydown");
};

Object.defineProperty(Dabby.prototype, "keydown", {value: keydown});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const keypress = function (selector, data, callback) {
	return data ? this.on("keypress", selector, data, callback) : this.trigger("keypress");
};

Object.defineProperty(Dabby.prototype, "keypress", {value: keypress});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const keyup = function (selector, data, callback) {
	return data ? this.on("keyup", selector, data, callback) : this.trigger("keyup");
};

Object.defineProperty(Dabby.prototype, "keyup", {value: keyup});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const error = function (selector, data, callback) {
	return data ? this.on("error", selector, data, callback) : this.trigger("error");
};

Object.defineProperty(Dabby.prototype, "error", {value: error});

/**
 * @type {{
 * 	(selector:string, data:object, callback:onCallback) => Dabby;
 * 	(data:object, callback:onCallback) => Dabby;
 * 	(selector:string, callback:onCallback) => Dabby;
 * 	(callback:onCallback) => Dabby;
 * }}
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const submit = function (selector, data, callback) {
	return data ? this.on("submit", selector, data, callback) : this.trigger("submit");
};

Object.defineProperty(Dabby.prototype, "submit", {value: submit});