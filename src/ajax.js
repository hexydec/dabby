define(["core"], function ($) {
	$.ajax = function (url, settings) {
		
		// normalise args
		if (typeof url === "object") {
			settings = url;
		} else {
			settings = {url: url};
		}
		
		// add cache buster
		if (!settings.cache) {
			settings.url += (settings.url.indexOf("?") > -1 ? "&" : "?") + "_=" + (+new Date());
		}
		
		// settings is success function
		if (settings.constructor === Function) {
			settings = {success: settings};
		}
		
		// set default settings
		settings = $.extend({
			method: "GET",
			cache: true
		}, settings);
		
		// fetch script
		if (settings.dataType === "script" || settings.url.lastIndexOf(".js") === settings.url.length - 3) {
			var script = document.createElement("script");
			
			// add success handler
			if (settings.success) {
				script.addEventListener("load", settings.success);
			}
			
			// add error handler
			if (settings.error) {
				script.addEventListener("error", settings.error);
			}
			
			script.src = settings.url;
			document.head.appendChild(script);
		
		// make xhr request
		} else {
			xhr = new XMLHttpRequest();
			xhr.open(settings.method, settings.url, true);
			xhr.onreadystatechange = function () {
				var response = JSON.parse(xhr.responseText) || xhr.responseText;
				
				// success
				if (this.readyState === 4 && this.status === 200) {
					if (settings.success) {
						settings.success(response, this.status, this);
					}
				
				// error
				} else if (settings.error) {
					settings.error(response, this.status, this);
				}
				
				// complete
				if (settings.complete) {
					settings.complete(response, this.status, this);
				}
			};
			
			// headers
			xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			if (["POST", "PUT"].indexOf(settings.method) > -1) {
				xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
			}
			xhr.send();
			return xhr;
		}
	};
});