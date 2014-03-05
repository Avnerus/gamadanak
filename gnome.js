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
    this.emitter = emitter;

    console.log("Loading gnome"); 
    this.sprite = new PIXI.Sprite.fromImage('assets/pixelgnome.png');
    
    var gnome = this;

    // Loading dance clips
    this.dances  = [];
    var dance_seq1 = [];
    for (var i = 1; i <= 23; i++) {
       var name = pad(i,4); 
       var texture = new PIXI.Texture.fromFrame("gnome_dance" + name + ".png");
       dance_seq1.push(texture);
       var dance1 = new PIXI.MovieClip(dance_seq1);
       dance1.anchor.x = 0.5;
       dance1.anchor.y = 0.5;
       dance1.position.x = this.opts.stageWidth / 2;
       dance1.position.y = this.opts.stageHeight / 2 + 100; 
       dance1.loop = false;
       dance1.onComplete = function() {
           gnome.danceComplete();
       };
       dance1.visible = false;
    }
    this.stage.addChild(dance1);
    
    this.dances.push(dance1);
    this.currentDance = null;

    emitter.on('anakGood', function(message){
        gnome.anakGood();
    });
    emitter.on('anakBad', function(message){
        gnome.anakBad();
    });
}

Gnome.prototype.place = function(position) {
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;
    this.sprite.position.x = this.opts.stageWidth / 2;
    this.sprite.position.y = this.opts.stageHeight / 2 + 100; 
    this.stage.addChild(this.sprite);

}
Gnome.prototype.anakGood = function(position) {
    console.log("PLAY DANCE!");
    this.currentDance = this.dances[0];
    this.currentDance.gotoAndPlay(0);
    this.currentDance.visible = true;
    this.sprite.visible = false;

}

Gnome.prototype.anakBad = function(position) {
}

Gnome.prototype.danceComplete = function() {
    if (this.currentDance != null) {
        console.log("DANCE COMPLETE!")
        this.currentDance.visible = false;
        this.sprite.visible = true;
    }
    this.currentDance = null;
}
function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}
