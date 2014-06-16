define(["controller/Mediator", "view/StarCanvas"], function(Mediator, StarContainer){
	/**
	 *  @constructor
	 *  @param {Object} description
	 */
	var StarView = function(position, size, song){
		this.position = position;
		this.size = size;
		this.element = $("<div>", {"class" : "Star "}).appendTo(StarContainer).text(song);
		this.element.css({
			left: (position.x - this.size / 2) + "%",
			top: (position.y - this.size / 2) + "%",
			width : this.size + "%",
			height : this.size + "%"
		});
	};

	return StarView;
});