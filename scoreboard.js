"use strict"
//var PIXI = require('pixi');
var TWEEN = require('tween.js');

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
    this.emitter = emitter;
    // this.emitter = emitter;

    console.log("Loading score board"); 

    var board = this;
    emitter.on('anakGood', function(message){
        board.anakGood();
    });
    emitter.on('anakBad', function(message){
        board.anakBad();
    });
}


ScoreBoard.prototype.anakGood = function(position) {
    this.combo++;
    this.points++;
    this.updateBoard();
}

ScoreBoard.prototype.anakBad = function(position) {
    if (this.combo != 0) {
        this.emitter.emit('anakLostCombo',{combo: this.combo} );
        this.combo = 0;
        this.updateBoard();
    }
}

ScoreBoard.prototype.updateBoard = function(position) {
    this.pointsValue.setText(this.points);
    this.comboValue.setText(this.combo);
    this.forthTweenPoints.start();
    this.forthTweenCombo.start();
}

ScoreBoard.prototype.place = function(position) {
    this.pointsLabel = new PIXI.Text("Anak Points:", {font:"62px JustAnotherHandRegular", fill:"white"});
    this.pointsLabel.position.y = 100;
    this.pointsLabel.position.x = 90;
    this.pointsValue = new PIXI.Text(this.points, {font:"48px Arial", fill:"white"});
    this.pointsValue.position.y = 108;
    this.pointsValue.position.x = 300;
    this.stage.addChild(this.pointsLabel);
    this.stage.addChild(this.pointsValue);

    this.comboLabel = new PIXI.Text("Anak combo:", {font:"62px JustAnotherHandRegular", fill:"white"});
    this.comboLabel.position.y = 200;
    this.comboLabel.position.x = 90;
    this.comboValue = new PIXI.Text(this.combo, {font:"48px Arial", fill:"white"});
    this.comboValue.position.y = 208;
    this.comboValue.position.x = 300;
    this.stage.addChild(this.comboLabel);
    this.stage.addChild(this.comboValue);

    // Bounce tweens

    var forthTarget = {x: 1.5, y: 1.5};
    var backTarget  = {x: 1, y: 1};
    var board = this;
    this.forthTweenPoints = new TWEEN.Tween(this.pointsValue.scale) 
        .to(forthTarget , 60) 
        .easing(TWEEN.Easing.Linear.None);

    this.backTweenPoints = new TWEEN.Tween(this.pointsValue.scale) 
        .to(backTarget , 60) 
        .easing(TWEEN.Easing.Linear.None) 

    this.forthTweenPoints.chain(this.backTweenPoints);

    this.forthTweenCombo = new TWEEN.Tween(this.comboValue.scale) 
        .to(forthTarget , 60) 
        .easing(TWEEN.Easing.Linear.None);

    this.backTweenCombo = new TWEEN.Tween(this.comboValue.scale) 
        .to(backTarget , 60) 
        .easing(TWEEN.Easing.Linear.None) 

    this.forthTweenCombo.chain(this.backTweenCombo);

}
