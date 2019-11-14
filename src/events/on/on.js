import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";
import "../../traversal/add/add.js";
import "../../traversal/parents/parents.js";
import "../../traversal/filter/filter.js";
import "../../core/get/get.js";

// add and remove event handlers
["on", "one"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {
		if (this.length) {

			// sort out args
			if (!Array.isArray(events)) {
				events = events.split(" ");
			}
			if ($.isFunction(selector)) {
				callback = selector;
				selector = undefined;
			} else if ($.isFunction(data)) {
				callback = data;
				data = undefined;
			}

			// attach event
			let i = this.length;
			while (i--) {

				// record the original function
				if (!this[i].events) {
					this[i].events = [];
				}
				let event = {
					events: events,
					selector: selector,
					data: data,
					callback: callback,
					func: evt => { // delegate function
						const target = selector ? $(selector, evt.currentTarget).filter(evt.target).get() : [evt.currentTarget];
						if (target.length) {
							evt.data = data; // set data to event object
							for (let n = 0, len = target.length; n < len; n++) {
								if (callback.call(target[n], evt, evt.args) === false) {
									evt.preventDefault();
									evt.stopPropagation();
								}
							}
						}
					},
					once: name === "one"
				}
				this[i].events.push(event);

				// trigger
				let e = events.length;
				while (e--) {
					this[i].addEventListener(events[e], event.func, {once: name === "one", capture: !!selector});
				}
			}
		}
		return this;
	};
});
