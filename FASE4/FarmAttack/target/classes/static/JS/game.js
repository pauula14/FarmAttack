window.onload = function() {

	var config = {
		type: Phaser.AUTO,
		parent: 'game',
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
		scale: {
			mode: Phaser.Scale.FIT, //hace que se adapte a cambios de tamaño
			autoCenter: Phaser.Scale.CENTER_BOTH,
			isPortrait: true,
		},
		backgroundColor: 0xffffff,
		//nombre que se muestra en la ventana del navegador
		//title:"FARM ATTACK",
		//URL del JUEGO
		//utl: "http://farmAttack.es",

		scene: [PreloadMenu, ServidorCaido, InitMenu, NickName, ChatMenu, MainMenu, MainMenuMultiplayer, OptionsMenu, ReadyMenu, PauseMenuMultiplayer, TutorialMenu, CreditsMenu, GamePlayEs1, GamePlayEs1Multiplayer, GamePlayEs2, GamePlayFa1, GamePlayFa2, GamePlayFo1, PauseMenu, GameOver, Winner]

	}

	game = new Phaser.Game(config);

}

// Variables globales
url = String(window.location + 'users');
name = "";
usersConnected = "";
compareUsersConnected = "";

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

//WebSockets
var playerId = 0;
var connection = null;
var fullLobby = false;
var startGame = false;
var skipTutorial = false;

// Tamaño pantalla
var gameWidth = 1425;
var gameHeight = 800;

var totalTime = 0;
var finalPunt = 0;

var gamemode = "Offline"

var volumeMusic = 5;
var volumeEffects = 5;
var musicMenu;
var musicGameplay;// = this.sound.add('levelMusic', config);

var prevScene = 'PreloadMenu';
var levelGameplay = 'GamePlayEs1';

//Nickname
var url = String(window.location + "users");
var name = null;


function alive() {
	if(gamemode == "Online"){
		var localurl = url + '/' + name;
	$.ajax({
		method: "GET",
		url: localurl,
	}).done(function(value) {
		//console.log("Todo va bien");
	}).fail(function(value) {
		if (value.status == 200) {
			console.log("Todo va bien");
		} else if (value.status == 0) {
			console.log("Servidor caido");
			game.scene.sendToBack(prevScene);
			game.scene.stop(prevScene);
			game.scene.start('ServidorCaido');
		} else {
			console.log("Fallo de conexion con el servidor");
		}
	});

	$.ajax({
		method: "GET",
		url: url,
	}).done(function(value) {
		usersConnected = value;
	}).fail(function(value) {
		if (value.status == 200) {
			usersConnected = value;
		} else {
			console.log("ERROR");
			game.scene.sendToBack(prevScene);
			game.scene.stop(prevScene);
			game.scene.bringToTop('ServidorCaido');
		}
	});
	}
	
}