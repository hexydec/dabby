import $ from "../../core/dabby/dabby.js";
import isFunction from "../../internal/isfunction/isfunction.js";
import isPlainObject from "../../internal/isplainobject/isplainobject.js";
import isPassive from "../../internal/ispassive/ispassive.js";
import "../../traversal/add/add.js";
import "../../traversal/parents/parents.js";
import "../../traversal/filter/filter.js";
import "../../core/get/get.js";
import "../../utils/each/each.js";

// add and remove event handlers
["on", "one"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {
		if (this.length) {

			// sort out args
			if (isFunction(selector)) {
				callback = selector;
				selector = undefined;
			} else if (isFunction(data)) {
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
			let i = this.length;
			while (i--) {

				// record the original function
				if (!this[i].events) {
					this[i].events = [];
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
								const target = selector ? $(selector, evt.currentTarget).filter(evt.target).get() : [evt.currentTarget];
								if (target.length) {
									if (evt.data === undefined) {
										evt.data = data; // set data to event object
									} else {
										evt._data = data; // fallback as sometime the property is not writable
									}
									for (let n = 0, len = target.length; n < len; n++) {
										const args = evt.detail || [];
										if (func.call(target[n], evt, ...args) === false) {
											evt.preventDefault();
											evt.stopPropagation();
										}
									}
								}
							},
							once: name === "one"
						};
						this[i].events.push(event);

						// bind event
						this[i].addEventListener(e, event.func, {once: name === "one", capture: !!selector, passive: isPassive(e)});
					});
				});
			}
		}
		return this;
	};
});
