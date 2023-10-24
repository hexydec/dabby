import $ from "../../../dist/dabby.js";

QUnit.module("Attributes", hooks => {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp"></div>';
	});

	QUnit.test("$.fn.css", function (assert) {
		var main = $(".testtemp"),
			rmain = document.getElementsByClassName("testtemp")[0],
			props = ["border-left-color", "border-left-style", "border-left-width"],
			output = {
				"border-left-color": "rgb(255, 0, 0)",
				"border-left-style": "solid",
				"border-left-width": "1px"
			},
			outputCC = {
				"borderLeftColor": "rgb(255, 0, 0)",
				"borderLeftStyle": "solid",
				"borderLeftWidth": "1px"
			};

		// retrieve CSS properties
		rmain.style.border = "1px solid red";
		assert.equal(main.css("border-left-color"), "rgb(255, 0, 0)", "Can retrieve CSS property");
		assert.deepEqual(main.css(props), output, "Can retrieve multiple CSS properties");

		props = ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"];
		assert.deepEqual(main.css(props), outputCC, "Can retrieve multiple CSS properties with camelCase");

		// set css properties
		rmain.style.cssText = '';
		assert.deepEqual(main.css("border", "1px solid red"), main, "Dabby object is returned after set");
		assert.equal(rmain.style.borderLeftColor, "red", "Can set CSS property");
		rmain.style.cssText = '';
		main.css({border: "1px solid red", padding: 10}); // also tests unitless values
		assert.equal(rmain.style.borderLeftColor, "red", "Can set CSS property through an object");
		assert.equal(rmain.style.padding, "10px", "Can set CSS property through an object");

		// uses utils/setcss/setcss.js anyway, so doesn't need extensive testing here
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});
