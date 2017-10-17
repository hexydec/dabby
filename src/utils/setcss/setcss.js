function setCss(dabby, props, value) {

	// set vars
	var name = props,
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
			dabby[i].style[(remove ? "remove" : "set") + "Property"].setProperty(
				dasherise(keys[k]),
				remove ? undefined : getVal(dabby[i], props[keys[k]], k)
			);
		}
	}
	return dabby;
}
