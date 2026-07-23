import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Utils", () => {
	describe("$.isWindow", () => {
		it("returns true for window", () => {
			expect($.isWindow(window)).toBe(true);
		});

		it("returns false for document", () => {
			expect($.isWindow(document)).toBe(false);
		});

		it("returns false for DOM elements", () => {
			expect($.isWindow(document.createElement("div"))).toBe(false);
		});
	});
});
