const properties: Record<string, string> = {
	"for": "htmlFor",
	"class": "className"
};

[
	"accessKey",
	"accessKeyLabel",
	"contentEditable",
	"isContentEditable",
	"tabIndex",
	"assignedSlot",
	"childElementCount",
	"firstElementChild",
	"lastElementChild",
	"namespaceURI",
	"outerHTML",
	"readOnly",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"shadowRoot"
].forEach(item => {
	properties[item.toLowerCase()] = item;
});

export default function getProp(prop: string): string {
	const lowerProp = prop.toLowerCase();
	return properties[lowerProp] || lowerProp;
}
