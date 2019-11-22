export default $ => {
	return {
		'dabby#select-tag': () => {
			$("div");
		},
		'dabby#select-class': () => {
			$(".test");
		},
		'dabby#select-id': () => {
			$("#test");
		},
		'dabby#select-complex': () => {
			$("body #test div");
		},
		'dabby#create-node': () => {
			$("<div>");
		},
		'dabby#create-attr': () => {
			$("<div>", {"class": "test-attr"});
		},
		'dabby#create-event': () => {
			$("<div>", {
				click: function () {alert("clicked");}
			});
		},
		'dabby#create-html': () => {
			$('<div class="test"><a href="https://github.com/hexydec/dabbyjs">Github</a></div>');
		}
	};
};
