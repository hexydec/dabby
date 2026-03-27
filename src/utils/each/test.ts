import { describe, it, expect, beforeAll, afterAll } from "vitest";
import $ from "../../build.js";

describe("Utils", () => {
	describe("$.each", () => {
		it("can run a function on an object", () => {
			const obj = { no1: 1, no2: 2, no3: 3, no4: 4 };
			const output: number[] = [];
			$.each(obj, function (i: string, item: number) {
				output.push(item * 2);
			});
			expect(output).toEqual([2, 4, 6, 8]);
		});

		it("can run a function on an array", () => {
			const arr = [1, 2, 3, 4];
			const output: number[] = [];
			let numeric = true;
			$.each(arr, function (i: number, item: number) {
				output.push(item * 2);
				if (typeof i !== "number") {
					numeric = false;
				}
			});
			expect(output).toEqual([2, 4, 6, 8]);
			expect(numeric).toBe(true);
		});

		it("can break early by returning false", () => {
			const arr = [1, 2, 3, 4];
			const output: number[] = [];
			$.each(arr, function (i: number, item: number) {
				output.push(item);
				if (item === 2) return false;
			});
			expect(output).toEqual([1, 2]);
		});
	});
});
