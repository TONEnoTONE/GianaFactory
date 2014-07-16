define(["controller/Mediator", "view/Drawing"], function(Mediator, Drawing){

	var cursorHistoryLength = 3;

	var Cursor = function(){
		// this.element = Drawing.context.makeCurve
		var drawPoints = new Array(cursorHistoryLength);
		this.history = new Array(cursorHistoryLength);
		//make then all 0, 0
		for (var i = 0; i < cursorHistoryLength; i++){
			drawPoints[i] = new Two.Anchor(0, 0);
			this.history[i] = {
				x : 0,
				y : 0
			};
		}
		this.element = Drawing.context.makeCurve(drawPoints, false);
		this.element.stroke = "#fff";
		this.element.noFill();
		this.element.linewidth = 2;
		this.currentPosition = {
			x : 0,
			y : 0
		};
		Mediator.route("update", this.update.bind(this));
	};

	Cursor.prototype.setPoint = function(x, y){
		this.currentPosition.x = x;
		this.currentPosition.y = y;
	};

	Cursor.prototype.update = function(){
		this.history.push(this.currentPosition);
		this.history.shift();
		//update the vertices
		for (var i = 0; i < this.element.vertices.length; i++){
			var vert = this.element.vertices[i];
			vert.x = this.history[i].x;
			vert.y = this.history[i].y;
		}
		this.element.plot();
	};

	return Cursor;
});