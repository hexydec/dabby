# Dabby.js Documentation

> This Documentation is still under development, and so whilst some methods have more detailed documentation, the rest currently only have the description below.

The library supports the following methods:

### Core

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| [$()](../src/readme.md)					| Create a Dabby collection from nodes, selectors, or HTML	|
| [$.fn.each()](../src/core/each/readme.md)		| Apply a callback function to a Dabby object				|
| [$.fn.get()](../src/core/get/readme.md)		| Retrieve one or all native nodes from a Dabby object		|
| [$.fn.map()](../src/core/map/readme.md)		| Map a callback function onto each item in a Dabby object	|

### Ajax

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| [$.ajax()](../src/ajax/ajax/readme.md)	| Make AJAX requests										|
| [$.get()](../src/ajax/get/readme.md)		| Shorthand to make AJAX requests using the GET method		|
| [$.post()](../src/ajax/post/readme.md)	| Shorthand to make AJAX requests using the POST method		|
| [$.getScript()](../src/ajax/getscript/readme.md) | Shorthand to insert a script into the DOM			|
| [$.param()](../src/ajax/param/readme.md)	| Render a query string from an object						|
| [$.fn.load()](../src/ajax/load/readme.md)		| Make an AJAX request to insert HTML it into the DOM		|
| [$.fn.serialize()](../src/ajax/serialize/readme.md)	| Serialize the value of form elements into a query string	|

### Attributes

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| [$.fn.attr()](../src/attributes/attr/readme.md)	| Get/set HTML attributes								|
| [$.fn.css()](../src/attributes/css/readme.md)	| Get/set CSS attributes									|
| [$.fn.data()](../src/attributes/data/readme.md)	| Get/set data attributes									|
| [$.fn.prop()](../src/attributes/prop/readme.md)	| Get/set properties									|
| $.fn.removeProp()							| Remove the selected property								|
| $.fn.val()								| Get/set form control values								|
| [$.fn.addClass()](../src/attributes/class/readme.md)	| Add a class to elements in a collection				|
| [$.fn.hasClass()](../src/attributes/hasclass/readme.md)	| See whether any elements in a collection have the requested class		|
| [$.fn.removeClass()](../src/attributes/class/readme.md)	| Remove a class from an HTML element				|
| [$.fn.toggleClass()](../src/attributes/class/readme.md)	| Toggle a class on and off							|

### Dimensions

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| $.fn.offset()								| Get/set the top and left position							|
| $.fn.offsetParent()						| Get the offset parent of the first node					|
| $.fn.position()							| Get the top and left position relative to the offset parent |
| $.fn.width()								| Get/set the width of a set of elements					|
| $.fn.height()								| Get/set the height of a set of elements					|
| $.fn.innerWidth()							| Get/set the width of a set of elements including padding	|
| $.fn.innerHeight()						| Get/set the height of a set of elements including padding	|
| $.fn.outerWidth()							| Get/set the width of elements including padding/margin	|
| $.fn.outerHeight()						| Get/set the height of elements including padding/margin	|
| $.fn.scrollLeft()							| Get/set the scrollLeft attribute							|
| $.fn.scrollTop()							| Get/set the scrollTop attribute							|

### Events

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| $.fn.on()									| Attach a callback to an event on elements or their parents|
| $.fn.one()								| Attach a callback to an event to be triggered only once	|
| $.fn.off()								| Remove a callback attached with .on()/.one()				|
| $.fn.trigger()							| Trigger an event on the supplied nodes					|
| $.fn.focusin()							| Trigger the focusin event on the supplied nodes			|
| $.fn.focusout()							| Trigger the focusout event on the supplied nodes			|
| $.fn.focus()								| Trigger the focus event on the supplied nodes				|
| $.fn.blur()								| Trigger the blur event on the supplied nodes				|
| $.fn.resize()								| Trigger the resize event on the supplied nodes			|
| $.fn.scroll()								| Trigger the scroll event on the supplied nodes			|
| $.fn.unload()								| Trigger the unload event on the supplied nodes			|
| $.fn.click()								| Trigger the click event on the supplied nodes				|
| $.fn.dblclick()							| Trigger the dblclick event on the supplied nodes			|
| $.fn.mousedown()							| Trigger the mousedown event on the supplied nodes			|
| $.fn.mouseup()							| Trigger the mouseup event on the supplied nodes			|
| $.fn.mousemove()							| Trigger the mousemove event on the supplied nodes			|
| $.fn.mouseover()							| Trigger the mouseover event on the supplied nodes			|
| $.fn.mouseout()							| Trigger the mouseout event on the supplied nodes			|
| $.fn.mouseenter()							| Trigger the mouseenter event on the supplied nodes		|
| $.fn.mouseleave()							| Trigger the mouseleave event on the supplied nodes		|
| $.fn.change()								| Trigger the change event on the supplied nodes			|
| $.fn.select()								| Trigger the select event on the supplied nodes			|
| $.fn.keydown()							| Trigger the keydown event on the supplied nodes			|
| $.fn.keypress()							| Trigger the keypress event on the supplied nodes			|
| $.fn.keyup()								| Trigger the keyup event on the supplied nodes				|
| $.fn.error()								| Trigger the error event on the supplied nodes				|
| $.fn.submit()								| Trigger the submit event on the supplied nodes			|

