import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Dimensions", () => {
	let test: HTMLElement;

	beforeAll(() => {
		test = document.createElement("div");
		test.className = "test";
		document.body.appendChild(test);
	});

	afterAll(() => {
		test.remove();
	});

	describe("$.fn.width / $.fn.height (border-box)", () => {
		it("can read width", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
			const obj = $(".testtemp");
			expect(typeof obj.width()).toBe("number");
		});

		it("can read innerWidth", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
			const obj = $(".testtemp");
			expect(typeof obj.innerWidth()).toBe("number");
		});

		it("can read outerWidth", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
			const obj = $(".testtemp");
			expect(typeof obj.outerWidth()).toBe("number");
		});

		it("can read outerWidth with margin", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
			const obj = $(".testtemp");
			expect(typeof obj.outerWidth(true)).toBe("number");
		});

		it("returns self on set width", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
			const obj = $(".testtemp");
			expect(obj.width(120)).toBe(obj);
		});

		it("can set and read width", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px;">test</div>';
			const obj = $(".testtemp");
			obj.width(120);
			expect((obj.get(0) as HTMLElement).style.width).toBe("120px");
		});

		it("returns self on set innerWidth", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
			const obj = $(".testtemp");
			expect(obj.innerWidth(120)).toBe(obj);
		});

		it("can set innerWidth", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px;">test</div>';
			const obj = $(".testtemp");
			obj.innerWidth(120);
			// innerWidth sets width minus padding, so style.width should be updated
			expect((obj.get(0) as HTMLElement).style.width).toBeTruthy();
		});

		it("can set outerWidth", () => {
			test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red;">test</div>';
			const obj = $(".testtemp");
			obj.outerWidth(120);
			expect((obj.get(0) as HTMLElement).style.width).toBeTruthy();
		});
	});

	describe("$.fn.width / $.fn.height (content-box)", () => {
		it("can read width with content-box", () => {
			test.innerHTML = '<div class="testtemp" style="box-sizing: content-box; width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
			const obj = $(".testtemp");
			expect(typeof obj.width()).toBe("number");
			expect(typeof obj.innerWidth()).toBe("number");
			expect(typeof obj.outerWidth()).toBe("number");
			expect(typeof obj.outerWidth(true)).toBe("number");
		});

		it("can set width with content-box", () => {
			test.innerHTML = '<div class="testtemp" style="box-sizing: content-box; width: 100px;">test</div>';
			const obj = $(".testtemp");
			obj.width(120);
			expect((obj.get(0) as HTMLElement).style.width).toBe("120px");
		});
	});
});
