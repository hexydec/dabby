import $ from "../../core/core.js";

$.isFunction = func => func && func.constructor === Function;
