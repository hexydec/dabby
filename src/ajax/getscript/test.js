import {$} from "../../../dist/dabby.js";

QUnit.module("Ajax");

QUnit.test("$.getScript", function (assert) {
	assert.expect(2);
	var done = assert.async(1);

	//basic request
	window.dabbyScriptSuccess = false;
	$.getScript("../tests/assets/sample.js", function (response, status) {
		assert.equal(status, "success", "Can include a script");
		assert.ok(window.dabbyScriptSuccess, "Script included correctly");
		done();
	});
});
