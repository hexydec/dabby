import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Manipulation", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.replaceWith", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"><div></div><div></div><div></div></div>';
		});

		it("can replace nodes with HTML string", () => {
			$(".testtemp div").replaceWith("<h2>");
			expect($(".testtemp h2").length).toBe(3);
		});

		it("can replace nodes with Dabby object", () => {
			const div = $("<div>");
			$(".testtemp div").replaceWith(div);
			expect($(".testtemp div").length).toBe(3);
		});
	});

	describe("$.fn.replaceAll", () => {
		it("can replace nodes", () => {
			test.innerHTML = '<div class="testtemp"><h2></h2><h2></h2><h2></h2></div>';
			$("<div>").replaceAll(".testtemp h2");
			expect($(".testtemp div").length).toBe(3);
		});
	});
});
