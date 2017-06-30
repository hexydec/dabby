;(function() {
var core, attributes, traversal, events, ajax, dimensions, amd, dabby, main;
core = function () {
  var doc = document, ready = [], domready = false, dabby = function (selector, context) {
      return new dabby.fn.init(selector, context);
    };
  dabby.isWindow = function (obj) {
    return obj !== null && obj === obj.window;
  };
  dabby.isEmptyObject = function (obj) {
    for (var name in obj) {
      return false;
    }
    return true;
  };
  dabby.extend = function (obj) {
    var arrs = arguments, len = arguments.length, i = 1, n;
    for (; i < len; i += 1) {
      for (var n in arrs[i]) {
        if (arrs[i].hasOwnProperty(n)) {
          obj[n] = arrs[i][n];
        }
      }
    }
    return obj;
  };
  dabby.each = function (obj, callback) {
    var length, i = 0;
    if (obj instanceof Array) {
      obj.forEach(callback);
    } else {
      for (i in obj) {
        if (obj.hasOwnProperty(i) && callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    }
    return obj;
  };
  dabby.inArray = function (elem, arr, i) {
    return arr === null ? -1 : [].indexOf.call(arr, elem, i);
  };
  dabby.isFunction = function (obj) {
    return typeof obj === 'function';
  };
  dabby.fn = {
    constructor: dabby,
    root: document,
    init: function (selector, context) {
      var nodes = [], i;
      // if no selector, return empty colletion
      if (!selector) {
        return this;  // dabby collection
      } else if (selector instanceof dabby) {
        return selector;  // array of nodes
      } else if (selector instanceof Array) {
        nodes = [].filter.call(selector, function (item) {
          return item !== null;
        });  // single node
      } else if (selector.nodeType && dabby.inArray(selector.nodeType, [
          1,
          9
        ])) {
        nodes = [selector];  // CSS selector
      } else if (typeof selector === 'string') {
        // if is HTML create nodes
        if (selector.indexOf('<') === 0) {
        } else {
          context = dabby(context).get(0) || this.root;
          nodes = context.querySelectorAll(selector);
        }  // ready function
      } else if (dabby.isFunction(selector)) {
        if (domready) {
          selector();
        } else {
          ready.push(selector);
        }
      }
      // build nodes
      this.selector = selector || '';
      this.length = nodes.length;
      for (i = 0; i < this.length; i++) {
        this[i] = nodes[i];
      }
      return this;
    },
    get: function (i) {
      return i === undefined ? [].slice.call(this) : this[i >= 0 ? i : i + this.length];
    },
    each: function (callback) {
      dabby.each(this.get(), callback);
      return this;
    },
    is: function (selector) {
      var found = false, nodes = this, len = nodes.length;
      dabby(selector).each(function () {
        for (var i = 0; i < len; i += 1) {
          if (this.isSameNode(nodes[i])) {
            found = true;
            break;
          }
        }
      });
      return found;
    }
  };
  dabby.fn.init.prototype = dabby.fn;
  // bind ready functions
  doc.addEventListener('DOMContentLoaded', function () {
    var i = 0;
    for (i = 0; i < ready.length; i += 1) {
      ready[i]();
    }
  }, false);
  // wrap it up and return
  return dabby;
}();
attributes = function ($) {
  $.fn.attr = function (prop, value) {
    if (prop) {
      // set
      if (value || value === '') {
        for (var i = 0; i < this.length; i += 1) {
          if (prop === 'style') {
            this[i].style.cssText = value;
          } else if (prop === 'class') {
            this[i].className = value;
          } else if (value === '') {
            this[i].removeAttribute(prop);
          } else {
            this[i].setAttribute(prop, value);
          }
        }
        return this;
      }
      // get
      if (this[0]) {
        if (prop === 'style') {
          if (this[0].style.cssText) {
            return this[0].style.cssText;
          }
        } else if (prop === 'class') {
          if (this[0].className) {
            return this[0].className;
          }
        } else {
          if (this[0].getAttribute(prop)) {
            return this[0].getAttribute(prop);
          }
        }
      }
    }
  };
  $.fn.prop = function (prop, value) {
    if (prop) {
      prop = prop.toLower();
      // set
      if (value || value === '') {
        this[prop] = value;
        return this;
      } else {
        return this[prop];
      }
    }
  };
  $.fn.css = function (props, value) {
    var $this = this, name = props, n = 0, len = props.length, css, output = {}, dasherise = function (prop) {
        return prop.replace(/[A-Z]/g, function (letter) {
          return '-' + letter.toLowerCase();
        });
      };
    // retrieve value from first property
    if (value === undefined && props.constructor === Array) {
      if (this.length) {
        css = getComputedStyle($this[0], '');
        if (typeof name === 'string') {
          props = [name];
        }
        for (; n < len; n += 1) {
          props[n] = dasherise(props[n]);
          output[props[n]] = css.getPropertyValue(props[n]);
          if (len === 1) {
            return output[props[n]];
          }
        }
        return output;
      }  // set the values
    } else {
      if (typeof name === 'string') {
        props = {};
        props[name] = value;
      }
      $.each(props, function (prop, val) {
        prop = dasherise(prop);
        //prop = prop.replace(/-([a-z])/gi, function (text, letter) {return letter.toUpperCase();});
        for (var i = 0; i < $this.length; i += 1) {
          if (!val && val !== 0) {
            $this[i].style.removeProperty(prop);
          } else {
            $this[i].style.setProperty(prop, val);
          }
        }
      });
      return $this;
    }
  };
}(core);
traversal = function ($) {
  $.fn.eq = function (i) {
    return $(this[i >= 0 ? i : i + this.length]);
  };
  $.fn.find = function (selector) {
    return $(selector, this);
  };
  $.fn.first = function () {
    return this[0] ? $(this[0]) : $();
  };
  $.fn.last = function () {
    var len = this.length;
    return len ? $(this[len - 1]) : $();
  };
}(core);
events = function ($) {
  function getDelegate(callback, selector) {
    return function (e) {
      this.selector = selector;
      if (!selector || $(selector).is(e.target)) {
        callback.apply(this, e);
      }
    };
  }
  $.fn.on = function (events, selector, callback) {
    events = events.split(' ');
    // sort out args
    if ($.isFunction(selector)) {
      callback = selector;
      selector = null;
    }
    // check for bubble
    var i, e, fn = getDelegate(callback, selector);
    // attach event
    for (i = 0; i < this.length; i += 1) {
      for (e = 0; e < events.length; e += 1) {
        this[i].addEventListener(events[e], callback, false);
      }
    }
    return this;
  };
  // Remove event handler
  $.fn.off = function (event, selector, callback) {
    events = events.split(' ');
    // sort out args
    if ($.isFunction(selector)) {
      callback = selector;
      selector = null;
    }
    // check for bubble
    var i, e, fn = getDelegate(callback, selector);
    // attach event
    for (i = 0; i < this.length; i += 1) {
      for (e = 0; e < events.length; e += 1) {
        this[i].removeEventListener(events[e], fn, false);
      }
    }
    return this;
  };
}(core);
ajax = function ($) {
  $.ajax = function (url, settings) {
    var timestamp = '_=' + +new Date();
    if (typeof url === 'object') {
      settings = url;
    } else {
      settings = { url: url };
    }
    if (typeof settings === 'function') {
      settings = { success: settings };
    }
    settings = $.extend({
      method: 'GET',
      cache: true,
      success: function () {
      }
    }, settings);
    xhr = new XMLHttpRequest();
    if (xhr) {
      if (!settings.cache) {
        settings.url += (settings.url.indexOf('?') > -1 ? '&' : '?') + timestamp;
      }
      xhr.open(settings.method, settings.url, true);
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          settings.success(xhr.responseText, xhr.status, xhr);
        }
      };
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      if ($.inArray(settings.method, [
          'POST',
          'PUT'
        ])) {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      }
      xhr.send();
    }
    return xhr;
  };
}(core);
dimensions = function ($) {
  [
    'Width',
    'Height'
  ].forEach(function (dim) {
    var diml = dim.toLowerCase();
    $.fn[diml] = function (val) {
      if (this.length) {
        var obj = this[0];
        // set value
        if (val !== undefined) {
          return this.css(diml, val);  // window
        } else if ($.isWindow(obj)) {
          return obj['inner' + dim];  // document
        } else if (obj.nodeType === 9) {
          return obj.documentElement['scroll' + dim];  // element
        } else {
          return obj['offset' + dim];
        }
      }
    };
  });
}(core);
amd = function ($) {
  if (true) {
    dabby = function () {
      return $;
    }();
  }
}(core);
main = function ($) {
  if (!window.$) {
    window.$ = $;
  }
  return $;
}(core);
}());