define(["controller/Mediator"], function(Mediator){

	var tableLen = 2048;

	//make a sine table to refer from
	var sineTable = (function(){
		var len = tableLen;
		var table = new Array(len);
		var twoPi = Math.PI * 2;
		for (var i = 0; i < len; i++){
			var val = Math.sin(twoPi * (i / (len - 1)));
			val = (val + 1) / 4;
			val = Math.min(0.999, val);
			val = Math.max(0.001, val);
			table[i] = val;
		}
		return table;
	}());

	Mediator.route("update", function(){
		positionPointer+=100;
	});

	var positionPointer = 0;

	/**
	 *  @constructor
	 *  @param {number} phaseOffset 0-1
	 */
	var Oscillator = function(phaseOffset){
		this.offset = Math.floor(phaseOffset * tableLen);
	};

	Oscillator.prototype.getValue = function(){
		var index = (positionPointer + this.offset) % tableLen;
		return sineTable[index];
	};

	return Oscillator;
});