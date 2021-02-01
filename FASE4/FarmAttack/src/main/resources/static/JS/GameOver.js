class GameOver extends Phaser.Scene{
  constructor(){
      super("GameOver");
  }

  preload(){
	  alone = false;
  }

  create(){

	//CONTROLAR EL MENSAJE DE VOLVER A COMENZAR PARA QUE VUELVAN A EMPEZAR LOS DOS A LA VEZ
	  
    this.clickSound = this.sound.add('clickSound', this.EffectsConfig());

    // 1) BACKGROUND
    this.backgroundWM = this.add.image(gameWidth/2, gameHeight/2, 'backgroundGOM');

    //BOTON Reiniciar
    this.retryButtonGoM = this.add.image(gameWidth*8/16, gameHeight*9.3/16, 'retryButtonGOM');
    this.retryButtonGoM.setDepth(2);
    this.retryButtonGoMSel = this.add.image(gameWidth*8/16, gameHeight*9.3/16, 'retryButtonGOMsel');
    this.retryButtonGoMSel.setVisible(false);
    this.retryButtonGoMSel.setDepth(2);

    if(gamemode == "Offline")
    {
    	this.retryButtonGoM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.RetryGame());
        this.retryButtonGoM.on('pointerover', function (pointer) {this.retryButtonGoMSel.setVisible(true);}, this);
        this.retryButtonGoM.on('pointerout', function (pointer) {this.retryButtonGoMSel.setVisible(false);}, this);
    }
    


    //BOTON SALIR
    this.backButtonGoM = this.add.image(gameWidth*8/16, gameHeight*11.9/16, 'quitButtonGOM');
    this.backButtonGoM.setDepth(2);
    this.backButtonGoMSel = this.add.image(gameWidth*8/16, gameHeight*11.9/16, 'quitButtonGOMsel');
    this.backButtonGoMSel.setVisible(false);
    this.backButtonGoMSel.setDepth(2);

    this.backButtonGoM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenu());
    this.backButtonGoM.on('pointerover', function (pointer) {this.backButtonGoMSel.setVisible(true);}, this);
    this.backButtonGoM.on('pointerout', function (pointer) {this.backButtonGoMSel.setVisible(false);}, this);

  }

  BackMainMenu(){
    this.clickSound.play();

    if(gamemode == "Online"){
    	//this.scene.stop('GamePlayEs1Multiplayer');
    	this.scene.stop('GameOver');
        this.scene.sendToBack('GameOver');
        this.scene.start('InitMenu'); //Llleva al menu inicial
    }else{
    	this.scene.stop('GameOver');
        this.scene.sendToBack('GameOver');
        this.scene.start('MainMenu'); //Lleva al main menu
	}
    
  }

  RetryGame(){
    this.clickSound.play();

    if(musicMenu.isPlaying){
      musicMenu.stop();
    }
    musicGameplay.play();
    
	if(gamemode != "Online"){
		
		this.scene.stop('GameOver');
	    this.scene.sendToBack('GameOver');
	    this.scene.start(levelGameplay);
	    
	}else{
		//ENVIAMOS MENSAJE DE REEMPEZAR
	}

    
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
