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

	describe("$.fn.show", () => {
		it("returns self on set", () => {
			test.innerHTML = '<div class="testtemp"><div style="display: none;"></div></div>';
			const obj = $(".testtemp div");
			expect(obj.show()).toBe(obj);
		});

		it("shows hidden elements", () => {
			test.innerHTML = '<div class="testtemp"><div style="display: none;"></div><div style="display: none;"></div></div>';
			const obj = $(".testtemp div");
			obj.show();
			let show = 0;
			obj.get().forEach(item => {
				show += (item as HTMLElement).style.display !== "none" ? 1 : 0;
			});
			expect(show).toBe(obj.length);
		});
	});

	describe("$.fn.hide", () => {
		it("returns self on set", () => {
			test.innerHTML = '<div class="testtemp"><div></div></div>';
			const obj = $(".testtemp div");
			expect(obj.hide()).toBe(obj);
		});

		it("hides visible elements", () => {
			test.innerHTML = '<div class="testtemp"><div></div><div></div></div>';
			const obj = $(".testtemp div");
			obj.hide();
			let hide = 0;
			obj.get().forEach(item => {
				hide += (item as HTMLElement).style.display === "none" ? 1 : 0;
			});
			expect(hide).toBe(obj.length);
		});
	});

	describe("$.fn.toggle", () => {
		it("returns self on set", () => {
			test.innerHTML = '<div class="testtemp"><div style="display: none;"></div></div>';
			const obj = $(".testtemp div");
			expect(obj.toggle()).toBe(obj);
		});

		it("toggles visibility", () => {
			test.innerHTML = '<div class="testtemp"><div style="display: none;"></div><div style="display: inline-block;"></div><div style="display: flex;"><div></div></div><div style="display: none;"><div style="display: none;"></div></div></div>';
			const obj = $(".testtemp div");
			obj.toggle();
			let show = 0, hide = 0;
			obj.get().forEach(item => {
				hide += (item as HTMLElement).style.display === "none" ? 1 : 0;
				show += (item as HTMLElement).style.display !== "none" ? 1 : 0;
			});
			expect(show).toBe(3);
			expect(hide).toBe(3);
		});

		it("restores initial display values on double toggle", () => {
			test.innerHTML = '<div class="testtemp"><div style="display: none;"></div><div style="display: inline-block;"></div><div style="display: flex;"><div></div></div><div style="display: none;"><div style="display: none;"></div></div></div>';
			const obj = $(".testtemp div");
			const initial = ["none", "inline-block", "flex", "", "none", "none"];
			obj.toggle();
			obj.toggle();
			obj.get().forEach((item, i) => {
				expect((item as HTMLElement).style.display).toBe(initial[i]);
			});
		});
	});
});
