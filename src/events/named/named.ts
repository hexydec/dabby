import $ from "../../core/dabby/dabby";
import events from "../../internal/getevents/getevents";
import "../on/on.js";
import "../trigger/trigger.js";

events.forEach(event => {
	$.fn[event] = function (data: any, callback: Function) {
		return data ? this.on(event, data, callback) : this.trigger(event);
	};
});
