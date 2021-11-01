import $ from "../../../dist/dabby.js";
import setCss from "./setcss.js";

QUnit.module("Internal");

QUnit.test("setCss", function (assert) {
	var main = $(".test"),
		rmain = document.getElementsByClassName("test")[0],
		props = {"border-left-color": "red", "border-left-style": "solid", "border-left-width": "1px"},
		propsCC = {borderLeftColor: "red", borderLeftStyle: "solid", borderLeftWidth: "1px"},
		output = {
			"border-left-color": "rgb(255, 0, 0)",
			"border-left-style": "solid",
			"border-left-width": "1px"
		};

	rmain.style.cssText = "";
	assert.deepEqual(setCss(main, "border-left-color", "red"), main, "Returns Dabby object when CSS is set");
	assert.equal(rmain.style.borderLeftColor, "red", "Can set CSS property");
	rmain.style.cssText = "";
	setCss(main, "borderLeftColor", "red");
	assert.equal(rmain.style.borderLeftColor, "red", "Can set camelCase CSS property");
	rmain.style.cssText = "";
	setCss(main, props);
	assert.deepEqual(main.css(Object.keys(props)), output, "Can set multiple CSS properties");
	rmain.style.cssText = "";
	setCss(main, propsCC);
	assert.deepEqual(main.css(Object.keys(props)), output, "Can set multiple camelCase CSS properties");
	setCss(main, "borderLeftColor", function (index, current) {
		assert.equal(current, "red", "Callback function receives current value");
		return "green";
	});
	assert.equal(rmain.style.borderLeftColor, "green", "Can set CSS property through a callback function");
	setCss(main, {borderLeftColor: "", borderLeftStyle: "", borderLeftWidth: ""});
	assert.equal(rmain.style.cssText, "", "Can remove CSS properties");
	setCss(main, {"--css-variable": "test"});
	assert.equal(rmain.style.getPropertyValue("--css-variable"), "test", "Can set CSS variable");
});
