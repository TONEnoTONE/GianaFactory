define(["controller/Mediator", "view/Star", "TERP", "Tone/source/Player", "Tone/core/Master"], function(Mediator, StarView, TERP, Player){
	var Star = function(index){
		//make a random position and size
		var theta = Math.random()*Math.PI * 2;
		var radius = Math.random()*50;
		var x = radius * Math.cos(theta) + 50;
		var y = radius * Math.sin(theta) + 50;
		this.position = {
			x : x,
			y : y
		};
		this.size = TERP.scale(Math.random(), 0.4, 1.1);

		this.player = new Player("./audio/stars/"+index.toString()+".mp3", this.loaded.bind(this));
		this.player.retrigger = true;
		this.player.toMaster();

		this.view = new StarView(this.position, this.size, this.touched.bind(this));
	};

	Star.prototype.loaded = function(){
		Mediator.send("sampleLoaded");
		this.view.setOpacity(1);
	};

	Star.prototype.touched = function(){
		this.player.start();
	};

	return Star;
});