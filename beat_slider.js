var PIXI = require('pixi');

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
}

BeatSlider.prototype.place = function(position) {
    this.sliderBg.anchor.x = 0.5;
    this.sliderBg.anchor.y = 0.5;
    this.sliderBg.position.x = this.opts.stageWidth / 2;
    this.sliderBg.position.y = 100; 

    console.log("Placing beat slider at", this.sliderBg.position);
    this.stage.addChild(this.sliderBg);
}
