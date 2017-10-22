$.fn.css = function (props, value) {

	// retrieve value from first property
	if (value === undefined) {

		if (this[0]) {
			var name = props,
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
				props[i] = dasherise(props[i]);
				output[props[i]] = style.getPropertyValue(props[i]);
				if (ret) {
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
