QUnit.module("Attributes");

QUnit.test("$.fn.css", function (assert) {
	var main = $(".main"),
		rmain = document.getElementsByClassName("main")[0],
		props = ["border-left-color", "border-left-style", "border-left-width"],
		output = {
			"border-left-color": "rgb(255, 0, 0)",
			"border-left-style": "solid",
			"border-left-width": "1px"
		};
	
	// retrieve CSS properties
	rmain.style.cssText = 'border: 1px solid red;';
	assert.equal(main.css("border-left-color"), "rgb(255, 0, 0)", "Can retrieve CSS property");
	assert.deepEqual(main.css(props), output, "Can retrieve multiple CSS properties");
	
	props = ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"];
	assert.deepEqual(main.css(props), output, "Can retrieve multiple CSS properties with camelCase");
	
	// set css properties
	rmain.style.cssText = '';
	assert.deepEqual(main.css("border", "1px solid red"), main, "Dabby object is returned after set");
	assert.equal(rmain.style.borderLeftColor, "red", "Can set CSS property");
	
	// uses utils/setcss/setcss.js anyway, so doesn't need extensive testing here
});