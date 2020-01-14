export default prop => {
	let properties = {
		"for": "htmlFor",
		"class": "className",
		"tabindex": "tabIndex",
		"readonly": "readOnly",
		"maxlength": "maxLength",
		"cellspacing": "cellSpacing",
		"cellpadding": "cellPadding",
		"rowspan": "rowSpan",
		"colspan": "colSpan",
		"usemap": "useMap",
		"frameborder": "frameBorder",
		"contenteditable": "contentEditable"
	};
	return properties[prop.toLowerCase()] || prop;
}
