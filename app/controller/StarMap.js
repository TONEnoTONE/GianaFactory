define(["controller/Mediator", "jquery", "model/Constellation", "data/Constellations", "model/Star", "Tone/core/Transport", "view/Map", "data/Stars"], 
function(Mediator, $, Constellation, ConstellationData, Star, Transport, Map, StarData){

	/** @type {Array<Constallation>} */
	var constallations = [];
	/** @type {Array<Stars>} */
	var stars = [];

	var starCount = StarData.length;

	var loadedSamples = 0;

	//make each of the constallations
	function makeConstallations(){
		for (var i = 0; i < ConstellationData.length; i++){
			var c = new Constellation(ConstellationData[i]);
			constallations.push(c);
		}
	}

	//square the starmap

	//listen for loading
	Mediator.route("sampleLoaded", function(){
		loadedSamples++;
		if (loadedSamples === ConstellationData.length + starCount){
			Mediator.send("allLoaded");
		}
	});

	//make all the stars
	function makeStars(){
		for (var i = 0; i < StarData.length; i++){
			var data = StarData[i]
			var s = new Star(data);
			stars.push(s);
		}
	}

	makeStars();
	makeConstallations();

});