define(["controller/Mediator", "jquery", "view/Drawing", "model/Oscillator", "TWEEN", "controller/Mouse", "TERP"], 
function(Mediator, $, Drawing, Oscillator, TWEEN, Mouse, TERP){

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

		this.lastHit = Date.now();

		this.maxOpacity = 0;

		this.active = false;

		Mouse.insertStar(this.position, this.size, this.touch.bind(this));

		//the physics
		// this.particle = Physics.makeParticle(this.size/2, this.position.x, this.position.y, this.touch.bind(this));

		Mediator.route("twinkleUpdate", this.update.bind(this));
	};

	StarView.prototype.update = function(now){
		if (this.active){
		 	this.element.opacity = TERP.scale(Math.random(), 1, this.maxOpacity);
		}
	};

	StarView.prototype.touch = function(mag){
		if (!this.wasJustHit()){
			this.callback(mag);
		}
	};

	StarView.prototype.wasJustHit = function(){
		var now = Date.now();
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

	StarView.prototype.twinkle = function(duration, delay, velocity){
		// this.active = true;
		if (this.tween){
			this.tween.stop();
		}
		var self = this;
		this.active = true;
		this.tween = new TWEEN.Tween({scale : 1  + velocity, opacity : 1 - velocity})
			.to({scale : 1, opacity : 1}, duration)
			.onUpdate(function(){
				self.maxOpacity = Math.pow(this.opacity, 2);
				self.element.scale = this.scale;
			})
			.onComplete(function(){
				self.active = false;
				self.element.opacity = 1;
			})
			.easing(TWEEN.Easing.Back.Out)
			.delay(delay)
			.start();
	};

	return StarView;
});