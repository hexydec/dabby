import $ from "../../core/core.js";
import "../../utils/isfunction/isfunction.js";
import "../../traversal/add/add.js";
import "../../traversal/parents/parents.js";
import "../../traversal/filter/filter.js";
import "../../core/get/get.js";

// add and remove event handlers
["on", "one", "off"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {
		let i = this.length;

		events = events.split(" ");

		// sort out args
		if ($.isFunction(selector)) {
			callback = selector;
			selector = null;
		} else if ($.isFunction(data)) {
			callback = data;
			data = null;
		}

		// attach event
		while (i--) {
			let e = events.length;

			// record the original function
			if (name !== "off") {
				if (!this[i].events) {
					this[i].events = [];
				}
				let fn = function (evt) { // delegate function
					let target = [this];
					if (selector) {
						let t = $(evt.target);
						target = t.add(t.parents()).filter(selector).get(); // is the selector in the targets parents?
					}
					if (target) {
						if (data) { // set data to event object
							evt.data = data;
						}
						for (let i = 0, len = target.length; i < len; i++) {
							if (callback.call(target[i], evt, evt.args) === false) {
								evt.preventDefault();
								evt.stopPropagation();
							}
						}
					}
				};
				this[i].events.push({
					events: events,
					callback: callback,
					selector: selector,
					func: fn,
					once: name === "one"
				});

				// trigger
				while (e--) {
					this[i].addEventListener(events[e], fn, {once: name === "one", capture: !!selector});
				}

			// find the original function
			} else if (this[i].events.length) {
				while (e--) {
					this[i].events.forEach((evt, n) => {
						const index = evt.events.indexOf(events[e]);
						if (index !== -1 && evt.callback === callback && evt.selector === selector) {
							this[i].removeEventListener(events[e], evt.func, {once: evt.once, capture: !!evt.selector}); // must pass same arguments
							this[i].events[n].events.splice(index, 1);
							if (!this[i].events[n].events.length) {
								this[i].events.splice(n, 1);
							}
						}
					});
				}
			}
		}
		return this;
	};
});
