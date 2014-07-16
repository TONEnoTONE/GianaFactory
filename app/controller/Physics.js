define(["controller/Mediator", "physics"], function(Mediator, Physics){
	var physics = new Physics(0);

	Mediator.route("update", function(){
		physics.tick();
	});

	return physics;
});