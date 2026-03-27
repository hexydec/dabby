import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Traversal", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.find", () => {
		it("can find descendants by selector", () => {
			test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"><div class="findme"></div></div><div class="class3"><div class="findme"></div></div></div>';
			const obj = $(".testtemp");
			expect(obj.find(".findme").get()).toEqual($(".testtemp .findme").get());
		});

		it("can find descendants by node collection", () => {
			test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div></div>';
			const obj = $(".testtemp");
			expect(obj.find(obj.get(0).getElementsByClassName("class1")).get()).toEqual($(".testtemp .class1").get());
		});

		it("returns empty for no matches", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			expect($(".testtemp").find(".nonexistent").length).toBe(0);
		});

		it("returns empty for empty collection", () => {
			expect($(".nonexistent").find("div").length).toBe(0);
		});
	});
});
