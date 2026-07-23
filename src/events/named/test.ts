import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Events", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("named events", () => {
		it("click() triggers bound handler", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			let clicked = false;
			const main = $(".testtemp");
			main.click(() => { clicked = true; });
			main.click();
			expect(clicked).toBe(true);
		});

		it("named event returns Dabby instance for chaining", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const main = $(".testtemp");
			const result = main.click(() => {});
			expect(result.get()).toEqual(main.get());
		});

		it("keydown() triggers bound handler", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			let keyPressed = false;
			const main = $(".testtemp");
			main.keydown(() => { keyPressed = true; });
			main.keydown();
			expect(keyPressed).toBe(true);
		});

		it("change() triggers bound handler", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			let changed = false;
			const main = $(".testtemp");
			main.change(() => { changed = true; });
			main.change();
			expect(changed).toBe(true);
		});

		it("mouseenter() triggers bound handler", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			let entered = false;
			const main = $(".testtemp");
			main.mouseenter(() => { entered = true; });
			main.mouseenter();
			expect(entered).toBe(true);
		});
	});
});
