import {Dabby} from "../../core/dabby/dabby.js";
import events from "../../internal/getevents/getevents.js";
import "../on/on.js";
import "../trigger/trigger.js";

events.forEach(event => {

	/**
	 * @name click
	 * @param {object|array} data 
	 * @param {*} callback 
	 * @returns {Dabby}
	 */
	const func = function (data, callback) {
		return data ? this.on(event, data, callback) : this.trigger(event);
	};
	Object.defineProperty(Dabby.prototype, event, {value: func});
});
