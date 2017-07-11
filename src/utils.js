define(function () {
	"use strict";
	var func = {
		dasherise: function (prop) {
			return prop.replace(/[A-Z]/g, function (letter) {return "-" + letter.toLowerCase();});
		},
		camelise: function (prop) {
			return prop.replace(/-([a-z])/gi, function (text, letter) {return letter.toUpperCase();});
		},
		setCss: function (dabby, props, value) {
			var name = props,
				i = 0,
				k = 0,
				keys;
			if (typeof name === "string") {
				props = {};
				props[name] = value;
			}
			keys = Object.keys(props);
			for (; k < keys.length; k += 1) {
				props[keys[k]] = func.dasherise(props[keys[k]]);
				for (var i = 0; i < dabby.length; i += 1) {
					if (!value && value !== 0) {
						dabby[i].style.removeProperty(props[keys[k]]);
					} else {
						dabby[i].style.setProperty(props[keys[k]], value);
					}
				}
			}
			return dabby;
		}
	};
	return func;
});