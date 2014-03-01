"use strict"
var PIXI = require('pixi');
var TWEEN = require('tween');

module.exports = function(stage, emitter, opts) {
  return new BeatSlider(stage, emitter, opts)
}

module.exports.BeatSlider = BeatSlider


function BeatSlider(stage, emitter, opts) {
   // protect against people who forget 'new'
   if (!(this instanceof BeatSlider)) return new BeatSlider(stage, emitter, opts)
    // we need to store the passed in variables on 'this'
    // so that they are available to the .prototype methods
    this.stage = stage
    this.opts = opts || {}
    // this.emitter = emitter;

    console.log("Loading beat slider"); 
    this.sliderBg = new PIXI.Sprite.fromImage('assets/slider_background.png');
    this.haman = new PIXI.Sprite.fromImage('assets/haman.png');
    var slider = this;
    emitter.on('nowPlaying', function(message){
        slider.tuneBPM(message.bpm);
    });
}

BeatSlider.prototype.tuneBPM = function(bpm) {
    console.log("Slider tuning to " + bpm + " BPM!");
    this.bpm = bpm;
    console.log(this.sliderBg.width);
    this.haman.position.x = - (this.sliderBg.width / 2) + (this.haman.width / 2);
    this.run()
}

BeatSlider.prototype.run = function(bpm) {
    // It should take 2 beats
    
    var time = 2000 / (this.bpm / 60);
    var forthTarget = {x: (this.sliderBg.width / 2) - (this.haman.width / 2), y: this.haman.position.y}
    var backTarget = {x: -(this.sliderBg.width / 2) + (this.haman.width / 2), y: this.haman.position.y}
    console.log(time);
    var slider = this;
    var forthTween = new TWEEN.Tween(this.haman.position) 
        .to(forthTarget , time) 
        .easing(TWEEN.Easing.Linear.None) 
        .onUpdate(function(){ 
 
        }) 
        .onComplete(function(){ 
 
        });
    var backTween = new TWEEN.Tween(this.haman.position) 
        .to(backTarget , time) 
        .easing(TWEEN.Easing.Linear.None) 
        .onUpdate(function(){ 
 
        }) 
        .onComplete(function(){ 
 
        });

    forthTween.chain(backTween);
    backTween.chain(forthTween);
    forthTween.start();
}

BeatSlider.prototype.place = function(position) {
    this.sliderBg.anchor.x = 0.5;
    this.sliderBg.anchor.y = 0.5;
    this.sliderBg.position.x = this.opts.stageWidth / 2;
    this.sliderBg.position.y = 100; 

    this.haman.anchor.x = 0.5;
    this.haman.anchor.y = 0.5;

    this.sliderBg.addChild(this.haman);
    this.stage.addChild(this.sliderBg);

}
