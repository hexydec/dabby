function dasherise(prop) {
	return prop.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());
}
