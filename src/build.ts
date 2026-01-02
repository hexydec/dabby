import $ from "./core/dabby/dabby.js";

// Core methods are already in the Dabby class

// Attributes
import "./attributes/css/css.js";
import "./attributes/class/class.js";
import "./attributes/attr/attr.js";
import "./attributes/data/data.js";
import "./attributes/hasclass/hasclass.js";
import "./attributes/prop/prop.js";
import "./attributes/removeprop/removeprop.js";
import "./attributes/show-hide/show-hide.js";
import "./attributes/val/val.js";

// Ajax
import "./ajax/param/param.js";
import "./ajax/ajax/ajax.js";
import "./ajax/getpost/getpost.js";
import "./ajax/getscript/getscript.js";
import "./ajax/load/load.js";
import "./ajax/serialize/serialize.js";

// Dimensions
import "./dimensions/offset/offset.js";
import "./dimensions/offsetparent/offsetparent.js";
import "./dimensions/position/position.js";
import "./dimensions/scroll/scroll.js";
import "./dimensions/width-height/width-height.js";

// Events
import "./events/on/on.js";
import "./events/off/off.js";
import "./events/trigger/trigger.js";
import "./events/triggerhandler/triggerhandler.js";
import "./events/named/named.js";

// Manipulation
import "./manipulation/clone/clone.js";
import "./manipulation/empty/empty.js";
import "./manipulation/html/html.js";
import "./manipulation/insert/insert.js";
import "./manipulation/insertto/insertto.js";
import "./manipulation/remove/remove.js";
import "./manipulation/replace/replace.js";
import "./manipulation/text/text.js";
import "./manipulation/unwrap/unwrap.js";
import "./manipulation/wrap/wrap.js";
import "./manipulation/wrapall/wrapall.js";

// Traversal
import "./traversal/add/add.js";
import "./traversal/children/children.js";
import "./traversal/closest/closest.js";
import "./traversal/eq/eq.js";
import "./traversal/filter/filter.js";
import "./traversal/find/find.js";
import "./traversal/first/first.js";
import "./traversal/has/has.js";
import "./traversal/index/index.js";
import "./traversal/last/last.js";
import "./traversal/next-prev/next-prev.js";
import "./traversal/parents/parents.js";
import "./traversal/siblings/siblings.js";
import "./traversal/slice/slice.js";

// Utils
// Note: each is now a core method in Dabby class
import "./utils/extend/extend.js";
import "./utils/isplainobject/isplainobject.js";
import "./utils/map/map.js";
import "./utils/parsehtml/parsehtml.js";

export default $;
export { Dabby } from "./core/dabby/dabby.js";
export type { Selector, DOMNode, DabbyFactory, ReadyCallback } from "./types.js";
export type { DabbyFull } from "./dabby-full.js";
