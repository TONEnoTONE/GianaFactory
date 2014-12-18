define(["controller/Mediator", "jquery", "view/Drawing", "model/Oscillator", "TWEEN", "controller/Mouse", "controller/Physics"], 
function(Mediator, $, Drawing, Oscillator, TWEEN, Mouse, Physics){

	/**
	 *  @constructor
	 *  @param {Object} description
	 */
	var StarView = function(position, size, callback, notConst){
		this.position = position;
		this.size = size;
		this.element = Drawing.context.makeCircle(this.position.x, this.position.y, this.size / 2);
		this.element.addTo(Drawing.stars);
		this.element.fill = "#fff";
		this.element.noStroke();
		this.element.scale = 0;

		this.callback = callback;

		this.lastHit = new Date();

		//the physics
		this.particle = Physics.makeParticle(this.size/2, this.position.x, this.position.y, this.touch.bind(this));

		Mediator.route("update", this.update.bind(this));
	};

	StarView.prototype.update = function(){
		if (!this.particle.isResting()){
			var position = this.particle.getPosition();
			this.element.translation.set(position.x, position.y);
		}
	};

	StarView.prototype.touch = function(vector){
		if (!this.wasJustHit()){
			var mag = this.particle.applyForce(-vector.x, -vector.y);
			this.callback(mag);
		}
	};

	StarView.prototype.wasJustHit = function(){
		var now = new Date();
		if (now - this.lastHit < 100){
			this.lastHit = now;
			return true;
		} else {
			this.lastHit = now;
			return false;
		}
	};

	StarView.prototype.appear = function(duration, delay){
		var elem = this.element;
		var tween = new TWEEN.Tween({scale : 0})
			.to({scale : 1}, duration)
			.onUpdate(function(){
				elem.scale = this.scale;
			})
			.easing(TWEEN.Easing.Back.Out)
			.delay(delay)
			.start();
	};

	return StarView;
});