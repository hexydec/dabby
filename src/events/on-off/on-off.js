// add and remove event handlers
$.each({
	on: "addEventListener",
	off: "removeEventListener"
}, function (name, func) {
	$.fn[name] = function (events, selector, callback) {
		events = events.split(" ");

		// sort out args
		if (selector.constructor === Function) {
			callback = selector;
			selector = null;
		}

		// define length constants
		var i = this.length,
			e = events.length,
			fn = function (e) { // delegate function
				if (!selector || $(selector).is(e.target)) {
					callback.apply(selector ? e.target : this, e);
				}
			};

		// attach event
		while (i--) {
			while (e--) {
				this[i][func](events[e], fn, false);
			}
		}
		return this;
	};
});