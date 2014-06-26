define(["controller/Mediator", "view/StarCanvas", "view/TouchShim"], function(Mediator, StarContainer){
	/**
	 *  @constructor
	 *  @param {Object} description
	 */
	var StarView = function(position, size, callback){
		this.position = position;
		this.size = size * 3;
		this.element = $("<div>", {"class" : "Star "}).appendTo(StarContainer);
		// var translateString = ["translate3d( ", position.x + this.size / 2, "% , ", position.y + this.size / 2, "% , 0)" ].join("");
		this.element.css({
			left: position.x + "%",
			top: position.y + "%",
			width : this.size + "%",
			height : this.size + "%"
		});

		//make a canvas
		var canvas = $("<canvas>").appendTo(this.element);
		this.context = canvas[0].getContext("2d");
		//size the context
		this.context.canvas.width = canvas.width();
		this.context.canvas.height = canvas.height();

		this.draw();

		//touch callback
		this.element.on("touch mouseenter", callback);

		Mediator.route("resize", this.draw.bind(this));
	};

	var twoPi = Math.PI * 2;

	StarView.prototype.draw = function(){
		this.context.beginPath();
		this.context.fillStyle = "#fff";
		var halfSize = this.context.canvas.width / 2;
		this.context.arc(halfSize, halfSize, halfSize / 2, 0, twoPi, false);
		this.context.fill();
	};

	StarView.prototype.setOpacity = function(val){
		this.element.css({
			opacity : val
		});
	};

	return StarView;
});