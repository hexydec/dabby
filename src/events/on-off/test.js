QUnit.module("Events");

QUnit.test("$.fn.on/$.fn.off", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';
	var obj = $(".testtemp"),
		plain = document.getElementsByClassName("testtemp")[0],
		triggered = -1,
		func = function (e) {
			triggered++;
		},
		name = "test.trigger",
		evt = new Event(name),
		i = 0,
		body = $("body");

	// test singular events
	assert.equal(obj.on(name, func), obj, "Returns self on set event");
	evt.initEvent(name, true, true);
	for (; i < 3; i++) {
		plain.dispatchEvent(evt);
		assert.equal(triggered, i, "Can set event");
	}
	test.dispatchEvent(evt);
	assert.equal(triggered, 2, "Events are set on the correct object");

	// test removing event
	assert.equal(obj.off(name, func), obj, "Returns self on set event");
	plain.dispatchEvent(evt);
	assert.equal(triggered, 2, "Events are set on the correct object");

	// test delegated events
	triggered = -1;
	assert.equal(body.on(name, ".testtemp", func), body, "Returns self on set delegated event");
	for (i = 0; i < 3; i++) {
		plain.dispatchEvent(evt);
		assert.equal(triggered, i, "Can set delegated event");
	}
	test.dispatchEvent(evt);
	assert.equal(triggered, 2, "Events are set on the correct object");
});
