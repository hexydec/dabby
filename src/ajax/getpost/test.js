import $ from "../../../dist/dabby.js";

QUnit.module("Ajax");

QUnit.test("$.get", function (assert) {
	assert.expect(8);
	var done = assert.async(4);

	//basic request
	$.get("../tests/assets/sample.html", function (response, status) {
		assert.equal(status, "success", "Can make an AJAX request");
		assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
		done();
	});

	//basic request as object
	$.get({url: "../tests/assets/sample.html", success: function (response, status) {
		assert.equal(status, "success", "Can make an AJAX request");
		assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
		done();
	}});

	//request with data
	var data = {foo: "foo", bar: "bar"};
	$.get("../tests/assets/reflection.js", data, function (response, status) {
		assert.equal(status, "success", "Can make an AJAX request");
		assert.ok(dabbyReflection.foo === data.foo && dabbyReflection.bar === data.bar, "AJAX request set the posted data");
		done();
	});

	// specify data type
	var data = {foo: "foo", bar: "bar", type: "text"};
	$.get("../tests/assets/json.txt", function (response, status) {
		assert.equal(status, "success", "Can make an AJAX request");
		assert.deepEqual(response, data, "AJAX response processed the data corretly");
		done();
	}, "json");
});
