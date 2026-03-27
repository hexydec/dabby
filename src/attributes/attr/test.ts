import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Attributes", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.attr", () => {
		it("returns itself when setting class", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const main = $(".testtemp");
			expect(main.attr("class", "testtemp testclass")).toBe(main);
		});

		it("can set and get class", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const main = $(".testtemp");
			const rmain = document.querySelector(".testtemp") as HTMLElement;
			main.attr("class", "testtemp testclass");
			expect(rmain.className).toBe("testtemp testclass");
			expect(main.attr("class")).toBe("testtemp testclass");
		});

		it("can remove class", () => {
			test.innerHTML = '<div class="testtemp testclass"></div>';
			const main = $(".testtemp");
			main.attr("class", "testtemp");
			expect(main.attr("class")).toBe("testtemp");
		});

		it("can set and get style", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const main = $(".testtemp");
			const rmain = document.querySelector(".testtemp") as HTMLElement;
			const style = "padding-top: 10px;";
			main.attr("style", style);
			expect(rmain.style.cssText).toBe(style);
			expect(main.attr("style")).toBe(style);
		});

		it("can set and get arbitrary attribute", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const main = $(".testtemp");
			const rmain = document.querySelector(".testtemp") as HTMLElement;
			main.attr("itemprop", "articleBody");
			expect(rmain.getAttribute("itemprop")).toBe("articleBody");
			expect(main.attr("itemprop")).toBe("articleBody");
		});

		it("can remove attribute by setting null", () => {
			test.innerHTML = '<div class="testtemp" itemprop="test"></div>';
			const main = $(".testtemp");
			main.attr("itemprop", null);
			expect(main.attr("itemprop")).toBeNull();
		});

		it("can set attribute using callback", () => {
			test.innerHTML = '<div class="testtemp"></div><div class="testtemp"></div><div class="testtemp"></div>';
			const main = $(".testtemp");
			main.attr("data-test", function (i: number) { return "test-" + i; });
			let correct = true;
			main.each(function (i: number) {
				if (this.getAttribute("data-test") !== "test-" + i) {
					correct = false;
					return false;
				}
			});
			expect(correct).toBe(true);
		});
	});
});
