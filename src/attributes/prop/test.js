import $ from "../../../dist/dabby.js";

QUnit.module("Attributes", hooks => {

	QUnit.test("$.fn.prop", function (assert) {
		var obj = $("<h1>", {tabindex: 1});

		assert.deepEqual(obj.prop("title", "test"), obj, "Returns self on set");
		assert.equal(obj.get(0).title, "test", "Can set property");
		assert.equal(obj.prop("title"), "test", "Can read property");
		assert.equal(obj.prop("tabindex"), 1, "Can read property");
		obj.prop("tabIndex", (i, current) => current + 1);
		assert.equal(obj.prop("tabindex"), 2, "Can read property set via callback");

		var obj = $("<input>", {type: "checkbox", name: "foo", value: "bar", checked: "checked"});

		assert.equal(obj.prop("checked"), true, "Can read boolean property");
		obj.prop("checked", "");
		assert.equal(obj.get(0).checked, false, "Can remove value from property");
		assert.equal(obj.prop("title"), "", "Unset property returns undefined");
	});
});