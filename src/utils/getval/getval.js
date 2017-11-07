function getVal(val, obj, i, css) {

	// retrieve as function
	if ($.isFunction(val)) {
		val = val.call(obj, i);
	}

	// if CSS value requested, resolve value
	if (css && !isNaN(val)) {
		val += "px";
	}
	return val;
}
