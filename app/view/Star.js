define(["controller/Mediator", "view/StarCanvas", "view/TouchShim"], function(Mediator, StarContainer){
	/**
	 *  @constructor
	 *  @param {Object} description
	 */
	var StarView = function(position, size, callback){
		this.position = position;
		this.size = size * 2;
		this.element = $("<div>", {"class" : "Star "}).appendTo(StarContainer);
		// var translateString = ["translate3d( ", position.x + this.size / 2, "% , ", position.y + this.size / 2, "% , 0)" ].join("");
		this.element.css({
			left: position.x + "%",
			top: position.y + "%",
			width : this.size + "%",
			height : this.size + "%"
		});

		//touch callback
		this.element.on("touch mouseenter", callback);
	};

	return StarView;
});