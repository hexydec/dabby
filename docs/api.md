# Dabby.js Documentation

> This Documentation is still under development, and so whilst some methods have more detailed documentation, the rest currently only have the description below.

The library supports the following methods:

### Core

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| [$()](../src/readme.md)					| Create a Dabby collection from nodes, selectors, or HTML	|
| [.each()](../src/core/each/readme.md)		| Apply a callback function to a Dabby object				|
| [.get()](../src/core/get/readme.md)		| Retrieve one or all native nodes from a Dabby object		|
| [.map()](../src/core/map/readme.md)		| Map a callback function onto each item in a Dabby object	|

### Ajax

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| [$.ajax()](../src/ajax/ajax/readme.md)	| Make AJAX requests										|
| [$.get()](../src/ajax/get/readme.md)		| Shorthand to make AJAX requests using the GET method		|
| [$.post()](../src/ajax/post/readme.md)	| Shorthand to make AJAX requests using the POST method		|
| [$.getScript()](../src/ajax/getscript/readme.md) | Shorthand to insert a script into the DOM			|
| [$.param()](../src/ajax/param/readme.md)	| Render a query string from an object						|
| [.load()](../src/ajax/load/readme.md)		| Make an AJAX request to insert HTML it into the DOM		|
| [.serialize()](../src/ajax/serialize/readme.md)	| Serialize the value of form elements into a query string	|

### Attributes

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| [.attr()](../src/attributes/attr/readme.md)	| Get/set HTML attributes								|
| [.css()](../src/attributes/css/readme.md)	| Get/set CSS attributes									|
| .data()									| Get/set data attributes									|
| .prop()									| Get/set HTML properties									|
| .val()									| Get/set form control values								|
| .addClass(../src/attributes/class/readme.md)	| Add a class to elements in a collection				|
| .hasClass()								| See whether an HTML element has the requested class		|
| .removeClass((../src/attributes/class/readme.md)	| Remove a class from an HTML element				|
| .toggleClass((../src/attributes/class/readme.md)	| Toggle a class on and off							|

### Dimensions

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| .offset()									| Get/set the top and left position							|
| .offsetParent()							| Get the offset parent of the first node					|
| .width()									| Get/set the width of a set of elements					|
| .height()									| Get/set the height of a set of elements					|
| .innerWidth()								| Get/set the width of a set of elements including padding	|
| .innerHeight()							| Get/set the height of a set of elements including padding	|
| .outerWidth()								| Get/set the width of elements including padding/margin	|
| .outerHeight()							| Get/set the height of elements including padding/margin	|
| .scrollLeft()								| Get/set the scrollLeft attribute							|
| .scrollTop()								| Get/set the scrollTop attribute							|

### Events

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| .on()										| Attach a callback to an event on elements or their parents|
| .one()									| Attach a callback to an event to be triggered only once	|
| .off()									| Remove a callback attached with .on()/.one()		|
| .trigger()								| Trigger an event on the supplied nodes					|
| .focusin()								| Trigger the focusin event on the supplied nodes			|
| .focusout()								| Trigger the focusout event on the supplied nodes			|
| .focus()									| Trigger the focus event on the supplied nodes				|
| .blur()									| Trigger the blur event on the supplied nodes				|
| .load()									| Trigger the load event on the supplied nodes				|
| .scroll()									| Trigger the scroll event on the supplied nodes			|
| .unload()									| Trigger the unload event on the supplied nodes			|
| .resize()									| Trigger the resize event on the supplied nodes			|
| .click()									| Trigger the click event on the supplied nodes				|
| .dblclick()								| Trigger the dblclick event on the supplied nodes			|
| .mousedown()								| Trigger the mousedown event on the supplied nodes			|
| .mouseup()								| Trigger the mouseup event on the supplied nodes			|
| .mousemove()								| Trigger the mousemove event on the supplied nodes			|
| .mouseover()								| Trigger the mouseover event on the supplied nodes			|
| .mouseout()								| Trigger the mouseout event on the supplied nodes			|
| .mouseenter()								| Trigger the mouseenter event on the supplied nodes		|
| .mouseleave()								| Trigger the mouseleave event on the supplied nodes		|
| .change()									| Trigger the change event on the supplied nodes			|
| .select()									| Trigger the select event on the supplied nodes			|
| .keydown()								| Trigger the keydown event on the supplied nodes			|
| .keypress()								| Trigger the keypress event on the supplied nodes			|
| .keyup()									| Trigger the keyup event on the supplied nodes				|
| .error()									| Trigger the error event on the supplied nodes				|
| .submit()									| Trigger the submit event on the supplied nodes			|

### Manipulation

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| .clone()									| Clone a collection										|
| .empty()									| Empty a set of DOM nodes of content/HTML					|
| .html()									| Get/set the innerHTML property of a collection			|
| .before()									| Insert HTML before each item in a collection				|
| .prepend()								| Insert HTML as the first child of each item				|
| .append()									| Insert HTML as the last child of each item				|
| .after()									| Insert HTML after each item in a collection				|
| .insertBefore()							| Insert HTML before each item in a collection				|
| .prependTo()								| Insert HTML as the first child of each item				|
| .appendTo()								| Insert HTML as the last child of each item				|
| .insertAfter()							| Insert HTML after each item in a collection				|
| .remove()									| Remove nodes from the DOM									|
| .detach()									| Detach nodes from the DOM									|
| .slice()									| Slice a collection by index								|
| .text()									| Get/set textnodes of a collection							|
| .unwrap()									| Unwrap a collection of nodes of its parent				|
| .wrap()									| Wrap each node in a collection with the supplied node(s)	|
| .wrapAll()								| Wrap all nodes in a collection with the supplied node(s)	|

### Traversal

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| .add()									| Add nodes to a collection									|
| .children()								| Retrieve the children of nodes in a collection			|
| .eq()										| Retrieve a node from the specified index of a collection	|
| .filter()									| Filter nodes in a collection with a callback or selector	|
| .not()									| Reduce a collection with nodes or a selector				|
| .find()									| Find descendants of a collection with a selector			|
| .first()									| Get the first node in a collection						|
| .has()									| Determine whether a collection has the specified children	|
| .index()									| Get the index of a node or position in its siblings		|
| .is()										| Determine if a collection matches a node/selector			|
| .next()									| Get the next sibling of a node							|
| .nextAll()								| Get all siblings forward of a node						|
| .nextUntil()								| Get all sibling forward of a node until a node/selector	|
| .prev()									| Get the previous sibling of a node						|
| .prevAll()								| Get all sibling behind a node								|
| .prevUntil()								| Get all sibling behind a node until a node/selector		|
| .parent()									| Get the immediate parents of the items a collection		|
| .parents()								| Get all ancestors of the items in a collection			|
| .parentsUntil()							| Get all ancestors until a node/selector is found			|
| .siblings()								| Get all siblings of the nodes in a collection				|

### Utilities

| Method									| Description												|
|-------------------------------------------|-----------------------------------------------------------|
| $.each()									| Apply a callback function to an array or object			|
| $.isArray()								| Determine whether the input is an array					|
| $.isFunction()							| Determine whether the input is an function				|
| $.isWindow()								| Determine whether the input node/object is the window		|
| $.map()									| Map a callback function onto each item in an array/object	|
