define(["controller/Mediator", "view/Star", "view/Edge", "Tone/source/Player", "Tone/component/Envelope"], 
function(Mediator, Star, Edge, Player, Envelope){
	/**
	 *  @constructor
	 *  @param {Object} description 
	 */
	var Constellation = function(description){

		/** @type {Tone.Player} */
		this.player = new Player("./audio/"+description.sample, function(player){
			Mediator.send("sampleLoaded");
		});	
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

	};

	Constellation.prototype.touched = function(){
		this.envelope.triggerAttack();
		this.envelope.triggerRelease("+1m");
	};

	return Constellation;
});