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
    //title:"Proyecto Armadillo",
    //URL del JUEGO
    //utl: "http://proyectoArmadillo.es",

    scene: [PreloadMenu, MainMenu, MapSelectionMenu, OptionsMenu, PauseMenu, CreditsMenu, World1Map, LevelManager, MapOne]

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

var levelIndex = 0; // Indica el nivel a generar para LevelManager (CAMBIAR A PASO DE OBJETO DE ESCENA A ESCENA)
var difficulty = 1; // Indica la dificultad escogida: 0 difícil - 1 normal - 2 fácil (aún sin implementar)


//Movil o PC
var PC = true;

// Tamaño pantalla
var gameWidth = 1270;
var gameHeight = 610;

//Fecha de desbloqueo de nuevo mundo
unlockDate=new Date(2021 ,2 ,1);

var user = { //Mapas desbloqueados y dinero del jugador
  world: [true,false,false,false,false,false,false,false,false],
  map: [false, false, false, false],
  money: 0,
};

function saveUserData(){
  localStorage.setItem("UserWorld", user.world)
  localStorage.setItem("UserMap", user.map);
  localStorage.setItem("UserMoney", user.money);
}

function loadUserData(){
  var user_world = localStorage.getItem("UserWorld");
  var user_map = localStorage.getItem("UserMap");

  var user_money = localStorage.getItem("UserMoney");
  if(user_world!=null && user_map!=null && user_money != null) {
    user.world = stringToArray(user_world);
    user.map = stringToArray(user_map);
    user.money = user_money;
  }
}

function resetUserData(){
  user.world= [true,false,false,false,false,false,false,false,false],
  user.map= [true, false, false],
  user.money= 0
}

function stringToArray(user_data) {
  var separador = ",";
  var data = user_data.split(separador);
  var user_date_updated
  for (var i=0; i < data.length; i++) {
    user_date_updated[i] = data[i];
  }
  return user_date_updated;
}
