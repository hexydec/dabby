QUnit.module("Core");

QUnit.test("$.fn.init", function (assert) {
	var main = document.getElementsByClassName("main")[0],
		h1 = document.getElementsByTagName("h1")[0],
		checkbox = document.querySelectorAll("input[type=checkbox]")[0],
		html = '<h1>Hello <strong>How are you?</strong></h1>',
		newh1 = document.createElement("h1"),
		triggered = false,
		obj = $("<h1>", {
			style: {backgroundColor: "red"},
			text: "test",
			click: function () {
				triggered = true;
			}
		}),
		objNode = obj.get(0);

	assert.ok($(".main").get(0) === main, "Can select object by class");
	assert.ok($(".main h1").get(0) === h1, "Can select child object");
	assert.ok($(".main > h1").get(0) === h1, "Can select direct child object");
	assert.ok($(".main > h1:first-child").get(0) === h1, "Can select first child");
	assert.ok($("input[type=checkbox]").get(0) === checkbox, "Can select with attributes");
	assert.ok($("input[type=checkbox]:checked").get(0) === checkbox, "Can select with attributes");

	assert.ok($($(".main")).get(0) === main, "Can select object from Dabby object");
	assert.ok($(main).get(0) === main, "Can select object from node");
	assert.deepEqual($([main, h1]).get(), [main, h1], "Can select object from node");

	assert.ok($('<h1>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
	assert.ok($('<h1/>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
	assert.ok($('<h1 />').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
	assert.ok($('<h1></h1>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");

	assert.ok(objNode instanceof HTMLHeadingElement, "Can create HTML objects");
	assert.ok(objNode.innerText === "test", "Can create HTML objects with text attributes");
	assert.ok(objNode.style.backgroundColor === "red", "Can create HTML objects with style attributes");

	objNode.dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}));
	assert.ok(triggered, "Can create HTML objects and attached events");;

	assert.equal($(html).get(0).outerHTML, html, "Can create HTML nodes");
});
