// account for tile thickness
/* globals PIXI, kd, requestAnimFrame */
"use strict";
var PIXI = require('pixi');
var TWEEN = require('tween');
var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter;

var gameOpts = {
    stageWidth: 1024,
    stageHeight: 768,
}

var stage = new PIXI.Stage(0x000000);
var renderer = new PIXI.autoDetectRenderer(gameOpts.stageWidth, gameOpts.stageHeight);
document.body.appendChild(renderer.view);

//var loader = new PIXI.AssetLoader([]);
//loader.onComplete = start;
//loader.load();

start();

function start() {
    console.log("Starting Gamad Anak!");

    var playerContoller = require('./player_controller')(emitter);

    var beatSlider = require('./beat_slider')(stage, emitter, gameOpts);
    beatSlider.place();
    var gnome = require('./gnome')(stage, emitter, gameOpts);
    gnome.place();
    function animate() {
        // keyboard handler
        // kd.tick();
        requestAnimationFrame(animate);
        TWEEN.update();
        
        renderer.render(stage);
    }
    requestAnimationFrame(animate);
}
