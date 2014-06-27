define(["jquery", "rbush", "view/Size", "controller/Mediator", "view/Cursor"], function($, rbush, Size, Mediator, Cursor){

	var tree = rbush(5);
	var allLoaded = false;

	function triggerTouch(e){
		e.preventDefault();
		var touches = e.originalEvent.touches;
		for (var i = 0; i < touches.length; i++){
			var touch = touches.item(i);
			//touch.clientX, touch.clientY
			testTouch(touch.clientX, touch.clientY);
		}
	}

	function testTouch(x, y){
		if (!allLoaded){
			return;
		}
		var pos = Size.getSize();
		var leftBounding = pos.left;
		var rightBounding = pos.size + pos.left;
		var topBounding = pos.top;
		var bottomBounding = pos.top + pos.size;
		if (x > leftBounding && x < rightBounding &&
			y > topBounding && y < bottomBounding){
			var searchSize = 0.5;
			//scale things down to the right dimensions
			var scaledX = (x - leftBounding) / pos.size * 100;
			var scaledY = (y - topBounding) / pos.size * 100;
			var items = tree.search([scaledX - searchSize, scaledY - searchSize, scaledX + searchSize, scaledY + searchSize]);
			if (items.length > 0){
				items[0][4]();
			}
		}
	}

	Mediator.route("playClicked", function(){
		allLoaded = true;
	});
	$(document).on("touchmove touchstart", triggerTouch);
	$(document).on("mousemove", function(e){
		testTouch(e.clientX, e.clientY);
	});

	return {
		insertStar : function(position, size, callback){
			var item = [position.x - size, position.y - size, position.x + size, position.y + size, callback];
			tree.insert(item);
		}
	};
});