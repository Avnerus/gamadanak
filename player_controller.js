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
   /*     { 
            file: "deep_is_the_breath.ogg",
            text: "Kasper Bjorke - Deep is the Breath",
            bpm: 112.0
        }, */
       
        { 
            file: "10sec.mp3",
            text: "Silence - 10 Seconds",
            bpm: 104.914  
        },
        { 
            file: "lies.ogg",
            text: "CHVRCHES - Lies",
            bpm: 104.914  
        },
        { 
            file: "zebra.ogg",
            text: "Beachc House - Zebra",
            bpm: 118.379   
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
    emitter.on('pausePressed', function(message){
        ctrl.onPausePressed();
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
PlayerController.prototype.onPausePressed = function() {
    console.log("Stop Pressed");
    if (this.currentSong) {
        this.currentSong.sound.togglePause();
    }
}
PlayerController.prototype.onFfwdPressed = function() {
    console.log("FFwd Pressed");
    if (this.currentSongIndex == -1 || this.currentSongIndex >= this.mixtape.length -1 || !this.currentSong) {
        return;
    }
    this.nextSong();
}
PlayerController.prototype.nextSong = function() {
    this.currentSong.sound.stop();
    this.currentSongIndex++;
    this.currentSong = this.mixtape[this.currentSongIndex];
    this.currentSong.sound.play({position: 0});
    $("#song-label").text(this.currentSong.text);
    this.emitter.emit("songChanged", {});
}
PlayerController.prototype.onRewindPressed = function() {
    console.log("Rewind Pressed");
    if (this.currentSongIndex <= 0 || !this.currentSong) {
        return;
    }
    this.currentSong.sound.stop();
    this.currentSongIndex--;
    this.currentSong = this.mixtape[this.currentSongIndex];
    this.currentSong.sound.play({position: 0});
    $("#song-label").text(this.currentSong.text);
    this.emitter.emit("songChanged", {});
}
PlayerController.prototype.onPlay = function() {
    console.log("Playing!");
    this.emitter.emit("tapeStart", {});
    this.emitter.emit("gameStart", {bpm: this.currentSong.bpm});
}
PlayerController.prototype.onFinish = function() {
    console.log("Song Finished!");
    if (this.currentSongIndex >= this.mixtape.length -1 || !this.currentSong) {
        this.emitter.emit("tapeStop", {});
        this.emitter.emit("gameStop", {});
    } else {
        this.nextSong();
    }
}
PlayerController.prototype.onPause = function() {
    console.log("Pause!");
    this.emitter.emit("tapeStop", {});
    this.emitter.emit("gameStop", {});
}
PlayerController.prototype.onResume = function() {
    console.log("Resume!")
    this.emitter.emit("tapeStart", {});
    this.emitter.emit("gameStart", {bpm: this.currentSong.bpm});
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
          onfinish: function() {ctrl.onFinish() },
          onpause: function () {ctrl.onPause()},
          onresume: function () {ctrl.onResume()},
          onid3: function() {
            console.log(this.sID + 'got ID3 data', this.id3);
          }
        });
        this.mixtape[i].sound = s;
    }

}
