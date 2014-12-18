define(["controller/Mediator", "physics", "jquery", "controller/GUI"], function(Mediator, Box2D, $, GUI){
	// var physics = new Physics(0);
	// physics.optimize(true);

	var Vec2 = Box2D.Common.Math.b2Vec2;

	var defaults = 
	{
		"linearDamping": 7.3,
		"angularDamping": 1,
		"frequencyHz": 30,
		"dampingRatio": 1,
		"maxForce": 2,
		"mouseForce": 30,
		"mass": 12,
		"velIter": 3,
		"posIter": 3,
		"springLength": 0.1,
		"gravity": 15.8,
		"testDist": 0.67
	};

	window.printPhysics = function(){
		console.log(JSON.stringify(defaults, undefined, "\t"));
	};

	var world = new Box2D.Dynamics.b2World(new Vec2(0, defaults.gravity),  true);

	Mediator.route("update", function(){
		world.Step(
			1 / 60,   //frame-rate
			defaults.velIter,
			defaults.posIter
		 );
        world.ClearForces();
		// world.DrawDebugData();
	});

		//debug drawing
	/*var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
	var debugDraw = new b2DebugDraw();
	var canvas = $("<canvas>").appendTo("body");
	canvas.width(500);
	canvas.height(500);
	var context = canvas[0].getContext("2d");
	context.canvas.width = 500;
	context.canvas.height = 500;
	debugDraw.SetSprite(context);

	debugDraw.SetDrawScale(5.0);
	debugDraw.SetFillAlpha(0.5);
	debugDraw.SetLineThickness(1.0);
	debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
	world.SetDebugDraw(debugDraw);*/

	var fixDef = new Box2D.Dynamics.b2FixtureDef();
	fixDef.density = 0.4;
	fixDef.friction = 0.2;
	fixDef.restitution = 0.4;
	// fixDef.filter.maskBits = 0x0000;
	var bodyDef = new Box2D.Dynamics.b2BodyDef();

	//make a wall to add all of the joints
	bodyDef.position.x = 0;
	bodyDef.position.y = 0;
	bodyDef.fixedRotation = true;
	bodyDef.linearDamping = defaults.linearDamping;
	bodyDef.angularDamping = defaults.angularDamping;

	fixDef.shape = new Box2D.Collision.Shapes.b2PolygonShape();
	fixDef.shape.SetAsBox(100, 100);
	var wall = world.CreateBody(bodyDef);

	var circleDef = new Box2D.Collision.Shapes.b2CircleShape();
	fixDef.shape = circleDef;

	var jointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
	jointDef.frequencyHz = defaults.frequencyHz;
	jointDef.dampingRatio = defaults.dampingRatio;
	jointDef.maxForce = defaults.maxForce;
	jointDef.collideConnected = true;

	var centerVec = new Vec2(0, 0);

	//all of the joints and bodes
	var allBodies = [];
	var allJoints = [];

	/**
	 *  the star particle
	 */
	var StarParticle = function(radius, x, y, touched){
		bodyDef.position.x = x;
		bodyDef.position.y = y;
		bodyDef.userData = touched;
		bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;
		circleDef.SetRadius(radius);
		this.obj = world.CreateBody(bodyDef).CreateFixture(fixDef);
		this.body = this.obj.GetBody();
		//connect it to the wall at the current point
		jointDef.bodyA = wall;
		jointDef.bodyB = this.body;
		jointDef.localAnchorA.Set(x, y);
		jointDef.localAnchorB.Set(0, 0);
		this.wallSpring = world.CreateJoint(jointDef);
		this.wallSpring.SetLength(defaults.springLength);
		var mass = new Box2D.Collision.Shapes.b2MassData(defaults.mass, 0, centerVec);
		this.body.SetMassData(mass);
		allBodies.push(this.body);
		// allJoints.push(this.wallSpring);
	};

	StarParticle.prototype.getPosition = function(){
		return this.body.GetPosition();
	};

	StarParticle.prototype.isResting = function(){
		return !this.body.IsAwake();
	};

	StarParticle.prototype.applyForce = function(vX, vY){
		var vec = new Vec2(vX, vY);
		var ret = vec.Length()/30;
		vec.Multiply(defaults.mouseForce);
		// vec.Multiply(this.mass);
		this.body.ApplyImpulse(vec, centerVec);
		return ret;
	};

	//GUI STUFF
	GUI.add("Physics", defaults, "dampingRatio", function(val){
		allJoints.forEach(function(spring){
			spring.SetDampingRatio(val);
		});
	});

	GUI.add("Physics", defaults, "frequencyHz", function(val){
		allJoints.forEach(function(spring){
			spring.SetFrequency(val);
		});
	});

	GUI.add("Physics", defaults, "springLength", function(val){
		console.log(val);
		allJoints.forEach(function(spring){
			spring.SetLength(val);
		});
	});

	GUI.add("Physics", defaults, "linearDamping", function(val){
		allBodies.forEach(function(bod){
			bod.SetLinearDamping(val);
		});
	});

	GUI.add("Physics", defaults, "angularDamping", function(val){
		allBodies.forEach(function(bod){
			bod.SetAngularDamping(val);
		});
	});

	GUI.add("Physics", defaults, "mass", function(val){
		allBodies.forEach(function(bod){
			var mass = new Box2D.Collision.Shapes.b2MassData(defaults.mass, 0, centerVec);
			bod.SetMassData(mass);
		});
	});

	GUI.add("Physics", defaults, "gravity", function(val){
		world.SetGravity(new Vec2(0, val));
	});

	GUI.add("Physics", defaults, "mouseForce");

	GUI.add("Physics", defaults, "posIter");

	GUI.add("Physics", defaults, "velIter");

	GUI.add("Physics", defaults, "testDist");


	return {
		makeParticle : function(radius, x, y, touchCB){
			return new StarParticle(radius, x, y, touchCB);
		},
		makeSpring : function(bodyA, bodyB){
			jointDef.bodyA = bodyA.body;
			jointDef.bodyB = bodyB.body;
			jointDef.localAnchorA.Set(0, 0);
			jointDef.localAnchorB.Set(0, 0);
			var dist = bodyA.body.GetWorldCenter().Copy();
			dist.Subtract(bodyB.body.GetWorldCenter());
			var spring = world.CreateJoint(jointDef);
			spring.SetLength(dist.Length());
			allJoints.push(spring);
		},
		testPosition : function(mouseX, mouseY, vector){
			var vec = new Vec2(mouseX, mouseY);
			var aabb = new Box2D.Collision.b2AABB();
			var testDist = defaults.testDist;
			aabb.lowerBound.Set(mouseX - testDist, mouseY - testDist);
			aabb.upperBound.Set(mouseX + testDist, mouseY + testDist);

			// Query the world for overlapping shapes.

			selectedBody = null;
			world.QueryAABB( function getBodyCB(fixture) {
				if(fixture.GetBody().GetType() != Box2D.Dynamics.b2Body.b2_staticBody) {
					selectedBody = fixture.GetBody();
					// return false;
					// if(fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), vec)) {
					// }
				}
				return true;
			}, aabb);
			if (selectedBody){
				selectedBody.GetUserData()(vector);
			}
		}
	};
});
