function setCss(dabby, props, value) {

	// set vars
	let name = props,
		i,
		keys,
		k,
		remove;

	// normalise props
	if (typeof props === "string") {
		props = {};
		props[name] = value;
	}

	// cache properties for loop
	keys = Object.keys(props);
	k = keys.length;

	// set properties
	while (k--) {
		i = dabby.length;
		while (i--) {
			remove = props[keys[k]] === "";
			dabby[i].style[remove ? "removeProperty" : "setProperty"](
				dasherise(keys[k]),
				remove ? undefined : getVal(props[keys[k]], dabby[i], k, dabby[i].style[keys[k]])
			);
		}
	}
	return dabby;
}
