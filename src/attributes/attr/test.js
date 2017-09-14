QUnit.module("Attributes");

QUnit.test("$.fn.attr", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = $(".testtemp"),
		rmain = document.getElementsByClassName("testtemp")[0];

	// set and get class
	assert.deepEqual(main.attr("class", "testtemp testclass"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "testtemp testclass", "Can set class");
	assert.equal(main.attr("class"), "testtemp testclass", "Can retrieve class");
	main.attr("class", "testtemp");
	assert.equal(main.attr("class"), "testtemp", "Can remove class");

	// set and get style
	assert.deepEqual(main.attr("style", "border:1px solid red"), main, "Returns itself when setting style");
	assert.equal(rmain.style.cssText, "border: 1px solid red;", "Can set style");
	assert.equal(main.attr("style"), "border: 1px solid red;", "Can retrieve style");

	// set and get attribute
	assert.deepEqual(main.attr("itemprop", "articleBody"), main, "Returns itself when setting property");
	assert.equal(rmain.getAttribute("itemprop"), "articleBody", "Can set property");
	assert.equal(main.attr("itemprop"), "articleBody", "Can retrieve property");
	main.attr("itemprop", "");
	assert.equal(main.attr("itemprop"), undefined, "Can remove property");

	// reset
	test.innerHTML = "";
});
