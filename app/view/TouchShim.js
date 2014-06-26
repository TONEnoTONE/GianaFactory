define(["jquery"], function($){

	function triggerTouch(e){
		e.preventDefault();
		var touches = e.originalEvent.touches;
		for (var i = 0; i < touches.length; i++){
			var touch = touches.item(i);
			var element = document.elementFromPoint(touch.clientX, touch.clientY);
			$(element).trigger("touch");
		}
	}

	$(document).on("touchmove", triggerTouch);
	// $(document).on("touchstart", triggerTouch);
});