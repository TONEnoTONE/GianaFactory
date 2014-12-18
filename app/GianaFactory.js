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
		"rbush" : "../deps/rbush",
		"physics" : "../deps/Box2dWeb-2.1.a.3",
		"dat" : "../deps/dat.gui"
	},
	shim : {
		"TWEEN" : {
			exports : "TWEEN"
		},
		"physics" : {
			exports : "Box2D"
		},
		"dat" :{
			exports : "dat"
		},
	}
});

require(["controller/Mediator", "Tone/core/Transport", "jquery", "controller/StarMap", "!domReady", "controller/Mouse"], 
function(Mediator, Transport, $){

	console.log("Giana Factory Interactive Album Cover [ version: 2 ]");


	Mediator.route("playClicked", function(){
		Transport.start("+0.5");
	});	

	setTimeout(function(){
		Mediator.send("init");
	}, 1000);

});