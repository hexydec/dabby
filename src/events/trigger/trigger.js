$.fn.trigger = function (name, data) {
	const evt = new CustomEvent(name, {bubbles: true, cancelable: true});
	let i = this.length;

	// copy extra data to event object
	if (data) {
		evt.args = data;
	}
	while (i--) {
		if (this[i].dispatchEvent(evt) && this[i][name]) {
			this[i][name]();
		}
	}
	return this;
};
