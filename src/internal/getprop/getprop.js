/**
 * converts a CSS property name to the correct Javascript case
 * @function getProp
 * @param {string} prop The property name
 * @returns {string} The correctly formatted property name
 */

export default prop => {
	const properties = {
		"for": "htmlFor",
		"class": "className"
	};
	["accessKey", "accessKeyLabel", "contentEditable", "isContentEditable", "tabIndex", "assignedSlot", "childElementCount", "firstElementChild", "lastElementChild", "namespaceURI", "outerHTML", "readOnly", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "shadowRoot"].forEach(item => properties[item.toLowerCase()] = item);
	prop = prop.toLowerCase();
	return properties[prop] || prop;
}
