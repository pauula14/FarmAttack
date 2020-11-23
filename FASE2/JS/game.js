window.onload = function(){

  var config = {
    type: Phaser.AUTO,
    parent:'game',
    width: 1425, 
    height: 800,
    physics: {
      default: 'arcade',
      arcade: {
         debug: true,
         gravity: { y: 500 }
      }
    },
    scale:{
      mode: Phaser.Scale.FIT, //hace que se adapte a cambios de tamaño
      autoCenter: Phaser.Scale.CENTER_BOTH,
      isPortrait: true,
    },
    backgroundColor: 0x000000,
    //nombre que se muestra en la ventana del navegador
    //title:"FARM ATTACK",
    //URL del JUEGO
    //utl: "http://farmAttack.es",

    scene: [PreloadMenu, InitMenu, MainMenu, OptionsMenu, TutorialMenu, CreditsMenu, SelectMap, GamePlay, PauseMenu, GameOver, Winner]

  }

  var game = new Phaser.Game(config);

}

// Variables globales
var P1_controls = {  // Controles del jugador (teclado)
  up: Phaser.Input.Keyboard.KeyCodes.SPACE,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  interact: Phaser.Input.Keyboard.KeyCodes.CTRL,
};
var P2_controls = {  // Controles del jugador (teclado)
  up: Phaser.Input.Keyboard.KeyCodes.W,
  left: Phaser.Input.Keyboard.KeyCodes.A,
  right: Phaser.Input.Keyboard.KeyCodes.D,
  interact: Phaser.Input.Keyboard.KeyCodes.F,
};


// Tamaño pantalla
var gameWidth = 1425;
var gameHeight = 800;

var prevScene = 'PreloadMenu';
