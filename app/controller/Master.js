define(["Tone/core/Master", "Tone/effect/PingPongDelay", "Tone/component/Compressor", "Tone/component/Volume"], 
function(Master, PingPongDelay, Compressor, Volume){

	var delay = new PingPongDelay("8n", 0.4).toMaster();

	var starCompressor = new Compressor({
		"threshold" : -12,
		"attack" : 0.05,
		"release" : 0.05,
		"ratio" : 3,
		"knee" : 20
	});

	window.starCompressor = starCompressor;

	var volume = new Volume().chain(starCompressor, Master).connect(delay);
	volume.receive("star");

	volume.volume.value = -8;

	window.starVol = volume;

	var compressor = new Compressor({
		"threshold" : -8,
		"attack" : 0.4,
		"release" : 0.1,
		"ratio" : 3,
		"knee" : 20
	});

	Master.send(compressor);
	Master.receive(compressor);

});