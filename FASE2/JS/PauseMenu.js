class PauseMenu extends Phaser.Scene{
  constructor(){
      super("PauseMenu");
  }

  preload(){

  }

  create(){

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
    this.scene.stop('PauseMenu');
    this.scene.sendToBack('PauseMenu');
    this.scene.resume('GamePlayEs1');
    prevScene = 'PauseMenu';
  }

  OptionsMenuPM(){
    this.scene.stop('PauseMenu');
    this.scene.bringToTop('OptionsMenu');
    this.scene.start('OptionsMenu');
    prevScene = 'PauseMenu';
  }

  TutorialMenuPM(){
    this.scene.stop('PauseMenu');
    this.scene.bringToTop('TutorialMenu');
    this.scene.start('TutorialMenu');
    prevScene = 'PauseMenu';
  }

  QuitGamePM(){
    this.scene.stop('PauseMenu');
    this.scene.stop('GamePlay');
    this.scene.start('MainMenu');
    prevScene = 'PauseMenu';
  }

}
