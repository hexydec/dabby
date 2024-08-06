import {Dabby} from "../../core/dabby/dabby.js";

Object.defineProperty(Dabby.prototype, "trigger", {
	value: function (name, data) {
		let i = this.length;
		while (i--) {
			let isFunc = typeof this[i][name] === "function";

			// native submit event doesn't trigger event handlers
			if (name === "submit" || !isFunc) {
				const evt = new CustomEvent(name, {bubbles: true, cancelable: true, detail: data});
				this[i].dispatchEvent(evt);

				// cancel submit event if default is prevented
				if (evt.defaultPrevented) {
					isFunc = false;
				}
			}

			// trigger native event
			if (isFunc) {
				this[i][name]();
			}
		}
		return this;
	}
});