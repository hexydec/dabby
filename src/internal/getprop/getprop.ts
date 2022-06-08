import { IGetProp } from "../../interfaces/interfaces";

export default (prop: string) => {
	const properties: IGetProp = {
		"for": "htmlFor",
		"class": "className"
	};
	["accessKey", "accessKeyLabel", "contentEditable", "isContentEditable", "tabIndex", "assignedSlot", "childElementCount", "firstElementChild", "lastElementChild", "namespaceURI", "outerHTML", "readOnly", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "shadowRoot"].forEach(item => properties[item.toLowerCase()] = item);
	prop = prop.toLowerCase();
	return properties[prop] || prop;
}
