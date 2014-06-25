define(["controller/Mediator", "view/StarCanvas",  "view/TouchShim"], function(Mediator, StarContainer){
	
	//setup the canvas
	var edgeCanvas = $("#EdgeCanvas");
	var context = edgeCanvas[0].getContext("2d");

	var canvasWidth = edgeCanvas.width();
	var canvasHeight = edgeCanvas.height();
	context.canvas.width = canvasWidth;
	context.canvas.height = canvasHeight;

	//listen for resizing
	Mediator.route("resize", function(){
		canvasWidth = edgeCanvas.width();
		canvasHeight = edgeCanvas.height();
	});


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

		this.points = [position0, position1];
		this.draw();
		Mediator.route("resize", this.draw.bind(this));
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

	EdgeView.prototype.draw = function(){
		context.strokeStyle = "#fff";
		context.beginPath();
		//multiply the points by the size of the canvas
		var pointA = {
			x : this.points[0].x * canvasWidth / 100,
			y : this.points[0].y * canvasHeight / 100
		};
		var pointB = {
			x : this.points[1].x * canvasWidth / 100,
			y : this.points[1].y * canvasHeight / 100
		};
		context.moveTo(pointA.x, pointA.y);
		context.lineTo(pointB.x, pointB.y);
		context.stroke();
	};

	return EdgeView;
});