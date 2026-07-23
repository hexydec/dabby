import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Utils", () => {
	describe("$.isFunction", () => {
		it("returns true for functions", () => {
			expect($.isFunction(function () {})).toBe(true);
			expect($.isFunction($.isFunction)).toBe(true);
			expect($.isFunction((item: any) => item + 42)).toBe(true);
		});

		it("returns false for non-functions", () => {
			expect($.isFunction(window)).toBe(false);
			expect($.isFunction(document)).toBe(false);
			expect($.isFunction(document.createElement("div"))).toBe(false);
			expect($.isFunction("hi")).toBe(false);
			expect($.isFunction(5)).toBe(false);
			expect($.isFunction(3.14)).toBe(false);
			expect($.isFunction({})).toBe(false);
		});
	});
});
