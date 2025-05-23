import $, {Dabby} from "../../core/dabby/dabby.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import isPassive from "../../internal/ispassive/ispassive.js";
import "../../traversal/closest/closest.js";
import "../../core/get/get.js";
import "../../utils/each/each.js";

const factory = (obj, one, events, selector, data, callback) => {
	if (obj.length) {

		// sort out args
		if (typeof selector === "function") {
			callback = selector;
			selector = undefined;
		} else if (typeof data === "function") {
			callback = data;
			data = undefined;
		}

		// stadardise as plain object
		if (!isPlainObject(events)) {
			const evt = events;
			events = {};
			events[evt] = callback;
		}

		// attach event
		let i = obj.length;
		while (i--) {

			// record the original function
			if (!obj[i].events) {
				obj[i].events = [];
			}

			// loop through functions
			$.each(events, (evt, func) => {
				evt.split(" ").forEach(e => {

					// record event
					const event = {
						event: e,
						selector: selector,
						data: data,
						callback: func,
						func: evt => { // delegate function
							const target = selector ? $(evt.target).closest(selector).get() : [evt.currentTarget];
							if (target.length) {
								if (evt.data === undefined) {
									evt.data = data; // set data to event object
								} else {
									evt._data = data; // fallback as sometime the property is not writable
								}
								for (let n = 0, len = target.length; n < len; n++) {
									const args = Array.isArray(evt.detail) ? evt.detail : [];
									if (func.call(target[n], evt, ...args) === false) {
										evt.preventDefault();
										evt.stopPropagation();
									}
								}
							}
						},
						once: one
					};
					obj[i].events.push(event);

					// bind event
					obj[i].addEventListener(e, event.func, {once: one, capture: !!selector, passive: isPassive(e)});
				});
			});
		}
	}
	return obj;
};

/**
 * A callback to generate class names from a node
 * 
 * @callback onCallback
 * @param {Event} [event] The native DOM event
 * @param {...*} [args] Any arguments that were passed to $.fn.trigger()
 * @returns {void}
 */

/**
 * Bind event callbacks to DOM nodes
 * 
 * @type {{
 * 	(events:string, selector:string, data:object, callback:onCallback) => Dabby;
 * 	(events:string, data:object, callback:onCallback) => Dabby;
 * 	(events:string, selector:string, callback:onCallback) => Dabby;
 * 	(events:string, callback:onCallback) => Dabby;
 * 	(events:{string, onCallback}, selector:string, data:object) => Dabby;
 * 	(events:{string, onCallback}, selector:string) => Dabby;
 * 	(events:{string, onCallback}, data:object) => Dabby;
 * 	(events:{string, onCallback}) => Dabby;
 * }}
 * @param {string|object} events A string containing a space separated list of events to bind to, or a plain object where the key is a space separated list of events to bind to and the value is the event handler
 * @param {string} selector A string specifying a selector to delegate the event to
 * @param {object} data Data to be passed to the handler when the event is triggered
 * @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
 * @returns {Dabby} The original dabby collection
 */
const on = function (events, selector, data, callback) {
	return factory(this, false, events, selector, data, callback);
}
Object.defineProperty(Dabby.prototype, "on", {value: on});

/**
 * Bind event callbacks to DOM nodes that fire only once
 * 
 * @type {{
* 	(events:string, selector:string, data:object, callback:onCallback) => Dabby;
* 	(events:string, data:object, callback:onCallback) => Dabby;
* 	(events:string, selector:string, callback:onCallback) => Dabby;
* 	(events:string, callback:onCallback) => Dabby;
* 	(events:{string, onCallback}, selector:string, data:object) => Dabby;
* 	(events:{string, onCallback}, selector:string) => Dabby;
* 	(events:{string, onCallback}, data:object) => Dabby;
* 	(events:{string, onCallback}) => Dabby;
* }}
* @param {string|object} events A string containing a space separated list of events to bind to, or a plain object where the key is a space separated list of events to bind to and the value is the event handler
* @param {string} selector A string specifying a selector to delegate the event to
* @param {object} data Data to be passed to the handler when the event is triggered
* @param {onCallback} callback When `events` is a string, this is the callback function to be fired when the event is triggered on the selected node(s)
* @returns {Dabby} The original dabby collection
*/
const one = function (events, selector, data, callback) {
	return factory(this, true, events, selector, data, callback);
}

Object.defineProperty(Dabby.prototype, "one", {value: one});
