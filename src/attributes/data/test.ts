import { describe, it, expect, beforeEach, beforeAll, afterAll } from "vitest";
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

	describe("$.fn.data", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"></div>';
		});

		it("returns itself when setting data", () => {
			const main = $(".testtemp");
			expect(main.data("var", "value")).toBe(main);
		});

		it("can set and get data", () => {
			const main = $(".testtemp");
			main.data("var", "value");
			expect(main.data("var")).toBe("value");
		});

		it("can set and get data as a plain object", () => {
			const main = $(".testtemp");
			const json = { foo: "bar", foo2: "bar2" };
			main.data("json", json);
			expect(main.data("json")).toEqual(json);
		});

		it("can retrieve all data from node", () => {
			const main = $(".testtemp");
			main.data("var", "value");
			const json = { foo: "bar", foo2: "bar2" };
			main.data("json", json);
			expect(main.data()).toEqual({ var: "value", json: json });
		});

		it("returns undefined for non-existent key", () => {
			const main = $(".testtemp");
			expect(main.data("nonexistent")).toBeUndefined();
		});

		it("can overwrite existing data", () => {
			const main = $(".testtemp");
			main.data("key", "old");
			main.data("key", "new");
			expect(main.data("key")).toBe("new");
		});
	});
});
