import $ from "../../../dist/dabby.js";

QUnit.module("Attributes");

QUnit.test("$.fn.attr", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var main = $(".testtemp"),
		rmain = document.getElementsByClassName("testtemp")[0],
		style = "padding-top: 10px;",
		correct = true;

	// set and get class
	assert.deepEqual(main.attr("class", "testtemp testclass"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "testtemp testclass", "Can set class");
	assert.equal(main.attr("class"), "testtemp testclass", "Can retrieve class");
	main.attr("class", "testtemp");
	assert.equal(main.attr("class"), "testtemp", "Can remove class");

	// set and get style
	assert.deepEqual(main.attr("style", style), main, "Returns itself when setting style");
	assert.equal(rmain.style.cssText, style, "Can set style");
	assert.equal(main.attr("style"), style, "Can retrieve style");

	// set and get attribute
	assert.deepEqual(main.attr("itemprop", "articleBody"), main, "Returns itself when setting property");
	assert.equal(rmain.getAttribute("itemprop"), "articleBody", "Can set property");
	assert.equal(main.attr("itemprop"), "articleBody", "Can retrieve property");
	main.attr("itemprop", null);
	assert.equal(main.attr("itemprop"), undefined, "Can remove property");

	// set attributes using a callback
	test.innerHTML = '<div class="testtemp"></div><div class="testtemp"></div><div class="testtemp"></div>';
	main = $(".testtemp");
	assert.deepEqual(main.attr("data-test", function (i, el) {return "test-"+i;}), main, "Returns itself when setting attribute using callback");
	main.each(function (i) {
		if (this.getAttribute("data-test") !== "test-"+i) {
			correct = false;
			return false;
		}
	});
	assert.equal(correct, true, "Can set property with callback");

	// reset
	test.innerHTML = "";
});
