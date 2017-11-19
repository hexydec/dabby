function dasherise(prop) {
	return prop.replace(/[A-Z]/g, function (letter) {
		return "-" + letter.toLowerCase();
	});
}
