import $ from '../../core/core.js';
import '../../utils/each/each.js';
import { Dabby } from '../dabby/types.js';

$.fn.each = function (callback: Function) : Dabby {
	$.each(this, callback);
	return this;
};
