import $ from "../../../dist/dabby.js";

QUnit.module("Ajax", function (hooks) {

	QUnit.test("$.param", function (assert) {
		var params = {
			foo: "bar",
			bar: "foo",
			foobar: {
				foo: "bar",
				bar: "foo",
			},
			fb: ["foo", "bar", "foobar"],
			enc: "this is=a&test"
		},
			output = "foo=bar&bar=foo&foobar%5Bfoo%5D=bar&foobar%5Bbar%5D=foo&fb%5B%5D=foo&fb%5B%5D=bar&fb%5B%5D=foobar&enc=this%20is%3Da%26test";
		assert.equal($.param(params), output, "Can encode an array to a query string");
	});
});