# Dabby.js Documentation

> This Documentation is still under development, and so whilst some methods have more detailed documentation, the rest currently only have the description below.

The library supports the following methods:

### Core

| Method											| Description												|
|---------------------------------------------------|-----------------------------------------------------------|
| [$()](core/dabby/)								| Create a Dabby collection from nodes, selectors, or HTML	|
| [$.fn.each()](core/each/)							| Apply a callback function to a Dabby object				|
| [$.fn.get()](core/get/)							| Retrieve one or all native nodes from a Dabby object		|
| [$.fn.map()](core/map/)							| Map a callback function onto each item in a Dabby object	|

### Ajax

| Method											| Description												|
|---------------------------------------------------|-----------------------------------------------------------|
| [$.ajax()](ajax/ajax/)							| Make AJAX requests										|
| [$.get()](ajax/getpost/)							| Shorthand to make AJAX requests using the GET method		|
| [$.post()](ajax/getpost/)							| Shorthand to make AJAX requests using the POST method		|
| [$.getScript()](ajax/getscript/)					| Shorthand to insert a script into the DOM					|
| [$.param()](ajax/param/)							| Render a query string from an object						|
| [$.fn.load()](ajax/load/)							| Make an AJAX request to insert HTML it into the DOM		|
| [$.fn.serialize()](ajax/serialize/)				| Serialize the value of form elements into a query string	|

### Attributes

| Method											| Description												|
|---------------------------------------------------|-----------------------------------------------------------|
| [$.fn.attr()](attributes/attr/)					| Get/set HTML attributes									|
| [$.fn.addClass()](attributes/class/)				| Add a class to elements in a collection					|
| [$.fn.hasClass()](attributes/hasclass/)			| See whether any elements in a collection have the requested class		|
| [$.fn.removeClass()](attributes/class/)			| Remove a class from an HTML element						|
| [$.fn.toggleClass()](attributes/class/)			| Toggle a class on and off									|
| [$.fn.css()](attributes/css/)						| Get/set CSS attributes									|
| [$.fn.data()](attributes/data/)					| Get/set data attributes									|
| [$.fn.prop()](attributes/prop/)					| Get/set properties										|
| [$.fn.removeProp()](attributes/removeprop/)		| Remove the selected property								|
| [$.fn.show()](attributes/show-hide/)				| Show all elements in a collection							|
| [$.fn.hide()](attributes/show-hide/)				| Show all elements in a collection							|
| [$.fn.val()](attributes/val/)						| Get/set form control values								|

### Dimensions

| Method											| Description												|
|---------------------------------------------------|-----------------------------------------------------------|
| [$.fn.offset()](dimensions/offset/)				| Get/set the top and left position							|
| [$.fn.offsetParent()](dimensions/offsetparent/) 	| Get the offset parent of the first node					|
| [$.fn.position()](dimensions/position/)			| Get the top and left position relative to the offset parent |
| [$.fn.width()](dimensions/width-height/)			| Get/set the width of a set of elements					|
| [$.fn.height()](dimensions/width-height/)			| Get/set the height of a set of elements					|
| [$.fn.innerWidth()](dimensions/width-height/)		| Get/set the width of a set of elements including padding	|
| [$.fn.innerHeight()](dimensions/width-height/)	| Get/set the height of a set of elements including padding	|
| [$.fn.outerWidth()](dimensions/width-height/)		| Get/set the width of elements including padding/margin	|
| [$.fn.outerHeight()](dimensions/width-height/)	| Get/set the height of elements including padding/margin	|
| [$.fn.scrollLeft()](dimensions/scroll/)			| Get/set the scrollLeft attribute							|
| [$.fn.scrollTop()](dimensions/scroll/)			| Get/set the scrollTop attribute							|

### Events

| Method											| Description												|
|---------------------------------------------------|-----------------------------------------------------------|
| [$.fn.on()](events/on/)							| Attach a callback to an event on elements or their parents|
| [$.fn.one()](events/on/)							| Attach a callback to an event to be triggered only once	|
| [$.fn.off()](events/off/)							| Remove a callback attached with .on()/.one()				|
| [$.fn.trigger()](events/trigger/)					| Trigger an event on the supplied nodes					|
| [$.fn.focusin()](events/named/)					| Trigger the focusin event on the supplied nodes			|
| [$.fn.focusout()](events/named/)					| Trigger the focusout event on the supplied nodes			|
| [$.fn.focus()](events/named/)						| Trigger the focus event on the supplied nodes				|
| [$.fn.blur()](events/named/)						| Trigger the blur event on the supplied nodes				|
| [$.fn.resize()](events/named/)					| Trigger the resize event on the supplied nodes			|
| [$.fn.scroll()](events/named/)					| Trigger the scroll event on the supplied nodes			|
| [$.fn.unload()](events/named/)					| Trigger the unload event on the supplied nodes			|
| [$.fn.click()](events/named/)						| Trigger the click event on the supplied nodes				|
| [$.fn.dblclick()](events/named/)					| Trigger the dblclick event on the supplied nodes			|
| [$.fn.mousedown()](events/named/)					| Trigger the mousedown event on the supplied nodes			|
| [$.fn.mouseup()](events/named/)					| Trigger the mouseup event on the supplied nodes			|
| [$.fn.mousemove()](events/named/)					| Trigger the mousemove event on the supplied nodes			|
| [$.fn.mouseover()](events/named/)					| Trigger the mouseover event on the supplied nodes			|
| [$.fn.mouseout()](events/named/)					| Trigger the mouseout event on the supplied nodes			|
| [$.fn.mouseenter()](events/named/)				| Trigger the mouseenter event on the supplied nodes		|
| [$.fn.mouseleave()](events/named/)				| Trigger the mouseleave event on the supplied nodes		|
| [$.fn.change()](events/named/)					| Trigger the change event on the supplied nodes			|
| [$.fn.select()](events/named/)					| Trigger the select event on the supplied nodes			|
| [$.fn.keydown()](events/named/)					| Trigger the keydown event on the supplied nodes			|
| [$.fn.keypress()](events/named/)					| Trigger the keypress event on the supplied nodes			|
| [$.fn.keyup()](events/named/)						| Trigger the keyup event on the supplied nodes				|
| [$.fn.error()](events/named/)						| Trigger the error event on the supplied nodes				|
| [$.fn.submit()](events/named/)					| Trigger the submit event on the supplied nodes			|

