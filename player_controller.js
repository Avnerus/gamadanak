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
    this.currentSongIndex = -1;
    this.currentSong;

    // The MIXTAPE
    this.mixtape = [
        { 
            file: "deep_is_the_breath.ogg",
            text: "Kasper Bjorke - Deep is the Breath",
            bpm: 112.0
        },
        { 
            file: "zebra.ogg",
            text: "Beach House - Zebra",
            bpm: 118.15
        }
    ];

    var ctrl = this;

    console.log("Loading player controller"); 
    /*$(document).ready(function() {
        $("#player").bind('play', function() {
            ctrl.onPlay();
        });
    });*/
    emitter.on('playPressed', function(message){
        ctrl.onPlayPressed();
    });
    emitter.on('stopPressed', function(message){
        ctrl.onStopPressed();
    });
    emitter.on('ffwdPressed', function(message){
        ctrl.onFfwdPressed();
    });
    emitter.on('rewindPressed', function(message){
        ctrl.onRewindPressed();
    }); 
    emitter.on('soundInit', function(message){
        ctrl.onSoundInit();
    }); 
}

PlayerController.prototype.onPlayPressed = function() {
    console.log("Play Pressed");
    if (this.currentSongIndex == -1) {
        this.currentSongIndex = 0;
        this.currentSong = this.mixtape[0];
        this.currentSong.sound.play();
        $("#song-label").text(this.currentSong.text);
        this.emitter.emit('nowPlaying',{bpm: this.currentSong.bpm} );
    } else {
        this.currentSong.sound.play();
    }
}
PlayerController.prototype.onStopPressed = function() {
    console.log("Stop Pressed");
    if (this.currentSong) {
        this.currentSong.sound.pause();
    }
}
PlayerController.prototype.onFfwdPressed = function() {
    console.log("FFwd Pressed");
    if (this.currentSongIndex == -1 || this.currentSongIndex >= this.mixtape.length -1) {
        return;
    }
    this.currentSongIndex++;
    this.currentSong = this.mixtape[this.currentSongIndex];
}
PlayerController.prototype.onRewindPressed = function() {
    console.log("Rewind Pressed");
    if (this.currentSongIndex == -1) {
        return;
    }
}
PlayerController.prototype.onPlay = function() {
    console.log("Playing!");
    this.emitter.emit("tapeStart", {});
}
PlayerController.prototype.onStop = function() {
    console.log("Stop!");
}
PlayerController.prototype.onPause = function() {
    console.log("Pause!");
    this.emitter.emit("tapeStop", {});
}
PlayerController.prototype.onResume = function() {
    console.log("Resume!")
    this.emitter.emit("tapeStart", {});
}
PlayerController.prototype.onSoundInit = function() {
    var ctrl = this;
    var s;
    console.log("Init mixtape sound");
    for (var i = 0; i < this.mixtape.length; i++) {
        var song = this.mixtape[i];
        s = soundManager.createSound({
          id: song.file,
          url: 'mixtape/' + song.file,
          multiShot: false,
          onplay: function () {ctrl.onPlay()},
          onfinish: function() {ctrl.onStop() },
          onpause: function () {ctrl.onPause()},
          onresume: function () {ctrl.onResume()},
          onid3: function() {
            console.log(this.sID + 'got ID3 data', this.id3);
          }
        });
        this.mixtape[i].sound = s;
    }

}
