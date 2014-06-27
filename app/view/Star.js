define(["controller/Mediator", "view/Drawing", "model/Oscillator", "TWEEN", "controller/Mouse"], function(Mediator, Drawing, Oscillator, TWEEN, Mouse){

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

		this.oscillatorClip = 0;

		this.oscillator = new Oscillator(Math.random());

		Mouse.insertStar(this.position, this.size, callback);

		Mediator.route("update", this.update.bind(this));
	};

	StarView.prototype.update = function(){
		if (this.oscillatorClip > 0){
			this.element.scale = 1 + this.oscillator.getValue() * this.oscillatorClip;
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