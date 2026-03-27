import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Ajax", () => {
	describe("$.param", () => {
		it("can encode an object to a query string", () => {
			const params = {
				foo: "bar",
				bar: "foo",
				foobar: {
					foo: "bar",
					bar: "foo",
				},
				fb: ["foo", "bar", "foobar"],
				enc: "this is=a&test"
			};
			const output = "foo=bar&bar=foo&foobar%5Bfoo%5D=bar&foobar%5Bbar%5D=foo&fb%5B%5D=foo&fb%5B%5D=bar&fb%5B%5D=foobar&enc=this%20is%3Da%26test";
			expect($.param(params)).toBe(output);
		});

		it("handles simple key-value pairs", () => {
			expect($.param({ a: "1", b: "2" })).toBe("a=1&b=2");
		});

		it("encodes special characters", () => {
			expect($.param({ key: "hello world" })).toBe("key=hello%20world");
		});
	});
});
