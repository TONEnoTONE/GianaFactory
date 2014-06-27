/**
 *  the star canvas where stars are drawn to / held
 *
 *  it deals with scaling or resizing / rotation
 */
define(["controller/Mediator", "jquery", "view/Size"], function(Mediator, $, Size){

	var size = Size.getSize();
	var container = $("#StarMap");
	var type = Two.Types.svg;
	var params = { width: size.width, height: size.height , type : type};
	var two = new Two(params).appendTo(container[0]);

	//the star group
	var starGroup = two.makeGroup();

	Mediator.route("update", function(){
		two.update();
	});

	var playButton = $("#PlayButton");
	var playButtonText = [];
	
	//make sure it's square
	function makeSquare(size){
		//set it to both
		container.width(size.width);
		container.height(size.height);
		two.renderer.setSize(size.width, size.height);
		two.width = size.width;
		two.height = size.height;
		starGroup.translation.set(size.left, size.top);
		starGroup.scale = size.size / 100;
	}

	//initialization
	makeSquare(size);
	Mediator.route("resize", makeSquare);

	Mediator.route("allLoaded", function(){
		playButton.text("PLAY");
		playButton.addClass("Button");
		playButton.on("click touchend", function(){
			Mediator.send("playClicked");
			playButton.addClass("Disappear");
		});
	});

	return {
		context : two,
		stars : starGroup
	};
});