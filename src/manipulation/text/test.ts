import { describe, it, expect, beforeAll, afterAll } from "vitest";
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

	describe("$.fn.text", () => {
		it("can retrieve text from nested elements", () => {
			test.innerHTML = '<div class="testtemp">This <strong>is</strong> a <span><span><span>test yo</span></span></span></div>';
			expect($(".testtemp").text()).toBe("This is a test yo");
		});

		it("returns self on set text", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const obj = $(".testtemp");
			expect(obj.text("hello")).toBe(obj);
		});

		it("can set text", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const obj = $(".testtemp");
			obj.text("This is a test yo");
			expect(obj.get(0).textContent).toBe("This is a test yo");
		});

		it("escapes HTML when setting text", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const obj = $(".testtemp");
			obj.text("<b>not bold</b>");
			expect(obj.html()).not.toContain("<b>");
			expect(obj.text()).toBe("<b>not bold</b>");
		});

		it("concatenates text from multiple elements", () => {
			test.innerHTML = '<span class="t">a</span><span class="t">b</span><span class="t">c</span>';
			expect($(".t").text()).toBe("abc");
		});
	});
});
