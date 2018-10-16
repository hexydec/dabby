import $ from "../../../dist/dabby.js";

QUnit.module("Events", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(function () {
		test.innerHTML = '<div class="testtemp"></div>';
	});

	QUnit.test("$.fn.on/$.fn.off", function (assert) {
		var obj = $(".testtemp"),
			plain = document.getElementsByClassName("testtemp")[0],
			triggered = -1,
			func = function (e) {
				triggered++;
			},
			name = "test.trigger",
			i = 0,
			body = $("body");

		// test singular events
		assert.equal(obj.on(name, func), obj, "Returns self on set event");
		for (; i < 3; i++) {
			obj.trigger(name);
			assert.equal(triggered, i, "Can set event");
		}
		$(test).trigger(name);
		assert.equal(triggered, 2, "Events are set on the correct object");

		// test removing event
		assert.equal(obj.off(name, func), obj, "Returns self on remove event");
		obj.trigger(name);
		assert.equal(triggered, 2, "Events are removed from the correct object");

		// test delegated events
		triggered = -1;
		assert.equal(body.on(name, ".testtemp", func), body, "Returns self on set delegated event");
		for (i = 0; i < 3; i++) {
			obj.trigger(name);
			assert.equal(triggered, i, "Can set delegated event");
		}
		$(test).trigger(name);
		assert.equal(triggered, 2, "Events are set on the correct object");

		// test removing event
		assert.equal(body.off(name, ".testtemp", func), body, "Returns self on remove event");
		obj.trigger(name);
		assert.equal(triggered, 2, "Events are removed from the correct object");
	});

	hooks.after(function () {
		test.innerHTML = "";
	});
});
