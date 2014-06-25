define(["controller/Mediator", "view/StarCanvas",  "view/TouchShim"], function(Mediator, StarContainer){
	/**
	 *  @constructor
	 *  @param {Object} description
	 */
	var EdgeView = function(position0, position1, callback){
		this.getAngle(position0, position1);
		var center = this.getCenter(position0, position1);
		var mag = this.getMagnitude(position0, position1);
		this.element = $("<div>", {"class" : "Edge"}).appendTo(StarContainer);
		this.element.css({
			left: (center.x - mag/2) + "%",
			width: mag + "%",
			top: center.y + "%",
			transform : "rotate("+this.angle+"deg) translate(0, -50%)"
		});

		//touch callback
		this.element.on("touch mouseenter", callback);
	};

	EdgeView.prototype.getCenter = function(position0, position1){
		return {
			x : (position0.x + position1.x) / 2,
			y : (position0.y + position1.y) / 2
		};
	};

	EdgeView.prototype.getMagnitude = function(position0, position1){
		var yDiff = position0.y - position1.y;
		var xDiff = position0.x - position1.x;
		return Math.sqrt(yDiff * yDiff + xDiff * xDiff);
	};

	EdgeView.prototype.getAngle = function(position0, position1){
		var yDiff = position0.y - position1.y;
		var xDiff = position0.x - position1.x;
		if (xDiff === 0){
			this.angle = 90;
		} else {
			this.angle = Math.atan(yDiff / xDiff) * (180 / Math.PI);
		}
	};

	EdgeView.prototype._touched = function(){
		// this.
	}


	return EdgeView;
});