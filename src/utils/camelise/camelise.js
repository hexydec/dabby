function camelise(prop) {
	return prop.replace(/-([a-z])/gi, function (text, letter) {return letter.toUpperCase();});
}