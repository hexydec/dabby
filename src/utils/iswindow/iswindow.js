import $ from "../../core/dabby/dabby.js";

$.isWindow = obj => obj !== null && obj === obj.window;
