import $ from "../../../dist/dabby.js";

QUnit.module("Attributes");

QUnit.test("$.fn.val", function (assert) {
	var obj = $("<input>", {type: "text", value: "test"}),
		multi = document.createElement("select"),
		text = $("<textarea>", {text: "test"}), // write test for this
		i = 0,
		opt,
		radio = $("<input>", {type: "radio", name: "radio", value: "radio1"}).add(
			$("<input>", {type: "radio", name: "radio", value: "radio2"})
		),
		select = $("<select>")
			.append($("<option>", {text: "Select item"}))
			.append($("<option>", {value: 1, text: "Item 1"}))
			.append($("<option>", {value: 2, text: "Item 2"}))
			.append($("<option>", {text: "3"}));

	assert.equal("test", obj.val(), "Can read value");
	assert.deepEqual(obj, obj.val("new value"), "Returns self when setting value");
	assert.equal("new value", obj.val(), "Can set value");

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
	assert.equal("new value", text.val(), "Can set and read value from textarea");

	assert.equal("radio1", radio.val(), "Can retrieve value of radio box");
	assert.equal(radio, radio.val(["radio2"]), "Can set value of radio box");
	assert.equal("radio2", radio.filter(":checked").val(), "Can retrieve value of radio box");

	assert.equal(select.val(), "Select item", "Can retrieve value of select box");
	select.val(2);
	assert.equal(select.val(), "2", "Can set value of select box");
	select.val(3);
	assert.equal(select.val(), "3", "Can set value of select box that has no value attribute");
});
