function getVal(val, obj, i, css) {

	// retrieve as function
	if (typeof(val) === "function") {
		val = val.call(obj, i);
	}

	// if CSS value requested, resolve value
	if (css && !isNaN(val)) {
		val += "px";
	}
	return val;
}
