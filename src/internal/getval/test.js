import $ from "../../../dist/dabby.js";
import getVal from "./getval.js";

QUnit.module("Internal", hooks => {
	const test = document.getElementsByClassName("test")[0];

	hooks.before(() => {
		test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
	});

	QUnit.test("getVal", assert => {
		const obj = $(".test div");
		assert.deepEqual(getVal(obj, "test"), ["test", "test", "test"], "Can pass-through a value");
		assert.deepEqual(getVal(obj, function () {return $(this).attr("class");}), ["testtemp", "testtemp2", "testtemp3"], "Can use function as value");
		assert.deepEqual(getVal(obj, function (i, current) {return current;}, obj => obj.className), ["testtemp", "testtemp2", "testtemp3"], "Can use function as value and return original value");

		let clone = {foo: "bar", bar: "foo"};
		const val = getVal(obj, clone);
		val.map((item, i) => {
			item.foo = "foo" + i;
			return item;
		});
		assert.deepEqual(val, [{foo: "foo0", bar: "foo"}, {foo: "foo1", bar: "foo"}, {foo: "foo2", bar: "foo"}], "Objects are cloned onto each output");
		assert.deepEqual(clone, {foo: "bar", bar: "foo"}, "Original object was not changed when object was copied to each val");
	});

	hooks.after(() => {
		test.innerHTML = "";
	});
});
