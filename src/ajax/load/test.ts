import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Ajax", () => {
	describe("$.fn.load", () => {
		it("load method exists on prototype", () => {
			const obj = $("<div>");
			expect(typeof obj.load).toBe("function");
		});
	});
});
