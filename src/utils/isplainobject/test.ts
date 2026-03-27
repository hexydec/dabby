import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Utils", () => {
	describe("$.isPlainObject", () => {
		it("returns false for DOM element", () => {
			expect($.isPlainObject(document.createElement("div"))).toBe(false);
		});

		it("returns false for null", () => {
			expect($.isPlainObject(null)).toBe(false);
		});

		it("returns false for instance of custom class", () => {
			function Foo() {}
			expect($.isPlainObject(new (Foo as any)())).toBe(false);
		});

		it("returns false for number primitive", () => {
			expect($.isPlainObject(5)).toBe(false);
		});

		it("returns false for string primitive", () => {
			expect($.isPlainObject("dabby")).toBe(false);
		});

		it("returns false for Number object", () => {
			expect($.isPlainObject(new Number(6))).toBe(false);
		});

		it("returns true for empty object", () => {
			expect($.isPlainObject({})).toBe(true);
		});

		it("returns true for new Object()", () => {
			expect($.isPlainObject(new Object())).toBe(true);
		});

		it("returns true for Object.create(null)", () => {
			expect($.isPlainObject(Object.create(null))).toBe(true);
		});

		it("returns false for arrays", () => {
			expect($.isPlainObject([])).toBe(false);
		});

		it("returns false for functions", () => {
			expect($.isPlainObject(() => {})).toBe(false);
		});

		it("returns false for Date objects", () => {
			expect($.isPlainObject(new Date())).toBe(false);
		});
	});
});
