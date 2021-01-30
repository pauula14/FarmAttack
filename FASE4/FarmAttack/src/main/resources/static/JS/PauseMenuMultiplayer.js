class PauseMenuMultiplayer extends Phaser.Scene{
  constructor(){
      super("PauseMenuMultiplayer");
  }

  preload(){

	  	//Cuando la conexion da un error
	    connection.onerror = function(e) {
	      console.log("WS error: " + e);
	    }

	    //Cuando se cierra la conexion, se muestra el codigo del motivo, para poder solucionarlo si esto ha sido no intencionadamente.
	    connection.onclose = function(e){
	      //connection.send(JSON.stringify({ type: "leave"}))
	      console.log("Motivo del cierre: " + e.code);
	    }
	    
  }

  create(){

  	//recibimos el mensaje de empezar
      connection.onmessage = function (msg) {
    	  var data = JSON.parse(msg.data); 
    	  
          if(data.type == "leave"){
          	console.log(" EL OTRO SE FUE :((((");
          	alone = true;
          }
          
      }// Fin onmessage
      
    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    //BACKGROUND
    this.backgroundPM = this.add.image(0, 0, 'backgroundPM');
    this.backgroundPM.setPosition(gameWidth/2, gameHeight/2);

    //RESUME
    this.resumeButtonPM = this.add.image(gameWidth*8/16, gameHeight*8.35/16, 'resumeButtonPM');
    this.resumeButtonPMSel = this.add.image(gameWidth*8/16, gameHeight*8.35/16, 'resumeButtonPMsel');
    this.resumeButtonPMSel.setVisible(false);

    this.resumeButtonPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackGamePM());
    this.resumeButtonPM.on('pointerover', function (pointer) {this.resumeButtonPMSel.setVisible(true);}, this);
    this.resumeButtonPM.on('pointerout', function (pointer) {this.resumeButtonPMSel.setVisible(false);}, this);

    //QUIT
    this.quitButtonPM = this.add.image(gameWidth*8/16, gameHeight*10.35/16, 'quitButtonPM');
    this.quitButtonPMSel = this.add.image(gameWidth*8/16, gameHeight*10.35/16, 'quitButtonPMsel');
    this.quitButtonPMSel.setVisible(false);

    this.quitButtonPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => (connection.send(JSON.stringify({ type:"leave", inGame:"yes"})), leaved = true));/*this.QuitGamePM());*/
    this.quitButtonPM.on('pointerover', function (pointer) {this.quitButtonPMSel.setVisible(true);}, this);
    this.quitButtonPM.on('pointerout', function (pointer) {this.quitButtonPMSel.setVisible(false);}, this);

  }

  update(){
	  
	  if (alone == true){
		  this.BackGamePM();
		  alone = false;
	  }
	  
	  if (leaved == true){
		  this.QuitGamePM();
		  leaved = false;
	  }
  }
  
  
  BackGamePM(){
    this.clickSound.play();

    if(musicMenu.isPlaying){
      musicMenu.stop();
    }
    musicGameplay.play();

    this.scene.stop('PauseMenuMultiplayer');
    this.scene.sendToBack('PauseMenuMultiplayer');
    //this.scene.wake(levelGameplay);
    prevScene = 'PauseMenu';
  }

  QuitGamePM(){
    this.clickSound.play();
    
    this.scene.stop(levelGameplay);
    this.scene.stop('PauseMenuMultiplayer');
    
    
	if(gamemode =="Offline"){
		this.scene.start('MainMenu');	
	}
	else if(gamemode == "Online"){
		clearInterval(playerUpdate);
		this.scene.start('InitMenu');
	}
	else{
		gamemode = "Offline"
		this.scene.start('InitMenu');
	}
    
    prevScene = 'PauseMenu';
  }

  EffectsConfig(){
    return {
      mute: false,
      volume: volumeEffects/10,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: false,
      delay: 0
    };
  }

}
