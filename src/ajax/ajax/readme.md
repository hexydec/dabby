# $.ajax()

Make Asynchronous HTTP (AJAX) requests.

## Usage

```javascript
$.ajax(url[, settings]); // => xhr
$.ajax(settings); // => xhr
```

To make an AJAX request, the URL can be passed as the first parameter, or as the `url` parameter in the `settings` object.

### Settings

The `settings` object can accept the following parameters:

| Parameter	| Type		| Description 											| Default 	|
|-----------|-----------|-------------------------------------------------------|-----------|
| url		| string	| The URL of the request 								|			|
| method	| string	| The method to send the request with ("GET" or "POST")	| GET 		|
| cache		| bool		| Denotes whether to cache allow the request to be cached. | false	|
| success	| callback	| A callback function fired on completion of a successful request |	|
| error		| callback	| A callback function fired when a request fails		|			|
| complete	| callback	| A callback function fired after a request has completed, regardless of whether it ||
| data		|object/string | Parameters to send to with the requests			|			|
| dataType	| string	| Specify the type of request ("json", "jsonp" or "script"), if not set the type will be automatically determined ||
| processData | bool	| Denotes whether to compile the data from the `data` parameter into a query string. If set to false, the data is passed to the request unprocessed | true		|
| async		| bool		| Denotes whether to send the request asynchronously	| true		|
| crossDomain | bool	| Denotes whether to make a cross domain request, note if set to true, this will result in a synchronous request | false		|
| scriptCharset	| string | Sets the charset of synchronous and requests of type "script" |	|
| jsonp		| string	| The parameter name that contains the name of the `jsonpCallback` | "callback"|
| jsonpCallback| string	| The name of the function to execute when a syncronous JSONP request has been made | [Auto-generated] |
| contentType | string	| Sets the content-type header | "application/x-www-form-urlencoded; charset=UTF-8" |
| headers	| object	| An object containing any headers to send with the request | 		|
| context	| object	| An HTML node or other object that will be the context of any callbacks (`this`) ||
| statusCode | object	| An object of key/value pairs where the key is the HTTP response code and the value is the callback function. Will be called when the specified status code is returned (Asynchronous requests only) ||
| username	| string	| Specifies the username for requests that require basic authentication ||
| password	| string	| Specifies the password for requests that require basic authentication |	|

#### Callbacks

The `success`, `error`, `complete`, and `statusCode` parameters enable you to set callbacks that are fired upon various results of an AJAX request. The callbacks should use the following pattern:

```javascript
function (response, status, xhr) {
	// if specified, "this" will be set to settings.context
}
```
`response` A string containing the response of the AJAX request. If `settings.dataType` is set to "json", or the setting is not set and the result is JSON parse-able, an object representing the response JSON will be sent.

`status` The HTTP response code. For synchronous requests, this will be set to 200 for successful requests, and 400 on error.

`xhr` The XMLHttpRequest object used in the AJAX request. For synchronous requests this will be empty.

## Return value

For asynchronous requests, the generated XMLHttpRequest object will be returned. Synchronous requests will return `undefined`.

## Example

The following example makes an AJAX request and outputs the response:

```javascript
$.ajax("https://www.theregister.co.uk/headlines.atom", {
	success: function (response) {
		console.log(response);
	},
	error: function () {
		console.log("Couldn't fetch feed");
	}
});
```
## Differences to jQuery

In jQuery, the `xhr` parameter of any callback functions are returned as an enhanced XMLHttpRequest called the `jqXHR` object, whereas in Dabby.js, the orignal XMLHttpRequest object is returned.

Dabby.js doesn't support as many `settings` as jQuery.

Dabby doesn't return a deferred object like jQuery does, so you cannot chain any deferred methods to this method.
