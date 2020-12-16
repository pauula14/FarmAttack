window.onload = function(){

  var config = {
    type: Phaser.AUTO,
    parent:'game',
    width: 1425,
    height: 800,
    fps: { target: fpsTarget, },
    physics: {
      default: 'arcade',
      arcade: {
         debug: false,
         fps: fpsTarget,
         gravity: { y: 500 }
      }
    },
    scale:{
      mode: Phaser.Scale.FIT, //hace que se adapte a cambios de tamaño
      autoCenter: Phaser.Scale.CENTER_BOTH,
      isPortrait: true,
    },
    backgroundColor: 0xffffff,
    //nombre que se muestra en la ventana del navegador
    //title:"FARM ATTACK",
    //URL del JUEGO
    //utl: "http://farmAttack.es",

    scene: [PreloadMenu, InitMenu, Chat, MainMenu, OptionsMenu, TutorialMenu, CreditsMenu, GamePlayEs1, GamePlayEs2, GamePlayFa1, GamePlayFa2, GamePlayFo1, PauseMenu, GameOver, Winner]

  }

  var game = new Phaser.Game(config);

}

// Variables globales
var P2_controls = {  // Controles del jugador (teclado)
  up: Phaser.Input.Keyboard.KeyCodes.UP,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  //interact: Phaser.Input.Keyboard.KeyCodes.CTRL,
};

var P1_controls = {  // Controles del jugador (teclado)
  up: Phaser.Input.Keyboard.KeyCodes.W,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  right: Phaser.Input.Keyboard.KeyCodes.D,
  //interact: Phaser.Input.Keyboard.KeyCodes.F,
};

var fpsTarget = 60;

// Tamaño pantalla
var gameWidth = 1425;
var gameHeight = 800;

var totalTime = 0;
var finalPunt = 0;

var volumeMusic = 5;
var volumeEffects = 5;
var musicMenu;
var musicGameplay;// = this.sound.add('levelMusic', config);

var prevScene = 'PreloadMenu';
var levelGameplay = 'GamePlayEs1';
