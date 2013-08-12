
var currentlyLighted;
var currentlyCssClass;

var resetElement = function() {
	if (currentlyLighted) {
		$("." + currentlyCssClass).remove();
		processElement(currentlyLighted);
	}
}

$(document).ready(function() {
	$(window).resize(resetElement);
	$(document).scroll(function() {
		clearTimeout($.data(this, 'lighterScrollTimer'));
		$.data(this, 'lighterScrollTimer', setTimeout(function() {
			resetElement();
		}, 100));
	});
});

var createDiv = function() {
	var d = $("<div></div>");
	d.css("position", "absolute");
	d.appendTo("body");
	d.addClass(currentlyCssClass);
	return d;
};

var processElement = function(me) {
	var o = me.offset();
	var w = me.width();
	var h = me.height();
	var dH = $(document).height();
	var dW = $(document).width();

	var topDiv = createDiv();
	topDiv.css("left", "0px");
	topDiv.css("top", "0px");
	topDiv.css("width", "100%");
	topDiv.height(o.top);

	var bottomDiv = createDiv();
	bottomDiv.css("left", "0px");
	bottomDiv.css("top", (o.top + h) + "px");
	bottomDiv.css("width", "100%");
	bottomDiv.height((dH - o.top - h) + "px");

	var rightDiv = createDiv();
	rightDiv.css("left", "0px");
	rightDiv.css("top", o.top + "px");
	rightDiv.css("width", o.left + "px");
	rightDiv.height(h + "px");

	var leftDiv = createDiv();
	leftDiv.css("left", (o.left + w) + "px");
	leftDiv.css("top", o.top + "px");
	leftDiv.css("width", (dW - w - o.left) + "px");
	leftDiv.height(h + "px");
};

$.fn.unlightElement = function() {
	$("." + currentlyCssClass).remove();
	currentlyLighted = null;
	currentlyCssClass = null;
}

$.fn.lightElement = function(cssClass) {
	currentlyCssClass = cssClass || "defaul-overlay";

	var me = $(this);

	processElement(me);

	currentlyLighted = me;
};
