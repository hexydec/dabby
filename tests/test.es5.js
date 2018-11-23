(function ($) {
  'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  QUnit.module("Ajax");
  QUnit.test("$.ajax", function (assert) {
    assert.expect(15);
    var done = assert.async(8);
    $.ajax("../tests/assets/sample.html", {
      success: function success(response, status) {
        assert.equal(status, "success", "Can make an AJAX request");
        assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
        done();
      }
    });
    $.ajax({
      url: "../tests/assets/sample.html",
      success: function success(response, status) {
        assert.equal(status, "success", "Can make an AJAX request with all settings as object");
        assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
        done();
      },
      complete: function complete(xhr, status) {
        assert.equal(status, "success", "Can set complete callback");
        assert.ok(xhr.responseText.indexOf("Sample HTML File") !== -1, "Complete callback returned correct file");
        done();
      },
      statusCode: {
        200: function _(response, status) {
          assert.equal(status, "success", "Can set statusCode 200 callback");
          assert.ok(response.indexOf("Sample HTML File") !== -1, "Status code 200 callback returned correct file");
          done();
        }
      }
    });
    $.ajax("../tests/assets/sample.json", {
      success: function success(response, status) {
        assert.equal(status, "success", "Can make an AJAX request");
        assert.equal(response.foo, "foo", "AJAX request returned json");
        done();
      }
    });
    $.ajax("../tests/assets/404.html", {
      error: function error(response, status) {
        assert.equal(status, "error", "Can run callback on error");
        done();
      }
    }); // syncronous

    $.ajax("../tests/assets/sample.js", {
      success: function success(response, status) {
        assert.equal(status, "success", "Can include a javascript file");
        assert.ok(dabbyScriptSuccess, "Javascript file included successfully");
        done();
      }
    });
    $.ajax("../tests/assets/sample.js?v=1.0.0", {
      success: function success(response, status) {
        assert.equal(status, "success", "Can include a javascript file");
        assert.ok(dabbyScriptSuccess, "Javascript file included successfully");
        done();
      }
    }); // jsonp

    /*$.ajax("../tests/assets/jsonp.js", {dataType: "jsonp", success: function (response, status) {
    	assert.equal(status, "success", "Can include a javascript file via JSONP");
    	assert.ok(response, "JSONP response correct");
    	done();
    }});*/
  });
  QUnit.module("Ajax");
  QUnit.test("$.get", function (assert) {
    assert.expect(8);
    var done = assert.async(4); //basic request

    $.get("../tests/assets/sample.html", function (response, status) {
      assert.equal(status, "success", "Can make an AJAX request");
      assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
      done();
    }); //basic request as object

    $.get({
      url: "../tests/assets/sample.html",
      success: function success(response, status) {
        assert.equal(status, "success", "Can make an AJAX request");
        assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
        done();
      }
    }); //request with data

    var data = {
      foo: "foo",
      bar: "bar"
    };
    $.get("../tests/assets/reflection.js", data, function (response, status) {
      assert.equal(status, "success", "Can make an AJAX request");
      assert.ok(dabbyReflection.foo === data.foo && dabbyReflection.bar === data.bar, "AJAX request set the posted data");
      done();
    }); // specify data type

    var data = {
      foo: "foo",
      bar: "bar",
      type: "text"
    };
    $.get("../tests/assets/json.txt", function (response, status) {
      assert.equal(status, "success", "Can make an AJAX request");
      assert.deepEqual(response, data, "AJAX response processed the data corretly");
      done();
    }, "json");
  });
  QUnit.module("Ajax");
  QUnit.test("$.getScript", function (assert) {
    assert.expect(2);
    var done = assert.async(1); //basic request

    window.dabbyScriptSuccess = false;
    $.getScript("../tests/assets/sample.js", function (response, status) {
      assert.equal(status, "success", "Can include a script");
      assert.ok(window.dabbyScriptSuccess, "Script included correctly");
      done();
    });
  });
  QUnit.module("Ajax");
  QUnit.test("$.fn.load", function (assert) {
    assert.expect(12);
    var done = assert.async(2);
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div>';
    var obj = $(".testtemp, .testtemp2"); // load HTML

    obj.load("../tests/assets/sample.html", function (response, status) {
      assert.equal(status, "success", "Can make an AJAX request");
      assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
      assert.equal($("p", this).get(0).innerText, "Sample HTML File", "HTML was successfully inserted into the page");

      if (this.matches(".testtemp2")) {
        // only done() when run on both
        done();
      }
    }); // load HTML with selector

    obj.load("../tests/assets/sample.html .test", function (response, status) {
      assert.equal(status, "success", "Can make an AJAX request");
      assert.ok(response.indexOf("Sample HTML File") !== -1, "AJAX request returned correct file");
      assert.equal($(".test", this).get(0).innerText, "This is inside a selector", "HTML was successfully inserted into the page");

      if (this.matches(".testtemp2")) {
        // only done() when run on both
        done();
      }
    });
  });
  QUnit.module("Ajax");
  QUnit.test("$.param", function (assert) {
    var params = {
      foo: "bar",
      bar: "foo",
      foobar: {
        foo: "bar",
        bar: "foo"
      },
      fb: ["foo", "bar", "foobar"],
      enc: "this is=a&test"
    },
        output = "foo=bar&bar=foo&foobar%5Bfoo%5D=bar&foobar%5Bbar%5D=foo&fb%5B%5D=foo&fb%5B%5D=bar&fb%5B%5D=foobar&enc=this%20is%3Da%26test";
    assert.equal($.param(params), output, "Can encode an array to a query string");
  });
  QUnit.module("Ajax");
  QUnit.test("$.serialize", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<form class="testtemp">' + '<input type="input" name="input" value="input" />' + '<input type="number" name="number" value="42" />' + '<input type="email" name="email" value="dave@angel.com" />' + '<input type="datetime-local" name="datetime" value="1999-12-31 23:59:59" />' + '<input type="submit" name="submit" value="" />' + '<input type="checkbox" name="checkbox" value="unchecked" />' + '<input type="checkbox" name="checkbox-checked" value="checked" checked="checked" />' + '<input type="input" name="in[]" value="input1" />' + '<input type="input" name="in[]" value="input2" />' + '<input type="input" name="in[]" value="input3" />' + '<input type="radio" name="radio" value="radio1" />' + '<input type="radio" name="radio" value="radio2" checked="checked" />' + '<input type="radio" name="radio" value="radio3" />' + '<select name="select">' + '<option value="select1">Option 1</option>' + '<option value="select2" selected="selected">Option 2</option>' + '<option value="select3">Option 3</option>' + '</select>' + '<select name="multiselect[]" multiple="multiple">' + '<option value="select1">Option 1</option>' + '<option value="select2" selected="selected">Option 2</option>' + '<option value="select3" selected="selected">Option 3</option>' + '</select>' + '</form>';
    var date = test.querySelector("input[name=datetime]").value;
    assert.equal($(".testtemp").serialize(), "input=input&number=42&email=dave%40angel.com&datetime=" + encodeURIComponent(date) + "&checkbox-checked=checked&in%5B%5D=input1&in%5B%5D=input2&in%5B%5D=input3&radio=radio2&select=select2&multiselect%5B%5D=select2&multiselect%5B%5D=select3", "Can serialize a form");
  });
  QUnit.module("Attributes");
  QUnit.test("$.fn.attr", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = $(".testtemp"),
        rmain = document.getElementsByClassName("testtemp")[0],
        style = "padding-top: 10px;"; // set and get class

    assert.deepEqual(main.attr("class", "testtemp testclass"), main, "Returns itself when setting class");
    assert.equal(rmain.className, "testtemp testclass", "Can set class");
    assert.equal(main.attr("class"), "testtemp testclass", "Can retrieve class");
    main.attr("class", "testtemp");
    assert.equal(main.attr("class"), "testtemp", "Can remove class"); // set and get style

    assert.deepEqual(main.attr("style", style), main, "Returns itself when setting style");
    assert.equal(rmain.style.cssText, style, "Can set style");
    assert.equal(main.attr("style"), style, "Can retrieve style"); // set and get attribute

    assert.deepEqual(main.attr("itemprop", "articleBody"), main, "Returns itself when setting property");
    assert.equal(rmain.getAttribute("itemprop"), "articleBody", "Can set property");
    assert.equal(main.attr("itemprop"), "articleBody", "Can retrieve property");
    main.attr("itemprop", null);
    assert.equal(main.attr("itemprop"), undefined, "Can remove property"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Attributes");
  QUnit.test("$.fn.addClass", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = $(".testtemp"),
        rmain = document.getElementsByClassName("testtemp")[0]; // set and get class

    assert.deepEqual(main.addClass("test1"), main, "Returns itself when setting class");
    assert.equal(rmain.className, "testtemp test1", "Can set class");
    main.addClass("test2 test3");
    assert.equal(rmain.className, "testtemp test1 test2 test3", "Can set multiple classes");
    rmain.className = "testtemp";
    main.addClass(["new1", "new2"]);
    assert.equal(rmain.className, "testtemp new1 new2", "Can set multiple classes as an array"); // reset

    test.innerHTML = "";
  });
  QUnit.test("$.removeClass", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = $(".testtemp"),
        rmain = document.getElementsByClassName("testtemp")[0]; // set and get class

    rmain.className = "testtemp test1 test2 test3";
    assert.deepEqual(main.removeClass("test1"), main, "Returns itself when setting class");
    assert.equal(rmain.className, "testtemp test2 test3", "Can remove class");
    main.removeClass("test2 test3");
    assert.equal(rmain.className, "testtemp", "Can remove multiple classes"); // reset

    test.innerHTML = "";
  });
  QUnit.test("$.toggleClass", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = $(".testtemp"),
        rmain = document.getElementsByClassName("testtemp")[0]; // set and get class

    rmain.className = "testtemp";
    assert.deepEqual(main.toggleClass("test1"), main, "Returns itself when setting class");
    assert.equal(rmain.className, "testtemp test1", "Can toggle class on");
    main.toggleClass("test1");
    assert.equal(rmain.className, "testtemp", "Can toggle class off");
    main.toggleClass("test2 test3");
    assert.equal(rmain.className, "testtemp test2 test3", "Can toggle multiple classes on"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Attributes");
  QUnit.test("$.fn.css", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = $(".testtemp"),
        rmain = document.getElementsByClassName("testtemp")[0],
        props = ["border-left-color", "border-left-style", "border-left-width"],
        output = {
      "border-left-color": "rgb(255, 0, 0)",
      "border-left-style": "solid",
      "border-left-width": "1px"
    },
        outputCC = {
      "borderLeftColor": "rgb(255, 0, 0)",
      "borderLeftStyle": "solid",
      "borderLeftWidth": "1px"
    }; // retrieve CSS properties

    rmain.style.cssText = 'border: 1px solid red;';
    assert.equal(main.css("border-left-color"), "rgb(255, 0, 0)", "Can retrieve CSS property");
    assert.deepEqual(main.css(props), output, "Can retrieve multiple CSS properties");
    props = ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"];
    assert.deepEqual(main.css(props), outputCC, "Can retrieve multiple CSS properties with camelCase"); // set css properties

    rmain.style.cssText = '';
    assert.deepEqual(main.css("border", "1px solid red"), main, "Dabby object is returned after set");
    assert.equal(rmain.style.borderLeftColor, "red", "Can set CSS property");
    rmain.style.cssText = '';
    main.css({
      border: "1px solid red",
      padding: 10
    }); // also tests unitless values

    assert.equal(rmain.style.borderLeftColor, "red", "Can set CSS property through an object");
    assert.equal(rmain.style.padding, "10px", "Can set CSS property through an object"); // uses utils/setcss/setcss.js anyway, so doesn't need extensive testing here
    // reset

    test.innerHTML = "";
  });
  QUnit.module("Attributes", function (hooks) {
    var test = document.getElementsByClassName("test")[0];
    hooks.before(function () {
      test.innerHTML = '<div class="testtemp"></div>';
    });
    QUnit.test("$.fn.data", function (assert) {
      var main = $(".testtemp"),
          rmain = document.getElementsByClassName("testtemp")[0],
          json = {
        foo: "bar",
        foo2: "bar2"
      }; // set data

      assert.deepEqual(main.data("var", "value"), main, "Returns itself when setting data");
      assert.equal(main.data("var"), "value", "Can set data");
      main.data("json", json);
      assert.deepEqual(main.data("json"), json, "Can set and get data as a plain object");
      assert.deepEqual(main.data(), {
        var: "value",
        json: json
      }, "Can retrieve all data from node");
    });
    hooks.after(function () {
      test.innerHTML = "";
    });
  });
  QUnit.module("Attributes");
  QUnit.test("$.fn.hasClass", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp testtemp2"></div>';
    var obj = $(".testtemp");
    assert.ok(obj.hasClass("testtemp2"), "Can detect class");
    assert.ok(!obj.hasClass("testtemp3"), "Can detect class is not on object");
  });
  QUnit.module("Attributes");
  QUnit.test("$.fn.prop", function (assert) {
    var obj = $("<h1>", {
      tabindex: 1
    });
    assert.deepEqual(obj, obj.prop("title", "test"), "Returns self on set");
    assert.equal(obj.get(0).title, "test", "Can set property");
    assert.equal(obj.prop("title"), "test", "Can read property");
    assert.equal(obj.prop("tabindex"), 1, "Can read property");
    var obj = $("<input>", {
      type: "checkbox",
      name: "foo",
      value: "bar",
      checked: "checked"
    });
    assert.equal(obj.prop("checked"), true, "Can read boolean property");
    assert.equal(obj.prop("title"), "", "Unset property returns undefined");
  });
  QUnit.module("Attributes");
  QUnit.test("$.fn.show", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp"><div style="display: none;"></div><div style="display: none;"></div><div style="display: none;"><div style="display: none;"></div></div><div style="display: none;"><div style="display: none;"></div></div></div>';
    obj = $(".testtemp div");
    assert.deepEqual(obj.show(), obj, "Returns self on set");
    var show = 0;
    obj.get().forEach(function (item) {
      show += item.style.display !== "none";
    });
    assert.equal(obj.length, show, "Showed the requested elements");
  });
  QUnit.test("$.fn.hide", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp"><div></div><div></div><div><div></div></div><div><div></div></div></div>';
    obj = $(".testtemp div");
    assert.deepEqual(obj.hide(), obj, "Returns self on set");
    var hide = 0;
    obj.get().forEach(function (item) {
      hide += item.style.display === "none";
    });
    assert.equal(obj.length, hide, "Hid the requested elements");
  });
  QUnit.test("$.fn.toggle", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp"><div style="display: none;"></div><div style="display: inline-block;"></div><div style="display: flex;"><div></div></div><div style="display: none;"><div style="display: none;"></div></div></div>';
    obj = $(".testtemp div");
    assert.deepEqual(obj.toggle(), obj, "Returns self on set");
    var show = 0,
        hide = 0;
    obj.get().forEach(function (item) {
      hide += item.style.display === "none";
      show += item.style.display !== "none";
    });
    assert.equal(3, show, "Showed the requested elements");
    assert.equal(3, hide, "Hid the requested elements");
  });
  QUnit.module("Attributes");
  QUnit.test("$.fn.val", function (assert) {
    var obj = $("<input>", {
      type: "text",
      value: "test"
    }),
        multi = document.createElement("select"),
        text = $("<textarea>", {
      text: "test"
    }),
        // write test for this
    i = 0,
        opt,
        radio = $("<input>", {
      type: "radio",
      name: "radio",
      value: "radio1"
    }).add($("<input>", {
      type: "radio",
      name: "radio",
      value: "radio2"
    }));
    assert.equal(obj.val(), "test", "Can read value");
    assert.deepEqual(obj.val("new value"), obj, "Returns self when setting value");
    assert.equal(obj.val(), "new value", "Can set value");
    multi.multiple = true;

    for (; i < 10; i += 1) {
      opt = document.createElement("option");
      opt.value = i;
      opt.innerHTML = i;
      multi.appendChild(opt);
    }

    obj = $(multi).val([1, 3, 5]);
    assert.deepEqual(obj.val(), ["1", "3", "5"], "Can set and read multiple values");
    text.val("new value");
    assert.equal(text.val(), "new value", "Can set and read value from textarea");
    assert.equal(radio.val(), "radio1", "Can retrieve value of radio box");
    assert.equal(radio.val(["radio2"]), radio, "Can set value of radio box");
    assert.equal(radio.filter(":checked").val(), "radio2", "Can get value of radio box");
  });
  QUnit.module("Core"); // add mouseevent support

  (function () {
    var MouseEvent = function MouseEvent(eventType, params) {
      params = params || {
        bubbles: false,
        cancelable: false
      };
      var mouseEvent = document.createEvent('MouseEvent');
      mouseEvent.initMouseEvent(eventType, params.bubbles, params.cancelable, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
      return mouseEvent;
    };

    MouseEvent.prototype = Event.prototype;
    window.MouseEvent = MouseEvent;
  })();

  QUnit.test("$.fn.init", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<h1>test</h1><input type="checkbox" checked="checked" />';
    var h1 = test.getElementsByTagName("h1")[0],
        checkbox = test.querySelector("input[type=checkbox]"),
        html = '<h1>Hello <strong>How are you?</strong></h1>',
        newh1 = document.createElement("h1"),
        triggered = false,
        obj = $("<h1>", {
      style: "background-color:red",
      text: "test",
      click: function click() {
        triggered = true;
      }
    }),
        objNode = obj.get(0);
    assert.ok($(".test").get(0) === test, "Can select object by class");
    assert.ok($(".test h1").get(0) === h1, "Can select child object");
    assert.ok($(".test > h1").get(0) === h1, "Can select direct child object");
    assert.ok($(".test > h1:first-child").get(0) === h1, "Can select first child");
    assert.ok($("input[type=checkbox]", test).get(0) === checkbox, "Can select with attributes");
    assert.ok($("input[type=checkbox]:checked", test).get(0) === checkbox, "Can select with attributes");
    assert.ok($($(".test")).get(0) === test, "Can select object from Dabby object");
    assert.ok($(test).get(0) === test, "Can select object from node");
    assert.deepEqual($([test, h1]).get(), [test, h1], "Can select object from node");
    assert.ok($('<h1>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
    assert.ok($('<h1/>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
    assert.ok($('<h1 />').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
    assert.ok($('<h1></h1>').get(0) instanceof HTMLHeadingElement, "Can create HTML objects");
    assert.ok(objNode instanceof HTMLHeadingElement, "Can create HTML objects");
    assert.ok(objNode.innerText === "test", "Can create HTML objects with text attributes");
    assert.ok(objNode.style.backgroundColor === "red", "Can create HTML objects with style attributes");
    objNode.dispatchEvent(new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    }));
    assert.ok(triggered, "Can create HTML objects and attached events");
    assert.equal($(html).get(0).outerHTML, html, "Can create HTML nodes");
  });
  QUnit.module("Core");
  QUnit.test("$.fn.each", function (assert) {
    var main = document.getElementsByClassName("main")[0],
        h1 = document.getElementsByClassName("heading")[0],
        output = [];
    $(".main, .heading").each(function () {
      output.push(this.tagName.toLowerCase());
    });
    assert.deepEqual(output, ["div", "h1"]);
  });
  QUnit.module("Core");
  QUnit.test("$.fn.get", function (assert) {
    var main = document.getElementsByClassName("main")[0],
        h1 = document.getElementsByClassName("heading")[0];
    assert.deepEqual($(".main, .heading").get(), [main, h1]);
    assert.deepEqual($(".main, .heading").get(0), main);
  });
  QUnit.module("Core");
  QUnit.test("$.fn.map", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp">first</div><div class="testtemp">second</div>';
    var output = $(".testtemp").map(function () {
      return this.innerText;
    });
    assert.deepEqual(Array.from(output), ["first", "second"]);
  });
  QUnit.module("Dimensions");
  QUnit.test("$.fn.offset", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj,
        coords = {
      top: 100,
      left: 100
    };
    test.innerHTML = '<div class="testtemp">test</div>';
    obj = $(".testtemp");
    assert.deepEqual(obj.offset(coords), obj, "Returns self on set unpositioned element");
    var offset = obj.offset();
    offset.top = parseFloat(offset.top.toFixed(1)); // IE has rounding errors

    offset.left = parseFloat(offset.left.toFixed(1));
    assert.deepEqual(offset, coords, "Can set and retrieve coordinates on unpositioned element"); // test position relative

    test.innerHTML = '<div class="testtemp" style="padding: 20px; position: relative;"><div class="testrelative">test</div></div>';
    obj = $(".testrelative");
    assert.deepEqual(obj.offset(coords), obj, "Returns self on set element with a relatively positioned parent");
    var offset = obj.offset();
    offset.top = parseFloat(offset.top.toFixed(1)); // IE has rounding errors

    offset.left = parseFloat(offset.left.toFixed(1));
    assert.deepEqual(offset, coords, "Can set and retrieve coordinates on element with a relatively positioned parent"); // test position relative

    test.innerHTML = '<div class="testtemp" style="padding: 20px; position: relative; background: red;"><div class="testabsolute" style="position:absolute; top: 20px; left: 20px; background: green;">test</div></div>';
    obj = $(".testabsolute");
    assert.deepEqual(obj.offset(coords), obj, "Returns self on set absolutely positioned element");
    var offset = obj.offset();
    offset.top = parseFloat(offset.top.toFixed(1)); // IE has rounding errors

    offset.left = parseFloat(offset.left.toFixed(1));
    assert.deepEqual(offset, coords, "Can set and retrieve coordinates"); // reset
    //test.innerHTML = "";
  });
  QUnit.module("Dimensions");
  QUnit.test("$.fn.offsetParent", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp" style="position:relative;"><div class="testinner"><div class="testinner2"></div></div></div>';
    assert.deepEqual($(".testinner").offsetParent().get(0), test.getElementsByClassName("testinner")[0].offsetParent, "Can get offset parent");
    assert.deepEqual($(".testinner2").offsetParent().get(0), test.getElementsByClassName("testinner2")[0].offsetParent, "Can get offset parent");
  });
  QUnit.module("Dimensions");
  QUnit.test("$.fn.scrollLeft/$.fn.scrollTop", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp" style="width:100px;height:100px;overflow:auto;"><div class="testinner" style="width:1000px;height:1000px;"></div></div>';
    var obj = $(".testtemp");
    assert.deepEqual(obj, obj.scrollLeft(10), "Returns self on set");
    assert.equal(obj.get(0).scrollLeft, 10, "Can set scroll value");
    assert.equal(obj.scrollLeft(), 10, "Can get scroll value");
  });
  QUnit.module("Dimensions");
  QUnit.test("$.fn.width/$.fn.height", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp" style="width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
    obj = $(".testtemp"); // read width

    assert.equal(obj.width(), 100, "Can set and read width");
    assert.equal(obj.innerWidth(), 120, "Can set and read innerWidth");
    assert.equal(obj.outerWidth(), 140, "Can set and read outerWidth");
    assert.equal(obj.outerWidth(true), 160, "Can set and read outerWidth with margin"); // set width

    assert.deepEqual(obj.width(120), obj, "Returns self on set width");
    assert.equal(obj.width(), 120, "Can set and read width");
    assert.equal(obj.innerWidth(), 140, "Can set and read innerWidth");
    assert.equal(obj.outerWidth(), 160, "Can set and read outerWidth");
    assert.equal(obj.outerWidth(true), 180, "Can set and read outerWidth with margin"); // set innerWidth

    assert.deepEqual(obj.innerWidth(120), obj, "Returns self on set innerWidth");
    assert.equal(obj.width(), 100, "Can set and read width");
    assert.equal(obj.innerWidth(), 120, "Can set and read innerWidth");
    assert.equal(obj.outerWidth(), 140, "Can set and read outerWidth");
    assert.equal(obj.outerWidth(true), 160, "Can set and read outerWidth with margin"); // set outerWidth

    assert.deepEqual(obj.outerWidth(120), obj, "Returns self on set outerWidth");
    assert.equal(obj.width(), 80, "Can set and read width");
    assert.equal(obj.innerWidth(), 100, "Can set and read innerWidth");
    assert.equal(obj.outerWidth(), 120, "Can set and read outerWidth");
    assert.equal(obj.outerWidth(true), 140, "Can set and read outerWidth with margin"); // box-sizing

    test.innerHTML = '<div class="testtemp" style="box-sizing: content-box; width: 100px; padding: 10px; border: 10px solid red; margin: 10px;">test</div>';
    obj = $(".testtemp"); // read width

    assert.equal(obj.width(), 100, "Can set and read width");
    assert.equal(obj.innerWidth(), 120, "Can set and read innerWidth");
    assert.equal(obj.outerWidth(), 140, "Can set and read outerWidth");
    assert.equal(obj.outerWidth(true), 160, "Can set and read outerWidth with margin"); // set width

    assert.deepEqual(obj.width(120), obj, "Returns self on set width");
    assert.equal(obj.width(), 120, "Can set and read width");
    assert.equal(obj.innerWidth(), 140, "Can set and read innerWidth");
    assert.equal(obj.outerWidth(), 160, "Can set and read outerWidth");
    assert.equal(obj.outerWidth(true), 180, "Can set and read outerWidth with margin"); // set innerWidth

    assert.deepEqual(obj.innerWidth(120), obj, "Returns self on set innerWidth");
    assert.equal(obj.width(), 100, "Can set and read width");
    assert.equal(obj.innerWidth(), 120, "Can set and read innerWidth");
    assert.equal(obj.outerWidth(), 140, "Can set and read outerWidth");
    assert.equal(obj.outerWidth(true), 160, "Can set and read outerWidth with margin"); // set outerWidth

    assert.deepEqual(obj.outerWidth(120), obj, "Returns self on set outerWidth");
    assert.equal(obj.width(), 80, "Can set and read width");
    assert.equal(obj.innerWidth(), 100, "Can set and read innerWidth");
    assert.equal(obj.outerWidth(), 120, "Can set and read outerWidth");
    assert.equal(obj.outerWidth(true), 140, "Can set and read outerWidth with margin"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Events", function (hooks) {
    var test = document.getElementsByClassName("test")[0];
    hooks.before(function () {
      test.innerHTML = '<div class="testtemp"></div>';
    });
    QUnit.test("$.fn.on/$.fn.off", function (assert) {
      var obj = $(".testtemp"),
          plain = document.getElementsByClassName("testtemp")[0],
          triggered = -1,
          func = function func(e) {
        triggered++;
      },
          name = "test.trigger",
          i = 0,
          body = $("body"); // test singular events


      assert.equal(obj.on(name, func), obj, "Returns self on set event");

      for (; i < 3; i++) {
        obj.trigger(name);
        assert.equal(triggered, i, "Can set event");
      }

      $(test).trigger(name);
      assert.equal(triggered, 2, "Events are set on the correct object"); // test removing event

      assert.equal(obj.off(name, func), obj, "Returns self on remove event");
      obj.trigger(name);
      assert.equal(triggered, 2, "Events are removed from the correct object"); // test delegated events

      triggered = -1;
      assert.equal(body.on(name, ".testtemp", func), body, "Returns self on set delegated event");

      for (i = 0; i < 3; i++) {
        obj.trigger(name);
        assert.equal(triggered, i, "Can set delegated event");
      }

      $(test).trigger(name);
      assert.equal(triggered, 2, "Events are set on the correct object"); // test removing event

      assert.equal(body.off(name, ".testtemp", func), body, "Returns self on remove event");
      obj.trigger(name);
      assert.equal(triggered, 2, "Events are removed from the correct object"); // test removing event with no handler

      body.on(name, ".testtemp", func);
      body.off(name, ".testtemp");
      obj.trigger(name);
      assert.equal(triggered, 2, "Events are removed from the correct delegated object by event name"); // test removing event with no handler

      obj.on(name, func);
      obj.off(name);
      obj.trigger(name);
      assert.equal(triggered, 2, "Events are removed from the correct object by event name");
    });
    hooks.after(function () {
      test.innerHTML = "";
    });
  });
  QUnit.module("Events", function (hooks) {
    var test = document.getElementsByClassName("test")[0];
    hooks.before(function () {
      test.innerHTML = '<div class="testtemp"><div>1</div><div>2</div><div>3</div></div>';
    });
    QUnit.test("$.fn.trigger", function (assert) {
      var divs = test.querySelectorAll(".testtemp div"),
          count = 0,
          dabbyDivs = $(".testtemp div");
      [].slice.call(divs).forEach(function (div) {
        div.onclick = function (e) {
          count++;
          e.stopPropagation();
        };
      }); // test

      assert.equal(dabbyDivs.trigger("click"), dabbyDivs, "Returns self on trigger");
      assert.equal(count, 3, "Can trigger events");
    });
    hooks.after(function () {
      test.innerHTML = "";
    });
  });

  var camelise = function camelise(prop) {
    return prop.replace(/-([a-z])/gi, function (text, letter) {
      return letter.toUpperCase();
    });
  };

  QUnit.module("Internal");
  QUnit.test("camelise", function (assert) {
    assert.equal(camelise("this-is-a-test"), "thisIsATest", "Can camel case a dashed sentence");
    assert.equal(camelise("this-is-a-TEST"), "thisIsATEST", "Can camel case a dashed sentence respecting case");
  });

  var dasherise = function dasherise(prop) {
    return prop.replace(/[A-Z]/g, function (letter) {
      return "-" + letter.toLowerCase();
    });
  };

  QUnit.module("Internal");
  QUnit.test("dasherise", function (assert) {
    assert.equal(dasherise("thisIsATest"), "this-is-a-test", "Can dasherise a camel-cased sentence");
    assert.equal(dasherise("thisIsATEST"), "this-is-a-t-e-s-t", "Can dasherise a camel-cased sentence respecting case");
  });

  var $$1 = function dabby(selector, context) {
    // if no selector, return empty colletion
    if (this instanceof dabby) {
      selector = Array.from(selector).filter(function (node) {
        return [1, 9, 11].indexOf(node.nodeType) > -1 || $$1.isWindow(node);
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
      if (selector.nodeType || $$1.isWindow(selector)) {
        nodes = [selector]; // ready function
      } else if ($$1.isFunction(selector)) {
        if (document.readyState !== "loading") {
          selector.call(document, $$1);
        } else {
          document.addEventListener("DOMContentLoaded", function () {
            selector.call(document, $$1);
          }, {
            once: true
          });
        } // array|NodeList|HTMLCollection of nodes

      } else if (typeof selector !== "string") {
        nodes = selector; // CSS selector
      } else if (selector.indexOf("<") === -1) {
        $$1(context || document).each(function (i, obj) {
          nodes = nodes.concat(Array.from(obj.querySelectorAll(selector)));
        }); // create a single node and attach properties
      } else if ((match = selector.match(/^<([a-z0-9]+)(( ?\/)?|><\/\1)>$/i)) !== null) {
        nodes = [document.createElement(match[1])]; // context is CSS attributes

        if (context instanceof Object) {
          $$1(nodes).attr(context);
        } // parse HTML into nodes

      } else {
        var obj = document.implementation.createHTMLDocument("");
        obj.body.innerHTML = selector;
        nodes = obj.body.children;
      }
    }

    return new dabby(nodes);
  }; // alias functions


  $$1.fn = $$1.prototype;

  $$1.each = function (obj, callback) {
    var keys = Object.keys(obj),
        len = keys.length;

    for (var i = 0; i < len; i++) {
      if (callback.call(obj[keys[i]], keys[i], obj[keys[i]]) === false) {
        break; // stop if callback returns false
      }
    }

    return obj;
  };

  $$1.fn.each = function (callback) {
    $$1.each(Array.from(this), callback);
    return this;
  };

  $$1.isWindow = function (obj) {
    return obj !== null && obj === obj.window;
  };

  $$1.isFunction = function (func) {
    return func && func.constructor === Function;
  }; //import "../attributes/attr/attr.js"; // must add attr yourself if you want this functionality, as it could make your build smaller


  var filterNodes = function filterNodes(dabby, filter, context, not) {
    var func,
        nodes = dabby.nodeType ? [dabby] : Array.from(dabby); // sort out args

    if (typeof context === "boolean") {
      not = context;
      context = null;
    } // function


    if ($$1.isFunction(filter)) {
      func = filter; // nodes
    } else {
      // normalise filters
      if (typeof filter === "string") {
        filter = [filter];
      } else {
        filter = Array.from($$1(filter, context));
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

  QUnit.module("Internal");
  QUnit.test("filterNodes", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj,
        filtered;
    test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"></div><div class="class3"></div></div>';
    obj = $(".testtemp div");
    filtered = $(".testtemp .class1");
    assert.deepEqual(filterNodes(obj, ".class1"), filtered.get());
    assert.deepEqual(filterNodes(obj, filtered), filtered.get());
    assert.deepEqual(filterNodes(obj, filtered.get()), filtered.get());
    assert.deepEqual(filterNodes(obj, function (i, node) {
      return node.className === "class1";
    }), filtered.get());
    assert.deepEqual(filterNodes(obj, ".class2, .class3", true), filtered.get());
  });

  var getVal = function getVal(obj, val, current) {
    var i = obj.length,
        values = [],
        funcVal = $$1.isFunction(val),
        funcCurrent = $$1.isFunction(current);

    while (i--) {
      values[i] = funcVal ? val.call(obj[i], i, funcCurrent ? current(obj[i]) : current) : val;
    }

    return values;
  };

  QUnit.module("Internal");
  QUnit.test("getVal", function (assert) {
    var obj = $(".test");
    assert.deepEqual(getVal(obj, "test"), ["test"], "Can pass-through a value");
    assert.deepEqual(getVal(obj, function (i) {
      return this === obj[0] && !i ? "test" : false;
    }), ["test"], "When passing function as value, variables and context is correct");
  });

  var setCss = function setCss(dabby, props, value) {
    // normalise props
    if (typeof props === "string") {
      var name = props;
      props = {};
      props[name] = value;
    } // prepare values


    var values = {};
    $$1.each(props, function (i, prop) {
      values[camelise(i)] = getVal(dabby, prop, function (obj) {
        return obj.style[i];
      });
    }); // set properties

    $$1.each(values, function (key, val) {
      var i = dabby.length;

      while (i--) {
        if (!isNaN(val[i])) {
          val[i] += "px";
        }

        dabby[i].style[key] = val[i];
      }
    });
    return dabby;
  };

  QUnit.module("Internal");
  QUnit.test("setCss", function (assert) {
    var main = $(".main"),
        rmain = document.getElementsByClassName("main")[0],
        props = {
      "border-left-color": "red",
      "border-left-style": "solid",
      "border-left-width": "1px"
    },
        propsCC = {
      borderLeftColor: "red",
      borderLeftStyle: "solid",
      borderLeftWidth: "1px"
    },
        output = {
      "border-left-color": "rgb(255, 0, 0)",
      "border-left-style": "solid",
      "border-left-width": "1px"
    };
    rmain.style.cssText = "";
    assert.deepEqual(setCss(main, "border-left-color", "red"), main, "Returns Dabby object when CSS is set");
    assert.equal(rmain.style.borderLeftColor, "red", "Can set CSS property");
    rmain.style.cssText = "";
    setCss(main, "borderLeftColor", "red");
    assert.equal(rmain.style.borderLeftColor, "red", "Can set camelCase CSS property");
    rmain.style.cssText = "";
    setCss(main, props);
    assert.deepEqual(main.css(Object.keys(props)), output, "Can set multiple CSS properties");
    rmain.style.cssText = "";
    setCss(main, propsCC);
    assert.deepEqual(main.css(Object.keys(props)), output, "Can set multiple camelCase CSS properties");
    setCss(main, "borderLeftColor", function (index, current) {
      assert.equal(current, "red", "Callback function receives current value");
      return "green";
    });
    assert.equal(rmain.style.borderLeftColor, "green", "Can set CSS property through a callback function");
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.clone", function (assert) {
    var clone = $(".test").clone(),
        main = document.getElementsByClassName("test")[0]; // set and get class

    assert.ok(clone.get(0).className === "test" && clone.get(0) !== main, "Can clone objects");
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.empty", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = document.getElementsByClassName("testtemp")[0];
    main.insertAdjacentHTML("beforeEnd", "<span>Empty</span>");
    var empty = $(".testtemp");
    assert.deepEqual(empty.empty(), empty, "Returns itself on empty");
    assert.equal(empty.get(0).innerHTML, "", "Can empty node"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.html", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = $(".testtemp"),
        rmain = document.getElementsByClassName("testtemp")[0];
    rmain.insertAdjacentHTML("beforeEnd", "<div>Test</div>");
    var obj = $(".html");
    assert.equal(main.html(), "<div>Test</div>", "Can read html");
    var html = main.html("<div>Test</div>");
    assert.equal(main.get(0).innerHTML, "<div>Test</div>", "Can set html"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.prepend", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = $(".testtemp"),
        rmain = document.getElementsByClassName("testtemp")[0];
    assert.deepEqual(main.prepend("<div>Test</div>"), main, "Returns itself when insert");
    assert.equal(main.html(), "<div>Test</div>", "Can insert html"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.insertTo", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div>';
    var main = $("<div>Test</div>"),
        rmain = document.getElementsByClassName("testtemp")[0],
        test;
    assert.deepEqual(main.prependTo(".testtemp").get(), main.get(), "Returns itself when inserted");
    assert.equal($(".testtemp").html(), "<div>Test</div>", "Can insert html"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.remove", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"><div></div></div><div class="testtemp2"></div>';
    var obj = $(".testtemp, .testtemp2"),
        robj = Array.from(document.querySelectorAll(".testtemp, .testtemp2"));
    assert.deepEqual(obj.remove(".testtemp2").get(), robj, "Returns reduced set when removed");
    assert.ok(document.getElementsByClassName("testtemp2").length === 0, "Removed item from DOM");
  });
  QUnit.test("$.fn.detach", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"><div class="testtemp2"></div></div>';
    var obj = $(".testtemp");
    assert.deepEqual(obj.detach().get(0), obj.get(0), "Returns node when it is detached");
    assert.deepEqual($(".testtemp").get(), [], "Node has been removed from DOM");
  });
  QUnit.module("Manipulation", function (hooks) {
    var test = document.getElementsByClassName("test")[0];
    hooks.before(function () {
      test.innerHTML = '<div class="testtemp"><div></div><div></div><div></div></div>';
    });
    QUnit.test("$.fn.replaceWith", function (assert) {
      $(".testtemp div").replaceWith("<h2>");
      assert.equal($(".testtemp h2").length, 3, "Can replace nodes");
    });
    QUnit.test("$.fn.replaceAll", function (assert) {
      $("<div>").replaceAll(".testtemp h2");
      assert.equal($(".testtemp div").length, 3, "Can replace nodes");
    });
    hooks.after(function () {
      test.innerHTML = "";
    });
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.slice", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
    var main = $(".test > div");
    assert.deepEqual(main.slice(0, 1).get(), [document.getElementsByClassName("testtemp")[0]], "Can slice nodes");
    assert.deepEqual(main.slice(1, 3).get(), $(".testtemp2, .testtemp3").get(), "Can slice nodes");
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.text", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp">This <strong>is</strong> a <span><span><span>test yo</span></span></span></div>';
    var obj = $(".testtemp");
    assert.equal(obj.text(), "This is a test yo", "Can retrieve text");
    assert.deepEqual(obj.text("This is a test yo"), obj, "Returns self on set text");
    assert.equal(obj.get(0).textContent, "This is a test yo", "Can set text");
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.unwrap", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"><div class="testtemp2">test 2</div><div class="testtemp3">test 3</div></div>';
    var obj = $(".testtemp2"),
        parent = $(".testtemp");
    assert.deepEqual(obj.unwrap().get(), obj.get(), "Returns self on unwrap");
    assert.deepEqual($(".test > div").get(), $(".testtemp2, .testtemp3").get(), "Can unwrap node");
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.wrap", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        html = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';
    test.innerHTML = html;
    var obj = $(".testtemp p");
    assert.deepEqual(obj.wrap("<div>"), obj, "Returns self on wrap with html");
    assert.equal($(".testtemp > div > p").length, 3, "Can wrap elements with html");
    test.innerHTML = html;
    obj = $(".testtemp p");
    assert.deepEqual(obj.wrap("<div><span></span</div>"), obj, "Returns self on wrap with deep html");
    assert.equal($(".testtemp > div > span > p").length, 3, "Can wrap elements with deep html");
    test.innerHTML = html + '<div class="testtemp2"></div>';
    obj = $(".testtemp p");
    assert.deepEqual(obj.wrap(".testtemp2"), obj, "Returns self on wrap with existing element");
    assert.equal($(".testtemp > .testtemp2 > p").length, 3, "Can wrap elements with existing element"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Manipulation");
  QUnit.test("$.fn.wrapAll", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        html = '<div class="testtemp"><p>Line 1</p><p>Line 2</p><p>Line 3</p></div>';
    test.innerHTML = html;
    var obj = $(".testtemp p");
    assert.deepEqual(obj.wrap("<div>"), obj, "Returns self on wrap with html");
    assert.equal($(".testtemp > div > p").length, 3, "Can wrap elements with html");
    test.innerHTML = html;
    obj = $(".testtemp p");
    assert.deepEqual(obj.wrap("<div><span></span</div>"), obj, "Returns self on wrap with deep html");
    assert.equal($(".testtemp > div > span > p").length, 3, "Can wrap elements with deep html");
    test.innerHTML = html + '<div class="testtemp2"></div>';
    obj = $(".testtemp p");
    assert.deepEqual(obj.wrap(".testtemp2"), obj, "Returns self on wrap with existing element");
    assert.equal($(".testtemp > .testtemp2 > p").length, 3, "Can wrap elements with existing element"); // reset

    test.innerHTML = "";
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.add", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
    obj = $(".testtemp");
    assert.deepEqual(obj.add(".testtemp2").get(), $(".testtemp, .testtemp2").get(), "Can add nodes");
    test.innerHTML = "";
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.children", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
    obj = $(".test");
    assert.deepEqual(obj.children().get(), $(".testtemp, .testtemp2").get(), "Can get child nodes");
    assert.deepEqual(obj.children(".testtemp").get(), $(".testtemp").get(), "Can get and filter child nodes");
    test.innerHTML = "";
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.eq", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp">test</div><div class="testtemp">test 2</div><div class="testtemp">test 3</div>';
    obj = $(".testtemp");
    assert.equal(obj.eq(0).get().length, 1, "Returns only a single node");
    assert.equal(obj.eq(0).get(0).innerHTML, "test", "Can select index");
    assert.equal(obj.eq(1).get(0).innerHTML, "test 2", "Can select index");
    assert.equal(obj.eq(2).get(0).innerHTML, "test 3", "Can select index");
    assert.equal(obj.eq(-1).get(0).innerHTML, "test 3", "Can select negative index");
    assert.equal(obj.eq(-2).get(0).innerHTML, "test 2", "Can select negative index");
    assert.equal(obj.eq(-3).get(0).innerHTML, "test", "Can select negative index");
    assert.deepEqual(obj.eq(4).get(), $().get(), "Returns empty object when selected out of range");
    assert.deepEqual(obj.eq(-4).get(), $().get(), "Returns empty object when selected out of range");
    test.innerHTML = "";
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.filter/$.fn.not", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp testtemp1">test</div><div class="testtemp testtemp2">test 2</div><div class="testtemp testtemp3">test 3</div>';
    obj = $(".testtemp");
    assert.deepEqual(obj.filter(".testtemp2").get(), $(".testtemp2").get(), "Can filter nodes by selector");
    assert.equal(obj.filter(function (i, item) {
      return item.innerHTML == "test";
    }).get(0).innerHTML, "test", "Can filter nodes by callback");
    assert.equal(obj.filter(function (i, item) {
      return item.innerHTML != "test";
    }).get().length, 2, "Can filter nodes by callback");
    assert.deepEqual(obj.not(".testtemp2").get(), $(".testtemp1,.testtemp3").get(), "Can negatively filter nodes by selector");
    assert.equal(obj.not(function (i, item) {
      return item.innerHTML != "test";
    }).get(0).innerHTML, "test", "Can negatively filter nodes by callback");
    assert.equal(obj.not(function (i, item) {
      return item.innerHTML == "test";
    }).get().length, 2, "Can negatively filter nodes by callback");
    test.innerHTML = "";
  });
  QUnit.test("$.fn.is", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
    obj = $(".testtemp, .testtemp2");
    assert.ok(obj.is(".testtemp"), "Returns true when node matches selector");
    assert.ok(obj.is(document.getElementsByClassName("testtemp")[0]), "Returns true when node matches element");
    assert.ok(obj.is($(".testtemp")), "Returns true when node matches dabby collection");
    test.innerHTML = "";
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.find", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"><div class="findme"></div></div><div class="class3"><div class="findme"></div></div></div>';
    obj = $(".testtemp");
    assert.deepEqual(obj.find(".findme").get(), $(".testtemp .findme").get());
    assert.deepEqual(obj.find(obj.get(0).getElementsByClassName("class1")).get(), $(".testtemp .class1").get());
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.first", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"><div class="findme"></div></div><div class="class3"><div class="findme"></div></div></div>';
    obj = $(".testtemp div");
    assert.deepEqual($(".testtemp div").first().get(), [$(".testtemp").get(0).getElementsByClassName("class1")[0]]);
    assert.deepEqual($(".testtemp .findme").first().get(), [$(".testtemp").get(0).getElementsByClassName("findme")[0]]);
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.has", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp"><div class="testtemp2">test</div></div>';
    obj = $(".test");
    assert.deepEqual(obj.has(".testtemp").get(0), obj.get(0), "Can filter nodes based on children");
    assert.deepEqual(obj.has(".testtemp2").get(0), obj.get(0), "Can filter nodes based on children");
    assert.deepEqual(obj.has(".testtemp3").get(), $().get(), "Can filter nodes based on children");
    test.innerHTML = "";
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.index", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj,
        obj2;
    test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
    obj = $(".test div"), obj2 = $(".test .testtemp2, .test .testtemp3");
    assert.equal(obj2.index(), 1, "Can find element index amongst its siblings");
    assert.equal($(".test .testtemp3").index(), 2, "Can find element index amongst its siblings");
    assert.equal($(".testtemp").index(".test div"), 0, "Can find element index in a set from a string selector");
    assert.equal($(".testtemp2").index(".test div"), 1, "Can find element index in a set from a string selector");
    assert.equal($(".testtemp3").index(".test div"), 2, "Can find element index in a set from a string selector");
    assert.equal(obj.index($(".testtemp").get(0)), 0, "Can find element index in a set from a element selector");
    assert.equal(obj.index($(".testtemp2").get(0)), 1, "Can find element index in a set from a element selector");
    assert.equal(obj.index($(".testtemp3").get(0)), 2, "Can find element index in a set from a element selector");
    assert.equal(obj.index($(".testtemp")), 0, "Can find element index in a set from a collecction");
    assert.equal(obj.index($(".testtemp2")), 1, "Can find element index in a set from a collecction");
    assert.equal(obj.index($(".testtemp3")), 2, "Can find element index in a set from a collecction");
    /*assert.equal($(".testtemp").index(obj), 0, "Can find element index in a set");
    assert.equal($(".testtemp2").index(obj), 1, "Can find element index in a set");
    assert.equal(obj.index(".testtemp3"), 2, "Can find element index in a set");
    assert.equal(obj2.index(".testtemp3"), 1, "Can find element index in a set");*/

    test.innerHTML = "";
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.last", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp"><div class="class1"></div><div class="class1"></div><div class="class2"><div class="findme"></div></div><div class="class3"><div class="findme"></div></div></div>';
    obj = $(".testtemp div");
    assert.deepEqual($(".testtemp div").last().get(), [$(".testtemp").get(0).getElementsByClassName("findme")[1]]);
    assert.deepEqual($(".testtemp .class1").last().get(), [$(".testtemp").get(0).getElementsByClassName("class1")[1]]);
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.next/$.fn.prev", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp">test</div><div class="testtemp2">test 2</div>';
    obj = $(".testtemp");
    assert.deepEqual(obj.next().get(0), $(".testtemp2").get(0), "Returns true when node matches selector");
    assert.ok(obj.is(document.getElementsByClassName("testtemp")[0]), "Returns true when node matches element");
    assert.ok(obj.is($(".testtemp")), "Returns true when node matches dabby collection");
    test.innerHTML = "";
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.parent/$.fn.parents", function (assert) {
    var test = document.getElementsByClassName("test")[0];
    test.innerHTML = '<div class="testtemp"><div class="testtemp2"><div class="testtemp3">test</div></div></div>';
    var obj = $(".testtemp3"),
        parents = [],
        parent = obj.get(0);
    assert.deepEqual(obj.parent().get(), $(".testtemp2").get(), "Can select parent");
    assert.deepEqual(obj.parent(".testtemp2").get(), $(".testtemp2").get(), "Can select parent with selector");
    assert.deepEqual(obj.parent(".testtemp").get(), [], "Doesn't select parent when selector doesn't match");

    while (parent.parentNode && parent.parentNode.nodeType === Node.ELEMENT_NODE) {
      parents.push(parent.parentNode);
      parent = parent.parentNode;
    }

    assert.deepEqual(obj.parents().get(), parents, "Can select parents");
  });
  QUnit.module("Traversal");
  QUnit.test("$.fn.siblings", function (assert) {
    var test = document.getElementsByClassName("test")[0],
        obj;
    test.innerHTML = '<div class="testtemp"></div><div class="testtemp2"></div><div class="testtemp3"></div>';
    obj = $(".testtemp2");
    assert.deepEqual(obj.siblings().get(), $(".testtemp, .testtemp3").get(), "Can get an elements siblings");
    assert.deepEqual(obj.siblings(".testtemp3").get(), $(".testtemp3").get(), "Can get an elements siblings filtered by a selector");

    if (typeof Dabby !== "undefined") {
      // jquery doesn't support refining by object
      assert.deepEqual(obj.siblings($(".testtemp3")).get(), $(".testtemp3").get(), "Can get an elements siblings filtered by a dabby object");
      assert.deepEqual(obj.siblings($(".testtemp3").get()).get(), $(".testtemp3").get(), "Can get an elements siblings filtered by a node collection");
    }

    test.innerHTML = "";
  });
  QUnit.module("Utils");
  QUnit.test("$.fn.each", function (assert) {
    var main = document.getElementsByClassName("main")[0],
        h1 = document.getElementsByClassName("heading")[0],
        output = [];
    $(".main, .heading").each(function () {
      output.push(this.tagName.toLowerCase());
    });
    assert.deepEqual(output, ["div", "h1"]);
  });
  QUnit.module("Utils");
  QUnit.test("$.extend", function (assert) {
    assert.deepEqual($.extend({
      foo: "foo"
    }, {
      bar: "bar"
    }), {
      foo: "foo",
      bar: "bar"
    }, "$.extend simple");
    assert.deepEqual($.extend({
      foo: "foo",
      bar: "foo"
    }, {
      bar: "bar"
    }), {
      foo: "foo",
      bar: "bar"
    }, "$.extend overwrite");
    assert.deepEqual($.extend(true, {
      deep: {
        foo: "foo",
        bar: "foo"
      }
    }, {
      deep: {
        bar: "bar"
      }
    }), {
      deep: {
        foo: "foo",
        bar: "bar"
      }
    }, "$.extend overwrite");
    assert.deepEqual($.extend(true, {
      foo: "foo",
      bar: "foo",
      deep: {
        value1: false,
        value2: "no",
        value3: {
          value: "foo"
        },
        arr: [1, 2]
      }
    }, {
      bar: {
        value: "bar"
      },
      deep: {
        value1: true,
        value2: "yes",
        value3: {
          value: "bar",
          value2: "foo"
        },
        arr: [3, 4]
      }
    }), {
      foo: "foo",
      bar: {
        value: "bar"
      },
      deep: {
        value1: true,
        value2: "yes",
        value3: {
          value: "bar",
          value2: "foo"
        },
        arr: [3, 4]
      }
    }, "$.extend deep merge");
  });
  QUnit.module("Utils");
  QUnit.test("$.isArray", function (assert) {
    var arr = [],
        obj = {};
    assert.ok($.isArray(arr), "Returns true when array");
    arr.push("test");
    assert.ok($.isArray(arr), "Returns true when array");
    assert.ok(!$.isArray(obj), "Returns false when not array");
    obj.test = "test";
    assert.ok(!$.isArray(obj), "Returns false when not array");
  });
  QUnit.module("Utils");
  QUnit.test("$.isFunction", function (assert) {
    [function () {}, $.isFunction, window, document, document.getElementsByClassName("test")[0], "hi", 5, 3.14, {}].forEach(function (func, i) {
      assert.equal($.isFunction(func), i < 2, "Input is" + (i < 2 ? "" : " not") + " function");
    });
  });
  QUnit.module("Utils", function (hooks) {
    QUnit.test("$.isPlainObject", function (assert) {
      assert.equal($.isPlainObject(document.createElement('div')), false, "Host object is not plain");
      assert.equal($.isPlainObject(null), false, "NULL is not plain");
      assert.equal($.isPlainObject(function () {
        function Foo() {}

        return new Foo();
      }()), false, "Instance of other object is not plain");
      assert.equal($.isPlainObject(5), false, "Number primitive is not plain");
      assert.equal($.isPlainObject("dabby"), false, "String primitive is not plain");
      assert.equal($.isPlainObject(new Number(6)), false, "Number object is not plain");
      assert.equal($.isPlainObject({}), true, "Empty object is plain");
      assert.equal($.isPlainObject(new Object()), true, "New Object is plain");
      assert.equal($.isPlainObject(Object.create(null)), true, "Object created from null is plain");
    });
  });
  QUnit.module("Utils");
  QUnit.test("$.isWindow", function (assert) {
    var items = [window, document, document.getElementsByClassName("test")[0]];
    items.forEach(function (key, value) {
      assert.equal($.isWindow(value), value === window, "Can detect" + (value === window ? "" : " not") + " window");
    });
  });
  QUnit.module("Utils");
  QUnit.test("$.map", function (assert) {
    var arr = ["foo", "bar"],
        output = [],
        obj = {
      foo: "foo",
      bar: "bar"
    };
    output = $.map(arr, function (item) {
      return item;
    });
    assert.deepEqual(arr, output, "$.map array");
    output = $.map(obj, function (item, index) {
      return item;
    });
    assert.deepEqual(arr, output, "$.map object");
  }); // ajax
  // attributes
  //import "./attributes/removeprop/test.js";
  // core
  // dimensions
  //import "./dimensions/position/test.js";
  // events
  //import "./events/named/test.js";
  // internals
  //import "./internal/getevents/test.js";
  //import "./internal/getprop/test.js";
  // manipulation
  // traversal
  //import "./traversal/closest/test.js";
  // utilities
})($);
//# sourceMappingURL=test.es5.js.map
