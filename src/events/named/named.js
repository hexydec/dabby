function getEvents() {
	return ["focusin", "focusout", "focus", "blur", "load", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "change", "select", "keydown", "keypress", "keyup", "error"];
}
getEvents().forEach(function (event) {
	$.fn[event] = function (callback) {
		return callback ? this.on(event, callback) : this.trigger(event);
	};
});
