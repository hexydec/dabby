import $ from "../../core/core.js";

$.isWindow = obj => obj !== null && obj === obj.window;
