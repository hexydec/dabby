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

	describe("$.fn.prepend", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"><div class="first">First</div></div>';
		});

		it("returns itself on prepend", () => {
			const main = $(".testtemp");
			expect(main.prepend("<div>Prepend</div>")).toBe(main);
		});

		it("can prepend html", () => {
			const main = $(".testtemp");
			main.prepend("<div>Prepend</div>");
			expect(main.html()).toBe('<div>Prepend</div><div class="first">First</div>');
		});

		it("can prepend multiple nodes in the right order", () => {
			const main = $(".testtemp");
			const list = $('<div class="second"></div><div class="third"></div><div class="forth"></div>');
			main.prepend(list);
			expect(main.html()).toBe('<div class="second"></div><div class="third"></div><div class="forth"></div><div class="first">First</div>');
		});

		it("clones and moves objects correctly", () => {
			const main = $(".testtemp");
			main.prepend('<div class="second"></div><div class="third"></div><div class="forth"></div>');
			const copy = $(".testtemp .forth");
			$(".testtemp .second, .testtemp .third").prepend(copy);
			expect(main.html()).toBe('<div class="second"><div class="forth"></div></div><div class="third"><div class="forth"></div></div><div class="first">First</div>');
		});
	});

	describe("$.fn.append", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"><div class="first">First</div></div>';
		});

		it("returns itself on append", () => {
			const main = $(".testtemp");
			expect(main.append("<div>Append</div>")).toBe(main);
		});

		it("can append html", () => {
			const main = $(".testtemp");
			main.append("<div>Append</div>");
			expect(main.html()).toBe('<div class="first">First</div><div>Append</div>');
		});

		it("can append multiple nodes in the right order", () => {
			const main = $(".testtemp");
			const list = $('<div class="second"></div><div class="third"></div><div class="forth"></div>');
			main.append(list);
			expect(main.html()).toBe('<div class="first">First</div><div class="second"></div><div class="third"></div><div class="forth"></div>');
		});
	});

	describe("$.fn.before", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"><div class="first">First</div></div>';
		});

		it("returns itself on before", () => {
			const inner = $(".testtemp .first");
			expect(inner.before('<div class="before">Before</div>')).toBe(inner);
		});

		it("can insert html before", () => {
			const main = $(".testtemp");
			$(".testtemp .first").before('<div class="before">Before</div>');
			expect(main.html()).toBe('<div class="before">Before</div><div class="first">First</div>');
		});

		it("can move elements with before", () => {
			const main = $(".testtemp");
			const inner = $(".testtemp .first");
			inner.before('<div class="before">Before</div>');
			$(".testtemp .before").before(inner);
			expect(main.html()).toBe('<div class="first">First</div><div class="before">Before</div>');
		});

		it("can insert multiple nodes before", () => {
			const main = $(".testtemp");
			main.append('<div class="second">Second</div>');
			$(".testtemp div").before('<div class="another">Another</div>');
			expect(main.children().length).toBeGreaterThan(2);
		});
	});

	describe("$.fn.after", () => {
		beforeEach(() => {
			test.innerHTML = '<div class="testtemp"><div class="first">First</div></div>';
		});

		it("returns itself on after", () => {
			const inner = $(".testtemp .first");
			expect(inner.after('<div class="after">After</div>')).toBe(inner);
		});

		it("can insert html after", () => {
			const main = $(".testtemp");
			$(".testtemp .first").after('<div class="after">After</div>');
			expect(main.html()).toBe('<div class="first">First</div><div class="after">After</div>');
		});

		it("can insert with callback on multiple elements", () => {
			test.innerHTML = '<div class="testtemp"><div class="first">First</div><div class="second">Second</div></div>';
			$(".testtemp div").after(function () {
				return $("<span>", { "class": "after" });
			});
			expect($(".testtemp .after").length).toBe(2);
		});
	});
});
