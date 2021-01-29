class PauseMenuMultiplayer extends Phaser.Scene{
  constructor(){
      super("PauseMenuMultiplayer");
  }

  preload(){

  }

  create(){

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

    this.quitButtonPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.QuitGamePM());
    this.quitButtonPM.on('pointerover', function (pointer) {this.quitButtonPMSel.setVisible(true);}, this);
    this.quitButtonPM.on('pointerout', function (pointer) {this.quitButtonPMSel.setVisible(false);}, this);

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

    this.scene.stop('PauseMenu');
    this.scene.stop(levelGameplay);
	if(gamemode =="Offline"){
		this.scene.start('MainMenu');	
	}
	else if(gamemode == "Online"){
		this.scene.start('MainMenuMultiplayer');
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
