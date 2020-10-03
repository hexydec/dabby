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

		// test removing event with no handler
		body.on(name, ".testtemp", func);
		body.off(name, ".testtemp");
		obj.trigger(name);
		assert.equal(triggered, 2, "Events are removed from the correct delegated object by event name");

		// test removing event with no handler
		obj.on(name, func);
		obj.off(name);
		obj.trigger(name);
		assert.equal(triggered, 2, "Events are removed from the correct object by event name");

		// test adding multiple events
		triggered = 0;
		obj.on("test.trigger1 test.trigger2 test.trigger3", func);
		obj.trigger("test.trigger1");
		obj.trigger("test.trigger2");
		obj.trigger("test.trigger3");
		assert.equal(triggered, 3, "Multiple event can be specified");

		// remove multiple events
		obj.off("test.trigger1 test.trigger2 test.trigger3", func);
		obj.trigger("test.trigger1");
		obj.trigger("test.trigger2");
		obj.trigger("test.trigger3");
		assert.equal(triggered, 3, "Can remove multiple events");

		// test adding multiple events as an object
		triggered = 0;
		obj.on({"test.trigger1 test.trigger2": func, "test.trigger3": func});
		obj.trigger("test.trigger1");
		obj.trigger("test.trigger2");
		obj.trigger("test.trigger3");
		assert.equal(triggered, 3, "Can add multiple event as an object");

		// test removing multiple events as an object
		obj.off({"test.trigger1 test.trigger2": func, "test.trigger3": func});
		obj.trigger("test.trigger1");
		obj.trigger("test.trigger2");
		obj.trigger("test.trigger3");
		assert.equal(triggered, 3, "Can remove multiple event as an object");

		// remove all events
		triggered = 0;
		obj.on("test.trigger1 test.trigger2 test.trigger3", func);
		obj.off();
		obj.trigger("test.trigger1");
		obj.trigger("test.trigger2");
		obj.trigger("test.trigger3");
		assert.equal(triggered, 0, "Can remove all events at once");
	});

	hooks.after(function () {
		test.innerHTML = "";
	});
});
