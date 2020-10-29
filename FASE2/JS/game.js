window.onload = function(){

  var config = {
    type: Phaser.AUTO,
    parent:'game',
    width: 1270, //Comprobar si en el escalado funciona bien
    height: 610,
    physics: {
      default: 'arcade',
      arcade: {
         debug: true,
         gravity: { y: 3500 }
      }
    },
    scale:{

      //mode: Phaser.Scale.FIT, //hace que se adapte a cambios de tamaño
      autoCenter: Phaser.Scale.CENTER_BOTH,
      isPortrait: true,
      //width: 1270, //Comprobar si en el escalado funciona bien
      //height: 610,
    },
    backgroundColor: 0x000000,
    //nombre que se muestra en la ventana del navegador
    //title:"FARM ATTACK",
    //URL del JUEGO
    //utl: "http://farmAttack.es",

    scene: [PreloadMenu, MainMenu, PrePlayMenu, OptionsMenu, PauseMenu, ControlsMenu, CreditsMenu, GamePlay, GameOver, Winner]

  }

  var game = new Phaser.Game(config);

}

// Variables globales
var controls = {  // Controles del jugador (teclado)
  up: Phaser.Input.Keyboard.KeyCodes.SPACE,
  left: Phaser.Input.Keyboard.KeyCodes.LEFT,
  right: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  attack: Phaser.Input.Keyboard.KeyCodes.CTRL,
  test: Phaser.Input.Keyboard.KeyCodes.F,
};


// Tamaño pantalla
var gameWidth = 1270;
var gameHeight = 610;
