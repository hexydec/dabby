QUnit.module("Core");

// add mouseevent support
(function () {
	var MouseEvent = function (eventType, params) {
		params = params || { bubbles: false, cancelable: false };
	    var mouseEvent = document.createEvent('MouseEvent');
	    mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	    return mouseEvent;
	}
	MouseEvent.prototype = Event.prototype;
	window.MouseEvent = MouseEvent;
}());

QUnit.test("$.fn.init", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<h1>test</h1><input type="checkbox" checked="checked" />';
	var h1 = test.getElementsByTagName("h1")[0],
		checkbox = test.querySelector("input[type=checkbox]"),
		html = '<h1>Hello <strong>How are you?</strong></h1>',
		newh1 = document.createElement("h1"),
		triggered = false,
		obj = $("<h1>", {
			style: "background-color:red",
			text: "test",
			click: function () {
				triggered = true;
			}
		}),
		objNode = obj.get(0);

	assert.ok($(".test").get(0) === test, "Can select object by class");
	assert.ok($(".test h1").get(0) === h1, "Can select child object");
	assert.ok($(".test > h1").get(0) === h1, "Can select direct child object");
	assert.ok($(".test > h1:first-child").get(0) === h1, "Can select first child");
	assert.ok($("input[type=checkbox]", test).get(0) === checkbox, "Can select with attributes");
	assert.ok($("input[type=checkbox]:checked", test).get(0) === checkbox, "Can select with attributes");

	assert.ok($($(".test")).get(0) === test, "Can select object from Dabby object");
	assert.ok($(test).get(0) === test, "Can select object from node");
	assert.deepEqual($([test, h1]).get(), [test, h1], "Can select object from node");

	assert.ok($('<h1>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
	assert.ok($('<h1/>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
	assert.ok($('<h1 />').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
	assert.ok($('<h1></h1>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");

	assert.ok(objNode instanceof HTMLHeadingElement, "Can create HTML objects");
	assert.ok(objNode.innerText === "test", "Can create HTML objects with text attributes");
	assert.ok(objNode.style.backgroundColor === "red", "Can create HTML objects with style attributes");

	objNode.dispatchEvent(new MouseEvent('click', {view: window, bubbles: true, cancelable: true}));
	assert.ok(triggered, "Can create HTML objects and attached events");

	assert.equal($(html).get(0).outerHTML, html, "Can create HTML nodes");
});
