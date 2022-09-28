type Properties = {
	[key: string]: string;
};

export default (prop: string) : string => {
	const properties: Properties = {
		"for": "htmlFor",
		"class": "className"
	};
	["accessKey", "accessKeyLabel", "contentEditable", "isContentEditable", "tabIndex", "assignedSlot", "childElementCount", "firstElementChild", "lastElementChild", "namespaceURI", "outerHTML", "readOnly", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "shadowRoot"].forEach(item => properties[item.toLowerCase()] = item);
	prop = prop.toLowerCase();
	return properties[prop] || prop;
};