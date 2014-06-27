define(["Tone/core/Tone", "Tone/signal/Signal", "Tone/signal/Scale"], function(Tone){

	/**
	 * DRY/WET KNOB
	 * 
	 * equal power fading control values:
	 * 	0 = 100% dry  -    0% wet
	 * 	1 =   0% dry  -  100% wet
	 *
	 * @constructor
	 * @param {number=} initialDry
	 */		
	Tone.DryWet = function(initialDry){
		Tone.call(this);

		/**
		 *  connect this input to the dry signal
		 *  the dry signal is also the default input
		 *  
		 *  @type {GainNode}
		 */
		this.dry = this.input;

		/**
		 *  connect this input to the wet signal
		 *  
		 *  @type {GainNode}
		 */
		this.wet = this.context.createGain();
		/**
		 *  controls the amount of wet signal 
		 *  which is mixed into the dry signal
		 *  
		 *  @type {Tone.Signal}
		 */
		this.wetness = new Tone.Signal();
		/**
		 *  invert the incoming signal
		 *  @private
		 *  @type {Tone}
		 */
		this._invert = new Tone.Scale(0, 1, 1, 0);

		//connections
		this.dry.connect(this.output);
		this.wet.connect(this.output);
		//wet control
		this.chain(this.wetness, this.wet.gain);
		//dry control is the inverse of the wet
		this.chain(this.wetness, this._invert, this.dry.gain);

		this.dry.gain.value = 0;
		this.wet.gain.value = 0;

		this.setDry(this.defaultArg(initialDry, 0));
	};

	Tone.extend(Tone.DryWet);

	/**
	 * Set the dry value 
	 * 
	 * @param {number} val
	 * @param {Tone.Time=} rampTime
	 */
	Tone.DryWet.prototype.setDry = function(val, rampTime){
		this.setWet(1-val, rampTime);
	};

	/**
	 * Set the wet value
	 * 
	 * @param {number} val
	 * @param {Tone.Time=} rampTime
	 */
	Tone.DryWet.prototype.setWet = function(val, rampTime){
		if (rampTime){
			this.wetness.linearRampToValueNow(val, rampTime);
		} else {
			this.wetness.setValue(val);
		}
	};

	/**
	 *  clean up
	 */
	Tone.DryWet.prototype.dispose = function(){
		this.dry.disconnect();
		this.wet.disconnect();
		this.wetness.dispose();
		this._invert.dispose();
		this.output.disconnect();
		this.dry = null;
		this.wet = null;
		this.wetness = null;
		this._invert = null;
		this.output = null;
	};

	return Tone.DryWet;
});
