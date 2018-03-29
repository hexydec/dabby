// add and remove event handlers
["on", "one", "off"].forEach(name => {
	$.fn[name] = function (events, selector, data, callback) {
		let i = this.length,
			fn = ;

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
					func: function (evt) { // delegate function
						let target = [this];
						if (selector) {
							let t = $(evt.target);
							target = t.add(t.parents(selector)).get(); // is the selector in the targets parents?
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
					}
				});

				// trigger
				while (e--) {
					node.addEventListener(events[e], node.events.func, {once: name === "one", capture: !!selector});
				}

			// find the original function
			} else if (node.events.length) {
				while (e--) {
					node.events.forEach((evt, i) => {
						const index = evt.events.indexOf(events[e]);
						if (index !== -1 && evt.callback === callback && evt.selector === selector) {
							node.removeEventListener(events[e], evt.func, {capture: !!evt.selector}); // must pass same arguments
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
