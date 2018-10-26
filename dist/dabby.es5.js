function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! dabbyjs v0.9.6 by Will Earp - https://github.com/hexydec/dabby */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : global.$ = factory();
})(this, function () {
  'use strict';

  if (!Array.from) {
    Array.from = function (arrayLike, mapFn, thisArg) {
      var arr = [].slice.call(arrayLike);

      if (typeof mapFn === "function") {
        arr = arr.map(mapFn, thisArg);
      }

      return arr;
    };
  } // CustomEvent is not supported in IE11


  if (typeof window.CustomEvent !== "function") {
    var CustomEvent$1 = function CustomEvent$1(event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined
      };
      var evt = document.createEvent("CustomEvent");
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
      return evt;
    };

    CustomEvent$1.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent$1;
  } // support Element.matches() in IE and older Webkit


  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector;
  }

  if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;

      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }

  if (typeof Object.assign !== "function") {
    Object.defineProperty(Object, "assign", {
      value: function assign(target, varArgs) {
        // .length of function is 2
        if (target == null) {
          // TypeError if undefined or null
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var to = Object(target);

        for (var index = 1; index < arguments.length; index++) {
          var nextSource = arguments[index];

          if (nextSource != null) {
            // Skip over if undefined or null
            for (var nextKey in nextSource) {
              // Avoid bugs when hasOwnProperty is shadowed
              if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
        }

        return to;
      },
      writable: true,
      configurable: true
    });
  }

  var $ = function dabby(selector, context) {
    var nodes = [],
        match; // if no selector, return empty colletion

    if (this instanceof dabby) {
      selector = Array.from(selector).filter(function (node) {
        return [1, 9, 11].indexOf(node.nodeType) > -1 || $.isWindow(node);
      }); // only element, document, documentFragment and window

      this.length = selector.length;
      Object.assign(this, selector);
      return this; // gather nodes
    } else if (selector) {
      // $ collection
      if (selector instanceof dabby) {
        return selector; // single node
      } else if (selector.nodeType || $.isWindow(selector)) {
        nodes = [selector]; // ready function
      } else if ($.isFunction(selector)) {
        if (document.readyState !== "loading") {
          selector.call(document, $);
        } else {
          document.addEventListener("DOMContentLoaded", function () {
            selector.call(document, $);
          }, {
            once: true
          });
        } // array|NodeList|HTMLCollection of nodes

      } else if (typeof selector !== "string") {
        nodes = selector; // CSS selector
      } else if (selector.indexOf("<") === -1) {
        $(context || document).each(function (i, obj) {
          nodes = nodes.concat(Array.from(obj.querySelectorAll(selector)));
        }); // create a single node and attach properties
      } else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
        nodes.push(document.createElement(match[1])); // context is CSS attributes

        if (context instanceof Object) {
          $(nodes).attr(context);
        } // parse HTML into nodes

      } else {
        var obj = document.createElement("template");
        obj.innerHTML = selector;
        nodes = obj.content ? obj.content.children : obj.children;
      }
    }

    return new dabby(nodes);
  }; // alias functions


  $.fn = $.prototype;

  $.each = function (obj, callback) {
    var keys = Object.keys(obj),
        len = keys.length;

    for (var i = 0; i < len; i++) {
      if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
        break; // stop if callback returns false
      }
    }

    return obj;
  };

  $.fn.each = function (callback) {
    $.each(Array.from(this), callback);
    return this;
  };

  $.isWindow = function (obj) {
    return obj !== null && obj === obj.window;
  };

  $.isFunction = function (func) {
    return func && func.constructor === Function;
  };

  $.isPlainObject = function (obj) {
    // Basic check for Type object that's not null
    if (_typeof(obj) === "object" && obj !== null) {
      // If Object.getPrototypeOf supported, use it
      if (typeof Object.getPrototypeOf == 'function') {
        var proto = Object.getPrototypeOf(obj);
        return proto === Object.prototype || proto === null;
      } // Otherwise, use internal class
      // This should be reliable as if getPrototypeOf not supported, is pre-ES5


      return Object.prototype.toString.call(obj) === "[object Object]";
    } // Not an object


    return false;
  };

  $.extend = function () {
    for (var _len = arguments.length, arrs = new Array(_len), _key = 0; _key < _len; _key++) {
      arrs[_key] = arguments[_key];
    }

    if (arrs[0] === true) {
      // merge function will recursively merge items
      var merge = function merge(target) {
        for (var _len2 = arguments.length, sources = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          sources[_key2 - 1] = arguments[_key2];
        }

        if (sources.length) {
          // work on next source
          var source = sources.shift();

          if ($.isPlainObject(target) && $.isPlainObject(source)) {
            // loop through each property
            var keys = Object.keys(source),
                len = keys.length;

            for (var i = 0; i < len; i++) {
              // merge recursively if source is object, if target is not object, overwrite
              if ($.isPlainObject(source[keys[i]])) {
                target[keys[i]] = $.isPlainObject(target[keys[i]]) ? merge(target[keys[i]], source[keys[i]]) : source[keys[i]]; // when source property is value just overwrite
              } else {
                target[keys[i]] = source[keys[i]];
              }
            }
          } // merge next source


          return merge.apply(void 0, [target].concat(sources));
        }

        return target;
      };

      return merge.apply(null, arrs.slice(1));
    } else {
      return Object.assign.apply(null, arrs);
    }
  };

  $.isArray = function (arr) {
    return Array.isArray(arr);
  };

  $.param = function (obj) {
    var params = [],
        add = function add(key, value, params) {
      var isArr = $.isArray(value);

      if (isArr || _typeof(value) === "object") {
        $.each(value, function (i, val) {
          params = add("".concat(key, "[").concat(isArr ? "" : i, "]"), val, params);
        });
      } else {
        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
      }

      return params;
    }; // process values


    $.each(obj, function (key, item) {
      params = add(key, item, params);
    });
    return params.join("&");
  };

  $.ajax = function (url, settings) {
    // normalise args
    if (_typeof(url) === "object") {
      settings = url;
    } else {
      if (_typeof(settings) !== "object") {
        settings = {};
      }

      settings.url = url;
    } // set default settings


    settings = $.extend({
      method: "GET",
      cache: null,
      // start will null so we can see if explicitly set
      data: null,
      dataType: null,
      // only changes behavior with json, jsonp, script
      async: true,
      crossDomain: false,
      scriptCharset: null,
      jsonp: "callback",
      jsonpCallback: "dabby" + Date.now(),
      headers: {
        "X-Requested-With": "XMLHttpRequest"
      },
      xhr: function xhr() {
        return new XMLHttpRequest();
      },
      contentType: "application/x-www-form-urlencoded; charset=UTF-8",
      context: null,
      statusCode: {},
      username: null,
      password: null
    }, settings); // determine datatype

    if (!settings.dataType && /\.js($|\?)/.test(settings.url)) {
      settings.dataType = "script";
    }

    var sync = ["script", "jsonp"].indexOf(settings.dataType) > -1,
        script,
        data; // add data to query string

    if (settings.data) {
      if (typeof settings.data === "string" || settings.data instanceof FormData) {
        data = settings.data;
      } else {
        data = $.param(settings.data);
      }
    }

    if (data && settings.method === "GET") {
      settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + data;
    } // add cache buster


    if (settings.cache || settings.cache === null && sync) {
      settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + "_=" + +new Date();
    } // fetch script


    if (sync || settings.crossDomain) {
      script = document.createElement("script");

      if (settings.scriptCharset) {
        script.charset = settings.scriptCharset;
      } // add callback parameter


      if (settings.dataType === "jsonp") {
        settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + settings.jsonp + "=" + settings.jsonpCallback;
      } // setup event callbacks


      $.each({
        load: "success",
        error: "error"
      }, function (key, value) {
        script.addEventListener(key, function () {
          var response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
          [settings[value], settings.complete].forEach(function (callback) {
            if (callback) {
              callback.apply(settings.context, callback === settings.complete ? [null, value] : [response, value]);
            }
          });
        }, {
          once: true
        });
      });
      script.src = settings.url;
      script.async = settings.async;
      document.head.appendChild(script); // make xhr request
    } else {
      var xhr = settings.xhr(),
          callback = function callback(xhr, status) {
        var response = xhr.responseText; // parse JSON

        if (["json", null, undefined].indexOf(settings.dataType) > -1) {
          try {
            response = JSON.parse(response);
          } catch (e) {// do nothing
          }
        } // run callbacks


        [settings.statusCode[xhr.status], settings[status], settings.complete].forEach(function (callback) {
          if (callback) {
            var success = [settings.statusCode[xhr.status], settings["success"]].indexOf(callback) > -1;
            callback.apply(settings.context, success ? [response, status, xhr] : [xhr, status]);
          }
        });
      }; // callbacks


      xhr.onload = function () {
        var types = {
          200: "success",
          204: "nocontent",
          304: "notmodified"
        };
        callback(xhr, types[xhr.status] || "error");
      };

      xhr.ontimeout = function () {
        callback(xhr, "timeout");
      };

      xhr.onabort = function () {
        callback(xhr, "abort");
      };

      xhr.open(settings.method, settings.url, settings.async, settings.username, settings.password); // add headers

      if (settings.contentType) {
        settings.headers["Content-Type"] = settings.contentType;
      }

      $.each(settings.headers, function (key, value) {
        xhr.setRequestHeader(key, value);
      }); // send request

      xhr.send(settings.method === "GET" ? null : data);
      return xhr;
    }
  };

  ["get", "post"].forEach(function (name) {
    $[name] = function (url, data, success, type) {
      var isFunc = $.isFunction(data);
      var settings = _typeof(url) === "object" ? url : {
        url: url,
        data: isFunc ? {} : data,
        success: isFunc ? data : success,
        dataType: isFunc ? success : type
      };
      settings.method = name.toUpperCase();
      return $.ajax(settings);
    };
  });

  $.getScript = function (url, success) {
    return $.ajax({
      url: url,
      dataType: "script",
      success: success
    });
  };

  var filterNodes = function filterNodes(dabby, filter, context, not) {
    var func,
        nodes = dabby.nodeType ? [dabby] : Array.from(dabby); // sort out args

    if (typeof context === "boolean") {
      not = context;
      context = null;
    } // function


    if ($.isFunction(filter)) {
      func = filter; // nodes
    } else {
      // normalise filters
      if (typeof filter === "string") {
        filter = [filter];
      } else {
        filter = Array.from($(filter, context));
      } // filter function


      func = function func(n, node) {
        var i = filter.length;

        while (i--) {
          if (typeof filter[i] === "string" && node.matches ? node.matches(filter[i]) : node === filter[i]) {
            return true;
          }
        }

        return false;
      };
    }

    return nodes.filter(function (item, i) {
      return func.call(item, i, item) !== Boolean(not);
    }, nodes);
  };

  ["filter", "not", "is"].forEach(function (name) {
    $.fn[name] = function (selector) {
      var nodes = filterNodes(this, selector, name === "not");
      return name === "is" ? !!nodes.length : $(nodes);
    };
  });

  $.fn.load = function (url, data, _success) {
    var _this = this;

    if (this[0]) {
      // get selector from URL
      url = url.split(" ", 2);
      var uri = url[0],
          selector = url[1]; // check for data

      if ($.isFunction(data)) {
        _success = data;
        data = undefined;
      } // make AJAX request


      $.ajax(uri, {
        data: data,
        type: data instanceof Object ? "POST" : "GET",
        success: function success(response, status, xhr) {
          // if a selector is specified, find it in the returned document
          var html = "",
              i = _this.length; // refine by selector if supplied

          if (selector) {
            $(response).filter(selector).each(function (key, obj) {
              html += obj.outerHTML;
            });
          } else {
            html = response;
          } // set HTML to nodes in collection


          while (i--) {
            _this[i].innerHTML = html; // fire success callback on nodes

            if (_success) {
              _success.call(_this[i], response, status, xhr);
            }
          }
        }
      });
    }

    return this;
  };

  var getVal = function getVal(val, obj, i, current) {
    // retrieve as function
    if ($.isFunction(val)) {
      val = val.call(obj, i, $.isFunction(current) ? current() : current); // current can be a function
    }

    return val;
  };

  $.map = function (obj, callback) {
    var keys = Object.keys(obj),
        len = keys.length;
    var arr = [],
        i = 0,
        result;

    for (; i < len; i++) {
      result = callback.call(window, obj[keys[i]], keys[i]);

      if (![null, undefined].indexOf(result) > -1) {
        arr.push(result);
      }
    }

    return arr;
  };

  $.fn.val = function (value) {
    var _this2 = this;

    // set value
    if (value !== undefined) {
      var _ret = function () {
        var i = _this2.length;

        var _loop = function _loop() {
          var val = getVal(value, _this2[i], i, function () {
            return $(_this2[i]).val();
          });

          if (_this2[i].multiple) {
            val = $.map($.isArray(val) ? val : [val], function (item) {
              return String(item);
            }); // convert to string

            $("option", _this2[i]).each(function (key, obj) {
              obj.selected = val.indexOf(String(obj.value)) > -1;
            });
          } else {
            _this2[i].value = String(val);
          }
        };

        while (i--) {
          _loop();
        }

        return {
          v: _this2
        }; // read value from first node
      }();

      if (_typeof(_ret) === "object") return _ret.v;
    } else if (this[0]) {
      // get multiple values
      if (this[0].multiple) {
        var values = [];
        $("option", this[0]).each(function (key, obj) {
          if (obj.selected) {
            values.push(String(obj.value));
          }
        });
        return values; // get radio box value
      } else if (this[0].type === "radio") {
        var obj = this.filter("[name=\"".concat(this[0].name, "\"]:checked"))[0];
        return obj ? String(obj.value) : undefined; // get single value
      } else if (this[0].type !== "checkbox" || this[0].checked) {
        return String(this[0].value);
      }
    }
  };

  $.fn.serialize = function () {
    var selector = "input[name]:not([type=file]):not([type=submit]),textarea[name],select[name]",
        obj = this.is(selector) ? this.filter(selector) : $(selector, this),
        add = function add(name, value, params) {
      var match;

      if ((match = name.match(/([^\[]*)\[([^\]]*)\](.*)/)) !== null) {
        name = match[1];
        var arr = add(match[2] + match[3], value, params[name] || {});
        value = arr;
      }

      if (name !== "") {
        params[name] = value;
      } else {
        if (!$.isArray(params)) {
          params = [];
        }

        params = params.concat($.isArray(value) ? value : [value]);
      }

      return params;
    };

    var params = {}; // process values

    obj.each(function (key, obj) {
      var value = $(obj).val();

      if (!obj.disabled && value !== undefined) {
        params = add(obj.getAttribute("name"), value, params);
      }
    });
    return $.param(params);
  };

  $.fn.add = function (nodes, context) {
    nodes = $(nodes, context);
    var len = this.length,
        i = nodes.length;
    this.length += i;

    while (i--) {
      this[i + len] = nodes[i];
    }

    return this;
  };

  ["parent", "parents", "parentsUntil"].forEach(function (func) {
    $.fn[func] = function (selector, filter) {
      var all = func.indexOf("s") > -1,
          until = func.indexOf("U") > -1;
      var nodes = [],
          i = this.length,
          parent;

      while (i--) {
        parent = this[i].parentNode;

        while (parent && parent.nodeType === Node.ELEMENT_NODE) {
          nodes.push(parent);

          if (!all || until && filterNodes(parent, selector).length) {
            break;
          } else {
            parent = parent.parentNode;
          }
        }
      }

      if (selector) {
        nodes = filterNodes(nodes, selector);
      }

      return $(nodes);
    };
  });

  $.fn.get = function (i) {
    return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
  }; // add and remove event handlers


  ["on", "one"].forEach(function (name) {
    $.fn[name] = function (events, selector, data, callback) {
      var i = this.length;
      events = events.split(" "); // sort out args

      if ($.isFunction(selector)) {
        callback = selector;
        selector = undefined;
      } else if ($.isFunction(data)) {
        callback = data;
        data = undefined;
      } // attach event


      while (i--) {
        var e = events.length; // record the original function

        if (!this[i].events) {
          this[i].events = [];
        }

        var fn = function fn(evt) {
          // delegate function
          var target = [this];

          if (selector) {
            var t = $(evt.target);
            target = t.add(t.parents()).filter(selector).get(); // is the selector in the targets parents?
          }

          if (target) {
            if (data) {
              // set data to event object
              evt.data = data;
            }

            for (var _i = 0, len = target.length; _i < len; _i++) {
              if (callback.call(target[_i], evt, evt.args) === false) {
                evt.preventDefault();
                evt.stopPropagation();
              }
            }
          }
        };

        this[i].events.push({
          events: events,
          callback: callback,
          selector: selector,
          func: fn,
          once: name === "one"
        }); // trigger

        while (e--) {
          this[i].addEventListener(events[e], fn, {
            once: name === "one",
            capture: !!selector
          });
        }
      }

      return this;
    };
  });
  var events = ["focusin", "focusout", "focus", "blur", "resize", "scroll", "unload", "click", "dblclick", "mousedown", "mouseup", "mousemove", "mouseover", "mouseout", "mouseenter", "mouseleave", "contextmenu", "change", "select", "keydown", "keypress", "keyup", "error", "submit"];

  $.fn.attr = function (prop, value) {
    var _this3 = this;

    var isObj = typeof prop !== "string",
        i,
        obj = {}; // set properties

    if (isObj || value || value === null) {
      i = this.length; // normalise to object

      if (!isObj) {
        obj[prop] = value;
        prop = obj;
      }

      while (i--) {
        $.each(prop, function (key, val) {
          if (events.indexOf(key) > -1) {
            $(_this3[i]).on(key, val);
          } else if (key === "style") {
            _this3[i].style.cssText = val;
          } else if (key === "class") {
            _this3[i].className = val;
          } else if (key === "text") {
            _this3[i].textContent = val;
          } else if (value === null) {
            _this3[i].removeAttribute(key);
          } else {
            _this3[i].setAttribute(key, val);
          }
        });
      }

      return this; // retrieve properties
    } else if (this[0]) {
      if (prop === "style") {
        return this[0].style.cssText;
      }

      if (prop === "class") {
        return this[0].className;
      }

      return this[0].getAttribute(prop);
    }
  };

  ["addClass", "removeClass", "toggleClass"].forEach(function (name) {
    $.fn[name] = function (cls) {
      // remove "Class" from name for classList method
      var func = name.substr(0, name.length - 5),
          i = this.length; // manage classes on nodes

      while (i--) {
        var arr = getVal(cls, this[i], i, this[i].className);

        if (typeof arr === "string") {
          arr = arr.split(" ");
        }

        var len = arr.length;

        for (var n = 0; n < len; n++) {
          this[i].classList[func](arr[n]);
        }
      }

      return this;
    };
  });

  var dasherise = function dasherise(prop) {
    return prop.replace(/[A-Z]/g, function (letter) {
      return "-" + letter.toLowerCase();
    });
  };

  var setCss = function setCss(dabby, props, value) {
    // set vars
    var name = props,
        keys,
        k,
        remove; // normalise props

    if (typeof props === "string") {
      props = {};
      props[name] = value;
    } // cache properties for loop


    keys = Object.keys(props);
    k = keys.length; // set properties

    while (k--) {
      var i = dabby.length;

      while (i--) {
        var val = props[keys[k]] === "" ? undefined : getVal(props[keys[k]], dabby[i], k, dabby[i].style[keys[k]]);

        if (!isNaN(val)) {
          val += "px";
        }

        dabby[i].style[remove ? "removeProperty" : "setProperty"](dasherise(keys[k]), val);
      }
    }

    return dabby;
  };

  $.fn.css = function (props, value) {
    // set the values
    if (value !== undefined || $.isPlainObject(props)) {
      return setCss(this, props, value); // retrieve value from first property
    } else if (this[0]) {
      var name = props,
          i,
          style = getComputedStyle(this[0], ""),
          output = {},
          ret = false;

      if (typeof name === "string") {
        props = [name];
        ret = true;
      }

      i = props.length;

      while (i--) {
        output[props[i]] = style.getPropertyValue(dasherise(props[i]));

        if (ret) {
          return output[props[i]];
        }
      }

      return output;
    }
  };

  var camelise = function camelise(prop) {
    return prop.replace(/-([a-z])/gi, function (text, letter) {
      return letter.toUpperCase();
    });
  };

  $.fn.data = function (name, data) {
    var _this4 = this;

    // convert data to object
    if (_typeof(name) === "object") {
      data = name;
    } else if (data !== undefined) {
      var temp = {};
      temp[name] = data;
      data = temp;
    } // set value


    if (data !== undefined) {
      var _ret2 = function () {
        var i = _this4.length;

        while (i--) {
          $.each(data, function (key, value) {
            _this4[i].dataset[camelise(key)] = _typeof(value) === "object" ? JSON.stringify(value) : value;
          });
        }

        return {
          v: _this4
        }; // get value
      }();

      if (_typeof(_ret2) === "object") return _ret2.v;
    } else if (this[0] && this[0].dataset) {
      var parse = function parse(value) {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }; // all properties


      if (name === undefined) {
        var arr = {};
        $.each(this[0].dataset, function (key, value) {
          arr[key] = parse(value);
        });
        return arr; // retrieve specific property
      } else {
        name = camelise(name);

        if (this[0].dataset.hasOwnProperty(name)) {
          return parse(this[0].dataset[name]);
        }
      }
    }
  };

  $.fn.hasClass = function (cls) {
    var i = this.length;

    while (i--) {
      if (this[i].classList.contains(cls)) {
        return true;
      }
    }

    return false;
  };

  var getProp = function getProp(prop) {
    var properties = {
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
    prop = prop.toLowerCase();
    return properties[prop] || prop;
  };

  $.fn.prop = function (prop, value) {
    prop = getProp(prop); // set

    if (value !== undefined) {
      var i = this.length;

      while (i--) {
        this[i][prop] = getVal(value, this[i], i, this[i][prop]);
      }

      return this; // get
    } else if (this[0]) {
      return this[0][prop];
    }
  };

  $.fn.removeProp = function (prop) {
    if (this[0]) {
      var i = this.length;
      prop = getProp(prop);

      while (i--) {
        delete this[i][prop];
      }

      return this;
    }
  };

  $.fn.map = function (callback) {
    var len = this.length;
    var values = [],
        i = 0;

    for (; i < len; i++) {
      values.push(callback.call(this[i], i, this[i]));
    }

    return values;
  };

  $.fn.offset = function (coords) {
    var doc = document.documentElement;
    var rect,
        i = this.length,
        pos; // set

    if (coords) {
      while (i--) {
        // if coords is callback, generate value
        rect = this[i].getBoundingClientRect();
        var itemCoords = Object.create(getVal(coords, this[i], i, $(this[i]).offset())); // copy the object

        if (itemCoords.top !== undefined && itemCoords.left !== undefined) {
          var style = getComputedStyle(this[i]);
          pos = style.getPropertyValue("position"); // set position relative if static

          if (pos === "static") {
            this[i].style.position = "relative";
          } // add current offset


          itemCoords.top += parseFloat(style.getPropertyValue("top")) || 0;
          itemCoords.left += parseFloat(style.getPropertyValue("left")) || 0; // remove parent offset and viewport scroll

          if (pos !== "fixed") {
            itemCoords.top -= doc.scrollTop + rect.top;
            itemCoords.left -= doc.scrollLeft + rect.left;
          } // set offset


          this[i].style.top = itemCoords.top + "px";
          this[i].style.left = itemCoords.left + "px";
        }
      }

      return this; // get
    } else if (this[0]) {
      pos = this[0].style.position === "fixed";
      rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + (pos ? 0 : doc.scrollTop),
        left: rect.left + (pos ? 0 : doc.scrollLeft)
      };
    }
  };

  $.fn.offsetParent = function () {
    return $(this[0] ? this[0].offsetParent : null);
  };

  $.fn.position = function () {
    if (this[0]) {
      return {
        left: this[0].offsetLeft,
        top: this[0].offsetTop
      };
    }
  };

  ["scrollLeft", "scrollTop"].forEach(function (item) {
    $.fn[item] = function (pos) {
      // set
      if (pos !== undefined) {
        var i = this.length,
            tl = item.indexOf("Top") > -1 ? "top" : "left";

        while (i--) {
          var val = getVal(pos, this, i, this[i][item]);

          if ($.isWindow(this[i])) {
            var obj = {};
            obj[tl] = val;
            this[i].scroll(obj);
          } else {
            this[i][item] = val;
          }
        }

        return this; // get
      } else if (this[0]) {
        if ($.isWindow(this[0])) {
          item = item === "scrollTop" ? "pageYOffset" : "pageXOffset";
        }

        return this[0][item];
      }
    };
  });
  ["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(function (dim) {
    var getAdditionalLength = function getAdditionalLength(obj, wh, props) {
      var style = getComputedStyle(obj);
      var i = props.length,
          value = 0,
          suffix;

      while (i--) {
        suffix = props[i] === "border" ? "-width" : "";
        value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-left" : "-top") + suffix)) || 0;
        value += parseFloat(style.getPropertyValue(props[i] + (wh === "width" ? "-right" : "-bottom") + suffix)) || 0;
      }

      return value;
    };

    $.fn[dim] = function (val) {
      var valtype = _typeof(val),
          wh = dim.toLowerCase().indexOf("width") > -1 ? "width" : "height",
          // width or height
      io = dim.indexOf("inner") > -1 ? "inner" : dim.indexOf("outer") > -1 ? "outer" : ""; // inner outer or neither


      var i = this.length,
          value,
          whu,
          props,
          param; // set value

      if (val !== undefined && valtype !== "boolean") {
        while (i--) {
          // set base value
          value = getVal(val, this[i], i, this[i][dim]);

          if (!isNaN(val)) {
            value += "px";
          }

          this[i].style[wh] = value; // set here so we can convert to px
          // add additional lengths

          if (io) {
            value = parseFloat(getComputedStyle(this[i]).getPropertyValue(wh));
            props = ["padding"];

            if (io === "outer") {
              props.push("border");
            }

            value -= getAdditionalLength(this[i], wh, props);

            if (!isNaN(val)) {
              value += "px";
            }

            this[i].style[wh] = value;
          }
        }

        return this; // get value
      } else if (this[0]) {
        whu = wh === "width" ? "Width" : "Height"; // document

        if (this[0].nodeType === Node.DOCUMENT_NODE) {
          return this[0].documentElement["scroll" + whu]; // element
        } else if (!$.isWindow(this[0])) {
          param = io === "outer" ? "offset" : "client";
          value = this[0][param + whu]; // add padding on, or if outer and margins requested, add margins on

          if (io === "" || io === "outer" && val === true) {
            value += getAdditionalLength(this[0], wh, [io ? "margin" : "padding"]) * (io ? 1 : -1); // add margin, minus padding
          }

          return value; // window
        } else if (io === "inner") {
          return this[0].document.documentElement["client" + whu];
        } else {
          return this[0]["inner" + whu];
        }
      }
    };
  });

  $.fn.trigger = function (name, data) {
    var evt = new CustomEvent(name, {
      bubbles: true,
      cancelable: true
    });
    var i = this.length; // copy extra data to event object

    if (data) {
      evt.args = data;
    }

    while (i--) {
      this[i].dispatchEvent(evt);
      /*if (this[i].dispatchEvent(evt) && this[i][name]) {
      	this[i][name]();
      }*/
    }

    return this;
  };

  events.forEach(function (event) {
    $.fn[event] = function (data, callback) {
      return data ? this.on(event, data, callback) : this.trigger(event);
    };
  }); // add and remove event handlers

  $.fn.off = function (events, selector, data, callback) {
    var _this5 = this;

    var i = this.length;
    events = events.split(" "); // sort out args

    if ($.isFunction(selector)) {
      callback = selector;
      selector = undefined;
    } else if ($.isFunction(data)) {
      callback = data;
      data = undefined;
    } // attach event


    while (i--) {
      // find the original function
      if (this[i].events.length) {
        (function () {
          var e = events.length;

          while (e--) {
            _this5[i].events.forEach(function (evt, n) {
              var index = evt.events.indexOf(events[e]);

              if (index !== -1 && (!callback || evt.callback === callback) && (!selector || evt.selector === selector)) {
                _this5[i].removeEventListener(events[e], evt.func, {
                  once: evt.once,
                  capture: !!evt.selector
                }); // must pass same arguments


                _this5[i].events[n].events.splice(index, 1);

                if (!_this5[i].events[n].events.length) {
                  _this5[i].events.splice(n, 1);
                }
              }
            });
          }
        })();
      }
    }

    return this;
  };

  $.fn.clone = function () {
    var nodes = [],
        i = this.length;

    while (i--) {
      nodes[i] = this[i].cloneNode(true);
    }

    return $(nodes);
  };

  $.fn.empty = function () {
    var i = this.length;

    while (i--) {
      while (this[i].firstChild && this[i].removeChild(this[i].firstChild)) {
        ;
      }
    }

    return this;
  };

  $.fn.html = function (html) {
    // set
    if (html !== undefined) {
      var i = this.length;

      while (i--) {
        this[i].innerHTML = getVal(html, this[i], i, this[i].innerHTML);
      }

      return this; // get
    } else if (this[0]) {
      return this[0].innerHTML;
    }
  };

  $.each({
    before: "beforeBegin",
    prepend: "afterBegin",
    append: "beforeEnd",
    after: "afterEnd"
  }, function (name, pos) {
    $.fn[name] = function (html) {
      var pre = ["before", "prepend"].indexOf(name) > -1,
          isFunc = $.isFunction(html);
      var i = this.length,
          elems = $();

      if (!isFunc) {
        // multiple arguments containing nodes?
        $.each(arguments, function (i, arg) {
          elems.add(arg);
        });
      }

      while (i--) {
        if (isFunc) {
          elems = $(getVal(html, this[i], i, this[i].innerHTML));
        }

        var backwards = elems.length,
            // for counting down
        forwards = -1; // for counting up

        while (pre ? backwards-- : ++forwards < backwards) {
          // insert forwards or backwards?
          var obj = elems[pre ? backwards : forwards]; // clone if i !== 0

          if (i) {
            obj = obj.cloneNode(true);
          }

          this[i].insertAdjacentElement(pos, obj);
        }
      }

      return this;
    };
  });
  $.each({
    insertBefore: "before",
    prependTo: "prepend",
    appendTo: "append",
    insertAfter: "after"
  }, function (name, func) {
    $.fn[name] = function (selector) {
      var i = this.length,
          obj = $(selector);

      while (i--) {
        obj[func](this[i]);
      }

      return this;
    };
  });
  ["remove", "detach"].forEach(function (func) {
    $.fn[func] = function (selector) {
      var i = this.length,
          nodes = []; // detach selected nodes

      while (i--) {
        if (!selector || filterNodes(this[i], selector).length) {
          nodes.push(this[i].parentNode.removeChild(this[i]));
        }
      } // create a new dabby object to return


      return func === "detach" ? $(nodes) : this;
    };
  });
  ["replaceWith", "replaceAll"].forEach(function (name) {
    $.fn[name] = function (html) {
      var all = name === "replaceAll",
          source = all ? $(html) : this;
      var target = all ? this : html,
          isFunc = $.isFunction(target);

      if (!isFunc) {
        target = $(target);
      }

      var i = source.length;

      while (i--) {
        var n = target.length,
            parent = source[i].parentNode;

        while (n--) {
          var replace = isFunc ? getVal(target[n], n, target[n]) : target[n];

          if (n) {
            source[i].insertAdjacentElement("beforebegin", replace.cloneNode(true));
          } else {
            source[i] = parent.replaceChild(i ? replace.cloneNode(true) : replace, source[i]);
          }
        }
      }

      return this;
    };
  });

  $.fn.slice = function (start, end) {
    return $(this.get().slice(start, end));
  };

  $.fn.text = function (text) {
    var get = text === undefined;
    var len = this.length,
        output = [],
        i = 0;

    for (; i < len; i++) {
      if (get) {
        output.push(this[i].textContent);
      } else {
        this[i].textContent = getVal(text, this[i], i, this[i].textContent);
      }
    }

    return get ? output.join(" ") : this;
  };

  $.fn.unwrap = function (selector) {
    this.parent(selector).not("body").each(function (key, obj) {
      var parent = obj.parentNode;
      $(obj.children).each(function (i, node) {
        parent.insertBefore(node, obj);
      });
      parent.removeChild(obj);
    });
    return this;
  };

  $.fn.wrapAll = function (html) {
    if (this[0]) {
      // set variables
      var len = this.length,
          i = 0,
          node = $(getVal(html, this[0])).get(0).cloneNode(true); // insert clone into parent

      this[0].parentNode.insertBefore(node, null); // find innermost child of node

      while (node.firstElementChild) {
        node = node.firstElementChild;
      } // attach nodes to the new node


      for (; i < len; i++) {
        node.appendChild(this[i]);
      }
    }

    return this;
  };

  $.fn.wrap = function (html) {
    var i = this.length;

    while (i--) {
      $(this[i]).wrapAll(getVal(html, this[i], i));
    }

    return this;
  };

  $.fn.children = function (selector) {
    var nodes = [],
        i = this.length;

    while (i--) {
      nodes = nodes.concat(Array.from(this[i].children));
    } // filter nodes by selector


    if (selector) {
      nodes = filterNodes(nodes, selector);
    }

    return $(nodes);
  };

  $.fn.closest = function (selector, context) {
    var i = this.length,
        nodes = [],
        parents,
        node;

    while (i--) {
      parents = [];
      node = this[i];

      while (node) {
        parents.push(node);
        node = node.parentNode;
      }

      parents = filterNodes(parents, selector, context);

      if (parents[0]) {
        nodes.push(parents[0]);
      }
    }

    return $(nodes);
  };

  $.fn.eq = function (i) {
    var key = i < 0 ? i + this.length : i;
    return $(this[key] || null);
  };

  $.fn.find = function (selector) {
    return $(selector, this);
  };

  $.fn.first = function () {
    return $(this[0]);
  };

  $.fn.has = function (selector) {
    return $(this.get().filter(function (node) {
      return !!$(selector, node).length;
    }));
  };

  $.fn.index = function (selector) {
    var index = -1;

    if (this[0]) {
      var nodes,
          subject = this[0],
          type = _typeof(selector),
          i; // if no selector, match against first elements siblings


      if (type === "undefined") {
        nodes = this[0].parentNode.children; // if selector is string, match first node in current collection against resulting collection
      } else if (type === "string") {
        nodes = $(selector); // if element or collection match the element or first node against current collection
      } else {
        nodes = this;
        subject = $(selector)[0];
      }

      i = nodes.length;

      while (i--) {
        if (nodes[i] === subject) {
          return i;
        }
      }
    }

    return index;
  };

  $.fn.last = function () {
    return this.eq(-1);
  };

  ["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach(function (func) {
    $.fn[func] = function (selector, filter) {
      var next = func.indexOf("next") > -1,
          all = func.indexOf("All") > -1,
          until = func.indexOf("Until") > -1,
          method = next ? "nextElementSibling" : "previousElementSibling";
      var nodes = [],
          i = this.length,
          sibling; // look through each node and get siblings

      while (i--) {
        sibling = this[i][method];

        while (sibling) {
          nodes.push(sibling);

          if (all || until && filterNodes(sibling, selector).length) {
            break;
          } else {
            sibling = sibling[method];
          }
        }
      } // swap args for *Until methods


      if (until) {
        selector = filter;
      } // filter siblings by selector


      if (selector) {
        nodes = filterNodes(nodes, selector);
      } // return new collection


      return $(nodes);
    };
  });

  $.fn.siblings = function (selector) {
    var _this6 = this;

    var i = this.length,
        nodes = [];

    while (i--) {
      Array.from(this[i].parentNode.children).forEach(function (child) {
        if (child !== _this6[i]) {
          nodes.push(child);
        }
      });
    }

    return $(selector ? filterNodes(nodes, selector) : nodes);
  }; // ajax
  // attributes
  // core
  // dimensions
  // events
  // manipulation
  // traversal
  // utilities


  return $;
});
//# sourceMappingURL=dabby.es5.js.map
