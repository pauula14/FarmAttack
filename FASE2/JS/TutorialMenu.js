class TutorialMenu extends Phaser.Scene{
  constructor(){
      super("TutorialMenu");
  }

  preload(){

  }

  create(){

    //BACKGROUND
    this.backgroundTM = this.add.image(0, 0, 'backgroundTM');
    this.backgroundTM.setPosition(gameWidth/2, gameHeight/2);

    //BACK
    this.backButtonTM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonTM');
    this.backButtonTM.setScale(2/3);
    this.backButtonTM.setInteractive({ useHandCursor: true  } )
		.on('pointerdown', () => this.BackMainMenuTM());

  }

  BackMainMenuTM(){
    this.scene.stop('TutorialMenu');
    this.scene.start(prevScene);
    prevScene = 'TutorialMenu';

  }

}
