$.fn.css = function (props, value) {

	// retrieve value from first property
	if (value === undefined) {
		var name = props,
			i,
			css,
			output = {},
			ret = false;
		
		if (this[0]) {
			css = getComputedStyle(this[0], "");
			if (typeof name === "string") {
				props = [name];
				ret = true;
			}
			i = props.length;
			while (i--) {
				props[i] = dasherise(props[i]);
				output[props[i]] = css.getPropertyValue(props[i]);
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