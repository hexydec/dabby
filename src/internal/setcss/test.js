QUnit.module("Internal");

QUnit.test("setCss", function (assert) {
	var main = $(".main"),
		rmain = document.getElementsByClassName("main")[0],
		props = {"border-left-color": "red", "border-left-style": "solid", "border-left-width": "1px"},
		propsCC = {borderLeftColor: "red", borderLeftStyle: "solid", borderLeftWidth: "1px"},
		output = {
			"border-left-color": "rgb(255, 0, 0)",
			"border-left-style": "solid",
			"border-left-width": "1px"
		};;

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
});
