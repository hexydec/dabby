export default $ => {
	return {
		"attr#read-attr": {
			cycle: () => {
				$(".test").attr("style", "border:1px solid red");
			},
			fn: () => {
				$(".test").attr("style");
			}
		},
		"attr#write-attr": {
			cycle: () => {
				$(".test").attr("style", "");
			},
			fn: () => {
				$(".test").attr("style", "border:1px solid red");
			}
		}
	}
};
