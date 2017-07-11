define(["core"], function ($) {
	function getDelegate(callback, selector) {
		return function (e) {
			this.selector = selector;
			if (!selector || $(selector).is(e.target)) {
				callback.apply(this, e);
			} 
		};
	}
	
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
			
			// check for bubble
			var i = this.length,
				e = events.length, 
				fn = getDelegate(callback, selector);
			
			// attach event
			while (i--) {
				while (e--) {
					this[i][func](events[e], callback, false);
				}
			}
			return this;
		};
	});
	
	$.fn.trigger = function (event) {
		var obj = new Event(event),
			i = this.length;
			
		while (i--) {
			this[i].dispatchEvent(obj);
		}
		return this;
	};
	
	["focusin", "focusout", "focus", "blur", "load", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change", "select", "keydown", "keypress", "keyup", "error"].forEach(function (event) {
		$.fn[event] = function (callback) {
			return callback ? this.on(event, callback) : this.trigger(event);
		};
	});
});