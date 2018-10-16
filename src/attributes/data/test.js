import $ from "../../../dist/dabby.js";

QUnit.module("Attributes", function (hooks) {
	var test = document.getElementsByClassName("test")[0];

	hooks.before(function () {
		test.innerHTML = '<div class="testtemp"></div>';
	});

	QUnit.test("$.fn.data", function (assert) {
		var main = $(".testtemp"),
			rmain = document.getElementsByClassName("testtemp")[0],
			json = {foo: "bar", foo2: "bar2"};

		// set data
		assert.deepEqual(main.data("var", "value"), main, "Returns itself when setting data");
		assert.equal(main.data("var"), "value", "Can set data");
		main.data("json", json);
		assert.deepEqual(main.data("json"), json, "Can set and get data as a plain object");
		assert.deepEqual(main.data(), {var: "value", json: json}, "Can retrieve all data from node");
	});

	hooks.after(function () {
		test.innerHTML = "";
	});
});
