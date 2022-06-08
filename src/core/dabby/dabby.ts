import proxy from "../../internal/proxy/proxy";
import isFunction from "../../internal/isfunction/isfunction";
import isWindow from "../../internal/iswindow/iswindow";
import isPlainObject from "../../internal/isplainobject/isplainobject";
import parseHTML from "../../internal/parsehtml/parsehtml";

export interface Callable {
	<T>(this: T): T;
	call<T>(this: any, ...argArray: any[]): T;
  }
  
  export interface DabbyObject {
	  [x: number]: any;
	  fn?: (obj: any) => Dabby,
	length?: number
	attr?: any
  }
  
  export type Selector =
	| string
	| ArrayLike<Node>
	| Node
	| Document
	| Iterable<Node>
	| Callable;
  export type Context = Selector & Object;
  export type Dabby = (selector: Selector, context?: Context) => DabbyObject;
  
  
  

// proxy dabby to make sure once properties are set, they cannot be overwritten
const $ = proxy(function dabby(selector: Selector, context: any) : DabbyObject {
	if (this instanceof dabby) {
		let nodes: Array<Node|Window> = [],
			match: RegExpMatchArray;

		// if no selector, return empty collection
		if (selector) {

			// handle string selector first
			if (typeof selector === "string") {

				// CSS selector
				if (selector[0] !== "<") {

					// normalise context
					let obj = context ? $(context) : [document],
						i = obj.length;
					while (i--) {
						nodes = [...obj[i].querySelectorAll(selector), ...nodes];
					}

				// create a single node and attach properties
				} else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
					nodes = [document.createElement(match[1])];

					// context is CSS attributes, import /src/attributes/attr/attr.js to use
					if (context && isPlainObject(context)) {
						$(nodes).attr(context);
					}

				// parse HTML into nodes
				} else {
					nodes = parseHTML(selector, context || document, true);
				}

			// $ collection - copy nodes to new object
			} else if (selector instanceof dabby) {
				nodes = Array.from(selector);

			// single node or Window
			} else if (selector instanceof Node || isWindow(selector)) {
				nodes = [(selector as unknown as Node | Window)];

			// ready function
			} else if (isFunction(selector)) {
				if (document.readyState !== "loading") {
					selector.call(document, $);
				} else {
					document.addEventListener("DOMContentLoaded", () => selector.call(document, $), {once: true});
				}

			// array|NodeList|HTMLCollection of nodes
			} else if (selector instanceof NodeList || selector instanceof HTMLCollection || Array.isArray(selector)) {

				// check node is unique, then filter only element, document, documentFragment and window
				nodes = Array.from(selector).filter(
					(node, i, self) => self.indexOf(node) === i && ([1, 9, 11].includes(node.nodeType) || isWindow(node))
				)
			}
		}

		// create a getter for the length so it can't be edited from outside
		let i = nodes.length;
		Object.defineProperty(this, "length", {
			get length() {
				return this.length;
			},
			value: i
		});

		// assign nodes to object
		while (i--) {
			this[i] = nodes[i];
		}
		return this;
	} else {
		return new dabby(selector, context);
	}
});

// proxy the prototype to $.fn to prevent methods from being overwritten
$.fn = proxy($.prototype);

export default $;
