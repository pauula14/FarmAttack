class MainMenu extends Phaser.Scene{
  constructor(){
      super("MainMenu");
  }

  preload(){

  }

  create(){

    this.backgroundMM = this.add.image(0, 0, 'backgroundMM');
    this.backgroundMM.setPosition(gameWidth/2, gameHeight/2);

    //PLAY
    this.playButton = this.add.image(gameWidth*8/16, gameHeight*5/16, 'playButton');
    this.playButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.PlayGame());

    //OPTIONS
    this.optionsButtonMM = this.add.image(gameWidth*8/16, gameHeight*7/16, 'optionsButton');
    this.optionsButtonMM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.OptionsMenuMM());

    //CREDITS
    this.creditsButton = this.add.image(gameWidth*8/16, gameHeight*9/16, 'creditsButton');
    this.creditsButton.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.CreditsMenu());

    //TUTORIAL
    this.tutorialButtonMM = this.add.image(gameWidth*8/16, gameHeight*11/16, 'tutorialButton');
    this.tutorialButtonMM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.TutorialMenuMM());

    //BACK
    this.backButtonMM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonMM');
    this.backButtonMM.setScale(2/3);
    this.backButtonMM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.BackInitMenu());


  }

  PlayGame(){
    this.scene.stop("MainMenu");
    this.scene.start("SelectMap");
    prevScene = 'MainMenu';
  }

  OptionsMenuMM(){
    this.scene.stop("MainMenu");
    this.scene.start("OptionsMenu");
    prevScene = 'MainMenu';
  }

  CreditsMenu(){
    this.scene.stop("MainMenu");
    this.scene.start("CreditsMenu");
    prevScene = 'MainMenu';
  }

  TutorialMenuMM(){
    this.scene.stop("MainMenu");
    this.scene.start("TutorialMenu");
    prevScene = 'MainMenu';
  }

  BackInitMenu(){
    this.scene.stop("MainMenu");
    this.scene.start("InitMenu");
    prevScene = 'MainMenu';
  }

}

