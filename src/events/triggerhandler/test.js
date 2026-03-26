import $ from "../../../dist/dabby.js";

QUnit.module("Events");

QUnit.test("$.fn.triggerHandler", function (assert) {
	var test = document.getElementsByClassName("test")[0];
	test.innerHTML = '<div class="testtemp"></div>';

	var called = false;
	var main = $(".testtemp");

	main.on("click", function () {
		called = true;
		return "handler-result";
	});

	var result = main.triggerHandler("click");
	assert.ok(called, "Handler was called");
	assert.ok(result !== undefined, "Returns a value from the handler");

	// With data
	var receivedData;
	main.on("custom", function (e) {
		receivedData = e.arg;
	});
	main.triggerHandler("custom", "test-data");
	assert.equal(receivedData, "test-data", "Passes data to handler");

	// Empty collection
	assert.equal($(".nonexistent").triggerHandler("click"), undefined, "Returns undefined for empty collection");

	test.innerHTML = "";
});
