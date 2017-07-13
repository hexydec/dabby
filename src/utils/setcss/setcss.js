function setCss(dabby, props, value) {
	
	// normalise props
	if (typeof name === "string") {
		props = {};
		props[name] = value;
	}

	// set vars
	var name = props,
		i,
		keys = Object.keys(props),
		k = keys.length;

	// set properties
	while (k--) {
		props[keys[k]] = dasherise(props[keys[k]]);
		i = dabby.length;
		while (i--) {
			if (!value && value !== 0) {
				dabby[i].style.removeProperty(props[keys[k]]);
			} else {
				dabby[i].style.setProperty(props[keys[k]], value);
			}
		}
	}
	return dabby;
}