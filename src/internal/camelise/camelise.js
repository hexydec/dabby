function camelise(prop) {
	return prop.replace(/-([a-z])/gi, (text, letter) => letter.toUpperCase());
}
