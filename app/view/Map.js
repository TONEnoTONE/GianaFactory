define(["view/Drawing", "TWEEN", "controller/Mediator"], function(Drawing, TWEEN, Mediator){

	var linewidth = 0.15;

	var rings = [];
	var currentRingTween = 0;

	function setStyle(elem){
		elem.stroke = "#fff";
		elem.noFill();
		elem.linewidth = linewidth;
		elem.scale = 0;
	}

	//make the crosshairs
	var outerRing = Drawing.context.makeCircle(50, 50, 50);
	setStyle(outerRing);
	rings.push(outerRing);
	outerRing.addTo(Drawing.stars);

	var crosshairs = Drawing.context.makeGroup();

	var secondRing = Drawing.context.makeCircle(50, 50, 48);
	setStyle(secondRing);
	secondRing.scale = 1;
	secondRing.addTo(crosshairs);

	var verticalCrossHair = Drawing.context.makeLine(50, 2, 50, 98);
	setStyle(verticalCrossHair);
	verticalCrossHair.scale = 1;
	verticalCrossHair.addTo(crosshairs);

	var horizontalCrossHair = Drawing.context.makeLine(2, 50, 98, 50);
	setStyle(horizontalCrossHair);
	horizontalCrossHair.scale = 1;
	horizontalCrossHair.addTo(crosshairs);

	crosshairs.addTo(Drawing.stars);
	rings.push(crosshairs);
	crosshairs.scale = 0;
	crosshairs.trans = true;

	var thirdRing = Drawing.context.makeCircle(50, 50, 46);
	setStyle(thirdRing);
	rings.push(thirdRing);
	thirdRing.addTo(Drawing.stars);

	var fourthRing = Drawing.context.makeCircle(50, 50, 28);
	setStyle(fourthRing);
	rings.push(fourthRing);
	fourthRing.addTo(Drawing.stars);

	var fifthRing = Drawing.context.makeCircle(50, 50, 14);
	setStyle(fifthRing);
	rings.push(fifthRing);
	fifthRing.addTo(Drawing.stars);

	//expand each of the crosshairs outward
	function expandRing(){
		var expandTween = new TWEEN.Tween({scale : 0, offset : 50})
			.to({scale : 1 , offset: 0}, 500)
			.onUpdate(function(){
				var elem = rings[currentRingTween];
				if (elem.trans){
					elem.translation.set(this.offset, this.offset);
				}
				elem.scale = this.scale;
			})
			.easing(TWEEN.Easing.Back.Out)
			.onComplete(function(){
				currentRingTween++;
				if (currentRingTween < rings.length){
					expandRing();
				}
			})
			.start();
	}

	Mediator.route("init", expandRing);

});