define(["controller/Mediator", "jquery", "view/Drawing", "model/Oscillator", "TWEEN", "controller/Mouse", "controller/Physics"], 
function(Mediator, $, Drawing, Oscillator, TWEEN, Mouse, Physics){

	/**
	 *  @constructor
	 *  @param {Object} description
	 */
	var StarView = function(position, size, callback){
		this.position = position;
		this.size = size;
		this.element = Drawing.context.makeCircle(this.position.x, this.position.y, this.size / 2);
		this.element.addTo(Drawing.stars);
		this.element.fill = "#fff";
		this.element.noStroke();
		this.element.scale = 0;

		this.callback = callback;

		//the physics
		this.particle = Physics.makeParticle(1, this.position.x, this.position.y);
		this.anchor = Physics.makeParticle(100, this.position.x, this.position.y);
		this.anchor.makeFixed();
		this.attraction = Physics.makeSpring(this.particle, this.anchor, 1, 0.001, 0);

		Mouse.insertStar(this.position, this.size, this.touch.bind(this));

		Mediator.route("update", this.update.bind(this));
	};

	StarView.prototype.update = function(){
		if (!this.particle.resting()){
			this.element.translation.set(this.particle.position.x, this.particle.position.y);
		}
	};

	StarView.prototype.touch = function(vector){
		this.particle.velocity.set( -vector.x / 10, -vector.y / 10);
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