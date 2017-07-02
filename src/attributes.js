define(["core"], function ($) {
	$.fn.html = function (html) {
		var $this = this,
			i;
		
		// set
		if (html) {
			for (i = 0; i < $this.length; i += 1) {
				$this[i].innerHTML = html;
			}
			return $this;
		
		// get
		} else if (this[0]) {
			return this[0].innerHTML;
		}
	};
	
	$.fn.empty = function (html) {
		var $this = this,
			i = 0;
			
		for (; i < $this.length; i += 1) {
			$this[i].innerHTML = "";
		}
		return $this;
	};
	
	$.fn.clone = function () {
		var $this = this,
			nodes = [],
			i = 0;
		
		for (; i < $this.length; i += 1) {
			nodes.push($this[i].cloneNode(true));
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
	}, function (pos, name) {
		$.fn[name] = function (html) {
			var $this = this,
				i = 0;
			for (; i < $this.length; i += 1) {
				$this[i].insertAdjacentHtml(pos, html);
			}
			return $this;
		};
	});
	
	["add", "remove", "toggle"].forEach(function (name) {
		$.fn[name + "Class"] = function (cls) {
			var $this = this,
				i = 0;
				
			for (; i < $this.length; i += 1) {
				$this[i].classList[name](cls);
			}
			return $this;
		};
	});
	
	$.fn.attr = function (prop, value) {
		if (prop) {
			
			// set
			if (value || value === "") {
				for (var i = 0; i < this.length; i += 1) {
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
					if (this[0].style.cssText) {
						return this[0].style.cssText;
					}
				} else if (prop === "class") {
					if (this[0].className) {
						return this[0].className;
					}
				} else {
					if (this[0].getAttribute(prop)) {
						return this[0].getAttribute(prop);
					}
				}
			}
		}
	};
	
	$.fn.prop = function (prop, value) {
		prop = prop.toLower();
		
		// set
		if (value || value === "") {
			this[prop] = value;
			return this;
		} else {
			return this[prop];
		}
	};
	
	$.fn.val = function (value) {
		var $this = this;
		if (value === undefined) {
			if ($this[0].multiple) {
			return $($this[0])
				.find("option")
				.filter(function () {
					return this.selected;
				})
				.map(function () {
					return this.value;
				});
			} else {
				return $this[0].value;
			}
		} else {
			for (var i = 0; i < $this.length; i += 1) {
				if ($this[i].multiple) {
					$($this[0])
						.find("option")
						.each(function () {
							this.selected = [].indexOf.call(value, this.value);
						});
				} else {
					$this[i].value = value;
				}
			}
			return $this;
		}
	};
	
	$.fn.css = function (props, value) {
		var $this = this,
			name = props,
			n = 0,
			len = props.length,
			css,
			output = {},
			dasherise = function (prop) {
				return prop.replace(/[A-Z]/g, function (letter) {return "-" + letter.toLowerCase();});
			};
		
		// retrieve value from first property
		if (value === undefined && props.constructor === Array) {
			if (this.length) {
				css = getComputedStyle($this[0], "");
				if (typeof name === "string") {
					props = [name];
				}
				for (; n < len; n += 1) {
					props[n] = dasherise(props[n]);
					output[props[n]] = css.getPropertyValue(props[n]);
					if (len === 1) {
						return output[props[n]];
					}
				}
				return output;
			}
		
		// set the values
		} else {
			if (typeof name === "string") {
				props = {};
				props[name] = value;
			}
			$.each(props, function (prop, val) {
				prop = dasherise(prop);
				//prop = prop.replace(/-([a-z])/gi, function (text, letter) {return letter.toUpperCase();});
				for (var i = 0; i < $this.length; i += 1) {
					if (!val && val !== 0) {
						$this[i].style.removeProperty(prop);
					} else {
						$this[i].style.setProperty(prop, val);
					}
				}
			});
			return $this;
		}
	};
});