define(["controller/Mediator", "view/Star"], function(Mediator, Star){
	/**
	 *  @constructor
	 *  @param {Object} description 
	 */
	var Constellation = function(description){

		/** @type {Tone.Player} */
		// this.player = new Player(description.sample);	

		/** @type {Array.<StarView>} */
		this.stars = [];

		//make all the stars
		for (var i = 0; i < description.stars.length; i++){
			var starDesc = description.stars[i];
			var pos = {
				x : starDesc.x,
				y : starDesc.y
			};
			var s = new Star(pos, starDesc.size, description.song);
			this.stars.push(s);
		}

		/** @type {Array.<Edge>} */
		this.edges = [];

	};

	return Constellation;
});