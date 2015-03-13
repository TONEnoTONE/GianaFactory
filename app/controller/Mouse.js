define(["jquery", "rbush", "view/Size", "controller/Mediator", "view/Cursor", "TERP"], 
	function($, rbush, Size, Mediator, Cursor, TERP){

	var tree = rbush(5);
	var canPlay = false;

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
		if (!canPlay){
			return;
		}
		var pos = Size.getSize();
		var leftBounding = pos.left;
		var rightBounding = pos.size + pos.left;
		var topBounding = pos.top;
		var bottomBounding = pos.top + pos.size;
		if (x > leftBounding && x < rightBounding &&
			y > topBounding && y < bottomBounding){
			//scale things down to the right dimensions
			var scaledX = (x - leftBounding) / pos.size * 100;
			var scaledY = (y - topBounding) / pos.size * 100;
			var maxChange = 30;
			var xDiff = touchPoints[id].position.x - x;
			xDiff = Math.max(xDiff, -maxChange);
			xDiff = Math.min(xDiff, maxChange);
			var yDiff = touchPoints[id].position.y - y;
			yDiff = Math.max(yDiff, -maxChange);
			yDiff = Math.min(yDiff, maxChange);
			var vector = {
				x : xDiff,
				y : yDiff
			};
			var searchSize = 1;
			var res = tree.search([scaledX - searchSize, scaledY - searchSize, 
				scaledX + searchSize, scaledY + searchSize]);
			if (res.length > 0){
				var mag = xDiff * xDiff + yDiff * yDiff;
				mag = TERP.map(mag, 0, 300, 0, 1, 0.5);
				for (var i = 0; i < res.length; i++){
					res[i][4](mag);
				}
			}
		}
		//update the old coord
		touchPoints[id].position = {
			x : x,
			y : y
		};
	}

	Mediator.route("playClicked", function(){
		canPlay = true;
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