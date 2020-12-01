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
    this.resumeButtonPM = this.add.image(gameWidth*8/16, gameHeight*5/16, 'resumeButtonPM');
    this.resumeButtonPM.setScale(2/3);
    this.resumeButtonPM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.BackGamePM());

    //OPTIONS
    this.optionsButtonPM = this.add.image(gameWidth*8/16, gameHeight*7/16, 'optionsButtonPM');
    this.optionsButtonPM.setScale(2/3);
    this.optionsButtonPM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.OptionsMenuPM());

    //TUTORIAL
    this.tutorialButtonPM = this.add.image(gameWidth*8/16, gameHeight*9/16, 'tutorialButtonPM');
    this.tutorialButtonPM.setScale(2/3);
    this.tutorialButtonPM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.TutorialMenuPM());

    //QUIT
    this.quitButtonPM = this.add.image(gameWidth*8/16, gameHeight*11/16, 'quitButtonPM');
    this.quitButtonPM.setScale(2/3);
    this.quitButtonPM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.QuitGamePM());

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
