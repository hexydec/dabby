getEvents().forEach(function (event) {
	$.fn[event] = function (callback) {
		return callback ? this.on(event, callback) : this.trigger(event);
	};
});
