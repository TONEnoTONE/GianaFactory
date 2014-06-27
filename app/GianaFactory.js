require.config({
	baseUrl : "./app", 
	paths : {
		"Tone" : "../../deps/Tone",
		"jquery" : "../deps/jquery-2.1.1",
		"domReady" : "../deps/domReady",
		"TERP" : "../deps/TERP",
		"GALocalStorage" : "../deps/GALocalStorage"
	}
});


require([ "manager/Analytics", "controller/Mediator", "Tone/core/Transport", "controller/StarMap", "!domReady" ], function(Analytics, Mediator, Transport){
	console.log("Giana Factory Interactive Album Cover v01");

	//resize listener
	$(window).resize(function(){
		Mediator.send("resize");
	});

	Mediator.route("playClicked", function(){
		Transport.start("+0.5");
	});

	Analytics.trackEvent("App", "Session Started");
});