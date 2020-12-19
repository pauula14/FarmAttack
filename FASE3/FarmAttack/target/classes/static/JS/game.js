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
    dom: {
        createContainer: true
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

    scene: [PreloadMenu, InitMenu, NickName, ChatMenu, MainMenu, MainMenuMultiplayer, OptionsMenu, TutorialMenu, CreditsMenu, GamePlayEs1, GamePlayEs2, GamePlayFa1, GamePlayFa2, GamePlayFo1, PauseMenu, GameOver, Winner]

  }

  var game = new Phaser.Game(config);

}


// Variables globales
 url = String(window.location+'users');
 name = "";

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

//Nickname
var url = String(window.location+'users');
var name = null;


function Alive(){
  var url = game.url+'/'+game.name;
  $.ajax({
  method: "GET",
  url:url,
  }).done(function(value){
    console.log("Todo va bien");
  }).fail(function (value) {
    if(value.status == 200){
      console.log("Todo va bien");
    }else if(value.status == 0){
     console.log("Servidor caido");
     game.scene.start('ServidorCaido');
   }else{
     console.log("Fallo de conexion con el servidor");
   }
  });

  var url = game.url;
  $.ajax({
	  method: "GET",
	  url:url,
	  }).done(function(value){
      getonline(value);
	  }).fail(function (value) {
	    if(value.status == 200){
	      getonline(value);
	    }else{
	     console.log("ERROR");
	     game.scene.sendToBack('Juego');
	 	 game.scene.stop('Juego');
	 	 game.scene.bringToTop('ServidorCaido');
	   }
	  });
}

function getonline(value){
  for(var i=0 ; i<value.length;i++){
    if(value[i].online){
      console.log(value[i].name +" is online");
    }
  }
}
