function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*! dabbyjs v0.9.8 by Will Earp - https://github.com/hexydec/dabby */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory() : typeof define === 'function' && define.amd ? define(factory) : (global = global || self, global.$ = factory());
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
    // if no selector, return empty colletion
    if (this instanceof dabby) {
      selector = Array.from(selector).filter(function (node) {
        return [1, 9, 11].indexOf(node.nodeType) > -1 || $.isWindow(node);
      }); // only element, document, documentFragment and window

      this.length = selector.length;
      Object.assign(this, selector);
      return this;
    } // $ collection


    if (selector instanceof dabby) {
      return selector;
    }

    var nodes = [],
        match; // gather nodes

    if (selector) {
      // single node
      if (selector.nodeType || $.isWindow(selector)) {
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
        nodes = [document.createElement(match[1])]; // context is CSS attributes

        if (context instanceof Object) {
          $(nodes).attr(context);
        } // parse HTML into nodes

      } else {
        var obj = document.implementation.createHTMLDocument("");
        obj.body.innerHTML = selector;
        nodes = obj.body.children;
      }
    }

    return new dabby(nodes);
  }; // alias functions


  $.fn = $.prototype;

  $.each = function (obj, callback) {
    var isArr = Array.isArray(obj),
        keys = Object.keys(obj),
        len = keys.length;

    for (var i = 0; i < len; i++) {
      if (callback.call(obj[keys[i]], isArr ? parseInt(keys[i]) : keys[i], obj[keys[i]]) === false) {
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
      if (typeof Object.getPrototypeOf === 'function') {
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
            $.each(source, function (i, val) {
              // merge recursively if source is object, if target is not object, overwrite
              if ($.isPlainObject(val)) {
                target[i] = $.isPlainObject(target[i]) ? merge(target[i], val) : val; // when source property is value just overwrite
              } else {
                target[i] = val;
              }
            });
          } // merge next source


          return merge.apply(void 0, [target].concat(sources));
        }

        return target;
      };

      return merge.apply(null, arrs.slice(1));
    }

    return Object.assign.apply(null, arrs);
  };

  $.param = function (obj) {
    var params = [],
        add = function add(key, value, params) {
      var isArr = Array.isArray(value);

      if (isArr || _typeof(value) === "object") {
        $.each(value, function (i, val) {
          params = add("".concat(key, "[").concat(isArr ? "" : i, "]"), val, params);
        });
      } else {
        if ($.isFunction(value)) {
          value = value();
        }

        params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value === null ? "" : value));
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


    settings = Object.assign({
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
      password: null,
      xhrFields: {}
    }, settings); // determine datatype

    if (!settings.dataType && settings.url.split("?")[0].split(".").pop() === "js") {
      settings.dataType = "script";
    }

    var sync = ["script", "jsonp"].indexOf(settings.dataType) > -1,
        join = settings.url.indexOf("?") > -1 ? "&" : "?",
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
      settings.url += join + data;
      join = "&";
    } // add cache buster


    if (settings.cache || settings.cache === null && sync) {
      settings.url += join + "_=" + +new Date();
      join = "&";
    } // fetch script


    if (sync || settings.crossDomain) {
      script = document.createElement("script");

      if (settings.scriptCharset) {
        script.charset = settings.scriptCharset;
      } // add callback parameter


      if (settings.dataType === "jsonp") {
        settings.url += join + settings.jsonp + "=" + settings.jsonpCallback;
      } // setup event callbacks


      $.each({
        load: "success",
        error: "error"
      }, function (key, value) {
        script.addEventListener(key, function () {
          var response = settings.dataType === "jsonp" ? window[settings.jsonpCallback] || null : null;
          [settings[value], settings.complete].forEach(function (callback) {
            if (callback) {
              callback.apply(settings.context || settings, callback === settings.complete ? [null, value] : [response, value]);
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
          callback = function callback(xhr, type, status) {
        var response = xhr.responseText; // parse JSON

        if (["json", null, undefined].indexOf(settings.dataType) > -1) {
          try {
            response = JSON.parse(response);
          } catch (e) {// do nothing
          }
        } // run callbacks


        [settings.statusCode[xhr.status], settings[type], settings.complete].forEach(function (callback, i) {
          if (callback) {
            callback.apply(settings.context || settings, i < 2 ? [response, status, xhr] : [xhr, status]);
          }
        });
      }; // XHR settings


      $.each(settings.xhrFields, function (key, value) {
        return xhr[key] = value;
      }); // callbacks

      xhr.onload = function () {
        var status = [200, 204, 304].indexOf(xhr.status) > -1 ? "success" : "error";
        callback(xhr, status, status);
      };

      xhr.ontimeout = function () {
        callback(xhr, "error", "timeout");
      };

      xhr.onabort = function () {
        callback(xhr, "error", "abort");
      };

      xhr.onerror = function () {
        callback(xhr, "error", "error");
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
    } // custom filter function


    if ($.isFunction(filter)) {
      func = filter; // nodes
    } else {
      // normalise filters
      if (typeof filter === "string") {
        filter = [filter];
      } else {
        filter = Array.from($(filter, context));
      } // default filter function


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
      return func.call(item, i, item) === !not;
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
          }

          var nodes = $(html).filter(function (i, item) {
            return item.tagName.toLowerCase() === "script";
          }); // set HTML to nodes in collection

          while (i--) {
            _this[i].innerHTML = html; // include any scripts as they won't execute with innerHTML

            nodes.each(function (i, item) {
              var src = item.getAttribute("src"),
                  script = document.createElement("script");

              if (src) {
                script.src = src;
              } else {
                script.text = item.innerText;
              }

              document.head.appendChild(script);
            }); // fire success callback on nodes

            if (_success) {
              _success.call(_this[i], response, status, xhr);
            }
          }
        }
      });
    }

    return this;
  };

  var getVal = function getVal(obj, val, current) {
    var i = obj.length,
        values = [],
        funcVal = $.isFunction(val),
        objVal = funcVal ? 0 : $.isPlainObject(val),
        funcCurrent = $.isFunction(current);

    while (i--) {
      values[i] = funcVal ? val.call(obj[i], i, funcCurrent ? current(obj[i]) : current) : objVal ? Object.create(val) : val;
    }

    return values;
  };

  $.map = function (obj, callback) {
    var arr = [];
    $.each(obj, function (i, item) {
      var result = callback.call(window, item, i);

      if ([null, undefined].indexOf(result) === -1) {
        arr = arr.concat(Array.isArray(result) ? result : [result]);
      }
    });
    return arr;
  };

  $.fn.val = function (value) {
    var _this2 = this;

    // set value
    if (value !== undefined) {
      var _ret = function () {
        var i = _this2.length,
            values = getVal(_this2, value, function (obj) {
          return obj.val();
        });

        while (i--) {
          // string value, just set to value attribute
          if (!Array.isArray(values[i])) {
            _this2[i].value = values[i]; // array on select, set matching values to selected
          } else if (_this2[i].type === "select-multiple") {
            values[i] = values[i].map(function (val) {
              return String(val);
            });
            $("option", _this2[i]).each(function (key, obj) {
              obj.selected = values[i].indexOf(obj.value) > -1;
            }); // set the checked attribute for radios and checkbox
          } else {
            _this2[i].checked = values[i].indexOf(_this2[i].value) > -1;
          }
        }

        return {
          v: _this2
        };
      }();

      if (_typeof(_ret) === "object") return _ret.v;
    } // read value from first node


    if (this[0]) {
      // get multiple values
      if (this[0].type === "select-multiple") {
        var values = [];
        $("option", this[0]).each(function (key, obj) {
          if (obj.selected) {
            values.push(String(obj.value));
          }
        });
        return values;
      } // get single value


      if (this[0].type !== "checkbox" || this[0].checked) {
        return String(this[0].value);
      }
    }
  };

  $.fn.serialize = function () {
    var selector = "input[name]:not([type=file]):not([type=submit]):not([type=radio]):not([type=checkbox]),input[name]:checked,textarea[name],select[name]",
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
        if (!Array.isArray(params)) {
          params = [];
        }

        params = params.concat(Array.isArray(value) ? value : [value]);
      }

      return params;
    };

    var obj = this.filter(selector);

    if (!obj.length) {
      obj = $(selector, this);
    }

    var params = {}; // process values

    obj.each(function (key, obj) {
      var value = $(obj).val();

      if (!obj.disabled && value !== undefined) {
        params = add(obj.name, value, params);
      }
    });
    return $.param(params);
  };

  $.fn.get = function (i) {
    return i === undefined ? Array.from(this) : this[i >= 0 ? i : i + this.length];
  };

  $.fn.add = function (nodes, context) {
    nodes = $(nodes, context).get();
    return $(Array.from(this).concat(nodes));
  };

  ["parent", "parents", "parentsUntil"].forEach(function (func) {
    var all = func.indexOf("s") > -1,
        until = func.indexOf("U") > -1;

    $.fn[func] = function (selector, filter) {
      var nodes = [],
          i = this.length,
          parent;

      while (i--) {
        parent = this[i].parentNode;

        while (parent && parent.nodeType === Node.ELEMENT_NODE) {
          if (until && filterNodes(parent, selector).length) {
            break;
          }

          nodes.push(parent);

          if (!all) {
            break;
          }

          parent = parent.parentNode;
        }
      }

      if (!until) {
        filter = selector;
      }

      return $(filter ? filterNodes(nodes, filter) : nodes);
    };
  }); // add and remove event handlers

  ["on", "one"].forEach(function (name) {
    $.fn[name] = function (events, selector, data, callback) {
      // sort out args
      events = events.split(" ");

      if ($.isFunction(selector)) {
        callback = selector;
        selector = undefined;
      } else if ($.isFunction(data)) {
        callback = data;
        data = undefined;
      } // attach event


      var i = this.length;

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
            evt.data = data; // set data to event object

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
        obj = {}; // set properties

    if (isObj || value !== undefined) {
      // normalise to object
      if (!isObj) {
        obj[prop] = value;
        prop = obj;
      }

      $.each(prop, function (key, val) {
        // if event, hand it off to $.fn.on()
        if (events.indexOf(key) > -1) {
          _this3.on(key, val); // process other values

        } else {
          var i = _this3.length,
              values = getVal(_this3, val, function (obj) {
            return $(obj).attr(key);
          });

          while (i--) {
            if (key === "style") {
              _this3[i].style.cssText = values[i];
            } else if (key === "class") {
              _this3[i].className = values[i];
            } else if (key === "text") {
              _this3[i].textContent = values[i];
            } else if (values[i] === null) {
              _this3[i].removeAttribute(key);
            } else {
              _this3[i].setAttribute(key, values[i]);
            }
          }
        }
      });
      return this;
    } // retrieve properties


    if (this[0]) {
      if (prop === "style") {
        return this[0].style.cssText;
      }

      if (prop === "class") {
        return this[0].className;
      }

      return this[0].getAttribute(prop);
    }
  };

  var funcs = [];
  ["removeClass", "addClass", "toggleClass"].forEach(function (func, f) {
    // remove "Class" from name for classList method and remember
    funcs.push(func.substr(0, func.length - 5)); // create function

    $.fn[func] = function (cls, state) {
      var i = this.length,
          values = getVal(this, cls, function (obj) {
        return obj.className;
      }),
          key = f;

      if (func === "toggleClass" && typeof state === "boolean") {
        key = 0 + state;
      } // manage classes on nodes


      while (i--) {
        if (typeof values[i] === "string") {
          values[i] = values[i].split(" ");
        }

        for (var n = 0, len = values[i].length; n < len; n++) {
          this[i].classList[funcs[key]](values[i][n]);
        }
      }

      return this;
    };
  });

  var camelise = function camelise(prop) {
    return prop.replace(/-([\w])/g, function (text, letter) {
      return letter.toUpperCase();
    });
  }; // matches underscore too but you shouldn't do that anyway


  var setCss = function setCss(dabby, props, value) {
    // normalise props
    if (typeof props === "string") {
      var name = props;
      props = {};
      props[name] = value;
    } // prepare values


    var values = {};
    $.each(props, function (i, prop) {
      values[camelise(i)] = getVal(dabby, prop, function (obj) {
        return obj.style[i];
      });
    }); // set properties

    $.each(values, function (key, val) {
      var i = dabby.length;

      while (i--) {
        dabby[i].style[key] = val[i] + (!val[i] || isNaN(val[i]) ? "" : "px");
      }
    });
    return dabby;
  };

  $.fn.css = function (props, value) {
    // set the values
    if (value !== undefined || $.isPlainObject(props)) {
      return setCss(this, props, value);
    } // retrieve value from first property


    if (this[0]) {
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
        output[props[i]] = style[camelise(props[i])];

        if (ret) {
          return output[props[i]];
        }
      }

      return output;
    }
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
        };
      }();

      if (_typeof(_ret2) === "object") return _ret2.v;
    } // get value


    if (this[0] && this[0].dataset) {
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
        return arr;
      } // retrieve specific property


      name = camelise(name);

      if (this[0].dataset.hasOwnProperty(name)) {
        return parse(this[0].dataset[name]);
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
    var _this5 = this;

    var isObj = $.isPlainObject(prop); // set

    if (value !== undefined || isObj) {
      // normalise values
      if (!isObj) {
        var tmp = {};
        tmp[prop] = value;
        prop = tmp;
      } // retrieve values


      var values = {};
      $.each(prop, function (key, val) {
        values[getProp(key)] = getVal(_this5, val, function (obj) {
          return obj[key];
        });
      }); // set properties

      $.each(values, function (key, val) {
        var i = _this5.length;

        while (i--) {
          _this5[i][key] = val[i];
        }
      });
      return this;
    } // get


    if (this[0]) {
      return this[0][getProp(prop)];
    }
  };

  $.fn.removeProp = function (prop) {
    var i = this.length;
    prop = getProp(prop);

    while (i--) {
      delete this[i][prop];
    }

    return this;
  };

  ["show", "hide", "toggle"].forEach(function (func, n) {
    // store for current values
    var display = [],
        obj = [],
        values = ["block", "none"]; // attach function

    $.fn[func] = function () {
      var i = this.length;

      while (i--) {
        var current = getComputedStyle(this[i]).display,
            item = obj.indexOf(this[i]);
        var value = values[n] || (current === "none" ? "block" : "none"); // show the item, if value cached, use that

        if (value !== "none" && item > -1) {
          value = display[item]; // hide the item, cache the current value
        } else if (value === "none" && item === -1 && current !== "none") {
          obj.push(this[i]);
          display.push(current);
        }

        this[i].style.display = value;
      }

      return this;
    };
  });

  $.fn.map = function (callback) {
    var len = this.length,
        values = [],
        i = 0;

    for (; i < len; i++) {
      values.push(callback.call(this[i], i, this[i]));
    }

    return values;
  };

  $.fn.offset = function (coords) {
    var _this6 = this;

    // set
    if (coords) {
      var _ret3 = function () {
        // prepare values
        var values = getVal(_this6, coords, function (obj) {
          return obj.offset();
        }),
            // copy the object
        i = _this6.length;

        while (i--) {
          // set position to relative if not positioned
          var pos = getComputedStyle(_this6[i]).position;

          if (pos === "static") {
            values[i].position = pos = "relative";
          } // take off offset parent position


          var parent = _this6[i][pos === "relative" ? "parentNode" : "offsetParent"];
          $.each($(parent).offset(), function (key, val) {
            return values[i][key] -= val;
          }); // relative add inner offset

          if (pos === "relative") {
            var style = getComputedStyle(parent);
            values[i].top -= parseFloat(style.paddingTop) + parseFloat(style.borderTopWidth);
            values[i].left -= parseFloat(style.paddingLeft) + parseFloat(style.borderLeftWidth);
          }
        } // update values in one hit to prevent thrashing


        i = _this6.length;

        while (i--) {
          $.each(values[i], function (key, val) {
            return _this6[i].style[key] = val + (isNaN(val) ? "" : "px");
          });
        }

        return {
          v: _this6
        };
      }();

      if (_typeof(_ret3) === "object") return _ret3.v;
    } // get


    if (this[0]) {
      var doc = document.documentElement,
          pos = this[0].style.position === "fixed",
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
      var top = item === "scrollTop"; // set

      if (pos !== undefined) {
        var i = this.length,
            tl = top ? "top" : "left",
            values = getVal(this, pos, function (obj) {
          return obj[item];
        });

        while (i--) {
          if ($.isWindow(this[i])) {
            var obj = {};
            obj[tl] = values[i];
            this[i].scroll(obj);
          } else {
            this[i][item] = values[i];
          }
        }

        return this;
      } // get


      if (this[0]) {
        var key = item;

        if ($.isWindow(this[0])) {
          key = top ? "pageYOffset" : "pageXOffset";
        }

        return this[0][key];
      }
    };
  });
  ["width", "height", "innerWidth", "innerHeight", "outerWidth", "outerHeight"].forEach(function (dim) {
    $.fn[dim] = function (val) {
      var _this7 = this;

      var width = dim.indexOf("d") > -1,
          wh = width ? "width" : "height",
          // width or height
      whu = width ? "Width" : "Height",
          // with uppercase letter
      io = dim.indexOf("inner") > -1 ? "inner" : dim.indexOf("outer") > -1 ? "outer" : "",
          // inner outer or neither
      pos = [width ? "Left" : "Top", // first dimension
      width ? "Right" : "Bottom" // second dimension
      ]; // set value

      if (val !== undefined && typeof val !== "boolean") {
        var _ret4 = function () {
          var values = getVal(_this7, val, function (obj) {
            return obj[dim];
          }),
              i = _this7.length,
              props = [],
              style;

          while (i--) {
            // add additional lengths
            if (io) {
              // fetch current style and build properties
              pos.forEach(function (item) {
                props.push("padding" + item);

                if (io === "outer") {
                  props.push("border" + item + "Width");
                }
              }); // set width to convert to a px value

              if (isNaN(values[i]) && values[i].indexOf("px") === -1) {
                _this7[i].style[wh] = values[i];
                props.push(wh);
                values[i] = 0; // reset to 0
              } // add values


              style = getComputedStyle(_this7[i]);
              props.forEach(function (val) {
                return values[i] -= parseFloat(style[val]);
              });
            }

            _this7[i].style[wh] = values[i] + (isNaN(values[i]) ? "" : "px");
          }

          return {
            v: _this7
          };
        }();

        if (_typeof(_ret4) === "object") return _ret4.v;
      } // get value


      if (this[0]) {
        // document
        if (this[0].nodeType === Node.DOCUMENT_NODE) {
          return this[0].documentElement["scroll" + whu];
        } // element


        if (!$.isWindow(this[0])) {
          var value = this[0][(io === "outer" ? "offset" : "client") + whu]; // add padding on, or if outer and margins requested, add margins on

          if (io === "" || io === "outer" && val === true) {
            var style = getComputedStyle(this[0]);
            pos.forEach(function (item) {
              return value += parseFloat(style[(io ? "margin" : "padding") + item]) * (io ? 1 : -1);
            });
          }

          return value;
        } // window


        if (io === "inner") {
          return this[0].document.documentElement["client" + whu];
        }

        return this[0]["inner" + whu];
      }
    };
  });

  $.fn.trigger = function (name, data) {
    var i = this.length;

    while (i--) {
      var isFunc = $.isFunction(this[i][name]); // native submit event doesn't trigger event handlers

      if (name == "submit" || !isFunc) {
        var evt = new CustomEvent(name, {
          bubbles: true,
          cancelable: true
        });
        evt.args = data;
        this[i].dispatchEvent(evt); // cancel submit event if default is prevented

        if (evt.defaultPrevented) {
          isFunc = false;
        }
      } // trigger native event


      if (isFunc) {
        this[i][name]();
      }
    }

    return this;
  };

  events.forEach(function (event) {
    $.fn[event] = function (data, callback) {
      return data ? this.on(event, data, callback) : this.trigger(event);
    };
  }); // add and remove event handlers

  $.fn.off = function (events, selector, data, callback) {
    var _this8 = this;

    // sort out args
    events = events.split(" ");

    if ($.isFunction(selector)) {
      callback = selector;
      selector = undefined;
    } else if ($.isFunction(data)) {
      callback = data;
      data = undefined;
    } // attach event


    var i = this.length;

    while (i--) {
      // find the original function
      if (this[i].events.length) {
        (function () {
          var e = events.length;

          while (e--) {
            _this8[i].events.forEach(function (evt, n) {
              var index = evt.events.indexOf(events[e]);

              if (index !== -1 && (!callback || evt.callback === callback) && (!selector || evt.selector === selector)) {
                _this8[i].removeEventListener(events[e], evt.func, {
                  once: evt.once,
                  capture: !!evt.selector
                }); // must pass same arguments


                _this8[i].events[n].events.splice(index, 1);

                if (!_this8[i].events[n].events.length) {
                  _this8[i].events.splice(n, 1);
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
      var i = this.length,
          values = getVal(this, html, function (obj) {
        return obj.innerHTML;
      });

      while (i--) {
        this[i].innerHTML = values[i];
      }

      return this;
    } // get


    if (this[0]) {
      return this[0].innerHTML;
    }
  };

  $.each({
    before: "beforeBegin",
    prepend: "afterBegin",
    append: "beforeEnd",
    after: "afterEnd"
  }, function (name, pos) {
    // function tracking variables
    var pre = ["before", "prepend"].indexOf(name) > -1; // the function

    $.fn[name] = function () {
      var elems,
          i = this.length,
          len = i; // retireve nodes from function

      for (var _len3 = arguments.length, content = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        content[_key3] = arguments[_key3];
      }

      if ($.isFunction(content[0])) {
        elems = $(getVal(this, content[0], function (obj) {
          return obj.innerHTML;
        })); // multiple arguments containing nodes
      } else {
        elems = content.reduce(function (dabby, item) {
          return dabby.add(item);
        }, $());
      } // insert objects onto each element in collection


      while (i--) {
        var backwards = elems.length,
            // for counting down
        forwards = -1; // for counting up

        while (pre ? ++forwards < backwards : backwards--) {
          // insert forwards or backwards?
          this[i].insertAdjacentElement(pos, i === len - 1 ? elems[pre ? forwards : backwards] : elems[pre ? forwards : backwards].cloneNode(true));
        }
      }

      return this;
    };
  });
  $.each({
    prependTo: "prepend",
    appendTo: "append",
    insertBefore: "before",
    insertAfter: "after"
  }, function (name, func) {
    $.fn[name] = function (selector) {
      $(selector)[func](this);
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
          isFunc = $.isFunction(target),
          i = source.length;

      if (!isFunc) {
        target = $(target);
      }

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
    var i = this.length,
        output = []; // set

    if (text !== undefined) {
      var values = getVal(this, text, function (obj) {
        return obj.textContent;
      });

      while (i--) {
        this[i].textContent = values[i];
      }

      return this;
    } // get


    while (i--) {
      output[i] = this[i].textContent;
    }

    return output.join(" ");
  };

  $.fn.unwrap = function (selector) {
    this.parent(selector).not("body").each(function (key, obj) {
      $(obj.children).each(function (i, node) {
        obj.parentNode.insertBefore(node, obj);
      });
      obj.parentNode.removeChild(obj);
    });
    return this;
  };

  $.fn.wrapAll = function (html) {
    if (this[0]) {
      if ($.isFunction(html)) {
        html = html.call(this[0]);
      } // set variables


      var len = this.length,
          i = 0,
          node = $(html)[0].cloneNode(true); // insert clone into parent

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
    var i = this.length,
        values = getVal(this, html);

    while (i--) {
      $(this[i]).wrapAll(values[i]);
    }

    return this;
  };

  $.fn.children = function (selector) {
    var nodes = [],
        i = this.length;

    while (i--) {
      nodes = nodes.concat(Array.from(this[i].children));
    } // filter nodes by selector


    return $(selector ? filterNodes(nodes, selector) : nodes);
  };

  $.fn.closest = function (selector, context) {
    var i = this.length,
        nodes = [],
        parents,
        node;

    while (i--) {
      parents = [];
      node = this[i];

      while (node && node.nodeType === Node.ELEMENT_NODE) {
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
    return $(this[i < 0 ? i + this.length : i]);
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
    if (this[0]) {
      var nodes,
          subject = this[0],
          i; // if no selector, match against first elements siblings

      if (selector === undefined) {
        nodes = this[0].parentNode.children; // if selector is string, match first node in current collection against resulting collection
      } else if (typeof selector === "string") {
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

    return -1;
  };

  $.fn.last = function () {
    return this.eq(-1);
  };

  ["next", "nextAll", "nextUntil", "prev", "prevAll", "prevUntil"].forEach(function (func) {
    var next = func.indexOf("x") > -1,
        all = func.indexOf("A") > -1,
        until = func.indexOf("U") > -1,
        method = next ? "nextElementSibling" : "previousElementSibling";

    $.fn[func] = function (selector, filter) {
      var nodes = []; // look through each node and get siblings

      for (var i = 0, len = this.length; i < len; i++) {
        var sibling = this[i][method];

        while (sibling) {
          // end when we match until
          if (until && filterNodes(sibling, selector).length) {
            break;
          } // add the node


          nodes.push(sibling); // end when not finding all

          if (!all && !until) {
            break;
          }

          sibling = sibling[method];
        }
      } // swap args for *Until methods


      if (until) {
        selector = filter;
      } // return new collection


      return $(selector ? filterNodes(nodes, selector) : nodes);
    };
  });

  $.fn.siblings = function (selector) {
    var _this9 = this;

    var i = this.length,
        nodes = [];

    while (i--) {
      Array.from(this[i].parentNode.children).forEach(function (child) {
        if (child !== _this9[i]) {
          nodes.push(child);
        }
      });
    }

    return $(selector ? filterNodes(nodes, selector) : nodes);
  };

  return $;
});
//# sourceMappingURL=dabby.es5.js.map
