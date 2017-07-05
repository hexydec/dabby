define(["core"], function ($) {
	function getDelegate(callback, selector) {
		return function (e) {
			this.selector = selector;
			if (!selector || $(selector).is(e.target)) {
				callback.apply(this, e);
			} 
		};
	}
	
	$.fn.on = function (events, selector, callback) {
		events = events.split(" ");
		
		// sort out args
		if ($.isFunction(selector)) {
			callback = selector;
			selector = null;
		}
		
		// check for bubble
		var i,
			e, 
			fn = getDelegate(callback, selector);
		
		// attach event
		for (i = 0; i < this.length; i += 1) {
			for (e = 0; e < events.length; e += 1) {
				this[i].addEventListener(events[e], callback, false);
			}
		}
		return this;
	};
	
	// Remove event handler
	$.fn.off = function (event, selector, callback) {
		events = events.split(" ");
		
		// sort out args
		if ($.isFunction(selector)) {
			callback = selector;
			selector = null;
		}
		
		// check for bubble
		var i,
			e, 
			fn = getDelegate(callback, selector);
		
		// attach event
		for (i = 0; i < this.length; i += 1) {
			for (e = 0; e < events.length; e += 1) {
				this[i].removeEventListener(events[e], fn, false);
			}
		}
		return this;
	};
	
	$.fn.trigger = function (event) {
		var $this = this,
			obj = new Event(event),
			i = 0;
			
		for (; i < $this.length; i += 1) {
			$this[i].dispatchEvent(obj);
		}
		return $this;
	};
	
	["focusin", "focusout", "focus", "blur", "load", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change", "select", "keydown", "keypress", "keyup", "error"].forEach(function (event) {
		$.fn[event] = function (callback) {
			var $this = this;
			return callback ? $this.on(event, callback) : $this.trigger(event);
		}
	});
});