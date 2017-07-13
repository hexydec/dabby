$.fn.trigger = function (event) {
	var obj = new Event(event),
		i = this.length;

	while (i--) {
		this[i].dispatchEvent(obj);
	}
	return this;
};