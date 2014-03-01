"use strict"
var PIXI = require('pixi');

module.exports = function(stage, emitter, opts) {
  return new Gnome(stage, emitter, opts)
}

module.exports.Gnome = Gnome


function Gnome(stage, emitter, opts) {
   // protect against people who forget 'new'
   if (!(this instanceof Gnome)) return new Gnome(stage, emitter, opts)
    // we need to store the passed in variables on 'this'
    // so that they are available to the .prototype methods
    this.stage = stage
    this.opts = opts || {}
    // this.emitter = emitter;

    console.log("Loading gnome"); 
    this.sprite = new PIXI.Sprite.fromImage('assets/pixelgnome.png');
}

Gnome.prototype.place = function(position) {
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = this.opts.stageWidth / 2;
    this.sprite.position.y = this.opts.stageHeight / 2 + 100; 
    this.stage.addChild(this.sprite);

}
