let domready = false,
	dabby = function (selector, context) {
		let nodes = [],
			match,
			obj;

		// enables new object to be created through $()
		if (!(this instanceof dabby)) {
			return new dabby(selector, context);

		// if no selector, return empty colletion
		} else if (selector) {

			// $ collection
			if (selector instanceof dabby) {
				return selector;

			// single node
			} else if (selector.nodeType) {
				nodes = [selector];

			// ready function
			} else if ($.isFunction(selector)) {
				if (domready) {
					selector.call(document, $);
				} else {
					document.addEventListener("DOMContentLoaded", () => {
						selector.call(document, $);
						domready = true;
					}, {once: true});
				}

			// array|NodeList|HTMLCollection of nodes
			} else if (typeof selector !== "string") {
				nodes = selector;

			// CSS selector
			} else if (!selector.includes("<")) {
				context = context || document;
				$(context).each(function () {
					nodes = nodes.concat(Array.from(this.querySelectorAll(selector)));
				});

			// create a single node and attach properties
			} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
				nodes.push(document.createElement(match[1]));

				// context is CSS attributes
				if (context instanceof Object) {
					obj = $(nodes);
					$.each(context, (prop, value) => {
						obj.attr(prop, value);
					});
				}

			// parse HTML into nodes
			} else {
				//nodes = (context || doc).createRange().createContextualFragment(selector).childNodes; // not supported in iOS 9
				obj = document.createElement("template");
				obj.innerHTML = selector;
				nodes = obj.content ? obj.content.childNodes : obj.childNodes;
			}
		}

		// build nodes
		this.length = 0;
		nodes.forEach(node => {
			if ([1, 9, 11].includes(node.nodeType)) { // only element, document and documentFragment
				this[this.length++] = node;
			}
		});
		return this;
	},
	$ = dabby; // alias in this scope

// alias functions
dabby.fn = dabby.prototype;
