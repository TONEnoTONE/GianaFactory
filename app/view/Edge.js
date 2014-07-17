define(["controller/Mediator", "view/Drawing", "controller/Physics"], function(Mediator, Drawing, Physics){
	

	var EdgeView = function(position0, position1, callback){
		this.element = Drawing.context.makeLine(position0.position.x, position0.position.y, position1.position.x, position1.position.y);
		this.element.addTo(Drawing.stars);
		this.element.linewidth = 0.18;
		this.element.stroke = "#fff";
		this.element.opacity = 0;

		this.position0 = position0;
		this.position1 = position1;

		var len = position0.distanceTo(position1);
		this.spring = Physics.makeSpring(position0, position1, 1, 0.1, len);

		Mediator.route("update", this.update.bind(this));
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

	EdgeView.prototype.update = function(){
		if (!this.position0.resting()){
			var translation = this.element.translation;
			this.element.vertices[0].set(this.position0.position.x - translation.x, this.position0.position.y - translation.y);
		}
		if (!this.position1.resting()){
			var translation = this.element.translation;
			this.element.vertices[1].set(this.position1.position.x - translation.x, this.position1.position.y - translation.y);
		}
	};

	return EdgeView;
});