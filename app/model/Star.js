define(["controller/Mediator", "view/Star", "TERP", "Tone/source/Player", "Tone/core/Master"], 
	function(Mediator, StarView, TERP, Player, Master){
	var Star = function(data){
		//make a random position and size
		var x = data.x;
		var y = data.y;
		var fileName = data.sample;
		this.position = {
			x : x,
			y : y
		};
		this.size = data.size * 1.3;

		this.player = new Player("./audio/stars/"+fileName.toString()+".mp3", this.loaded.bind(this));
		this.player.retrigger = true;
		this.player.toMaster();
		this.view = new StarView(this.position, this.size, this.touched.bind(this), true);
	};

	Star.prototype.loaded = function(){
		Mediator.send("sampleLoaded");
		this.view.appear(1000, Math.floor(Math.random() * 1000 * 2));	
	};

	Star.prototype.touched = function(){
		this.player.start();
	};

	return Star;
});