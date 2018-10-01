import {$} from "../../../dist/dabby.js";

QUnit.module("Utils");

QUnit.test("$.extend", function (assert) {
	assert.deepEqual($.extend({foo: "foo"}, {bar: "bar"}), {foo: "foo", bar: "bar"}, "$.extend simple");
	assert.deepEqual($.extend({foo: "foo", bar: "foo"}, {bar: "bar"}), {foo: "foo", bar: "bar"}, "$.extend overwrite");
	assert.deepEqual($.extend(true, {deep: {foo: "foo", bar: "foo"}}, {deep: {bar: "bar"}}), {deep: {foo: "foo", bar: "bar"}}, "$.extend overwrite");
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
		), {
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
});
