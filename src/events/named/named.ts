import { Dabby } from "../../core/dabby/dabby.js";
import type {} from "../../dabby.js";
import "../on/on.js";
import "../trigger/trigger.js";

type OnCallback = (this: Element, event: Event, ...args: unknown[]) => void | false;

/**
 * Build a named-event shortcut method bound to a single event name.
 *
 * The returned function delegates to `.trigger(eventName)` when called with
 * no arguments, otherwise it delegates to `.on(eventName, ...)`. This factory
 * powers all twenty-four built-in shortcuts (`click`, `keydown`, `submit`,
 * etc.) and may be used to mint additional ones for custom event names.
 *
 * @param eventName - The event name the resulting method binds to or triggers
 * @returns A method suitable for installing on `Dabby.prototype` that triggers the event when called with no arguments and binds a handler otherwise
 *
 * @example
 * import { Dabby } from "dabbyjs";
 *
 * const change = createNamedEvent("change");
 * Object.defineProperty(Dabby.prototype, "change", { value: change });
 */
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

/**
 * Named-event shortcut methods.
 *
 * Each of the methods below (`click`, `dblclick`, `mousedown`, `mouseup`,
 * `mousemove`, `mouseover`, `mouseout`, `mouseenter`, `mouseleave`,
 * `contextmenu`, `keydown`, `keypress`, `keyup`, `focus`, `blur`,
 * `focusin`, `focusout`, `change`, `select`, `submit`, `scroll`, `resize`,
 * `error`, `unload`) shares the same dual behaviour:
 *
 * - With no arguments, it triggers the event on every element in the
 *   collection (equivalent to `.trigger("eventName")`).
 * - With a callback (optionally a delegation selector and/or data) it binds
 *   a handler for the event (equivalent to `.on("eventName", ...)`).
 *
 * @example
 * import $ from "dabbyjs";
 * import "dabbyjs/events/named/named";
 *
 * $("#save").click(() => saveDocument()); // bind handler
 * $("#save").click();                     // trigger click
 */
// Augment ModularDabbyMethods for modular builds
declare module '../../dabby.js' {
  interface ModularDabbyMethods {
    focusin(): this;
    focusin(callback: OnCallback): this;
    focusin(selector: string, callback: OnCallback): this;
    focusin(selector: string, data: unknown, callback: OnCallback): this;
    focusout(): this;
    focusout(callback: OnCallback): this;
    focusout(selector: string, callback: OnCallback): this;
    focusout(selector: string, data: unknown, callback: OnCallback): this;
    focus(): this;
    focus(callback: OnCallback): this;
    focus(selector: string, callback: OnCallback): this;
    focus(selector: string, data: unknown, callback: OnCallback): this;
    blur(): this;
    blur(callback: OnCallback): this;
    blur(selector: string, callback: OnCallback): this;
    blur(selector: string, data: unknown, callback: OnCallback): this;
    resize(): this;
    resize(callback: OnCallback): this;
    resize(selector: string, callback: OnCallback): this;
    resize(selector: string, data: unknown, callback: OnCallback): this;
    scroll(): this;
    scroll(callback: OnCallback): this;
    scroll(selector: string, callback: OnCallback): this;
    scroll(selector: string, data: unknown, callback: OnCallback): this;
    unload(): this;
    unload(callback: OnCallback): this;
    unload(selector: string, callback: OnCallback): this;
    unload(selector: string, data: unknown, callback: OnCallback): this;
    click(): this;
    click(callback: OnCallback): this;
    click(selector: string, callback: OnCallback): this;
    click(selector: string, data: unknown, callback: OnCallback): this;
    dblclick(): this;
    dblclick(callback: OnCallback): this;
    dblclick(selector: string, callback: OnCallback): this;
    dblclick(selector: string, data: unknown, callback: OnCallback): this;
    mousedown(): this;
    mousedown(callback: OnCallback): this;
    mousedown(selector: string, callback: OnCallback): this;
    mousedown(selector: string, data: unknown, callback: OnCallback): this;
    mouseup(): this;
    mouseup(callback: OnCallback): this;
    mouseup(selector: string, callback: OnCallback): this;
    mouseup(selector: string, data: unknown, callback: OnCallback): this;
    mousemove(): this;
    mousemove(callback: OnCallback): this;
    mousemove(selector: string, callback: OnCallback): this;
    mousemove(selector: string, data: unknown, callback: OnCallback): this;
    mouseover(): this;
    mouseover(callback: OnCallback): this;
    mouseover(selector: string, callback: OnCallback): this;
    mouseover(selector: string, data: unknown, callback: OnCallback): this;
    mouseout(): this;
    mouseout(callback: OnCallback): this;
    mouseout(selector: string, callback: OnCallback): this;
    mouseout(selector: string, data: unknown, callback: OnCallback): this;
    mouseenter(): this;
    mouseenter(callback: OnCallback): this;
    mouseenter(selector: string, callback: OnCallback): this;
    mouseenter(selector: string, data: unknown, callback: OnCallback): this;
    mouseleave(): this;
    mouseleave(callback: OnCallback): this;
    mouseleave(selector: string, callback: OnCallback): this;
    mouseleave(selector: string, data: unknown, callback: OnCallback): this;
    contextmenu(): this;
    contextmenu(callback: OnCallback): this;
    contextmenu(selector: string, callback: OnCallback): this;
    contextmenu(selector: string, data: unknown, callback: OnCallback): this;
    change(): this;
    change(callback: OnCallback): this;
    change(selector: string, callback: OnCallback): this;
    change(selector: string, data: unknown, callback: OnCallback): this;
    select(): this;
    select(callback: OnCallback): this;
    select(selector: string, callback: OnCallback): this;
    select(selector: string, data: unknown, callback: OnCallback): this;
    keydown(): this;
    keydown(callback: OnCallback): this;
    keydown(selector: string, callback: OnCallback): this;
    keydown(selector: string, data: unknown, callback: OnCallback): this;
    keypress(): this;
    keypress(callback: OnCallback): this;
    keypress(selector: string, callback: OnCallback): this;
    keypress(selector: string, data: unknown, callback: OnCallback): this;
    keyup(): this;
    keyup(callback: OnCallback): this;
    keyup(selector: string, callback: OnCallback): this;
    keyup(selector: string, data: unknown, callback: OnCallback): this;
    error(): this;
    error(callback: OnCallback): this;
    error(selector: string, callback: OnCallback): this;
    error(selector: string, data: unknown, callback: OnCallback): this;
    submit(): this;
    submit(callback: OnCallback): this;
    submit(selector: string, callback: OnCallback): this;
    submit(selector: string, data: unknown, callback: OnCallback): this;
  }
}

// Export type witness to force TypeScript to include this file's augmentation
export type __named = typeof click;
