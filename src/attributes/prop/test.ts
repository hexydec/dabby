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

	describe("$.fn.prop", () => {
		it("returns self on set", () => {
			const obj = $("<h1>", { tabindex: 1 });
			expect(obj.prop("title", "test")).toBe(obj);
		});

		it("can set property", () => {
			const obj = $("<h1>", { tabindex: 1 });
			obj.prop("title", "test");
			expect(obj.get(0).title).toBe("test");
		});

		it("can read property", () => {
			const obj = $("<h1>", { tabindex: 1 });
			obj.prop("title", "test");
			expect(obj.prop("title")).toBe("test");
			expect(obj.prop("tabindex")).toBe(1);
		});

		it("can set property via callback", () => {
			const obj = $("<h1>", { tabindex: 1 });
			obj.prop("tabIndex", (i: number, current: number) => current + 1);
			expect(obj.prop("tabindex")).toBe(2);
		});

		it("can read boolean property", () => {
			const obj = $("<input>", { type: "checkbox", checked: "checked" });
			expect(obj.prop("checked")).toBe(true);
		});

		it("can remove value from property", () => {
			const obj = $("<input>", { type: "checkbox", checked: "checked" });
			obj.prop("checked", false);
			expect((obj.get(0) as HTMLInputElement).checked).toBe(false);
		});
	});
});
