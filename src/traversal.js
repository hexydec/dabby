define(["core"], function ($) {
	$.fn.eq = function (i) {
		return $(this[i >= 0 ? i : i + this.length]);
	};
	$.fn.find = function (selector) {
		return $(selector, this);
	};
	$.fn.first = function () {
		return this[0] ? $(this[0]) : $();
	};
	$.fn.last = function () {
		var len = this.length;
		return len ? $(this[len - 1]) : $();
	};
});