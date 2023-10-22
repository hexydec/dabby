/**
 * Returns whether an event is passive
 * @function isPassive
 * @param {string} evt The value to be tested
 * @returns {boolean} Whether the input event name is a passive event
 */

export default evt => ["wheel", "mousewheel", "touchstart", "touchmove"].includes(evt);