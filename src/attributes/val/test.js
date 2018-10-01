import {$} from "../../../dist/dabby.js";

QUnit.module("Attributes");

QUnit.test("$.fn.val", function (assert) {
	var obj = $("<input>", {type: "text", value: "test"}),
		multi = document.createElement("select"),
		text = $("<textarea>", {text: "test"}), // write test for this
		i = 0,
		opt;

	assert.equal(obj.val(), "test", "Can read value");
	assert.deepEqual(obj.val("new value"), obj, "Returns self when setting value");
	assert.equal(obj.val(), "new value", "Can set value");

	multi.multiple = true;
	for (; i < 10; i += 1) {
		opt = document.createElement("option");
		opt.value = i;
		opt.innerHTML = i;
		multi.appendChild(opt);
	}
	obj = $(multi).val([1,3,5]);

	assert.deepEqual(obj.val(), ["1","3","5"], "Can set and read multiple values");

	text.val("new value");
	assert.equal(text.val(), "new value", "Can set and read value from textarea");
});
