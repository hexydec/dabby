import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import "../on/on.js";
import "../trigger/trigger.js";

type OnCallback = (this: Element, event: Event, ...args: unknown[]) => void | false;

function createNamedEvent(eventName: string) {
	return function(this: Dabby, selector?: string | unknown | OnCallback, data?: unknown | OnCallback, callback?: OnCallback): Dabby {
		if (selector !== undefined) {
			return (this as Dabby & { on: (event: string, selector: unknown, data: unknown, callback?: OnCallback) => Dabby }).on(eventName, selector, data as unknown, callback!);
		}
		return (this as Dabby & { trigger: (event: string) => Dabby }).trigger(eventName);
	};
}

const focusin = createNamedEvent("focusin");
Object.defineProperty(Dabby.prototype, "focusin", { value: focusin, configurable: true });

const focusout = createNamedEvent("focusout");
Object.defineProperty(Dabby.prototype, "focusout", { value: focusout, configurable: true });

const focus = createNamedEvent("focus");
Object.defineProperty(Dabby.prototype, "focus", { value: focus, configurable: true });

const blur = createNamedEvent("blur");
Object.defineProperty(Dabby.prototype, "blur", { value: blur, configurable: true });

const resize = createNamedEvent("resize");
Object.defineProperty(Dabby.prototype, "resize", { value: resize, configurable: true });

const scroll = createNamedEvent("scroll");
Object.defineProperty(Dabby.prototype, "scroll", { value: scroll, configurable: true });

const unload = createNamedEvent("unload");
Object.defineProperty(Dabby.prototype, "unload", { value: unload, configurable: true });

const click = createNamedEvent("click");
Object.defineProperty(Dabby.prototype, "click", { value: click, configurable: true });

const dblclick = createNamedEvent("dblclick");
Object.defineProperty(Dabby.prototype, "dblclick", { value: dblclick, configurable: true });

const mousedown = createNamedEvent("mousedown");
Object.defineProperty(Dabby.prototype, "mousedown", { value: mousedown, configurable: true });

const mouseup = createNamedEvent("mouseup");
Object.defineProperty(Dabby.prototype, "mouseup", { value: mouseup, configurable: true });

const mousemove = createNamedEvent("mousemove");
Object.defineProperty(Dabby.prototype, "mousemove", { value: mousemove, configurable: true });

const mouseover = createNamedEvent("mouseover");
Object.defineProperty(Dabby.prototype, "mouseover", { value: mouseover, configurable: true });

const mouseout = createNamedEvent("mouseout");
Object.defineProperty(Dabby.prototype, "mouseout", { value: mouseout, configurable: true });

const mouseenter = createNamedEvent("mouseenter");
Object.defineProperty(Dabby.prototype, "mouseenter", { value: mouseenter, configurable: true });

const mouseleave = createNamedEvent("mouseleave");
Object.defineProperty(Dabby.prototype, "mouseleave", { value: mouseleave, configurable: true });

const contextmenu = createNamedEvent("contextmenu");
Object.defineProperty(Dabby.prototype, "contextmenu", { value: contextmenu, configurable: true });

const change = createNamedEvent("change");
Object.defineProperty(Dabby.prototype, "change", { value: change, configurable: true });

const select = createNamedEvent("select");
Object.defineProperty(Dabby.prototype, "select", { value: select, configurable: true });

const keydown = createNamedEvent("keydown");
Object.defineProperty(Dabby.prototype, "keydown", { value: keydown, configurable: true });

const keypress = createNamedEvent("keypress");
Object.defineProperty(Dabby.prototype, "keypress", { value: keypress, configurable: true });

const keyup = createNamedEvent("keyup");
Object.defineProperty(Dabby.prototype, "keyup", { value: keyup, configurable: true });

const error = createNamedEvent("error");
Object.defineProperty(Dabby.prototype, "error", { value: error, configurable: true });

const submit = createNamedEvent("submit");
Object.defineProperty(Dabby.prototype, "submit", { value: submit, configurable: true });

// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    focusin(callback: OnCallback): this;
    focusin(): this;
    focusout(callback: OnCallback): this;
    focusout(): this;
    focus(callback: OnCallback): this;
    focus(): this;
    blur(callback: OnCallback): this;
    blur(): this;
    resize(callback: OnCallback): this;
    resize(): this;
    scroll(callback: OnCallback): this;
    scroll(): this;
    unload(callback: OnCallback): this;
    unload(): this;
    click(callback: OnCallback): this;
    click(): this;
    dblclick(callback: OnCallback): this;
    dblclick(): this;
    mousedown(callback: OnCallback): this;
    mousedown(): this;
    mouseup(callback: OnCallback): this;
    mouseup(): this;
    mousemove(callback: OnCallback): this;
    mousemove(): this;
    mouseover(callback: OnCallback): this;
    mouseover(): this;
    mouseout(callback: OnCallback): this;
    mouseout(): this;
    mouseenter(callback: OnCallback): this;
    mouseenter(): this;
    mouseleave(callback: OnCallback): this;
    mouseleave(): this;
    contextmenu(callback: OnCallback): this;
    contextmenu(): this;
    change(callback: OnCallback): this;
    change(): this;
    select(callback: OnCallback): this;
    select(): this;
    keydown(callback: OnCallback): this;
    keydown(): this;
    keypress(callback: OnCallback): this;
    keypress(): this;
    keyup(callback: OnCallback): this;
    keyup(): this;
    error(callback: OnCallback): this;
    error(): this;
    submit(callback: OnCallback): this;
    submit(): this;
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __named = typeof click;
