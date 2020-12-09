class PauseMenu extends Phaser.Scene{
  constructor(){
      super("PauseMenu");
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


    //TUTORIAL
    this.tutorialButtonPM = this.add.image(gameWidth*8/16, gameHeight*10.35/16, 'tutorialButtonPM');
    this.tutorialButtonPMSel = this.add.image(gameWidth*8/16, gameHeight*10.35/16, 'tutorialButtonPMsel');
    this.tutorialButtonPMSel.setVisible(false);

    this.tutorialButtonPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.TutorialMenuPM());
    this.tutorialButtonPM.on('pointerover', function (pointer) {this.tutorialButtonPMSel.setVisible(true);}, this);
    this.tutorialButtonPM.on('pointerout', function (pointer) {this.tutorialButtonPMSel.setVisible(false);}, this);

    //OPTIONS
    this.optionsButtonPM = this.add.image(gameWidth*8/16, gameHeight*12.4/16, 'optionsButtonPM');
    this.optionsButtonPMSel = this.add.image(gameWidth*8/16, gameHeight*12.4/16, 'optionsButtonPMsel');
    this.optionsButtonPMSel.setVisible(false);

    this.optionsButtonPM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.OptionsMenuPM());
    this.optionsButtonPM.on('pointerover', function (pointer) {this.optionsButtonPMSel.setVisible(true);}, this);
    this.optionsButtonPM.on('pointerout', function (pointer) {this.optionsButtonPMSel.setVisible(false);}, this);

    //QUIT
    this.quitButtonPM = this.add.image(gameWidth*8/16, gameHeight*14.4/16, 'quitButtonPM');
    this.quitButtonPMSel = this.add.image(gameWidth*8/16, gameHeight*14.4/16, 'quitButtonPMsel');
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

    this.scene.stop('PauseMenu');
    this.scene.sendToBack('PauseMenu');
    this.scene.resume(levelGameplay);
    prevScene = 'PauseMenu';
  }

  OptionsMenuPM(){
    this.clickSound.play();

    this.scene.stop('PauseMenu');
    this.scene.bringToTop('OptionsMenu');
    this.scene.start('OptionsMenu');
    prevScene = 'PauseMenu';
  }

  TutorialMenuPM(){
    this.clickSound.play();

    this.scene.stop('PauseMenu');
    this.scene.bringToTop('TutorialMenu');
    this.scene.start('TutorialMenu');
    prevScene = 'PauseMenu';
  }

  QuitGamePM(){
    this.clickSound.play();

    this.scene.stop('PauseMenu');
    this.scene.stop(levelGameplay);
    this.scene.start('MainMenu');
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
