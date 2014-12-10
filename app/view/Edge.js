define(["controller/Mediator", "view/Drawing", "controller/Physics"], function(Mediator, Drawing, Physics){
	

	var EdgeView = function(particle0, particle1, callback){
		this.particle0 = particle0;
		this.particle1 = particle1;

		var pos0 = particle0.getPosition();
		var pos1 = particle1.getPosition();

		this.element = Drawing.context.makeLine(pos0.x, pos0.y, pos1.x, pos1.y);
		this.element.addTo(Drawing.stars);
		this.element.linewidth = 0.18;
		this.element.stroke = "#fff";
		this.element.opacity = 0;

		this.spring = Physics.makeSpring(particle0, particle1);

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
		var translation;
		if (!this.particle0.isResting()){
			translation = this.element.translation;
			var pos0 = this.particle0.getPosition();
			this.element.vertices[0].set(pos0.x - translation.x, pos0.y - translation.y);
		}
		if (!this.particle1.isResting()){
			translation = this.element.translation;
			var pos1 = this.particle1.getPosition();
			this.element.vertices[1].set(pos1.x - translation.x, pos1.y - translation.y);
		}
	};

	return EdgeView;
});