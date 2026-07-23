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

	describe("$.fn.html", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"></div>';
		});

		it("can read html", () => {
			const main = $(".testtemp");
			(test.querySelector(".testtemp") as HTMLElement).insertAdjacentHTML("beforeend", "<div>Test</div>");
			expect(main.html()).toBe("<div>Test</div>");
		});

		it("can set html", () => {
			const main = $(".testtemp");
			main.html("<div>Test</div>");
			expect(main.get(0).innerHTML).toBe("<div>Test</div>");
		});

		it("returns self on set", () => {
			const main = $(".testtemp");
			expect(main.html("<div>Test</div>")).toBe(main);
		});

		it("returns empty string for element with no children", () => {
			const main = $(".testtemp");
			expect(main.html()).toBe("");
		});

		it("can set html with callback", () => {
			test.innerHTML = '<div class="testtemp">old</div><div class="testtemp">old2</div>';
			const main = $(".testtemp");
			main.html(function (i: number, current: string) {
				return current + "-" + i;
			});
			expect(main.eq(0).html()).toBe("old-0");
			expect(main.eq(1).html()).toBe("old2-1");
		});
	});
});
