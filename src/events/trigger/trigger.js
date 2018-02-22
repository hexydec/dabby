$.fn.trigger = function (name, data) {
	let evt = new CustomEvent(name, {bubbles: true, cancelable: true}),
		i = this.length;

	// copy extra data to event object
	if (data) {
		evt.args = data;
	}
	while (i--) {
		this[i].dispatchEvent(evt);
	}
	return this;
};
