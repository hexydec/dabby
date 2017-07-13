$.fn.css = function (props, value) {
	var name = props,
		i = props.length,
		css,
		output = {},
		len;

	// retrieve value from first property
	if (value === undefined) {
		if (this[0]) {
			css = getComputedStyle(this[0], "");
			if (typeof name === "string") {
				props = [name];
			}
			len = props.length;
			while (i--) {
				props[i] = dasherise(props[i]);
				output[props[i]] = css.getPropertyValue(props[i]);
				if (len === 1) {
					return output[props[i]];
				}
			}
			return output;
		}

	// set the values
	} else {
		return setCss(this, props, value);
	}
};