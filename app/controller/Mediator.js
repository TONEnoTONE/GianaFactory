define(["TWEEN"], function(TWEEN){
	
	/**
	 * MicroEvent - to make any js object an event emitter (server or browser)
	 * 
	 * - pure javascript - server compatible, browser compatible
	 * - dont rely on the browser doms
	 * - super simple - you get it immediatly, no mistery, no magic involved
	 *
	 * - create a MicroEventDebug with goodies to debug
	 *   - make it safer to use
	*/

	var MicroEvent	= function(){};

	MicroEvent.prototype	= {
		route	: function(event, fct){
			this._events = this._events || {};
			this._events[event] = this._events[event]	|| [];
			this._events[event].push(fct);
		},
		unroute	: function(event, fct){
			this._events = this._events || {};
			if( event in this._events === false  )	return;
			this._events[event].splice(this._events[event].indexOf(fct), 1);
		},
		send	: function(event /* , args... */){
			this._events = this._events || {};
			if( event in this._events === false  )	return;
			for(var i = 0; i < this._events[event].length; i++){
				this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
			}
		}
	};

	var Mediator = new MicroEvent();

	//////////////////////////////////////////////////////////////////////////
	//	UPDATE LOOP
	///////////////////////////////////////////////////////////////////////////
	
	function updateLoop(){
		requestAnimationFrame(updateLoop);
		Mediator.send("update");
		TWEEN.update();
	}

	function twinkleUpdate(){
		setTimeout(twinkleUpdate, 50);
		Mediator.send("twinkleUpdate");
	}

	updateLoop();
	twinkleUpdate();

	return Mediator;
});

// shim layer with setTimeout fallback
window.requestAnimationFrame = (function(){
  return  window.requestAnimationFrame       ||
		  window.webkitRequestAnimationFrame ||
		  window.mozRequestAnimationFrame    ||
		  function( callback ){
			window.setTimeout(callback, 1000 / 60);
		  };
})();