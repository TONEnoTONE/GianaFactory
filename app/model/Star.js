define(["controller/Mediator", "view/Star", "TERP", "Tone/source/Player", "Tone/core/Master", "Tone/core/Bus"], 
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
		this.player.volume.units = "gain";
		this.player.send("star");
		this.duration = 0;
		this.view = new StarView(this.position, this.size, this.touched.bind(this), true);
	};

	Star.prototype.loaded = function(){
		this.view.appear(1000, Math.floor(Math.random() * 1000 * 2));	
	};

	Star.prototype.touched = function(velocity){
		this.player.volume.rampTo(velocity, 0.05);
		this.player.start();
		if (this.duration === 0){
			this.duration = this.player.buffer.duration * 1000;
		}
		this.view.twinkle(this.duration + 200, 0, velocity);
	};

	return Star;
});