define(["controller/Mediator", "view/Drawing", "TERP"], function(Mediator, Drawing, TERP){
	

	var EdgeView = function(pos0, pos1, callback){
		this.element = Drawing.context.makeLine(pos0.x, pos0.y, pos1.x, pos1.y);
		this.element.addTo(Drawing.stars);
		this.element.linewidth = 0.18;
		this.element.stroke = "#fff";
		this.element.opacity = 0;

		this.lastHit = Date.now();
		this.maxOpacity = 0;
		this.active = false;

		Mediator.route("twinkleUpdate", this.update.bind(this));
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

	EdgeView.prototype.twinkle = function(duration, delay, velocity){
		// this.active = true;
		if (this.tween){
			this.tween.stop();
		}
		var self = this;
		this.active = true;
		this.tween = new TWEEN.Tween({opacity : 1 - velocity})
			.to({opacity : 1}, duration)
			.onUpdate(function(){
				self.maxOpacity = this.opacity;
			})
			.onComplete(function(){
				self.active = false;
				self.element.opacity = 1;
			})
			.easing(TWEEN.Easing.Quadratic.Out)
			.delay(delay)
			.start();
	};

	EdgeView.prototype.update = function(now){
		if (this.active){
		 	this.element.opacity = TERP.scale(Math.random(), 1, this.maxOpacity);
		}
	};

	return EdgeView;
});