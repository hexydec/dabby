export default $ => {
	return {
		"attr#read-attr": {
			cycle: () => {
				$(".test").attr("style", "border:1px solid red");
			},
			fn: () => {
				$(".test").attr("style");
			},
		}
	}
};
