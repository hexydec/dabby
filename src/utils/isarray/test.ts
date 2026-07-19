import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Utils", () => {
	describe("$.isArray", () => {
		it("returns true for arrays", () => {
			expect($.isArray([])).toBe(true);
			expect($.isArray([1, 2, 3])).toBe(true);
			expect($.isArray(new Array(3))).toBe(true);
		});

		it("returns false for non-arrays", () => {
			expect($.isArray(window)).toBe(false);
			expect($.isArray(document)).toBe(false);
			expect($.isArray(document.body.children)).toBe(false);
			expect($.isArray("dabby")).toBe(false);
			expect($.isArray(5)).toBe(false);
			expect($.isArray({})).toBe(false);
			expect($.isArray(null)).toBe(false);
		});
	});
});
