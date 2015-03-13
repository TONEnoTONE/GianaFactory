define(["controller/Mediator", "view/Star", "view/Edge", "Tone/source/Player", 
	"Tone/component/AmplitudeEnvelope", "TERP", "model/Envelope"], 
function(Mediator, Star, Edge, Player, AmplitudeEnvelope, TERP, ClipEnvelope){

	var attackTime = "16n";
	var sustainTime = "1m";
	var releaseTime = "3m";

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

		/** @type {Tone.Envelope} */
		this.envelope = new AmplitudeEnvelope(attackTime, 0.01, 1, releaseTime).toMaster();
		this.player.connect(this.envelope);

		/** @type {Array.<StarView>} */
		this.stars = [];

		this.clipEnvelope = null;

		this.duration = this.player.toSeconds(attackTime + " + " + sustainTime + " + " + releaseTime) * 1000;

		//make all the stars
		var i;
		for (i = 0; i < description.stars.length; i++){
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
		for (i = 0; i < description.edges.length; i++){
			var edge = description.edges[i];
			var from = this.stars[edge[0]].position;
			var to = this.stars[edge[1]].position;
			var e = new Edge(from, to, this.touched.bind(this));
			this.edges.push(e);
		}

		Mediator.route("update", this.twinkleUpdate.bind(this));

	};

	Constellation.prototype.touched = function(vel){
		this.envelope.triggerAttackRelease(sustainTime, undefined, vel);
		var i;
		for (i = 0; i < this.stars.length; i++){
			this.stars[i].twinkle(this.duration, Math.random() * 400, vel);
		}
		for (i = 0; i < this.edges.length; i++){
			this.edges[i].twinkle(this.duration, Math.random() * 400, vel);
		}
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