define(["controller/Mediator", "view/Star", "view/Edge", "Tone/source/Player", "Tone/component/Envelope", "TERP", "model/Envelope"], 
function(Mediator, Star, Edge, Player, Envelope, TERP, ClipEnvelope){
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

		this.clipEnvelope = null;

		//make all the stars
		for (var i = 0; i < description.stars.length; i++){
			var starDesc = description.stars[i];
			var pos = {
				x : starDesc.x,
				y : starDesc.y
			};
			var s = new Star(pos, starDesc.size, this.touched.bind(this), i);
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

		Mediator.route("update", this.twinkleUpdate.bind(this));

	};

	Constellation.prototype.touched = function(){
		if (this.clipEnvelope !== null){
			this.clipEnvelope.stop();
		}
		this.clipEnvelope = new ClipEnvelope(this.envelope.toSeconds("8n") * 1000, this.envelope.toSeconds("5m") * 1000, this.endTwinkle.bind(this));
		this.envelope.triggerAttack();
		this.envelope.triggerRelease("+1m");
	};

	Constellation.prototype.loaded = function(){
		var animateDuration = 1000;
		Mediator.send("sampleLoaded");
		//fade in the stars
		this.stars.forEach(function(star){
			star.appear(animateDuration, Math.floor(Math.random() * animateDuration * 2));	
		});
		this.edges.forEach(function(edge){
			edge.appear(animateDuration, Math.floor(Math.random() * animateDuration * 2));	
		});
	};

	Constellation.prototype.twinkleUpdate = function(){
		if (this.clipEnvelope !== null){
			var clipVal = this.clipEnvelope.getValue();
			if (clipVal > 0){
				for (var i = 0; i < this.stars.length; i++){
					var star = this.stars[i];
					star.oscillatorClip = clipVal;
				}
			}
		}
	};

	Constellation.prototype.endTwinkle = function(){
		for (var i = 0; i < this.stars.length; i++){
			var star = this.stars[i];
			star.oscillatorClip = 0;
		}
		this.clipEnvelope = null;
	};

	return Constellation;
});