define(["controller/Mediator", "view/Star", "view/Edge", "Tone/source/Player", "Tone/component/Envelope", "TERP"], 
function(Mediator, Star, Edge, Player, Envelope, TERP){
	/**
	 *  @constructor
	 *  @param {Object} description 
	 */
	var Constellation = function(description){

		/** @type {Tone.Player} */
		this.player = new Player("./audio/"+description.sample, this.loaded.bind(this));
		//sync the player to the transport
		this.player.sync();
		this.player.loop = true;
		this.player.toMaster();

		/** @type {Tone.Envelope} */
		this.envelope = new Envelope("8n", 0, 1, "4m");

		this.envelope.connect(this.player.output.gain);

		/** @type {Array.<StarView>} */
		this.stars = [];

		//make all the stars
		for (var i = 0; i < description.stars.length; i++){
			var starDesc = description.stars[i];
			var pos = {
				x : starDesc.x,
				y : starDesc.y
			};
			var s = new Star(pos, starDesc.size, this.touched.bind(this));
			this.stars.push(s);
		}

		/** @type {Array.<Edge>} */
		this.edges = [];
		for (var i = 0; i < description.edges.length; i++){
			var edge = description.edges[i];
			var from = this.stars[edge[0]];
			var to = this.stars[edge[1]];
			var e = new Edge(from.position, to.position, this.touched.bind(this));
			this.edges.push(e);
		}

		Mediator.route("twinkleUpdate", this.twinkleUpdate.bind(this));

	};

	Constellation.prototype.touched = function(){
		this.envelope.triggerAttack();
		this.envelope.triggerRelease("+1m");
	};

	Constellation.prototype.loaded = function(){
		Mediator.send("sampleLoaded");
		//fade in the stars
		this.stars.forEach(function(star){
			setTimeout(function(){
				star.setOpacity(1);	
			}, Math.floor(Math.random() * 1000));
		});
	};

	Constellation.prototype.twinkleUpdate = function(){
		var envValue = this.envelope.control.getValue();
		if (envValue > 0.1){
			//twinkle the stars
			this.stars.forEach(function(star){
				var randomOpacity = TERP.scale(Math.random(), 1, 1 - envValue + 0.2);
				star.setOpacity(randomOpacity);
			});
		}
	};

	return Constellation;
});