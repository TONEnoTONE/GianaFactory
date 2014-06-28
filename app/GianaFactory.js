require.config({
	baseUrl : "./app", 
	paths : {
		"Tone" : "../deps/Tone",
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

require(["controller/Mediator", "Tone/core/Transport", "manager/Analytics", "data/Version", "jquery", "controller/StarMap", "!domReady", "controller/Mouse"], 
function(Mediator, Transport, Analytics, Version, $){

	console.log("Giana Factory Interactive Album Cover [ version: " + Version.version + " ]");

	var versionInfo = $("#VersionInfo");
	versionInfo.text(Version.version);

	Mediator.route("playClicked", function(){
		Transport.start("+0.5");
	});	

	setTimeout(function(){
		Mediator.send("init");
	}, 1000);

	Analytics.trackEvent("App", "Session Started");
});