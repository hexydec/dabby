function getVal(val, obj, i) {

	// retrieve as function
	if ($.isFunction(val)) {
		val = val.apply(obj, arguments.slice(2)); // pass extra arguments on
	}
	return val;
}
