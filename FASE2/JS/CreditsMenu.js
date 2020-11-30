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
    this.backButtonCM = this.add.image(gameWidth*13.9/16, gameHeight*14.2/16, 'backButton');
    this.backButtonCMSel = this.add.image(gameWidth*13.9/16, gameHeight*14.2/16, 'backButtonSel');
    this.backButtonCMSel.setVisible(false);

    this.backButtonCM.on('pointerover', function (pointer) {this.backButtonCMSel.setVisible(true);}, this);
    this.backButtonCM.on('pointerout', function (pointer) {this.backButtonCMSel.setVisible(false);}, this);
    this.backButtonCM.setInteractive({ useHandCursor: true}).on('pointerdown', () => this.BackMainMenuCM());

  }

  BackMainMenuCM(){
    prevScene = 'CreditsMenu';
    this.scene.stop('CreditsMenu');
    this.scene.start('MainMenu');
  }


}
