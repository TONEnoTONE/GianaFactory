define(["controller/Mediator", "TWEEN"], function(Mediator, TWEEN){

	//@param {number} attackTime time in milliseconds
	//@param {number} decayTime time in milliseconds
	//@param {number=} delay optional wait time
	var Envelope = function(attackTime, decayTime, onend){
		this.value = 0;
		this.over = false;
		var self = this;
		this.attack = new TWEEN.Tween({ val : 0})
			.to({val : 1 }, attackTime)
			.onUpdate(function(){
				self.value = this.val;
			});
		this.decay = new TWEEN.Tween({val : 1})
			.to({val : 0 }, decayTime)
			.onUpdate(function(){
				self.value = this.val;
			})
			.onComplete(function(){
				self.over = true;
				onend();
			});
		//chain them together and start it
		this.attack.chain(this.decay);
		this.attack.start();
	};

	Envelope.prototype.stop = function(){
		this.attack.stop();
		this.decay.stop();
	};

	//returns the current value of the envelope
	Envelope.prototype.getValue = function(){
		return this.value;
	};

	return Envelope;
});