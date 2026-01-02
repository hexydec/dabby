const events = [
	"focusin",
	"focusout",
	"focus",
	"blur",
	"resize",
	"scroll",
	"unload",
	"click",
	"dblclick",
	"mousedown",
	"mouseup",
	"mousemove",
	"mouseover",
	"mouseout",
	"mouseenter",
	"mouseleave",
	"contextmenu",
	"change",
	"select",
	"keydown",
	"keypress",
	"keyup",
	"error",
	"submit"
] as const;

export type DOMEventName = typeof events[number];
export default events;
