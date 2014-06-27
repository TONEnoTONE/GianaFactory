define(["controller/Mediator", "view/Drawing"], function(Mediator, Drawing){
	

	var EdgeView = function(position0, position1, callback){
		this.element = Drawing.context.makeLine(position0.x, position0.y, position1.x, position1.y);
		this.element.addTo(Drawing.stars);
		this.element.linewidth = 0.18;
		this.element.stroke = "#fff";
		this.element.opacity = 0;
	};


	EdgeView.prototype.appear = function(duration, delay){
		var elem = this.element;
		var tween = new TWEEN.Tween({opacity : 0})
			.to({opacity : 1}, duration)
			.onUpdate(function(){
				elem.opacity = this.opacity;
			})
			.delay(delay)
			.start();
	};

	return EdgeView;
});