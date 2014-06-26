/**
 *  the star canvas where stars are drawn to / held
 *
 *  it deals with scaling or resizing / rotation
 */
define(["controller/Mediator", "jquery", "view/TouchShim"], function(Mediator, $){

	var container = $("#StarMap");
	var playButton = $("#PlayButton");
	var playButtonText = [];
	
	//make sure it's square
	function makeSquare(){
		var smallerDimension = Math.min($(window).width(), $(window).height());
		//set it to both
		container.width(smallerDimension);
		container.height(smallerDimension);
	}

	//initialization
	makeSquare();
	Mediator.route("resize", makeSquare);

	Mediator.route("allLoaded", function(){
		playButton.text("PLAY");
		playButton.addClass("Button");
		playButton.click(function(){
			Mediator.send("playClicked");
			playButton.addClass("Disappear");
		});
	});

	return container;
});