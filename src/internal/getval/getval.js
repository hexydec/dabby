function getVal(val, obj, i, current) {

	// retrieve as function
	if ($.isFunction(val)) {
		val = val.call(obj, i, $.isFunction(current) ? current() : current); // current can be a function
	}
	return val;
}
