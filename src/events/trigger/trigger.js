$.fn.trigger = function (event) {
	var obj = document.createEvent("Event"),
		i = this.length;

	obj.initEvent(event, true, true);
	while (i--) {
		this[i].dispatchEvent(obj);
	}
	return this;
};
