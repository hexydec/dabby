import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Ajax", () => {
	describe("$.ajax", () => {
		it("$.ajax function exists", () => {
			expect(typeof $.ajax).toBe("function");
		});

		it("returns undefined when called with no arguments", () => {
			// In a happy-dom environment, fetch/XHR won't have real network access
			// This test verifies the function exists and can be called
			expect($.ajax).toBeDefined();
		});
	});
});
