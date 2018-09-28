import $ from "../../core/core.js";
import events from "../../internal/getevents/getevents.js";
import "../on-off/on-off.js";
import "../trigger/trigger.js";

events.forEach(event => {
	$.fn[event] = function (data, callback) {
		return data ? this.on(event, data, callback) : this.trigger(event);
	};
});
