require.config({
	baseUrl : "./app", 
	paths : {
		"Tone" : "../../Tone.js/Tone",
		"jquery" : "../deps/jquery-2.1.1",
		"domReady" : "../deps/domReady",
		"TERP" : "../deps/TERP"
	}
});


require(["controller/Mediator", "Tone/core/Transport", "controller/StarMap", "!domReady"], function(Mediator, Transport){
	console.log("Giana Factory Interactive Album Cover v01");

	//resize listener
	$(window).resize(function(){
		Mediator.send("resize");
	});


	Mediator.route("playClicked", function(){
		Transport.start("+0.5");
	});	
});