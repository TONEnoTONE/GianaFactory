require.config({
	baseUrl : "./app", 
	paths : {
		"Tone" : "../../Tone.js/Tone",
		"jquery" : "../deps/jquery-2.1.1",
		"domReady" : "../deps/domReady",
		"TERP" : "../deps/TERP",
		"Two" : "../deps/two",
		"underscore" : "../deps/two",
		"TWEEN" : "../deps/Tween",
		"rbush" : "../deps/rbush"
	},
	shim : {
		"TWEEN" : {
			exports : "TWEEN"
		}
	}
});


require(["controller/Mediator", "Tone/core/Transport", "controller/StarMap", "!domReady", "controller/Mouse"], function(Mediator, Transport){
	console.log("Giana Factory Interactive Album Cover v02");

	Mediator.route("playClicked", function(){
		Transport.start("+0.5");
	});	

	Mediator.send("init");
});