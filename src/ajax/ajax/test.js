QUnit.module("Ajax");

QUnit.test("$.ajax", function (assert) {
	assert.expect(5);
	var done = assert.async(3);
	$.ajax("../tests/assets/sample.html", {success: function (response, status) {
		assert.equal(status, 200, "Can make an AJAX request");
		assert.ok(response.indexOf("Sample HTML File") > -1, "AJAX request returned correct file");
		done();
	}});
	$.ajax("../tests/assets/sample.json", {success: function (response, status) {
		assert.equal(status, 200, "Can make an AJAX request");
		assert.equal(response.foo, "foo", "AJAX request returned json");
		done();
	}});
	$.ajax("../tests/assets/404.html", {error: function (response, status) {
		assert.equal(status, 404, "Can run callback on error");
		done();
	}});
});
