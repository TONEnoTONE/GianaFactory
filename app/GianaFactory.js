require.config({
	baseUrl : "./app", 
	paths : {
		"Tone" : "../../Tone.js/Tone",
		"jquery" : "../deps/jquery-2.1.1",
		"domReady" : "../deps/domReady",
		"TERP" : "../deps/TERP",
		"GALocalStorage" : "../deps/GALocalStorage",
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

require(["controller/Mediator", "Tone/core/Transport", "manager/Analytics", "controller/StarMap", "!domReady", "controller/Mouse"], 
function(Mediator, Transport, Analytics){

	console.log("Giana Factory Interactive Album Cover v02");

	Mediator.route("playClicked", function(){
		Transport.start("+0.5");
	});	

	Mediator.send("init");

	Analytics.trackEvent("App", "Session Started");
});