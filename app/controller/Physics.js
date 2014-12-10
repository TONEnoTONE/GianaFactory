define(["controller/Mediator", "physics"], function(Mediator, Box2D){
	// var physics = new Physics(0);
	// physics.optimize(true);

	var Vec2 = Box2D.Common.Math.b2Vec2;
	var world = new Box2D.Dynamics.b2World(new Vec2(0, 1),  true);

	Mediator.route("update", function(){
		world.Step(
			1 / 60,   //frame-rate
			5,       //velocity iterations
			5       //position iterations
		 );
	});

	var fixDef = new Box2D.Dynamics.b2FixtureDef();
	fixDef.density = 1.0;
	fixDef.friction = 0.5;
	fixDef.restitution = 0.2;
	var bodyDef = new Box2D.Dynamics.b2BodyDef();

	//make a wall to add all of the joints
	bodyDef.position.x = 50;
	bodyDef.position.y = 50;
	fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
	fixDef.shape.SetAsBox(100, 100);
	var wall = world.CreateBody(bodyDef);

	var circleDef = new Box2D.Collision.Shapes.b2CircleShape();
	fixDef.shape = circleDef;

	var jointDef = new Box2D.Dynamics.Joints.b2MouseJointDef();
	jointDef.bodyA = wall;
	jointDef.frequencyHz = 4.0;
	jointDef.dampingRatio = 0.5;
	jointDef.maxForce = 20000;
	jointDef.collideConnected = false;

	var centerVec = new Vec2(0, 0);

	/**
	 *  the star particle
	 */
	var StarParticle = function(radius, x, y, touched){
		bodyDef.position.x = x;
		bodyDef.position.y = y;
		bodyDef.userData = touched;
		bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
		circleDef.SetRadius(radius*3);
		this.obj = world.CreateBody(bodyDef).CreateFixture(fixDef);
		this.body = this.obj.GetBody();
		//connect it to the wall at the current point
		jointDef.bodyB = this.body;
		jointDef.target.Set(x, y);
		this.wallSpring = world.CreateJoint(jointDef);
		this.mass = this.body.GetMass();
	};

	StarParticle.prototype.getPosition = function(){
		return this.body.GetPosition();
	};

	StarParticle.prototype.isResting = function(){
		return !this.body.IsAwake();
	};

	StarParticle.prototype.applyForce = function(vX, vY){
		var vec = new Vec2(vX, vY);
		vec.Multiply(this.mass);
		this.body.ApplyForce(vec, centerVec);
	};

	return {
		makeParticle : function(radius, x, y, touchCB){
			return new StarParticle(radius, x, y, touchCB);
		},
		makeSpring : function(){

		},
		testPosition : function(mouseX, mouseY, vector){
			var vec = new Vec2(mouseX, mouseY);
			var aabb = new Box2D.Collision.b2AABB();
			var testDist = 0.5;
			aabb.lowerBound.Set(mouseX - testDist, mouseY - testDist);
			aabb.upperBound.Set(mouseX + testDist, mouseY + testDist);

			// Query the world for overlapping shapes.

			selectedBody = null;
			world.QueryAABB( function getBodyCB(fixture) {
				if(fixture.GetBody().GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
					if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), vec)) {
						selectedBody = fixture.GetBody();
						return false;
					}
				}
				return true;
			}, aabb);
			if (selectedBody){
				selectedBody.GetUserData()(vector);
			}
		}
	};
});