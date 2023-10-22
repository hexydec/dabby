import $ from "../../core/dabby/dabby.js";
import events from "../../internal/getevents/getevents.js";
import "../on/on.js";
import "../trigger/trigger.js";

events.forEach(event => {
	Object.defineProperty($.fn, event, {
		value: function (data, callback) {
			return data ? this.on(event, data, callback) : this.trigger(event);
		}
	});
});
