"use strict"

module.exports = function(emitter) {
  return new PlayerController(emitter)
}

module.exports.PlayerController = PlayerController


function PlayerController(emitter) {
   // protect against people who forget 'new'
   if (!(this instanceof PlayerController)) return new PlayerController(emitter)
    // we need to store the passed in variables on 'this'
    // so that they are available to the .prototype methods
    this.emitter = emitter;
    console.log(this.emitter);
    var ctrl = this;

    console.log("Loading player controller"); 
    $(document).ready(function() {
        $("#player").bind('play', function() {
            ctrl.onPlay();
        });
    });
}

PlayerController.prototype.onPlay = function() {
    console.log("Playing!!!");
    this.emitter.emit('nowPlaying',{bpm: 118.34} );
    

}
