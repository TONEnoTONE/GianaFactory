require.config({
	baseUrl : "./app", 
	paths : {
		"Tone" : "../../Tone.js/Tone",
		"jquery" : "../deps/jquery-2.1.1"
	}
});


require(["controller/Mediator", "controller/StarMap"], function(Mediator){
	console.log("Giana Factory Interactive Album Cover v01");
});