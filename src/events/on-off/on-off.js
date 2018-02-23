// add and remove event handlers
["on", "one", "off"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {
		let i = this.length,
			fn= function (evt) { // delegate function
				if (!selector || $(selector).is(evt.target)) {
					if (data) { // set data to event object
						evt.data = data;
					}
					if (callback.call(selector ? evt.target : this, evt, evt.args) === false) {
						evt.preventDefault();
						evt.stopPropagation();
					}
				}
			};

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
			let node = this[i],
				e = events.length;

			// record the original function
			if (name !== "off") {
				if (!node.events) {
					node.events = [];
				}
				node.events.push({
					events: events,
					callback: callback,
					selector: selector,
					func: fn
				});

				// trigger
				while (e--) {
					node.addEventListener(events[e], fn, {once: name === "one"});
				}

			// find the original function
			} else if (node.events.length) {
				while (e--) {
					node.events.forEach((evt, i) => {
						const index = evt.events.indexOf(events[e]);
						if (index !== -1 && evt.callback === callback && evt.selector === selector) {
							node.removeEventListener(events[e], evt.func);
							node.events[i].events.splice(index, 1);
							if (!node.events[i].events.length) {
								node.events.splice(i, 1);
							}
						}
					});
				}
			}
		}
		return this;
	};
});