### Manipulation

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| $.fn.clone()								| Clone a collection										|
| $.fn.empty()								| Empty a set of DOM nodes of content/HTML					|
| $.fn.html()								| Get/set the innerHTML property of a collection			|
| $.fn.before()								| Insert HTML before each item in a collection				|
| $.fn.prepend()							| Insert HTML as the first child of each item				|
| $.fn.append()								| Insert HTML as the last child of each item				|
| $.fn.after()								| Insert HTML after each item in a collection				|
| $.fn.insertBefore()						| Insert HTML before each item in a collection				|
| $.fn.prependTo()							| Insert HTML as the first child of each item				|
| $.fn.appendTo()							| Insert HTML as the last child of each item				|
| $.fn.insertAfter()						| Insert HTML after each item in a collection				|
| $.fn.remove()								| Remove nodes from the DOM									|
| $.fn.detach()								| Detach nodes from the DOM									|
| $.fn.replaceWith()						| Replace the nodes in the current collection with a new collection |
| $.fn.replaceAll()							| Same a .replaceWith() with the elements and arguments reversed |
| $.fn.slice()								| Slice a collection by index								|
| $.fn.text()								| Get/set textnodes of a collection							|
| $.fn.unwrap()								| Unwrap a collection of nodes of its parent				|
| $.fn.wrap()								| Wrap each node in a collection with the supplied node(s)	|
| $.fn.wrapAll()							| Wrap all nodes in a collection with the supplied node(s)	|

### Traversal

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| $.fn.add()								| Add nodes to a collection									|
| $.fn.children()							| Retrieve the children of nodes in a collection			|
| $.fn.closest()							| Get the first element matching the first node or its ancestors |
| $.fn.eq()									| Retrieve a node from the specified index of a collection	|
| $.fn.filter()								| Filter nodes in a collection with a callback or selector	|
| $.fn.not()								| Reduce a collection with nodes or a selector				|
| $.fn.find()								| Find descendants of a collection with a selector			|
| $.fn.first()								| Get the first node in a collection						|
| $.fn.has()								| Determine whether a collection has the specified children	|
| $.fn.index()								| Get the index of a node or position in its siblings		|
| $.fn.is()									| Determine if a collection matches a node/selector			|
| $.fn.last()								| Get the last node in a collection							|
| $.fn.next()								| Get the next sibling of a node							|
| $.fn.nextAll()							| Get all siblings forward of a node						|
| $.fn.nextUntil()							| Get all sibling forward of a node until a node/selector	|
| $.fn.prev()								| Get the previous sibling of a node						|
| $.fn.prevAll()							| Get all sibling behind a node								|
| $.fn.prevUntil()							| Get all sibling behind a node until a node/selector		|
| $.fn.parent()								| Get the immediate parents of the items a collection		|
| $.fn.parents()							| Get all ancestors of the items in a collection			|
| $.fn.parentsUntil()						| Get all ancestors until a node/selector is found			|
| $.fn.siblings()							| Get all siblings of the nodes in a collection				|

### Utilities

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| $.each()									| Apply a callback function to an array or object			|
| $.extend()								| Extend an array with one or more arrays					|
| $.isArray()								| Determine whether the input is an array					|
| $.isFunction()							| Determine whether the input is an function				|
| $.isPlainObject()							| Determine whether the input is an plain object			|
| $.isWindow()								| Determine whether the input node/object is the window		|
| $.map()									| Map a callback function onto each item in an array/object	|
