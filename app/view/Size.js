define(["jquery", "controller/Mediator"], function($, Mediator){
	
	var Size = {
		width: $(window).width(),
		height : $(window).height(),
		size : 0,
		left : 0,
		top: 0
	};

	Size.size = Math.min(Size.width, Size.height);

	function setMargins(){
		if (Size.width < Size.height){
			Size.left = 0;
			Size.top = (Size.height - Size.width) / 2;
		} else if (Size.width > Size.height){
			Size.left = (Size.width - Size.height) / 2;
			Size.top = 0;
		} else {
			Size.top = 0;
			Size.left = 0;
		}
	}

	setMargins();

	$(window).resize(_.debounce(function(){
		Size = {
			width: $(window).width(),
			height : $(window).height()
		};		
		Size.size = Math.min(Size.width, Size.height);
		setMargins();
		Mediator.send("resize", Size);
	}, 200));

	return {
		getSize : function(){
			return Size;
		}
	};
});