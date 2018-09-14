function setCss(dabby, props, value) {

	// set vars
	let name = props,
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
		let i = dabby.length;
		while (i--) {
			let val = props[keys[k]] === "" ? undefined : getVal(props[keys[k]], dabby[i], k, dabby[i].style[keys[k]]);
			if (!isNaN(val)) {
				val += "px";
			}
			dabby[i].style[remove ? "removeProperty" : "setProperty"](dasherise(keys[k]), val);
		}
	}
	return dabby;
}