### Manipulation

| Method											| Description												|
|---------------------------------------------------|-----------------------------------------------------------|
| [$.fn.clone()](manipulation/clone/)				| Clone a collection										|
| [$.fn.empty()](manipulation/empty/)				| Empty a set of DOM nodes of content/HTML					|
| [$.fn.html()](manipulation/html/)					| Get/set the innerHTML property of a collection			|
| [$.fn.before()](manipulation/insert/)				| Insert HTML before each item in a collection				|
| [$.fn.prepend()](manipulation/insert/)			| Insert HTML as the first child of each item				|
| [$.fn.append()](manipulation/insert/)				| Insert HTML as the last child of each item				|
| [$.fn.after()](manipulation/insert/)				| Insert HTML after each item in a collection				|
| [$.fn.insertBefore()](manipulation/insertto/)		| Insert HTML before each item in a collection				|
| [$.fn.prependTo()](manipulation/insertto/)		| Insert HTML as the first child of each item				|
| [$.fn.appendTo()](manipulation/insertto/)			| Insert HTML as the last child of each item				|
| [$.fn.insertAfter()](manipulation/insertto/)		| Insert HTML after each item in a collection				|
| [$.fn.remove()](manipulation/remove/)				| Remove nodes from the DOM									|
| [$.fn.detach()](manipulation/detach/)				| Detach nodes from the DOM									|
| [$.fn.replaceWith()](manipulation/replace/)		| Replace the nodes in the current collection with a new collection |
| [$.fn.replaceAll()](manipulation/replace/)		| Same a .replaceWith() with the elements and arguments reversed |
| [$.fn.slice()](manipulation/slice/)				| Slice a collection by index								|
| [$.fn.text()](manipulation/text/)					| Get/set textnodes of a collection							|
| [$.fn.unwrap()](manipulation/unwrap/)				| Unwrap a collection of nodes of its parent				|
| [$.fn.wrap()](manipulation/wrap/)					| Wrap each node in a collection with the supplied node(s)	|
| [$.fn.wrapAll()](manipulation/wrapAll/)			| Wrap all nodes in a collection with the supplied node(s)	|

### Traversal

| Method											| Description												|
|---------------------------------------------------|-----------------------------------------------------------|
| [$.fn.add()](traversal/add/)						| Add nodes to a collection									|
| [$.fn.children()](traversal/children/)			| Retrieve the children of nodes in a collection			|
| [$.fn.closest()](traversal/closest/)				| Get the first element matching the first node or its ancestors |
| [$.fn.eq()](traversal/eq/)						| Retrieve a node from the specified index of a collection	|
| [$.fn.not()](traversal/filter/)					| Reduce a collection with nodes or a selector				|
| [$.fn.is()](traversal/filter/)					| Determine if a collection matches a node/selector			|
| [[$.fn.filter()](traversal/filter/)				| Filter nodes in a collection with a callback or selector	|
| [$.fn.find()](traversal/find/)					| Find descendants of a collection with a selector			|
| [$.fn.first()](traversal/first/)					| Get the first node in a collection						|
| [$.fn.has()](traversal/has/)						| Determine whether a collection has the specified children	|
| [$.fn.index()](traversal/index/)					| Get the index of a node or position in its siblings		|
| [$.fn.last()](traversal/last/)					| Get the last node in a collection							|
| [$.fn.next()](traversal/next-prev/)				| Get the next sibling of a node							|
| [$.fn.nextAll()](traversal/next-prev/)			| Get all siblings forward of a node						|
| [$.fn.nextUntil()](traversal/next-prev/)			| Get all sibling forward of a node until a node/selector	|
| [$.fn.prev()](traversal/next-prev/)				| Get the previous sibling of a node						|
| [$.fn.prevAll()](traversal/next-prev/)			| Get all sibling behind a node								|
| [$.fn.prevUntil()](traversal/next-prev/)			| Get all sibling behind a node until a node/selector		|
| [$.fn.parent()](traversal/parents/)				| Get the immediate parents of the items a collection		|
| [$.fn.parents()](traversal/parents/)				| Get all ancestors of the items in a collection			|
| [$.fn.parentsUntil()](traversal/parents/)			| Get all ancestors until a node/selector is found			|
| [$.fn.siblings()](traversal/siblings/)			| Get all siblings of the nodes in a collection				|

### Utilities

| Method											| Description												|
|---------------------------------------------------|-----------------------------------------------------------|
| [$.each()](utilities/each/)						| Apply a callback function to an array or object			|
| [$.extend()](utilities/extend/)					| Extend an array with one or more arrays					|
| [$.isFunction()](utilities/isfunction/)			| Determine whether the input is an function				|
| [$.isPlainObject()](utilities/isplainobject/)	| Determine whether the input is an plain object			|
| [$.isWindow()](utilities/iswindow/)				| Determine whether the input node/object is the window		|
| [$.map()](utilities/map/)						| Map a callback function onto each item in an array/object	|
