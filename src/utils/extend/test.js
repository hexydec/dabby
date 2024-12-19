import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.extend", function (assert) {
	assert.deepEqual($.extend({foo: "foo"}, {bar: "bar"}), {foo: "foo", bar: "bar"}, "$.extend simple");
	assert.deepEqual($.extend({foo: "foo", bar: "foo"}, {bar: "bar"}), {foo: "foo", bar: "bar"}, "$.extend overwrite");
	assert.deepEqual($.extend(true, {deep: {foo: "foo", bar: "foo"}}, {deep: {bar: "bar"}}), {deep: {foo: "foo", bar: "bar"}}, "$.extend deep copy 2 objects");
	assert.deepEqual(
		$.extend(
			true,
			{deep: {foo: "foo", bar: "foo"}},
			{deep: {bar: "bar"}},
			{deep: {foobar: "foobar"}}
		),
		{deep: {foo: "foo", bar: "bar", foobar: "foobar"}},
		"$.extend deep copy 3 objects"
	);
	assert.deepEqual(
		$.extend(
			true,
			{
				foo: "foo",
				bar: "foo",
				deep: {
					value1: false,
					value2: "no",
					value3: {
						value: "foo"
					},
					arr: [1,2]
				}
			}, {
				bar: {
					value: "bar"
				},
				deep: {
					value1: true,
					value2: "yes",
					value3: {
						value: "bar",
						value2: "foo"
					},
					arr: [3,4]
				}
			}
		),
		{
			foo: "foo",
			bar: {
				value: "bar"
			},
			deep: {
				value1: true,
				value2: "yes",
				value3: {
					value: "bar",
					value2: "foo"
				},
				arr: [3,4]
			}
		},
		"$.extend deep merge"
	);
	assert.deepEqual(
		$.extend(
			true,
			{
				foo: "foo",
				bar: "foo",
				deep: {
					value1: false,
					value2: "no",
					value3: {
						value: "foo"
					},
					arr: [1,2]
				}
			}, {
				bar: {
					value: "bar"
				},
				deep: {
					value1: true,
					value2: "yes",
					value3: {
						value: "bar",
						value2: "foo"
					},
					arr: [3,4]
				}
			}, {
				foo: "bar",
				bar: {
					value: "foo",
					foo: "bar"
				},
				deep: {
					value2: {
						foo: "bar"
					},
					value3: {
						value: "foo",
						value2: "bar"
					},
					arr: [5,6,7]
				}
			}
		),
		{
			foo: "bar",
			bar: {
				value: "foo",
				foo: "bar"
			},
			deep: {
				value1: true,
				value2: {
					foo: "bar"
				},
				value3: {
					value: "foo",
					value2: "bar"
				},
				arr: [5,6,7]
			}
		},
		"$.extend deep merge"
	);
	assert.deepEqual(
		$.extend(
			true,
			{arr: {not: "arr"}, obj: ["is", "array"]},
			{arr: ["is", "arr"], obj: {is: "obj"}}
		),
		{arr: ["is", "arr"], obj: {is: "obj"}},
		"$.extend deep merge"
	);

	// test extending Dabby
	let int = 0;
	$.extend({
		testExtend: function () {
			int++;
		}
	});
	$.testExtend();
	assert.equal(int, 1, "Can extend dabby with new method and show it has been added/is working");
});