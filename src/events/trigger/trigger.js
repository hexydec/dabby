$.fn.trigger = function (name, data) {
	var evt = new CustomEvent(name),
		i = this.length;

	if (data) {
		evt.args = data;
	}
	while (i--) {
		this[i].dispatchEvent(evt);
	}
	return this;
};
