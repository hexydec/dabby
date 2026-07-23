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

	describe("$.fn.triggerHandler", () => {
		it("calls the handler", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			let called = false;
			const main = $(".testtemp");
			main.on("click", () => { called = true; return "handler-result"; });
			main.triggerHandler("click");
			expect(called).toBe(true);
		});

		it("returns a value from the handler", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			const main = $(".testtemp");
			main.on("custom", () => "result");
			const result = main.triggerHandler("custom");
			expect(result).toBeDefined();
		});

		it("passes data to handler", () => {
			test.innerHTML = '<div class="testtemp"></div>';
			let receivedData: unknown;
			const main = $(".testtemp");
			main.on("custom2", (e: CustomEvent) => {
				receivedData = e.arg;
			});
			main.triggerHandler("custom2", "test-data");
			expect(receivedData).toBe("test-data");
		});

		it("returns undefined for empty collection", () => {
			expect($(".nonexistent").triggerHandler("click")).toBeUndefined();
		});
	});
});
