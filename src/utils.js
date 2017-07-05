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
				i;
			if (typeof name === "string") {
				props = {};
				props[name] = value;
			}
			for (i in props) {
				if (props.hasOwnProperty(i)) {
					props[i] = func.dasherise(props[i]);
					for (var i = 0; i < dabby.length; i += 1) {
						if (!value && value !== 0) {
							dabby[i].style.removeProperty(props[i]);
						} else {
							dabby[i].style.setProperty(props[i], value);
						}
					}
				}
			}
			return dabby;
		}
	};
	return func;
});