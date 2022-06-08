"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
var proxy_1 = require("../../internal/proxy/proxy");
var isfunction_1 = require("../../internal/isfunction/isfunction");
var iswindow_1 = require("../../internal/iswindow/iswindow");
var isplainobject_1 = require("../../internal/isplainobject/isplainobject");
var parsehtml_1 = require("../../internal/parsehtml/parsehtml");
// proxy dabby to make sure once properties are set, they cannot be overwritten
var $ = (0, proxy_1["default"])(function dabby(selector, context) {
    if (this instanceof dabby) {
        var nodes = [], match = void 0;
        // if no selector, return empty collection
        if (selector) {
            // handle string selector first
            if (typeof selector === "string") {
                // CSS selector
                if (selector[0] !== "<") {
                    // normalise context
                    var obj = context ? $(context) : [document], i_1 = obj.length;
                    while (i_1--) {
                        nodes = __spreadArray(__spreadArray([], obj[i_1].querySelectorAll(selector), true), nodes, true);
                    }
                    // create a single node and attach properties
                }
                else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
                    nodes = [document.createElement(match[1])];
                    // context is CSS attributes, import /src/attributes/attr/attr.js to use
                    if (context && (0, isplainobject_1["default"])(context)) {
                        $(nodes).attr(context);
                    }
                    // parse HTML into nodes
                }
                else {
                    nodes = (0, parsehtml_1["default"])(selector, context || document, true);
                }
                // $ collection - copy nodes to new object
            }
            else if (selector instanceof dabby) {
                nodes = Array.from(selector);
                // single node or Window
            }
            else if (selector instanceof Node || (0, iswindow_1["default"])(selector)) {
                nodes = [selector];
                // ready function
            }
            else if ((0, isfunction_1["default"])(selector)) {
                if (document.readyState !== "loading") {
                    selector.call(document, $);
                }
                else {
                    document.addEventListener("DOMContentLoaded", function () { return selector.call(document, $); }, { once: true });
                }
                // array|NodeList|HTMLCollection of nodes
            }
            else if (selector instanceof NodeList || selector instanceof HTMLCollection || Array.isArray(selector)) {
                // check node is unique, then filter only element, document, documentFragment and window
                nodes = Array.from(selector).filter(function (node, i, self) { return self.indexOf(node) === i && ([1, 9, 11].includes(node.nodeType) || (0, iswindow_1["default"])(node)); });
            }
        }
        // create a getter for the length so it can't be edited from outside
        var i = nodes.length;
        Object.defineProperty(this, "length", {
            get length() {
                return this.length;
            },
            value: i
        });
        // assign nodes to object
        while (i--) {
            this[i] = nodes[i];
        }
        return this;
    }
    else {
        return new dabby(selector, context);
    }
});
// proxy the prototype to $.fn to prevent methods from being overwritten
$.fn = (0, proxy_1["default"])($.prototype);
exports["default"] = $;
