import $ from '../dist/dabby.js';
import '../node_modules/jquery/dist/jquery.js';

var init = $ => {
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

var attr = $ => {
	return {
		"attr#read-attr": {
			cycle: () => {
				$(".test").attr("style", "border:1px solid red");
			},
			fn: () => {
				$(".test").attr("style");
			},
		}
	}
};

function getTests(libs, suites) {
	const tests = {};
	suites.forEach(suite => {
		$.each(libs, (i, lib) => {
			$.each(suite(lib), (name, test) => {
				if (!tests[name]) {
					tests[name] = {};
				}
				tests[name][i] = test;
			});
		});
	});
	return tests;
}

$(function () {
	const header = $(".benchmark__headerrow"),
		row = $(".benchmark__tests"),
		libs = {
			dabby: $,
			jQuery: jQuery
		},
		tests = getTests(libs, [init, attr]),
		suites = [],
		run = () => {
			if (suites.length) {
				const suite = suites.shift();
				suite.run({async: true});
			}
		};

	// add header row
	$.each(libs, name => {
		header.append($("<th>", {text: name}));
	});
	header.append($("<th>", {text: "Fastest"}));

	// build table
	$.each(tests, (name, items) => {
		const item = $("<tr>"),
			cells = {};

		// add table row
		$("<td>", {text: name}).appendTo(item);
		$.each(libs, name => {
			cells[name] = $("<td>").appendTo(item);
		});
		const result = $("<td>").appendTo(item);
		row.append(item);

		// add each test to the suite
		const suite = new Benchmark.Suite;
		$.each(items, (lib, test) => {
			suite.add(lib, test);
		});

		// add events
		suite
			.on("start", event => {
				$("tr", row).removeClass("benchmark__running");
				item.addClass("benchmark__running");
			})
			.on("cycle", event => {
				cells[event.target.name].text(event.target + "");
			})
			.on("complete", function () {
				const fastest = this.filter("fastest").map("name");
				fastest.forEach(item => {
					cells[item].addClass("benchmark__fastest");
				});
				result.text(this.filter("fastest").map("name"));
				run();
			});
		suites.push(suite);
	});

	// run the benchmark
	$(".run").on("click", () => {
		run();
	});
});
