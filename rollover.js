
(function rollover () {
	var CLASS_NAME = "btn";
	var SUFFIX     = "_on";

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
		return orig_src.replace(/\.(gif|jpg|png)/, SUFFIX+'.$1');
	}

	function addEvent (ele, name, fun) {
		if (ele.addEventListener) {
			ele.addEventListener(name, fun, false);
		} else {
			ele.attachEvent("on"+name, fun);
		}
	}
})();

