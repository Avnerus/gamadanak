"use strict"
var PIXI = require('pixi');

module.exports = function(stage, emitter, scoreBoard, world, opts) {
  return new SweatPants(stage, emitter,scoreBoard, world, opts)
}

module.exports.SweatPants = SweatPants

const METER = 100;

function SweatPants(stage, emitter, scoreBoard, world, opts) {
   // protect against people who forget 'new'
   if (!(this instanceof SweatPants)) return new SweatPants(stage, emitter, scoreBoard, world, opts)
    // we need to store the passed in variables on 'this'
    // so that they are available to the .prototype methods
    this.stage = stage
    this.opts = opts || {}
    this.emitter = emitter;
    this.scoreBoard = scoreBoard;
    this.world = world;

    console.log("Loading sweatpants"); 
    this.sprite = new PIXI.Sprite.fromImage('assets/pixelgnome.png');
    var pants = this;

    emitter.on('anakGood', function(message){
        pants.anakGood();
    });
    emitter.on('anakLostCombo', function(message){
        pants.anakLostCombo();
    });


    // Box2D Init
    console.log(this.world);

    this.polyFixture = new Box2D.Dynamics.b2FixtureDef();

    this.polyFixture.shape = new Box2D.Collision.Shapes.b2PolygonShape();
    this.polyFixture.density = 1;
    this.bodyDef = new Box2D.Dynamics.b2BodyDef();
    this.bodyDef.type = Box2D.Dynamics.b2Body.b2_staticBody;

    //down
    this.polyFixture.shape.SetAsBox(10, 1);
    this.bodyDef.position.Set(9, this.opts.stageHeight / METER + 1);
    console.log("Floor 2d position at " , this.bodyDef.position);
    this.world.CreateBody(this.bodyDef).CreateFixture(this.polyFixture);
    
    //left
    this.polyFixture.shape.SetAsBox(1, 100);
    this.bodyDef.position.Set(-1, 0);
    this.world.CreateBody(this.bodyDef).CreateFixture(this.polyFixture);
    
    //right
    this.bodyDef.position.Set(this.opts.stageWidth / METER + 1, 0);
    this.world.CreateBody(this.bodyDef).CreateFixture(this.polyFixture);
    this.bodyDef.type = Box2D.Dynamics.b2Body.b2_dynamicBody;

    this.start();
}


SweatPants.prototype.start = function(name, frames) {
    this.pants = new PIXI.Sprite(PIXI.Texture.fromFrame("assets/sweatpants.png")); 
    this.bodyDef.position.Set(MathUtil.rndRange(0, this.opts.stageWidth) / METER, -MathUtil.rndRange(50, 1000) / METER);
    this.body = this.world.CreateBody(this.bodyDef);
    this.polyFixture.shape.SetAsBox(102 / 2 / METER, 200 / 2 / METER);
    this.body.CreateFixture(this.polyFixture);
    this.pants.anchor.x = this.pants.anchor.y = 0.5;
    this.pants.scale.x = 102 / 100;
    this.pants.scale.y = 200 / 100;
    this.stage.addChild(this.pants);
}

SweatPants.prototype.update = function(position) {
    var position = this.body.GetPosition();
    this.pants.position.x = position.x * 100;
    this.pants.position.y = position.y * 100;
    this.pants.rotation = this.body.GetAngle();
}
SweatPants.prototype.anakGood = function(position) {
}

SweatPants.prototype.anakLostCombo = function(position) {
}
