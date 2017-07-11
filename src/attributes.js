define(["core", "utils"], function ($, utils) {
	$.fn.html = function (html) {
		
		// set
		if (html) {
			var i = this.length;
			while (i--) {
				this[i].innerHTML = html;
			}
			return this;
		
		// get
		} else if (this[0]) {
			return this[0].innerHTML;
		}
	};
	
	$.fn.empty = function (html) {
		var i = this.length;
		while (i--) {
			this[i].innerHTML = "";
		}
		return this;
	};
	
	$.fn.clone = function () {
		var nodes = [],
			i = this.length;
		
		while (i--) {
			nodes[i] = this[i].cloneNode(true);
		}
		return $(nodes);
	};
	
	$.fn.appendTo = function (html) {
		
	};
	
	$.fn.prependTo = function (html) {
		
	};
	
	$.each({
		before: "beforeBegin",
		prepend: "afterBegin",
		append: "beforeEnd",
		after: "afterEnd"
	}, function (name, pos) {
		$.fn[name] = function (html) {
			for (var i = 0; i < this.length; i += 1) {
				if (typeof html === "string") {
					this[i].insertAdjacentHtml(pos, html);
				} else {
					$(html).each(function () {
						this[i].insertAdjacentElement(pos, this);
					});
				}
			}
			return this;
		};
	});
	
	["add", "remove", "toggle"].forEach(function (name) {
		$.fn[name + "Class"] = function (cls) {
			var i = this.length;
			while (i--) {
				this[i].classList[name](cls);
			}
			return this;
		};
	});
	
	$.fn.attr = function (prop, value) {
		if (prop) {
			
			// set
			if (value || value === "") {
				var i = this.length;
				while (i--) {
					if (prop === "style") {
						this[i].style.cssText = value;
					} else if (prop === "class") {
						this[i].className = value;
					} else if (value === "") {
						this[i].removeAttribute(prop);
					} else {
						this[i].setAttribute(prop, value);
					}
				}
				return this;
			}
			
			// get
			if (this[0]) {
				if (prop === "style") {
					return this[0].style.cssText;
				}
				if (prop === "class") {
					return this[0].className;
				}
				return this[0].getAttribute(prop);
			}
		}
	};
	
	$.fn.data = function (name, data) {
		if (data) {
			var i = this.length;
			while (i--) {
				this[i].dataset[name] = data;
			}
			return this;
		} else if (this[0] && this[0].dataset[name]) {
			return JSON.parse(this[0].dataset[name]) || this[0].dataset[name];
		}
	};
	
	$.fn.prop = function (prop, value) {
		prop = prop.toLowerCase();
		
		// set
		if (value || value === "") {
			return this.each(function () {
				this[prop] = value;
			});
		} else if (this[0]) {
			return this[prop];
		}
	};
	
	$.fn.val = function (value) {
		if (value === undefined) {
			if (this[0].multiple) {
			return $(this[0])
				.find("option")
				.filter(function () {
					return this.selected;
				})
				.map(function () {
					return this.value;
				});
			} else {
				return this[0].value;
			}
		} else {
			var i = this.length;
			while (i--) {
				if (this[i].multiple) {
					$(this[0])
						.find("option")
						.each(function () {
							this.selected = [].indexOf.call(value, this.value);
						});
				} else {
					this[i].value = value;
				}
			}
			return this;
		}
	};
	
	$.fn.css = function (props, value) {
		var name = props,
			i = props.length,
			css,
			output = {};
		
		// retrieve value from first property
		if (value === undefined) {
			if (this[0]) {
				css = getComputedStyle(this[0], "");
				if (typeof name === "string") {
					props = [name];
				}
				while (i--) {
					props[i] = utils.dasherise(props[i]);
					output[props[i]] = css.getPropertyValue(props[i]);
					if (len === 1) {
						return output[props[i]];
					}
				}
				return output;
			}
		
		// set the values
		} else {
			return utils.setCss(this, props, value);
		}
	};
});