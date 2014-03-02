"use strict"
var PIXI = require('pixi');

module.exports = function(stage, emitter, opts) {
  return new ScoreBoard(stage, emitter, opts)
}

module.exports.ScoreBoard = ScoreBoard


function ScoreBoard(stage, emitter, opts) {
   // protect against people who forget 'new'
   if (!(this instanceof ScoreBoard)) return new ScoreBoard(stage, emitter, opts)
    // we need to store the passed in variables on 'this'
    // so that they are available to the .prototype methods
    this.stage = stage
    this.opts = opts || {}
    this.points = 0;
    this.combo = 0;
    // this.emitter = emitter;

    console.log("Loading score board"); 
}

ScoreBoard.prototype.place = function(position) {
    this.pointsLabel = new PIXI.Text("Anak Points", {font:"36px Arial", fill:"white"});
    this.pointsLabel.position.y = 200;
    this.pointsLabel.position.x = 70;
    this.pointsValue = new PIXI.Text(this.points, {font:"48px Arial", fill:"white"});
    this.pointsValue.position.y = 250;
    this.pointsValue.position.x = 143;
    this.stage.addChild(this.pointsLabel);
    this.stage.addChild(this.pointsValue);

    this.comboLabel = new PIXI.Text("Anak combo", {font:"36px Arial", fill:"white"});
    this.comboLabel.position.y = 200;
    this.comboLabel.position.x = 750;
    this.comboValue = new PIXI.Text(this.combo, {font:"48px Arial", fill:"white"});
    this.comboValue.position.y = 250;
    this.comboValue.position.x = 835;
    this.stage.addChild(this.comboLabel);
    this.stage.addChild(this.comboValue);

}
