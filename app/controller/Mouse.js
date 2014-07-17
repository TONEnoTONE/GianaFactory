define(["jquery", "rbush", "view/Size", "controller/Mediator", "view/Cursor"], function($, rbush, Size, Mediator, Cursor){

	var tree = rbush(5);
	var allLoaded = false;

	var touchPoints = {};

	function triggerTouch(e){
		e.preventDefault();
		var touches = e.originalEvent.touches;
		for (var i = 0; i < touches.length; i++){
			var touch = touches.item(i);
			if (!touchPoints[touch.identifier]){
				// touchPoints[touch.identifier] = new Cursor();
			}
			// touchPoints[touch.identifier].addPoint(touch.clientX, touch.clientY);
			//touch.clientX, touch.clientY
			testTouch(touch.clientX, touch.clientY, touch.identifier);
		}
	}

	function testTouch(x, y, id){
		//update the point
		if (!touchPoints[id]){
			// touchPoints[id] = new Cursor();
			touchPoints[id] = {};
			touchPoints[id].position = {
				x : x,
				y : y
			};
		}
		// touchPoints[id].setPoint(x, y);
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
			var maxChange = 30;
			var xDiff = touchPoints[id].position.x - x;
			xDiff = Math.max(xDiff, -maxChange);
			xDiff = Math.min(xDiff, maxChange);
			var yDiff = touchPoints[id].position.y - y;
			yDiff = Math.max(yDiff, -maxChange);
			yDiff = Math.min(yDiff, maxChange);
			if (items.length > 0){
				var vector = {
					x : xDiff,
					y : yDiff
				}
				items[0][4](vector);
			}
		}
		//update the old coord
		touchPoints[id].position = {
			x : x,
			y : y
		};
	}

	Mediator.route("playClicked", function(){
		allLoaded = true;
	});
	$(document).on("touchmove touchstart", triggerTouch);
	$(document).on("mousemove", function(e){
		testTouch(e.clientX, e.clientY, 0);
	});

	return {
		insertStar : function(position, size, callback){
			var item = [position.x - size, position.y - size, position.x + size, position.y + size, callback];
			tree.insert(item);
		}
	};
});