import $ from '../dist/dabby.js';
import '../node_modules/jquery/dist/jquery.js';

var init = $ => {
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

$(function () {

	const header = $(".benchmark__headerrow"),
		row = $(".benchmark__tests"),
		run = libs => {
			const tests = {};

			$.each(libs, (i, lib) => {
				$.each(init(lib), (name, test) => {
					if (!tests[name]) {
						tests[name] = {};
					}
					tests[name][i] = test;
				});
			});

			$.each(tests, (name, items) => {
				const suite = new Benchmark.Suite,
					item = $("<tr>"),
					cells = {};

				// add table row
				$("<td>", {text: name}).appendTo(item);
				$.each(libs, name => {
					cells[name] = $("<td>").appendTo(item);
				});
				const result = $("<td>").appendTo(item);
				row.append(item);

				// add each test to the suite
				$.each(items, (lib, test) => {
					const benchmark = suite.add(lib, test);
					// benchmark.on("cycle", function (event) {
					// 	cells[lib].text(event.target.times.elapsed + " (x" + event.target.count + ")");
					// });
				});

				// add events
				suite
					.on("cycle", event => {
						console.log(event);
						cells[event.target.name].text(event.target.times.elapsed + " (x" + event.target.count + ")");
					})
					.on("complete", function () {
						result.text(this.filter("fastest").map("name"));
					});

				console.log("running test: " + name);
				suite.run();
			});
		},
		libs = {
			dabby: $,
			jQuery: jQuery
		};

	// add header row
	$.each(libs, name => {
		header.append($("<th>", {text: name}));
	});
	header.append($("<th>", {text: "Fastest"}));

	$(".run").on("click", () => run(libs));
});
