"use strict"
// var PIXI = require('pixi');
var TWEEN = require('tween.js');

module.exports = function(stage, emitter, opts) {
  return new BeatFall(stage, emitter, opts)
}

module.exports.BeatFall = BeatFall


function BeatFall(stage, emitter, opts) {
   // protect against people who forget 'new'
   if (!(this instanceof BeatFall)) return new BeatFall(stage, emitter, opts)
    // we need to store the passed in variables on 'this'
    // so that they are available to the .prototype methods
    this.stage = stage
    this.opts = opts || {}
    this.emitter = emitter;
    // this.emitter = emitter;
    
    this.speed = 400 / 1000; // Pixels per millsecond

    console.log("Loading beat fall"); 
    this.haman_shape = new PIXI.Sprite.fromImage('assets/haman_shape.png');
    var slider = this;
    this.running = false;
    this.lastHaman = null;

    // Handle spacebar
    window.onkeydown = function(e) { 
        if (e.keyCode == 32) {
            slider.spacePressed();
            return false;
        } 
    };

    emitter.on('gameStart', function(message){
        slider.start(message.bpm);
    });
    emitter.on('gameStop', function(message){
        slider.stop();
    });
}

BeatFall.prototype.start = function(bpm) {
    console.log("Slider tuning to " + bpm + " BPM!");
    this.bpm = bpm;
   // this.haman.position.x = - (this.sliderBg.width / 2) + (this.haman.width / 2);
    this.msPerBeat = 60000 / this.bpm;
    this.startDistance = 8 * this.speed * this.msPerBeat; // Start 6 beats away 
    this.hamanDistance = this.speed * this.msPerBeat;
    this.startPosition = {x: 1200, y: this.haman_shape.position.y - this.startDistance};

    console.log("The starting position is " + this.startDistance + " away from the shape");
    this.running = true;
}
BeatFall.prototype.stop = function() {
    console.log("Slider stopping");
    //this.haman.position.x = - (this.sliderBg.width / 2) + (this.haman.width / 2);
    //this.forthTween = null;
}

BeatFall.prototype.spacePressed = function() {
    if (!this.running) {
        return;
    }
    this.emitter.emit('anakGood',{} );
//    this.emitter.emit('anakBad',{} );
}

BeatFall.prototype.spawn = function() {
    console.log("Spawning an haman");

    var haman = new PIXI.Sprite.fromFrame('assets/haman.png');
    haman.anchor.x = 0.5;
    haman.anchor.y = 0.5;
    haman.position = {x: this.startPosition.x, y: this.startPosition.y};

    this.stage.addChild(haman);
    this.lastHaman = haman;

    var time = (this.startDistance + 200) / this.speed;

    var target = {x:this.haman_shape.position.x ,y:this.haman_shape.position.y + 200};
    var self = this;

    var fallTween = new TWEEN.Tween(haman.position) 
        .to(target , time) 
        .easing(TWEEN.Easing.Linear.None);
    fallTween.haman = haman;
    fallTween.onComplete(function() {
        console.log("Haman reached!", this.haman);
    });

    fallTween.start();
}

BeatFall.prototype.update = function() {
    if (!this.running) { 
        return;
    }
    if (this.lastHaman == null) {
        this.spawn();
    } else {
        var travelDistance = this.lastHaman.position.y - this.startPosition.y;
        if (travelDistance >= this.hamanDistance) {
            console.log("Spawning because travel distance is " + travelDistance + " and haman distance should be " + this.hamanDistance);
            this.spawn();
        } 
    }
}

BeatFall.prototype.place = function(position) {
    this.haman_shape.anchor.x = 0.5;
    this.haman_shape.anchor.y = 0.5;
    this.haman_shape.position = {x: 1200, y: 650};

    this.stage.addChild(this.haman_shape);
}
