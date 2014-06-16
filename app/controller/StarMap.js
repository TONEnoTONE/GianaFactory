define(["controller/Mediator", "model/Constellation", "data/Constellations"], function(Mediator, Constellation, ConstellationData){

	/** @type {Array<Constallation>} */
	var constallations = [];

	//make each of the constallations
	function makeConstallations(){
		for (var i = 0; i < ConstellationData.length; i++){
			var c = new Constellation(ConstellationData[i]);
			constallations.push(c);
		}
	}

	makeConstallations();

});