import { describe, it, expect } from "vitest";
import $ from "../../build.js";

describe("Ajax", () => {
	describe("$.get / $.post", () => {
		it("$.get function exists", () => {
			expect(typeof $.get).toBe("function");
		});

		it("$.post function exists", () => {
			expect(typeof $.post).toBe("function");
		});
	});
});
