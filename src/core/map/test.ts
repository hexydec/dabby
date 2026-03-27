import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Core", () => {
	let test;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.map", () => {
		it("can extract children from a list of nodes", () => {
			test.innerHTML = '<div class="testtemp"><p>first</p></div><div class="testtemp"><p>second</p></div>';
			const output = $(".testtemp").map(function () {
				return $("p", this);
			});
			expect($("<div>").append(output).html()).toBe("<p>first</p><p>second</p>");
		});

		it("returns a Dabby object", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const result = $(".testtemp").map(function () { return this; });
			expect(result.get).toBeDefined();
		});

		it("handles empty collection", () => {
			const result = $(".nonexistent").map(function () { return this; });
			expect(result.length).toBe(0);
		});
	});
});
