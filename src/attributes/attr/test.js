QUnit.module("Attributes");

QUnit.test("$.fn.attr", function (assert) {
	var main = $(".main"), rmain = document.getElementsByClassName("main")[0];
	
	// set and get class
	assert.deepEqual(main.attr("class", "main test"), main, "Returns itself when setting class");
	assert.equal(rmain.className, "main test", "Can set class");
	assert.equal(main.attr("class"), "main test", "Can retrieve class");
	main.attr("class", "main");
	assert.equal(main.attr("class"), "main", "Can remove class");
	
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
});