// add and remove event handlers
["on", "one", "off"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {
		let i = this.length,
			e,
			fn,
			node;

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
			node = this[i];
			e = events.length;
			if (!node.events) {
				node.events = [];
			}

			// record the original function
			if (name !== "off") {
				fn = function (evt) { // delegate function
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
				node.events.push({
					events: events,
					callback: callback,
					func: fn
				});

				// trigger
				while (e--) {
					node.addEventListener(events[e], fn, {once: name === "one"});
				}

			// find the original function
			} else if (node.events) {
				while (e--) {
					node.events.forEach((evt, i) => {
						const index = evt.events.indexOf(events[e]);
						if (index !== -1 && evt.callback === callback) {
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
