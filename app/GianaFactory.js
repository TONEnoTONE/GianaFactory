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

require(["controller/Mediator", "Tone/core/Transport", "jquery", "controller/StarMap", 
	"!domReady", "controller/Mouse", "controller/Master"], 
function(Mediator, Transport, $){

	console.log("Lemon Moon Interactive v3");


	Mediator.route("playClicked", function(){
		Transport.start("+0.5");
	});	

	setTimeout(function(){
		Mediator.send("init");
	}, 1000);

	var infoOpen = false;
	$("#Info").on("mouseup touchend", function(e){
		e.preventDefault();
		if (!infoOpen){
			$("#InfoText").addClass("Visible");
			$("#Info").addClass("Active");
			infoOpen = true;
		} else {
			infoOpen = false;
			$("#InfoText").removeClass("Visible");
			$("#Info").removeClass("Active");
		}
	});

/*	$("#Info").not().on("click", function(e){
		if (infoOpen){
			infoOpen = false;
			$("#InfoText").removeClass("Visible");
			$("#Info").removeClass("Active");		
		}
	});*/

	$("body").on("click", function(e){
		if (infoOpen && e.target.id !== "Info" && e.target.id !== "InfoText"){
			infoOpen = false;
			$("#InfoText").removeClass("Visible");
			$("#Info").removeClass("Active");		
		}
	});

});