import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Ajax", () => {
	describe("$.getScript", () => {
		it("$.getScript function exists", () => {
			expect(typeof $.getScript).toBe("function");
		});
	});
});
