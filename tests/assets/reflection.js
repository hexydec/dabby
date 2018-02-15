(function (win) {
	win.dabbyReflection = {foo: "foo", bar: "bar"};

	/*document
		.querySelector("script[src*='reflection.js']")
		.src
		.split("?")[1]
		.split("&")
		.forEach(function (item) {
			var tmp = item.split("=");
			win.dabbyReflection[decodeURIComponent(tmp[0])] = decodeURIComponent(tmp[1]);
		});*/
}(window));
