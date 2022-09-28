import $ from "../../core/dabby/dabby";
import isFunction from "../../internal/isfunction/isfunction";
import "../../traversal/add/add.js";
import "../../traversal/parents/parents.js";
import "../../traversal/filter/filter.js";
import "../../core/get/get.js";
import "../../utils/each/each.js";
import {DabbyEvent, Dabby, PlainObject} from "../../core/dabby/types";

// add and remove event handlers
["on", "one"].forEach(name => {
	$.fn[name] = function (events: PlainObject|string, selector: Function|string, data?: any, callback?: Function) : Dabby {
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
			if (typeof events === "string") {
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
				$.each(events, (evt: string, func: { call: (evt: string, ...args: any[]) => boolean; }) => {
					evt.split(" ").forEach(e => {

						// record event
						const event: DabbyEvent = {
							event: e,
							selector: selector,
							data: data,
							callback: func,
							func: (evt: DabbyEvent) => { // delegate function
								const target = selector ? $(selector, evt.currentTarget).filter(evt.target).get() : [evt.currentTarget];
								if (target.length) {
									if (evt.data === undefined) {
										evt.data = data; // set data to event object
									} else {
										evt._data = data; // fallback as sometime the property is not writable
									}
									for (let n = 0, len = target.length; n < len; n++) {
										const args: any[] = Array.isArray(evt.detail) ? evt.detail : [];
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
						this[i].addEventListener(e, event.func, {once: name === "one", capture: !!selector});
					});
				});
			}
		}
		return this;
	};
});
