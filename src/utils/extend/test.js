import $ from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.extend", function (assert) {
	assert.deepEqual({foo: "foo", bar: "bar"}, $.extend({foo: "foo"}, {bar: "bar"}), "$.extend simple");
	assert.deepEqual({foo: "foo", bar: "bar"}, $.extend({foo: "foo", bar: "foo"}, {bar: "bar"}), "$.extend overwrite");
	assert.deepEqual({deep: {foo: "foo", bar: "bar"}}, $.extend(true, {deep: {foo: "foo", bar: "foo"}}, {deep: {bar: "bar"}}), "$.extend deep copy 2 objects");
	assert.deepEqual(
		{deep: {foo: "foo", bar: "bar", foobar: "foobar"}},
		$.extend(
			true,
			{deep: {foo: "foo", bar: "foo"}},
			{deep: {bar: "bar"}},
			{deep: {foobar: "foobar"}}
		),
		"$.extend deep copy 3 objects");
	assert.deepEqual(
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
		"$.extend deep merge"
	);
	assert.deepEqual(
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
		"$.extend deep merge"
	);
	assert.deepEqual(
		{arr: ["is", "arr"], obj: {is: "obj"}},
		$.extend(
			true,
			{arr: {not: "arr"}, obj: ["is", "array"]},
			{arr: ["is", "arr"], obj: {is: "obj"}}
		),
		"$.extend deep merge"
	);
});
