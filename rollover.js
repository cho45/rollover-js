// 'rollover.js#' Copyright (c) 2008 by cho45
// License: MIT

(function rollover () {
	var CLASS_NAME = "btn";
	var SUFFIX     = "_on";

	// script element loaded from
	var script = document.getElementsByTagName("script");
	script = script[script.length - 1];

	// rollover.js#CLASS=button
	// rollover.js#SUFFIX=_on
	// rollover.js#CLASS=button,SUFFIX=_on
	if (script.src.match(/#(.+)/)) {
		var opts = {};
		var list = RegExp.$1.split(',');
		for (var i = 0; i < list.length; i++) {
			var kv = list[i].split('=');
			opts[kv[0]] = kv[1];
		}

		if (opts.CLASS)  CLASS_NAME = opts.CLASS;
		if (opts.SUFFIX) SUFFIX     = opts.SUFFIX;
	}

	addEvent(window, "load", function () {
		var list = document.getElementsByTagName("*");
		for (var i = 0, len = list.length; i < len; i++) {
			var e = list[i];
			if ((" "+e.className+" ").indexOf(" "+CLASS_NAME+" ") == -1) continue;

			(function (e) {
				e.orig_src = e.src;

				var preload = new Image();
				preload.src = over_src(e.orig_src);

				addEvent(e, "mouseover", function () {
					e.src = over_src(e.orig_src);
				});
				addEvent(e, "mouseout", function () {
					e.src = e.orig_src;
				});
			})(e);
		}
	});

	function over_src (orig_src) {
		return orig_src.replace(/\.([^.]+)$/, SUFFIX+'.$1');
	}

	function addEvent (ele, name, fun) {
		if (ele.addEventListener) {
			ele.addEventListener(name, fun, false);
		} else {
			ele.attachEvent("on"+name, fun);
		}
	}
})();

