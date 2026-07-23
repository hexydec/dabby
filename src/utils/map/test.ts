import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Utils", () => {
	describe("$.map", () => {
		it("can map an array", () => {
			const arr = ["foo", "bar", ["foo2", "bar2", ["foo3", "bar3"]], null, undefined];
			const result = ["foo", "bar", "foo2", "bar2", ["foo3", "bar3"]];
			const output = $.map(arr, function (item: any) { return item; });
			expect(output).toEqual(result);
		});

		it("can map an object", () => {
			const obj = { foo: "foo", bar: "bar", arr: ["foo2", "bar2", ["foo3", "bar3"]], testn: null, testu: undefined };
			const result = ["foo", "bar", "foo2", "bar2", ["foo3", "bar3"]];
			const output = $.map(obj, function (item: any) { return item; });
			expect(output).toEqual(result);
		});

		it("can transform values", () => {
			const arr = [1, 2, 3];
			const output = $.map(arr, function (item: number) { return item * 2; });
			expect(output).toEqual([2, 4, 6]);
		});

		it("filters out null/undefined returns", () => {
			const arr = [1, 2, 3, 4];
			const output = $.map(arr, function (item: number) { return item > 2 ? item : null; });
			expect(output).toEqual([3, 4]);
		});
	});
});
