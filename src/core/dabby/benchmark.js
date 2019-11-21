export default $ => {
	return {
		'init#select-tag': () => {
			$("div");
		},
		'init#select-class': () => {
			$(".test");
		},
		'init#select-id': () => {
			$("#test");
		},
		'init#select-complex': () => {
			$("body #test div");
		},
		'init#create-node': () => {
			$("<div>");
		},
		'init#create-attr': () => {
			$("<div>", {"class": "test-attr"});
		},
		'init#create-event': () => {
			$("<div>", {
				click: function () {alert("clicked");}
			});
		},
		'init#create-html': () => {
			$('<div class="test"><a href="https://github.com/hexydec/dabbyjs">Github</a></div>');
		}
	};
};
