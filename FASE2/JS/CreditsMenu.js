class CreditsMenu extends Phaser.Scene{
  constructor(){
      super("CreditsMenu");
  }

  preload(){

  }

  create(){

    //BACKGROUND
    this.backgroundCM = this.add.image(0, 0, 'backgroundCM');
    this.backgroundCM.setPosition(gameWidth/2, gameHeight/2);

    //BACK
    this.backButtonCM = this.add.image(gameWidth*14/16, gameHeight*14/16, 'backButtonCM');
    this.backButtonCM.setScale(2/3);
    this.backButtonCM.setInteractive({ useHandCursor: true  } )
    .on('pointerdown', () => this.BackMainMenuCM());

  }

  BackMainMenuCM(){
    prevScene = 'CreditsMenu';
    this.scene.stop('CreditsMenu');
    this.scene.start('MainMenu');
  }


}
