function setCss(dabby, props, value) {

	// set vars
	var name = props,
		i,
		keys,
		k;
	
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
			if (!props[keys[k]] && props[keys[k]] !== 0) {
				dabby[i].style.removeProperty(dasherise(keys[k]));
			} else {
				dabby[i].style.setProperty(dasherise(keys[k]), props[keys[k]]);
			}
		}
	}
	return dabby;
}