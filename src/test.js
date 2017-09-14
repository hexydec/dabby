QUnit.module("Core");

QUnit.test("$.fn.init", function (assert) {
	var main = document.getElementsByClassName("main")[0],
		h1 = document.getElementsByTagName("h1")[0],
		checkbox = document.querySelectorAll("input[type=checkbox]")[0],
		html = '<h1>Hello <strong>How are you?</strong></h1>',
		newh1 = document.createElement("h1");

	assert.ok($(".main").get(0) === main, "Can select object by class");
	assert.ok($(".main h1").get(0) === h1, "Can select child object");
	assert.ok($(".main > h1").get(0) === h1, "Can select direct child object");
	assert.ok($(".main > h1:first-child").get(0) === h1, "Can select first child");
	assert.ok($("input[type=checkbox]").get(0) === checkbox, "Can select with attributes");
	assert.ok($("input[type=checkbox]:checked").get(0) === checkbox, "Can select with attributes");

	assert.ok($($(".main")).get(0) === main, "Can select object from Dabby object");
	assert.ok($(main).get(0) === main, "Can select object from node");
	assert.deepEqual($([main, h1]).get(), [main, h1], "Can select object from node");

	assert.deepEqual($('<h1>').get(0), newh1, "Can create HTML objects");
	assert.deepEqual($('<h1/>').get(0), newh1, "Can create HTML objects");
	assert.deepEqual($('<h1 />').get(0), newh1, "Can create HTML objects");
	assert.deepEqual($('<h1></h1>').get(0), newh1, "Can create HTML objects");
	//console.log($(html));
	assert.equal($(html).get(0).outerHTML, html, "Can create HTML nodes");
});
