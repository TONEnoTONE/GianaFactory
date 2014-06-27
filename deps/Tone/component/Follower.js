define(["Tone/core/Tone", "Tone/signal/Signal", "Tone/signal/Scale"], function(Tone){
	/**
	 *  Follow the envelope of the incoming signal
	 */
	Tone.Follower = function(){

		/**
		 *  scale the incoming signal to 0-1
		 *  @type {Tone.Signal}
		 *  @private
		 */
		this._scaler = new Tone.Scale(0, 1);

		/**
		 *  the lowpass filter
		 *  @type {BiquadFilterNode}
		 *  @private
		 */
		this._filter = this.context.createBiquadFilter();
		this._filter.type = "lowpass";

		/**
		 *  @type {WaveShaperNode}
		 *  @private
		 */
		this._gate = this.context.createWaveShaper();
	};
});