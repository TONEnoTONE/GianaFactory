define(["controller/Mediator", "jquery", "model/Constellation", "data/Constellations", "Tone/core/Transport"], 
function(Mediator, $, Constellation, ConstellationData, Transport){

	/** @type {Array<Constallation>} */
	var constallations = [];

	var loadedSamples = 0;

	//make each of the constallations
	function makeConstallations(){
		for (var i = 0; i < ConstellationData.length; i++){
			var c = new Constellation(ConstellationData[i]);
			constallations.push(c);
		}
	}

	//listen for loading
	Mediator.route("sampleLoaded", function(){
		loadedSamples++;
		if (loadedSamples === ConstellationData.length){
			$("#Loading").fadeTo(0, 500, function(){
				$("#Loading").remove();
				//Transport.start("+1");
			});
		}
	});

	makeConstallations();

});