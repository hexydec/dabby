if (!Array.from) {
	Array.from = function (arrayLike, mapFn, thisArg) {
		var arr = [].slice.call(arrayLike);
		if (typeof mapFn === "function") {
			arr = arr.map(mapFn, thisArg);
		}
		return arr;
	};
}
