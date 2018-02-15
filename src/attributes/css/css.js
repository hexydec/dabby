$.fn.css = function (props, value) {

	// set the values
	if (value !== undefined) {
		return setCss(this, props, value);

	// retrieve value from first property
	} else if (this[0]) {
		let name = props,
			i,
			style = getComputedStyle(this[0], ""),
			output = {},
			ret = false;

		if (typeof name === "string") {
			props = [name];
			ret = true;
		}
		i = props.length;
		while (i--) {
			output[props[i]] = style.getPropertyValue(dasherise(props[i]));
			if (ret) {
				return output[props[i]];
			}
		}
		return output;
	}
};
