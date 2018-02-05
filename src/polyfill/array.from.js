if (!Array.from) {
	Array.from = (arrayLike, mapFn, thisArg) => {
		let arr = [].slice.call(arrayLike);
		if (typeof mapFn === "function") {
			arr = arr.map(mapFn, thisArg);
		}
		return arr;
	};
}
